import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit{

  formLogin : FormGroup = new FormGroup({});
  errorSession:boolean = false;

  constructor(private authService : AuthService, private router:Router){}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('',[
        Validators.required, Validators.email
      ]),
      password: new FormControl('',[
        Validators.required, Validators.minLength(6), Validators.maxLength(12)
      ])
    });
  }

  sendLogin():void{
    const {email, password} = this.formLogin.value;

    this.authService.sendCredentials(email, password).subscribe(
      {
        
       next: () => {
        this.router.navigate(["/"]);
       },
       error: (err) => {
        console.log(err);
        this.errorSession = true;
        
       }
      }
    )
  }

}
