import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { SharedModule } from '../../../shared/shared.module';
import { Project } from '../../../core/models/project.model';

/**
 * Interface definition for Project (for reference)
 *
 * export interface Project {
 *   id: number;
 *   title: string;
 *   description: string;
 *   iconType: 'folder' | 'globe' | 'rocket';
 *   status: string;
 * }
 */

/**
 * ProjectFormComponent handles both creation and editing of projects.
 * It uses a reactive form for data entry and interacts with ProjectService.
 */
@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isEditMode = false;
  projectId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.isEditMode = true;
      this.loadProjectDetails(this.projectId);
    }
  }

  /**
   * Initializes the reactive form with projectName and projectDescription.
   */
  private initForm(): void {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required]],
      projectDescription: ['']
    });
  }

  /**
   * Fetches project details from the service for editing.
   * @param id The project ID to load.
   */
  private loadProjectDetails(id: string): void {
    // Placeholder for Observable API call
    console.log(`Fetching project details for ID: ${id}`);

    // TODO: Replace with actual service call:
    // this.projectService.getProjectById(id).subscribe(project => {
    //   this.projectForm.patchValue({
    //     projectName: project.title,
    //     projectDescription: project.description
    //   });
    // });

    // For now, we simulate a fetch if the project is already selected in the service
    this.projectService.selectedProject$.subscribe(project => {
      if (project && project.id.toString() === id) {
        this.projectForm.patchValue({
          projectName: project.title,
          projectDescription: project.description
        });
      }
    });
  }

  /**
   * Handles form submission for both create and update.
   */
  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    const formData = this.projectForm.value;
    const projectData = {
      title: formData.projectName,
      description: formData.projectDescription
    };

    if (this.isEditMode && this.projectId) {
      console.log('Updating project:', this.projectId, projectData);
      // TODO: this.projectService.update(this.projectId, projectData)
      //   .subscribe(() => this.router.navigate(['/dashboard']));

      // Simulating successful save
      this.router.navigate(['/test-suites']);
    } else {
      console.log('Creating new project:', projectData);
      // TODO: this.projectService.create(projectData)
      //   .subscribe(() => this.router.navigate(['/dashboard']));

      // Simulating successful save
      this.router.navigate(['/test-suites']);
    }
  }

  /**
   * Navigates back to the dashboard.
   */
  onCancel(): void {
    this.router.navigate(['/projects']);
  }
}
