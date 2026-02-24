import { Component, inject, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../../core/services/profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { user } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './profile-page.component.html'
})
export class ProfileComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); 

  user: user | null = null;
  loading = true;
  savingProfile = false;
  deletingAccount = false;
  showDeleteConfirm = false;
  successMessage = '';
  errorMessage = '';

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName:  ['', [Validators.required, Validators.minLength(2)]],
    email:     ['', [Validators.required, Validators.email]],
    number:    [''],
    country:   ['']
  });

  get initials(): string {
    const f = this.user?.firstName?.[0] ?? '';
    const l = this.user?.lastName?.[0] ?? '';
    return (f + l).toUpperCase();
  }

ngOnInit(): void {
  const userStr = sessionStorage.getItem('user');
  console.log(' sessionStorage user:', userStr);  

  if (!userStr) {
    console.warn(' Pas de user en session, redirection login');
    this.loading = false; 
    this.router.navigate(['/login']);
    return;
  }

  const sessionUser = JSON.parse(userStr);
  const userId = sessionUser.id;
  console.log(' userId:', userId); 

  if (!userId) {
    this.errorMessage = 'Session invalide. Reconnectez-vous.';
    this.loading = false;
    return;
  }

  this.profileService.getUserById(userId).subscribe({
    next: (fullUser) => {
      console.log(' User chargé:', fullUser);
      this.user = fullUser;
      this.profileForm.patchValue({
        firstName: fullUser.firstName ?? '',
        lastName:  fullUser.lastName ?? '',
        email:     fullUser.email ?? '',
        number:    fullUser.number ?? '',
        country:   fullUser.country ?? ''
      });
      this.loading = false;
      this.cdr.detectChanges(); 
    },
    error: (err) => {
      console.error(' Erreur HTTP:', err.status, err.message);
      this.errorMessage = `Erreur ${err.status} : impossible de charger le profil.`;
      this.loading = false;
      this.cdr.detectChanges(); 
    }
  });
}

  onSaveProfile(): void {
    if (this.profileForm.invalid || !this.user) return;

    this.savingProfile = true;
    this.successMessage = '';
    this.errorMessage = '';

    const updated = { ...this.user, ...this.profileForm.getRawValue() };

    this.profileService.updateUser(this.user.id!, updated).subscribe({
      next: (savedUser) => {
        this.user = savedUser;
        this.savingProfile = false;
        this.successMessage = 'Profil mis à jour avec succès !';

        const sessionData = {
          id: savedUser.id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email
        };
        sessionStorage.setItem('user', JSON.stringify(sessionData));

        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.savingProfile = false;
        this.errorMessage = 'Erreur lors de la mise à jour.';
      }
    });
  }

  onDeleteAccount(): void {
    if (!this.user) return;

    this.deletingAccount = true;

    this.profileService.deleteUser(this.user.id!).subscribe({
      next: () => {
        this.authService.logout();
      },
      error: () => {
        this.deletingAccount = false;
        this.errorMessage = 'Erreur lors de la suppression du compte.';
      }
    });
  }
}