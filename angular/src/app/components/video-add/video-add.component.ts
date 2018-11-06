import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video/video.service';
import { UserService } from '../../services/user/user.service';
import { UploadService } from '../../services/upload/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit {

  public titulo: string = "Crear un nuevo video";
  public video;
  public errorMessage;
  public status: string;
  public uploadedImage: boolean;
  public identity;
  
  constructor(private _vs: VideoService,
              private _us: UserService,
              private _ups: UploadService,
              private route: ActivatedRoute,
              private router: Router) {

    this.uploadedImage = false;

  }

  ngOnInit() {
    let identity = this._us.getIdentity();
    this.identity = identity;

    if(identity == null){
      this.router.navigate(["/index"]);
    } else {
      this.video = new Video(1, "", "", "public", "null", "null", null, null);
    }
  }

  callVideoStatus(value){
    this.video.status = value;
  }

  onSubmit(){
    let token = this._us.getToken();
    this._vs.create(token, this.video).subscribe(
      response => {
        this.status = response.status;

        if(this.status != "success"){
          this.status = "error";
        } else{
          this.video = response.data;
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

}
