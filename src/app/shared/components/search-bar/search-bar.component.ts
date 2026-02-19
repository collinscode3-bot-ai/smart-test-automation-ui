import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search-container">
      <div class="search-input-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" placeholder="Search existing projects..." class="search-input">
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
    .search-input-wrapper {
      position: relative;
      background: var(--card-bg);
      border-radius: 12px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
      border: 1px solid var(--border-color);
    }
    .search-icon {
      color: var(--text-muted);
      margin-right: 16px;
    }
    .search-input {
      width: 100%;
      height: 64px;
      border: none;
      outline: none;
      font-size: 18px;
      color: var(--text-primary);
      &::placeholder {
        color: var(--text-muted);
        font-weight: 400;
      }
    }
  `]
})
export class SearchBarComponent {}
