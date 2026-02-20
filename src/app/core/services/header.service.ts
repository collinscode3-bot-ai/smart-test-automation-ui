import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Breadcrumb {
  label: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private pageTitleSubject = new BehaviorSubject<string>('');
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);

  pageTitle$ = this.pageTitleSubject.asObservable();
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  /**
   * Updates the header title and breadcrumbs.
   * @param title The new page title.
   * @param breadcrumbs The new breadcrumbs array.
   */
  setHeader(title: string, breadcrumbs: Breadcrumb[]): void {
    this.pageTitleSubject.next(title);
    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
