import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="nav-brand">
        <span class="brand-text">Projects</span>
        <div class="brand-underline"></div>
      </div>
      <div class="header-actions">
        <button class="icon-btn notification-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>
        <div class="user-avatar">
          <img src="https://ui-avatars.com/api/?name=User&background=FFD5AD&color=1A1A1A" alt="User Avatar">
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      height: 64px;
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
    }
    .nav-brand {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      cursor: pointer;
      height: 100%;
      justify-content: center;
    }
    .brand-text {
      font-weight: 700;
      font-size: 16px;
      color: var(--link-color);
    }
    .brand-underline {
      width: 100%;
      height: 3px;
      background-color: var(--link-color);
      border-radius: 2px 2px 0 0;
      position: absolute;
      bottom: 0;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .icon-btn {
      background: none;
      color: var(--link-color);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 50%;
      transition: background 0.2s;
      &:hover {
        background: rgba(79, 70, 229, 0.05);
      }
    }
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid var(--border-color);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  `]
})
export class HeaderComponent {}
