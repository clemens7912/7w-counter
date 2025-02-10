import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {

  active: {[key:string]: boolean} = {
    'login': true,
    'register': false
  };

  constructor(public activeModal: NgbActiveModal){}

  toggleActive(active:string){
    Object.keys(this.active).forEach((key) => {
      if(key == active){
        this.active[key] = true;
      }else{
        this.active[key] = false;
      }
    })
  }

}
