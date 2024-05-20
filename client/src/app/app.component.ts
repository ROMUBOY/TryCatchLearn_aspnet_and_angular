import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';

  constructor(private http: HttpClient, private accountService : AccountService) {}
  users: any;
  
  ngOnInit() : void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("Request has completed")
    });
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user : User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
