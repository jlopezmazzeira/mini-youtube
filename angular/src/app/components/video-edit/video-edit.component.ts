import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video/video.service';
import { UserService } from '../../services/user/user.service';
import { UploadService } from '../../services/upload/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  public titulo: string = "Editar video";
  public video;
  public errorMessage;
  public status: string;

  constructor(private _vs: VideoService,
              private _us: UserService,
              private _ups: UploadService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){

  }
}
