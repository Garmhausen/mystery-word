import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

// custom ngrx
import { reducers, metaReducers } from './shared/reducers';
import { CustomRouterStateSerializer } from './shared/utils';

// services
import { GameService } from './game.service';
import { Utils } from './shared/utils';

// components
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
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    GameService,
    Utils,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
