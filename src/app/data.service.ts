import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Item } from './models/item';
import { Menu } from './models/menu';
import { HttpClient } from '@angular/common/http';
import { TranslateService  } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class DataService{

    constructor(private translateService: TranslateService,private http:HttpClient){

    }

    
    menus = {
        'home': [
            new Menu('introduction', 'ios-book', 'page'),
            new Menu('technology', 'ios-book', 'page'),
            new Menu('products', 'ios-arrow-dropright', 'menu'),
            new Menu('grp_features', 'ios-book', 'page'),
            new Menu('use_cases', 'ios-arrow-dropright', 'page'),
            new Menu('perfect_water_control', 'ios-book', 'page'),
            new Menu('pipe_transport_storage', 'ios-arrow-dropright', 'menu'),
            new Menu('pipe_installation', 'ios-arrow-dropright', 'menu'),
            new Menu('hydrostatic_test', 'ios-book', 'page'),
            new Menu('tech_terms', 'ios-book', 'page'),
        ],
        'products':[
            new Menu('pipes', 'ios-book', 'page'),
            new Menu('installation_parts_pipes_accessories', 'ios-book', 'page'),
        ],
        'pipe_transport_storage': [
            new Menu('inspection', 'ios-book', 'page'),
            new Menu('repair', 'ios-book', 'page'),
            new Menu('from_truck_dropping', 'ios-book', 'page'),
            new Menu('pipe_laying_methode', 'ios-book', 'page'),
            new Menu('pipe_group_laying_methode', 'ios-book', 'page'),
            new Menu('work_place_storage', 'ios-book', 'page'),
            new Menu('support_cyrcle_grease_storage', 'ios-book', 'page'),
            new Menu('pipe_transport', 'ios-book', 'page'),
        ],
        'pipe_installation':[
            new Menu('trench_digging', 'ios-book', 'page'),
            new Menu('place_pipe_inside_trench', 'ios-book', 'page'),
            new Menu('installation_process', 'ios-book', 'page'),
            new Menu('landfill_process', 'ios-book', 'page'),
            new Menu('installation_support', 'ios-book', 'page')
        ]
    }
    
    items = {
        'products': [
            new Item(1, 'pipes', 'Windstorm', 'Aute excepteur dolore ut consequat ullamco eu eu cupidatat esse in consectetur dolore.', '/assets/images/products/pipes.jpg'),
            new Item(2, 'tanks', 'Bombasto', 'Consequat in consectetur et nulla nostrud cillum do cupidatat commodo do ut officia.', '/assets/images/products/tanks.jpg'),
            new Item(3, 'raccords_moules', 'Magneta', 'Dolor esse proident in dolore nostrud id consectetur ea sed.', '/assets/images/products/raccords_moules.jpg'),
            new Item(3, 'raccords_special_pieces', 'Magneta', 'Dolor esse proident in dolore nostrud id consectetur ea sed.', '/assets/images/products/raccords_special_pieces.jpg'),
            new Item(4, 'raccords_boiler', 'Tornado', 'Sed ut eiusmod enim elit dolore amet incididunt elit eiusmod nulla.', '/assets/images/products/raccords_boiler.jpg'),
           
        ],
    }

    headers = [
        'products',
    ]

    footers = {
        
    }
    
    getItems(type): Observable < Item[] > {
        return of(this.items[type]);
    }
    getItem(id, type): Observable < Item > {
        return of(this.items[type].find(p => p.id === id));
    }

    getPage(name): Observable <string> {
        return this.http.get(`/assets/pages/${name}-${this.translateService.currentLang}.md`,{responseType: 'text'});
    }
    getMenu(name): Observable < Menu[] > {
        return of(this.menus[name]);
    }

    hasHeader(name:string){
        return this.headers.indexOf(name) != -1 ? true:false
    }
    getHeader(name:string){
        return this.http.get(`/assets/headers/${name}-${this.translateService.currentLang}.md`,{responseType: 'text'});
    }
   
}