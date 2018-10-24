import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { appRoutingProviders, routing} from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { CommentComponent } from './components/comment/comment.component';
import { VideoAddComponent } from './components/video-add/video-add.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

import { UserService} from './services/user/user.service';
import { UploadService} from './services/upload/upload.service';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { SearchComponent } from './components/search/search.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ChannelComponent } from './components/channel/channel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    CommentComponent,
    VideoAddComponent,
    VideoDetailComponent,
    EditUserComponent,
    VideoEditComponent,
    SearchComponent,
    CommentsComponent,
    ChannelComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule
  ],
  providers: [
    UserService,
    UploadService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
