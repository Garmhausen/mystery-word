import { Component, OnInit } from '@angular/core';

import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoader: boolean;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
}
