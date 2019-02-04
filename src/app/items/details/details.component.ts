import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../data.service';
import { Item } from '../../models/item';

import { PopoverController } from '@ionic/angular';
import { TranslateService  } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  item:Item;
  constructor(private translateService:TranslateService,
    private popoverController: PopoverController,
    private route: ActivatedRoute,private service : DataService) {}

  ngOnInit() {
  	let id = parseInt(this.route.snapshot.paramMap.get('id'));
  	this.route.queryParams
      .subscribe(params => {
        this.service.getItem(id,params.name).subscribe(item => this.item=item);
      });    
	}
  
}
