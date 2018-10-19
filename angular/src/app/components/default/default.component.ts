import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public identity;
  public token;
  public titulo = "Portada";

  constructor(private _us: UserService) { }

  ngOnInit() {
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
  }

}
