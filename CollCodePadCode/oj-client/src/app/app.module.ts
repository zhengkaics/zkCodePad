import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import {DataService} from "./services/data.service";
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import {routing} from "./app.routes";
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import {FormsModule} from "@angular/forms";
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import { ProfileComponent } from './components/profile/profile.component';
import {AuthGuardService} from "./services/auth-guard.service";
import { EditorComponent } from './components/editor/editor.component';
import {CollaborationService} from "./services/collaboration.service";
import { WhiteBoardComponent } from './components/white-board/white-board.component';
import {DrawPadService} from "./services/draw-pad.service";

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    ProfileComponent,
    EditorComponent,
    WhiteBoardComponent

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: "data",
    useClass: DataService
  },{
    provide: "auth",
    useClass: AuthService
  },{
    provide: "authGuard",
    useClass: AuthGuardService
  },{
    provide: "collaboration",
    useClass: CollaborationService
  },{
    provide: "drawPad",
    useClass: DrawPadService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
