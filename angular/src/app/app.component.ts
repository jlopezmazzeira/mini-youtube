import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from './services/user/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public identity;
  public token;
  title = 'angular';
  public url = GLOBAL.url_image_user;
  public search_string: string;

  constructor(private _us: UserService,
              private route: ActivatedRoute,
              private router: Router){
  }

  ngOnInit() {

    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
  }

  search(){
    if(this.search_string != null){
      this.router.navigate(['/search', this.search_string]);
    } else {
      this.router.navigate(['/index']);
    }
  }

}
