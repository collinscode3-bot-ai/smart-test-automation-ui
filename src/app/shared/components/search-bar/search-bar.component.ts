import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search-container">
      <div class="input-group shadow-sm rounded-4 overflow-hidden border">
        <span class="input-group-text bg-white border-0 ps-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <input type="text" placeholder="Search existing projects..." class="form-control form-control-lg border-0 py-4 fs-5" style="box-shadow: none;">
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      width: 100%;
      max-width: 1000px;
      margin: 40px auto;
      padding: 0 40px;
    }
  `]
})
export class SearchBarComponent {}
