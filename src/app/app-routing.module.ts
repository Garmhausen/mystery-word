import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { PlayComponent } from './play/play.component';
import { WinComponent } from './win/win.component';
import { LoseComponent } from './lose/lose.component';
import { WinnersComponent } from './winners/winners.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'play',
    pathMatch: 'full',
    component: PlayComponent
  },
  {
    path: 'win',
    pathMatch: 'full',
    component: WinComponent
  },
  {
    path: 'lose',
    pathMatch: 'full',
    component: LoseComponent
  },
  {
    path: 'winners',
    pathMatch: 'full',
    component: WinnersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
