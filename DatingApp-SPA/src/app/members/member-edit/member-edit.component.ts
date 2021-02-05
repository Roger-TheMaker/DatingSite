import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', {static: true}) editForm: NgForm;

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit(): any {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }
  updateUser(): any {

   this.alertify.success('Profile updated succesfully');
   this.editForm.reset(this.user); // gets back the dirty form state
 }
}
