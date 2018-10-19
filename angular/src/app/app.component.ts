import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public identity;
  public token;
  title = 'angular';

  constructor(private _us: UserService){
  }

  ngOnInit() {

    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
  }
}
