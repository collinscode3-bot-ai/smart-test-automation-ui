import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDashboardComponent } from './features/projects/project-dashboard/project-dashboard.component';
import { ProjectFormComponent } from './features/projects/project-form/project-form.component';
import { TestSuiteDashboardComponent } from './features/test-suites/test-suite-dashboard/test-suite-dashboard.component';
import { TestSuiteFormComponent } from './features/test-suites/test-suite-form/test-suite-form.component';
import { TestCaseFormComponent } from './features/test-suites/test-case-form/test-case-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectDashboardComponent
  },
  {
    path: 'projects/create',
    component: ProjectFormComponent
  },
  {
    path: 'projects/edit/:id',
    component: ProjectFormComponent
  },
  {
    path: 'test-suites',
    component: TestSuiteDashboardComponent
  },
  {
    path: 'test-suites/new',
    component: TestSuiteFormComponent
  },
  {
    path: 'test-suites/edit/:id',
    component: TestSuiteFormComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/new',
    component: TestCaseFormComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/edit/:id',
    component: TestCaseFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
