import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  menus = []
  constructor(private translateService: TranslateService, private popoverController: PopoverController,
    private route: ActivatedRoute, private router: Router,
    private service: DataService) { }

  ngOnInit() {
    this.service.getMenu('home').subscribe(menus => this.menus = menus)
  }

  go(menu) {
    switch (menu.next) {
      case "items":
        setTimeout(() => {
          this.router.navigate(['items'], { queryParams: { name: menu.name } });
        }, 250)
        break;
      case "page":
        setTimeout(() => {
          this.router.navigate(['page'], { queryParams: { name: menu.name } });
        }, 250)
        break;
      case "menu":
        setTimeout(() => {
          this.router.navigate(['menu',menu.name], { queryParams: { name: menu.name } });
        }, 250)
        break;

      default:
        // code...
        break;
    }

  }
  ngAfterViewInit(){
    history.pushState(null, null, window.location.pathname);
  }

}
