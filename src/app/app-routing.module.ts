import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDashboardComponent } from './features/projects/project-dashboard/project-dashboard.component';
import { ProjectFormComponent } from './features/projects/project-form/project-form.component';
import { TestSuiteDashboardComponent } from './features/test-suites/test-suite-dashboard/test-suite-dashboard.component';
import { TestSuiteFormComponent } from './features/test-suites/test-suite-form/test-suite-form.component';
import { TestCaseFormComponent } from './features/test-suites/test-case-form/test-case-form.component';
import { ContractRegistrationComponent } from './features/projects/contract-registration/contract-registration.component';
import { ContractPropertiesComponent } from './features/projects/contract-properties/contract-properties.component';
import { TestDataManagementComponent } from './features/test-suites/test-data-management/test-data-management.component';
import { VerificationsComponent } from './features/test-suites/verifications/verifications.component';
import { VerificationPayloadComponent } from './features/test-suites/verifications/verification-payload/verification-payload.component';
import { VerificationDetailsComponent } from './features/test-suites/verifications/verification-details/verification-details.component';
import { ValidationsComponent } from './features/test-suites/validations/validations.component';
import { TestSuiteExecutionSummaryComponent } from './features/executions/test-suite-execution-summary/test-suite-execution-summary.component';

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
    path: 'contracts/new',
    component: ContractRegistrationComponent
  },
  {
    path: 'contracts/edit/:id',
    component: ContractRegistrationComponent
  },
  {
    path: 'contracts/properties',
    component: ContractPropertiesComponent
  },
  {
    path: 'contracts/:contractId/properties',
    component: ContractPropertiesComponent
  },
  {
    path: 'contracts/:contractId/properties/:id',
    component: ContractPropertiesComponent
  },
  {
    path: 'contracts/payload',
    component: VerificationPayloadComponent
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
  },
  {
    path: 'test-suites/:suiteId/test-cases/:caseId/test-data/new',
    component: TestDataManagementComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/:caseId/test-data/edit/:id',
    component: TestDataManagementComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/:caseId/verifications/manage',
    component: VerificationsComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/:caseId/verifications',
    component: VerificationsComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/:caseId/verifications/payload',
    component: VerificationPayloadComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/:caseId/verifications/details/new',
    component: VerificationDetailsComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/:caseId/verifications/details/edit/:id',
    component: VerificationDetailsComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/:caseId/verifications/validations/new',
    component: ValidationsComponent
  },
  {
    path: 'test-suites/:suiteId/test-cases/:caseId/verifications/validations/edit/:id',
    component: ValidationsComponent
  },
  {
    path: 'executions/:id',
    component: TestSuiteExecutionSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
