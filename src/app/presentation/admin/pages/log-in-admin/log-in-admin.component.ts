import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '@app/infraestructure/driven-adapter/user-api-service';
import { UserLoginRequestInterface } from '@app/domain/models/user-login-request.interface';
import { UserLoginResponseInterface } from '@app/domain/models/user-login-response.interface';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in-admin.component.html',
  styleUrls: ['./log-in-admin.component.scss'],
  providers: [Router]
})
export class LogInAdminComponent {
  constructor(private router: Router, private userApiService: UserApiService) {}

  @Output() event = new EventEmitter<boolean>();
  
  userLoginResponseInterface: UserLoginResponseInterface = {
    email: '',
    username: '',
    token: ''
  };
  
  userLoginRequestInterface: UserLoginRequestInterface = {
    email: '',
    password: ''
  };

  login() {
    this.userApiService.userLogin(this.userLoginRequestInterface).subscribe((loginResponse: any) => {
      this.userLoginResponseInterface = loginResponse.data;
      console.log(loginResponse)
      if (loginResponse.isSuccess) {
        console.log("login", this.userLoginResponseInterface.token);
        localStorage.setItem('token', this.userLoginResponseInterface.token);
        localStorage.setItem('email', this.userLoginResponseInterface.email);
        localStorage.setItem('username', this.userLoginResponseInterface.username);
        const successAlert = document.getElementById('success-alert');
        successAlert!.style.display = 'block';
        setTimeout(() => {
          successAlert!.style.display = 'none';
        }, 5000);
        this.router.navigate(['dashboard']);
      } else {
        const errorAlert = document.getElementById('error-alert');
        errorAlert!.style.display = 'block';
        setTimeout(() => {
          errorAlert!.style.display = 'none';
        }, 5000);
      }
    });
  }
}
