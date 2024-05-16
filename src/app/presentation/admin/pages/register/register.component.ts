import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '@app/infraestructure/driven-adapter/user-api-service';
import { UserInterface } from '@app/domain/models/user.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  
  constructor(private router: Router, 
    private userApiService: UserApiService,
    ){}
  ngOnInit() {
  }
  passwordConfirmed: string = '';
  userInterface: UserInterface = {
    username: '',
    email: '',
    password: '',
  };
  
  register(){
    console.log(this.userInterface, )
    this.userApiService.register(this.userInterface).subscribe(() => {
      this.router.navigate(['/user/login']);
    });  
  }

  changeToLogin(){
    this.router.navigate(['/login']);
  }
  
}
