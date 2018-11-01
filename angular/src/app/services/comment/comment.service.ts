import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../../models/comment';
import { GLOBAL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _http: Http) { }

  create(token: string, comment: Comment){
  	let json = comment;
    let params = JSON.stringify(json);
    params = "json="+params+"&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this._http.post(GLOBAL.url_comment+"new", params, {headers: headers})
                      .pipe(map(res => res.json()));
  }
  
  getCommentsOfVideo(video_id: number){
  	return this._http.post(GLOBAL.url_comment+"list/"+video_id)
                      .pipe(map(res => res.json()));
  }
  
  delete(token: string, comment_id: number){
  	params = "&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this._http.post(GLOBAL.url_comment+"delete/"+comment_id, params, {headers: headers})
                      .pipe(map(res => res.json()));
  }
  
}
