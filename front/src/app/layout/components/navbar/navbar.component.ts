import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../../../auth/components/login-modal/login-modal.component';
import { StorageService } from '../../../services/storage.service';
import { User } from '../../../shared/models/user';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LoginModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  loggedIn: boolean = false;
  user: User|undefined;

  constructor(private modalService: NgbModal,
              private storageService: StorageService,
              private authService: AuthService,
              private router: Router){}

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()){
      this.user = this.storageService.getUser();
      this.authService.checkSession().subscribe({
        next: () => {
          this.loggedIn = true;
        },
        error: (err) => {
          if(err.status == 403 || err.status == 401){
            this.storageService.clean();
            this.loggedIn = false;
            this.user = undefined;
          }
        }
      })
    }

    this.storageService.loggedInChange$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      if(this.loggedIn){
        this.user = this.storageService.getUser();
      }else{
        this.user = undefined;
      }
    });
  }

  openLoginModal(){
    this.modalService.open(LoginModalComponent, {size: 'lg', windowClass: 'modal-full-mobile'});
  }

  logout(){
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean();
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  home(){
    this.router.navigate(['/']);
  }

}
