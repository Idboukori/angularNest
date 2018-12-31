import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "./users.service";
import { CreateUserDto } from "./create-user.dto";
import {HttpClientModule, HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];
  userDto: CreateUserDto;
  constructor(private usersService: UsersService, private http:HttpClient) { }
  
  addUserForm = new FormGroup({
    n: new FormControl('', [Validators.required, Validators.minLength(6)]),
    e: new FormControl('', [Validators.required, Validators.email]),
  })

  ngOnInit() {
    this.getUsers();
  }

  private addUser() {
    this.http.post('http://localhost:5000/users', {
      name: this.addUserForm.get("n").value,
      email: this.addUserForm.get("e").value
    }).subscribe((res) => {
      console.log(res);
      this.getUsers();
    });
  }
  
  onSubmit() {
    this.addUser();
  }

  private getUsers() {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }
}
