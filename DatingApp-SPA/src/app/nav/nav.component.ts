import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): any {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in succesfully');
    }, error => {
      console.log('Failed to login');
    });
  }
  loggedIn(): any{
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void{
    localStorage.removeItem('token');
    console.log('logged out ');
  }
}
