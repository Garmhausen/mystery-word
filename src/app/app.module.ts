import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// env
import { environment } from '../environments/environment';

// routes
import { AppRoutingModule } from './app-routing.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// custom ngrx
import { reducers, metaReducers } from './shared/reducers';
import { CustomRouterStateSerializer } from './shared/utils';

// services
import { GameService } from './game.service';
import { Utils } from './shared/utils';
import { LoadingService } from './loading.service';

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
    LoadingService,
    Utils,
    {
      provide:  RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
