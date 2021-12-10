import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteComponent } from './components/note/note.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { AuthGuardService } from "./services/auth-guard.service";
import { LogoutComponent } from './components/logout/logout.component'

const appRoutes: Routes  = [
  {
    path:"",
    component: LoginComponent,
  },
  {
    path:"dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path:"dashboard/new",
    component: NewNoteComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path:"dashboard/edit/:id",
    component: EditNoteComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path:"logout",
    component: LogoutComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    NotesComponent,
    NoteComponent,
    NewNoteComponent,
    EditNoteComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
