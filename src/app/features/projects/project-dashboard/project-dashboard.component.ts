import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { HeaderService } from '../../../core/services/header.service';
import { Project } from '../../../core/models/project.model';
import { BehaviorSubject, Observable, combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, takeUntil } from 'rxjs/operators';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit, OnDestroy {
  private searchTerm$ = new BehaviorSubject<string>('');
  private currentPage$ = new BehaviorSubject<number>(1);
  private destroy$ = new Subject<void>();

  projects$: Observable<Project[]>;
  loading = false;
  currentPage = 1;

  searchControl = new FormControl('');

  constructor(
    private projectService: ProjectService,
    private headerService: HeaderService,
    private router: Router
  ) {
    this.projects$ = combineLatest([
      this.searchTerm$.pipe(distinctUntilChanged()),
      this.currentPage$
    ]).pipe(
      tap(() => this.loading = true),
      switchMap(([term, page]) => this.projectService.getProjects(page, term)),
      tap(() => this.loading = false)
    );
  }

  ngOnInit(): void {
    this.headerService.setHeader(
      'Project Details',
      [{ label: 'Projects', route: '/projects' }],
      'Manage and monitor your existing projects.'
    );

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.searchTerm$.next(value || '');
      this.currentPage = 1;
      this.currentPage$.next(1); // Reset to first page on search
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.currentPage$.next(page);
  }

  onCreateProject(): void {
    this.projectService.selectProject(null);
    this.router.navigate(['/projects/create']);
  }

  onEditProject(project: Project): void {
    this.projectService.selectProject(project);
    this.router.navigate(['/projects/edit', project.id]);
  }

  onDeleteProject(project: Project): void {
    // TODO: API Call - Delete project
    console.log('Deleting project:', project.id);
  }
}
