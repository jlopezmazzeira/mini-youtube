import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video/video.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private _vs: VideoService,
              private _us: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

}
