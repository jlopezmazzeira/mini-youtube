import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public identity;
  public token;
  public titulo = "Portada";

  constructor(private _ls: LoginService) { }

  ngOnInit() {
    this.identity = this._ls.getIdentity();
    this.token = this._ls.getToken();
  }

}