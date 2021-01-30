import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit(): void{
    const token = localStorage.getItem('token');
    if (token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      // we are doing this to persist the token, so the username
      // from the navbar
      // grija cand pui token in (), sa nu dea dracu sa il pui intre ''
    }
  }
}
