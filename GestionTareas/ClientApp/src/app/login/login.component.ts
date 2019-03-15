import { Component, OnInit } from '@angular/core';
import { AppAuthNService } from '../app-auth-n.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ],
  providers: [AppAuthNService]
})
export class LoginComponent {
  
  constructor(public authn: AppAuthNService) {
  }

  redireccionar(): void {
    this.authn.login();
  }
}
