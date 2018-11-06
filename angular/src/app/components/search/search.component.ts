import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { VideoService } from '../../services/video/video.service';
import { UserService } from '../../services/user/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public identity;
  public token;
  public titulo = "Busqueda";
  public videos;
  public errorMessage;
  public status;
  public url_image;
  public loading;
  public pages;
  public pagePrev = 1;
  public pageNext = 1;
  public total_pages = 0;
  public search_string: string;

  constructor(private _vs: VideoService,
              private _us: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loading = 'show';
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this.url_image = GLOBAL.url_image_video;
    this.getSearchVideos();
  }

  getSearchVideos(){
    this.route.params.subscribe(
      params => {
        let search = params["search"];

        if(!search || search.trim().length == 0){
          search = null;
          this.router.navigate(['/index']);
        }

        let page = +params["page"];

        if(!page){
          page = 1;
        }

        this.search_string = search;
        this.loading = 'show';

        this._vs.search(search, page).subscribe(
          response => {
            this.status = response.status;
            if(this.status == "success"){
                this.videos = response.data;
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
    );
  }
}
