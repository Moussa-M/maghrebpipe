import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TranslateService  } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  
  constructor(private translateService:TranslateService) { }

  ngOnInit() {
  }

  getTranslateService(){
    return this.translateService;
  }

}
