import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-\._$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  loginForm: FormGroup;
  alert = {
    'level': 'danger',
    'message': ''
  };

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private storageService: StorageService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get username() {return this.loginForm.get('username')}
  get password() {return this.loginForm.get('password')}

  login(event: Event){
    event.preventDefault();
    this.authService.login(this.username?.value, this.password?.value).subscribe({
      next: (user) => {
        this.alert.level = 'success';
        this.alert.message = 'Logged in successfully';
        this.loginForm.reset();
        this.storageService.saveUser(user);
      },
      error: (err) => {
        this.alert.level = 'danger';
        this.alert.message = err.message;
      }
    })
  }
}
