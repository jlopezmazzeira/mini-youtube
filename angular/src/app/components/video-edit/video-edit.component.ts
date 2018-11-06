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
  public uploadedImage: boolean;
  public url: string = null;
  public status_get_video;
  public changeUpload;
  public identity;
  public loading;

  constructor(private _vs: VideoService,
              private _us: UserService,
              private _ups: UploadService,
              private route: ActivatedRoute,
              private router: Router) {

    this.uploadedImage = false;
  }

  ngOnInit() {
    this.loading = 'show';
    this.identity = this._us.getIdentity();
    this.video = new Video(1, "", "", "public", "null", "null", null, null);
    this.getVideo();
  }

  callVideoStatus(value){
    this.video.status = value;
  }

  onSubmit(){
    this.route.params.subscribe(params => {
      let id = +params["id"];

      let token = this._us.getToken();
      this._vs.update(token, this.video).subscribe(
        response => {
          this.status = response.status;

          if(this.status != "success"){
            this.status = "error";
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

  getVideo(){
    this.route.params.subscribe(params => {
      let id = +params["id"];

      this.loading = 'show';
      this._vs.getVideo(id).subscribe(
        response => {
          this.video = response.data;
          this.status_get_video = response.status;

          if(this.status_get_video != "success"){
              this.router.navigate(['/index']);
          }

          if(!this.identity || this.identity == null || this.identity.sub != this.video.user.id){
            this.router.navigate(['/index']);
          }
          
          this.url = GLOBAL.url_image_video+this.video.id+"/";
          this.loading = 'hide';
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

  public fileToUpload: Array<File>;
  public resultUpload;

  fileChangeEventImage(fileInput: any){
    this.fileToUpload = <Array<File>>fileInput.target.files;

    let token = this._us.getToken();
    let url = GLOBAL.url_video+"upload-image/"+this.video.id;
    this._ups.makeFileRequest(token, url, ['image'], this.fileToUpload).then(
      (result) => {
        this.resultUpload = result;
        //this.video.image = this.resultUpload.filename;
        //console.log(this.resultUpload);
      },
      (error) => {
          console.log(error);
      }
    )
  }

  nextUploadVideo(){
    this.uploadedImage = true;
  }

  fileChangeEventVideo(fileInput: any){
    this.fileToUpload = <Array<File>>fileInput.target.files;

    let token = this._us.getToken();
    let url = GLOBAL.url_video+"upload-video/"+this.video.id;
    this._ups.makeFileRequest(token, url, ['video'], this.fileToUpload).then(
      (result) => {
        this.resultUpload = result;
        //this.video.image = this.resultUpload.filename;
        //console.log(this.resultUpload);
      },
      (error) => {
          console.log(error);
      }
    )
  }

  redirectToVideo(){
    this.router.navigate(['/video', this.video.id]);

  }

  setChangeUpload(value:string){
    this.changeUpload = value
  }

}
