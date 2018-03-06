import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayComponent } from './play/play.component';
import { WinComponent } from './win/win.component';
import { WinnersComponent } from './winners/winners.component';
import { LoseComponent } from './lose/lose.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PlayComponent,
    WinComponent,
    WinnersComponent,
    LoseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
