import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NgIf, AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [CommonModule]
})
export class FooterComponent {
    route = inject(ActivatedRoute);
    private authService = inject(AuthService);
    
      isAuthenticated$ = this.authService.authState$;
      isMenuOpen = false;
}