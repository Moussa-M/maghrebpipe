import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';
import * as marked from 'marked';
import { TranslateService,LangChangeEvent  } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';

import { ImageViewer } from 'ionic-native-image-viewer/ngx'


import * as $ from 'jquery';
declare var cordova: any;

@Component({
  selector: 'app-page',
  templateUrl: './page.page.html',
  styleUrls: ['./page.page.scss'],
})
export class PagePage implements OnInit {
	@ViewChild('content') content; 
	name="";
  constructor(private imageViewer:ImageViewer,private translateService:TranslateService,private modalController:ModalController,
    private route: ActivatedRoute,private dataService : DataService) {

  }

  ngOnInit() {
  		this.route.queryParams
      .subscribe(params => {
        this.name=params.name;
        this.dataService.getPage(params.name).subscribe((page) => {
        	this.content.nativeElement.innerHTML = marked(page);
         
        });

        //n case lang changed we change the text
           this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.dataService.getPage(params.name).subscribe((page) => {
          
                    this.content.nativeElement.innerHTML = marked(page);
                    
            });
          }); 
           
      });
     
      $('#content').on('click tap', 'img',(event)=>{
        //console.log(event.target);
        console.log(event.target.src);
        
        this.imageViewer.show(event.target.src);
        // console.log("Tick1");
        // window.navigator['imageview'].show(event.target.src);
      
        //this.fullScreenImage.showImageURL(event.target.src);
        //(<any>window).FullScreenImage.showImageURL(event.target.src);
        //this.openImage(event.target);
        //this.photoViewer.show(event.target.src)
      })
     
	}
  // async openImage(img) {
  //   const imageViewer = this.imageViewerCtrl.create(img);
  //   imageViewer.getImplementation();
  // }


  ngAfterViewInit(){

  }
	ngOnDestroy(){
    
		//this.translateService.onLangChange.unsubscribe();
	}
  }
