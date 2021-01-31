import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-detailed',
  templateUrl: './member-detailed.component.html',
  styleUrls: ['./member-detailed.component.scss']
})
export class MemberDetailedComponent implements OnInit {
  user: User;
  alertify: any;

  constructor(private userService: UserService, private alertofy: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit(): any {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }


//   loadUser(): any{

//     this.userService.getUser(+this.route.snapshot.params.id)
//     .subscribe((user: User) => {
//       this.user = user;
//     }, error => {
//       this.alertify.error(error);
//     });
//   }
  }
