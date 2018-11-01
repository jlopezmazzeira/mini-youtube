import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video/video.service';
import { UserService } from '../../services/user/user.service';
import { GLOBAL } from '../../services/global';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  public titulo:string = "Detalle del video";
  public errorMessage;
  public video;
  public status;
  public loading: string = 'show';
  public url: string = null;
  public lastsVideos;
  public statusLastsVideos;
  public identity;
   
  constructor(private _vs: VideoService,
              private _us: UserService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.identity = this._us.getIdentity();
    this.route.params.subscribe(params => {
      this.loading = "show";
      let id = +params["id"];

      this._vs.getVideo(id).subscribe(
        response => {
          this.video = response.data;
          this.status = response.status;

          if(this.status != "success"){
              this.router.navigate(['/index']);
          }

          this.loading = 'hide';
          this.url = GLOBAL.url_image_video+this.video.id+"/";
        },
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      );

      this._vs.getLastsVideos().subscribe(
        response => {
          this.lastsVideos = response.data;
          this.statusLastsVideos = response.status;

          if(this.statusLastsVideos != "success"){
              this.router.navigate(['/index']);
          }
        },
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      );
    });
  }

}
