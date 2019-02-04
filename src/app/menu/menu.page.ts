import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

import { PopoverController } from '@ionic/angular';
import { TranslateService,LangChangeEvent  } from '@ngx-translate/core';
import * as marked from 'marked';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('header') header; 
  menus = []
  name=""
  has_header=false
  constructor(private location : Location,private translateService:TranslateService,
    private popoverController: PopoverController,
    private route: ActivatedRoute,private router:Router,
    private dataService:DataService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.name = params.name;
        this.initMenu(this.name);
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
          this.dataService.getHeader(params.name).subscribe((header) => {
                  this.header.nativeElement.innerHTML = marked(header);
          });
        }); 
      });
  }
  go(menu){
    switch (menu.next) {
      case "items":
        setTimeout(()=>{
          this.router.navigate(['items'], { queryParams: { name:menu.name } });
        },0)
        break;
      case "page":
        setTimeout(()=>{
          this.router.navigate(['page'], { queryParams: { name:menu.name } });
        },0)
        break;
      case "menu":
        setTimeout(()=>{
          this.router.navigate(['menu',menu.name], { queryParams: { name:menu.name } });
        },0)
        break;
      
      default:
        // code...
        break;
    }
    
  }
  goBack(){
    console.log("tapped");
    this.location.back();
  }

  initMenu(name) {
    this.dataService.getMenu(name).subscribe(menus=>this.menus = menus)
    this.has_header = this.dataService.hasHeader(name)
    if(this.has_header){
      this.dataService.getHeader(name).subscribe(header=>this.header.nativeElement.innerHTML = marked(header))
    } 
  }
}
