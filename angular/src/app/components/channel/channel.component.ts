import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video/video.service';
import { UserService } from '../../services/user/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  public titulo: string = "Canal";
  public identity;
  public token;
  public videos;
  public errorMessage;
  public status;
  public url_image;
  public url;
  public loading;
  public pages;
  public pagePrev = 1;
  public pageNext = 1;
  public total_pages = 0;
  public user_channel;

  constructor(private _vs: VideoService,
              private _us: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loading = 'show';
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this.url_image = GLOBAL.url_image_video;
    this.url = GLOBAL.url_image_user;
    this.getChannelVideos();
  }

  getChannelVideos(){
    this.route.params.subscribe(
      params => {
        let user = params["user"];

        if(!user){
            user = this.identity.sub;
        }

        let page = +params["page"];

        if(!page){
          page = 1;
        }

        this.loading = 'show';

        this._vs.getChannel(user, page).subscribe(
          response => {
            this.status = response.status;
            if(this.status == "success"){
                this.videos = response.data.videos;
                this.user_channel = response.data.user;
                this.loading = 'hide';

                this.pages = [];
                this.total_pages = response.total_pages;

                for(let i = 0; i < response.total_pages; i++){
                  this.pages.push(i);
                }

                if(page >= 2){
                  this.pagePrev = (page - 1);
                } else {
                  this.pagePrev = page;
                }

                if(page < response.total_pages || page == 1){
                  this.pageNext = this.total_pages;
                } else {
                  this.pageNext = page;
                }
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
      }
    )
  }

}
