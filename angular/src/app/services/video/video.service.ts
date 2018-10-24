import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private _http: Http) { }
}
