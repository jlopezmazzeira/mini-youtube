import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public titulo: string = "Identificate";
  public user: User;
  public errorMessage;
  public identity;
  public token;

  constructor(private _ls: LoginService) { }

  ngOnInit() {
    this.user = new User("", "", false);

    let ide = this._ls.getIdentity();
    let tk = this._ls.getToken();

    console.log(ide);
    console.log(tk);
  }

  onSubmit(){
    this._ls.signup(this.user).subscribe(
      response => {
        let identity = response;
        this.identity = identity;
        if(identity.length <= 1){
          alert('Error en el servidor');
        } else {
          if(!identity.status){
            localStorage.setItem("identity", JSON.stringify(identity));
            this.user.gethash = true;
            this._ls.signup(this.user).subscribe(
              response => {
                let token = response;
                this.token = token;

                if(this.token.length <= 0) {
                  alert('Error en el servidor');
                } else {
                  if(!this.token.status){
                    localStorage.setItem("token", JSON.stringify(token));
                  }
                }

              },
              error => {
                this.errorMessage = <any>error;
                if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert('Error en la petición');
                }
              }
            );
          }
        }
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

}
