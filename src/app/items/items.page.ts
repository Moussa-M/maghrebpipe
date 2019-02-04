import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { Item } from '../models/item';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService, } from '../data.service';

import { PopoverController } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  all_items = []
  items = []
  scrollCPT = 0;
  slideMax = 5;
  name ="";
  constructor(private translateService: TranslateService,private route: ActivatedRoute,private router:Router,private service:DataService) { }

  ngOnInit() {
  	this.scrollCPT = 0;
     this.route.queryParams
      .subscribe(params => {
        this.name = params.name;
        this.initItems(this.name);
      });
  	

  }
  openItem(id){
  		this.router.navigate(["items/"+id],{queryParams:{name:this.name}});
  }

   loadItems(event) {
   	
      this.items.push(...this.all_items.slice(this.scrollCPT*this.slideMax,this.scrollCPT*this.slideMax+this.slideMax))
      event.target.complete();
      this.scrollCPT++;
      if (this.items.length >= this.all_items.length) {
        event.target.disabled = true;
      }
  }

  initItems(name:string) {
   	  this.service.getItems(name).subscribe((items) => {
   	  	this.all_items = items
   	  	 this.items.push(...this.all_items.slice(0,this.slideMax))
	      this.scrollCPT++;
	      if (this.items.length >= this.all_items.length) {
	        this.infiniteScroll.disabled = true;
	      }
   	  });
  }

  
}
