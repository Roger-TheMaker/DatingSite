import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): any {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };
    this.createRegisterForm();
  }

  createRegisterForm(): any {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup): any { // custom validator
    // tslint:disable-next-line:object-literal-key-quotes
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register(): any {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      // clones the values into an empty object
      this.authService.register(this.user).subscribe(() => {
      this.alertify.success('Registration successful');
        }, error => {
         this.alertify.error(error);
        }, () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        });
     }
  }

  cancel(): void{
    this.cancelRegister.emit(false);
  }
}
