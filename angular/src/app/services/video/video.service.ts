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

  create(){}
  
  update(){}
  
  getVideo(){}
  
  getLastsVideos(){}
  
  getVideos(){}
  
  search(){}
  
  getChannel(){}
  
}
