import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { VideoAddComponent } from './components/video-add/video-add.component';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ChannelComponent } from './components/channel/channel.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'index', component: DefaultComponent },
  { path: 'index/:page', component: DefaultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-edit', component: EditUserComponent },
  { path: 'create-video', component: VideoAddComponent },
  { path: 'edit-video/:id', component: VideoEditComponent },
  { path: 'video/:id', component: VideoDetailComponent },
  { path: 'channel', component: ChannelComponent },
  { path: 'channel/:user', component: ChannelComponent },
  { path: 'channel/:user/:page', component: ChannelComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:search', component: SearchComponent },
  { path: 'search/:search/:page', component: SearchComponent },
  { path: '**', component: DefaultComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
