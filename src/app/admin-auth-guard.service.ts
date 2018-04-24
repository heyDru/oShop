import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuardService implements CanActivate {


  constructor(private auth: AuthService) { }
  canActivate() {
    return this.auth.appUser$      
      .map(appUser => appUser.isAdmin);
  }
}
