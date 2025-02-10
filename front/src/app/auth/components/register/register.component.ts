import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-\._$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  registerForm: FormGroup;
  alert = {
    'level': 'error',
    'message': ''
  };

  constructor(private fb: FormBuilder,
              private authService: AuthService){}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
        passwordRepeat: ['', [Validators.required]]
      }, {validator: this.validateEqualPassword} as AbstractControlOptions);
  }

  get username() {return this.registerForm.get('username');}
  get email() {return this.registerForm.get('email');}
  get password() {return this.registerForm.get('password')}
  get passwordRepeat() {return this.registerForm.get('passwordRepeat')}

  validateEqualPassword(control: AbstractControl): ValidationErrors | null {
    const error = (control.get('password')?.value != control.get('passwordRepeat')?.value) ?
      {notEqual: true} : null;

    let fieldError = null;
    if(error || control.get('passwordRepeat')?.errors){
      fieldError = {...error, ...control.get('passwordRepeat')?.errors};
    }

    control.get('passwordRepeat')?.setErrors(fieldError);
    return error;
  }

  register(event: Event){
    event.preventDefault();
    console.log({
      username: this.username?.value,
      email: this.email?.value,
      password: this.password?.value
    });

    this.authService.register(this.username?.value, this.email?.value, this.password?.value).subscribe({
      next: (data) => {
        this.alert.level = 'success';
        this.alert.message = 'User registered successfully';
        this.registerForm.reset();
      },
      error: (err) => {
        this.alert.level = 'danger';
        this.alert.message = err.message;
      }
    })
  }

}
