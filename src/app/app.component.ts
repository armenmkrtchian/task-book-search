import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, SearchResultsComponent],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {}
