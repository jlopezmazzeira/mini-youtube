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

  update(token: string, video: Video){
    let json = video;
    let params = JSON.stringify(json);
    params = "json="+params+"&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this._http.post(GLOBAL.url_video+"edit/"+video.id, params, {headers: headers})
                      .pipe(map(res => res.json()));
  }

  getVideo(id: number){
    return this._http.get(GLOBAL.url_video+"detail/"+id)
                      .pipe(map(res => res.json()));
  }

  getLastsVideos(){
  return this._http.get(GLOBAL.url_video+"lasts-videos")
                      .pipe(map(res => res.json()));
  }

  getVideos(page = null){
    if(page == null){
      page = 1;
    }

    return this._http.get(GLOBAL.url_video+"list?page="+page)
                        .pipe(map(res => res.json()));
  }

  search(search = null, page = null){
    if(page == null){
      page = 1;
    }

    let http: any;

    if(search == null){
      http = this._http.get(GLOBAL.url_video+"search")
                          .pipe(map(res => res.json()));
    } else {
      http = this._http.get(GLOBAL.url_video+"search/"+search+"?page="+page)
                          .pipe(map(res => res.json()));
    }

    return http;

  }

  getChannel(user, page = null){
    if(page == null){
      page = 1;
    }

    return this._http.get(GLOBAL.url_user+"channel/"+user+"?page="+page)
                        .pipe(map(res => res.json()));
  }

}
