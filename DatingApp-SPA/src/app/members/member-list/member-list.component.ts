import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
 users: User[];

  constructor(private userService: UserService, private alerify: AlertifyService) { }

  ngOnInit(): any{
    this.loadUsers();
  }

  loadUsers(): any {
    this.userService.getUsers().subscribe( (users: User[]) => {
      this.users = users;
    }, error => {
      this.alerify.error(error);
    });
  }
}
