import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any = null;
  public logged: boolean =  null;
  
  constructor() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  login(user:string, userC:string, password:string, passwordC:string, id) {
     if (user === userC && password === passwordC){
       console.log(user,userC, password, passwordC  );
      localStorage.setItem('user', JSON.stringify({
        user, password, id
      }));
      this.logged = true;
      this.user = {
        user, password, id
      }
      return true;
     }else{
       return false;
     }
  }


  geUserLogin() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      return this.user;
    }else{
      return null;
    }
  }

  logout() {
    this.logged = false;
    localStorage.removeItem('user');
  }

}

