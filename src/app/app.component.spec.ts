import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], 
      providers: [
        provideMockStore(), 
        provideAnimationsAsync(), 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the SearchBarComponent', () => {
    const searchBarElement = fixture.nativeElement.querySelector('app-search-bar');
    expect(searchBarElement).toBeTruthy();
  });

  it('should render the SearchResultsComponent', () => {
    const searchResultsElement = fixture.nativeElement.querySelector('app-search-results');
    expect(searchResultsElement).toBeTruthy();
  });

  it('should have the correct class on the SearchBarComponent', () => {
    const searchBarElement = fixture.nativeElement.querySelector('app-search-bar');
    expect(searchBarElement.classList.contains('content-wrapper')).toBe(true);
  });
});