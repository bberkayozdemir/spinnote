import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  error: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    //if user already logged in skip to dashboard
    let logged = localStorage.getItem('loggedin')

    if (logged === "loggedin")
      this.router.navigate(["dashboard"])
    
  }

  //on login form submit
  onSubmit()
  {
    this.error = ""
    if (!this.username || !this.password) //login form validation
      this.error = "Kullanıcı adı ve şifre boş olamaz!"

    if (this.username === "admin" && this.password === "12345") //check login
    {
      //if login success set localStorage to loggedin and navigate to dashboard
      localStorage.setItem("loggedin", "loggedin")
      this.router.navigate(["dashboard"]);
    }else
      this.error = "Kullanıcı adı veya şifre yanlış!" //give error on failed auth

    
  }

}
