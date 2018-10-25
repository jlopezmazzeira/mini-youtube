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

  create(){}
  
  getCommentsOfVideo(){}
  
  delete(){}
  
}
