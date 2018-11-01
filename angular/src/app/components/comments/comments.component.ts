import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Comment } from '../../models/comment';
import { UserService } from '../../services/user/user.service';
import { CommentService } from '../../services/comment/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
	
	public tituloe:string = "Comentarios";
	public comment: Comment;
	public identity;
	public errorMessage;
	public status;
	public statusComment;
	public commentList;
	public loading = 'show';

	constructor(private _us: UserService,
  				private _cs: CommentService,
              private route: ActivatedRoute,
              private router: Router) { }

  	ngOnInit() {
  		this.identity = this._us.getIdentity();
  		this.route.params.subscribe(
  			params => {
  				let id = +params["id"];

  				this.comment = new Comment(id, "");
  			}

  			this.getComments(id);
  		);
  	}

  	onSubmit(){
  		this.loading = 'show';
  		let token = this._us.getToken();

  		this._cs.create(token, this.comment).subscribe(
  			response => {
  				this.status = response.status;
  				if(!this.status != 'success'){
  					this.status = 'error';
  				} else {
  					this.comment.body = "";
  					this.getComments(this.comment.video_id);
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

  	getComments(video_id: number){
  		this.loading = 'show';
  		this._cs.getCommmentsOfVideo(video_id).subscribe(
  			response => {
  				this.statusComments = response.status;
  				if(!this.statusComments != 'success'){
  					this.statusComments = 'error';
  				} else {
  					this.commentList = response.data;
  				}
  			},
  			error => {
  				this.errorMessage = <any>error;
	          	if(this.errorMessage != null){
	            	console.log(this.errorMessage);
	            	alert('Error en la petición');
	          	}
  			}
  			this.loading = 'hide';
  		);
  	}

  	deleteComment(id: number){
  		let comment_panel = <HTMLElement>document.querySelector(".comment-panel-"+id);

  		if(comment_panel != null){
  			comment_panel.style.display = "none";
  		}
  		let token = this._us.getToken();

  		this._cs.delete(token, id).subscribe(
  			response => {
  				this.statusComments = response.status;
  				if(!this.statusComments != 'success'){
  					this.statusComments = 'error';
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

}
