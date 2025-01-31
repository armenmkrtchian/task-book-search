import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SearchBarComponent } from './search-bar.component';
import { selectMatchingQueries } from '../../store/selectors/search.selector';

describe('SearchBarComponent', () => {
  let fixture: ComponentFixture<SearchBarComponent>;
  let component: SearchBarComponent;
  let store: MockStore;

  const mockMatchingQueries = ['query1', 'query2'];
  const initialState = {
    search: {
      pastQueries: mockMatchingQueries, 
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        AsyncPipe,
        SearchBarComponent, 
      ],
      providers: [
        provideMockStore({ initialState }),
        provideAnimationsAsync(), 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore); 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the searchControl', () => {
    expect(component.searchControl).toBeTruthy();
    expect(component.searchControl.value).toBe('');
  });

  it('should emit matching queries based on input', () => {
    const input = 'query';
    const mockQueries = ['query1', 'query2'];

    store.overrideSelector(selectMatchingQueries(input), mockQueries);
    store.refreshState();
    fixture.detectChanges();

    component.searchControl.setValue(input);
    fixture.detectChanges();

    component.matchingQueries$.subscribe((queries) => {
      expect(queries).toEqual(mockQueries);
    });
  });
});
