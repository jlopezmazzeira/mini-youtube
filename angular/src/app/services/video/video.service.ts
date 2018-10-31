import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Video } from '../../models/video';
import { GLOBAL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private _http: Http) { }

  create(token: string, video: Video){
    let json = video;
    let params = JSON.stringify(json);
    params = "json="+params+"&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this._http.post(GLOBAL.url_video+"new", params, {headers: headers})
                      .pipe(map(res => res.json()));
  }

  update(){}

  getVideo(id: number){
    return this._http.get(GLOBAL.url_video+"detail/"+id)
                      .pipe(map(res => res.json()));
  }

  getLastsVideos(){}

  getVideos(){}

  search(){}

  getChannel(){}

}
