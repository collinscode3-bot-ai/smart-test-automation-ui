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
  private descriptionSubject = new BehaviorSubject<string>('');

  pageTitle$ = this.pageTitleSubject.asObservable();
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();
  description$ = this.descriptionSubject.asObservable();

  /**
   * Updates the header title, breadcrumbs and description.
   * @param title The new page title.
   * @param breadcrumbs The new breadcrumbs array.
   * @param description The new description text.
   */
  setHeader(title: string, breadcrumbs: Breadcrumb[], description: string = ''): void {
    this.pageTitleSubject.next(title);
    this.breadcrumbsSubject.next(breadcrumbs);
    this.descriptionSubject.next(description);
  }
}
