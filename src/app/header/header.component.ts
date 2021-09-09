import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  title: string = 'Savalo App'

  constructor(public authService:AuthService, private router: Router){}

  logout():void{    
    swal.fire('Logout', `Hola ${this.authService.usuario.username}, has cerrado sesión con éxito!`, 'success' );
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
