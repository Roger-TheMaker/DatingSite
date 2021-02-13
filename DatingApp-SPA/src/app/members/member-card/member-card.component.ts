import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService,
              private alertify: AlertifyService ) { }

  ngOnInit(): any {
  }

  sendLike(id: number): any {
    this.userService.sendLike(this.authService.decodedToken.nameid, id)
    // decodedToken.nameid
    .subscribe(data => {
      this.alertify.success('You have liked  ' +  this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }
}
