import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public identity;
  public token;
  title = 'angular';

  constructor(private _ls: LoginService){
  }

  ngOnInit() {

    this.identity = this._ls.getIdentity();
    this.token = this._ls.getToken();
  }
}
