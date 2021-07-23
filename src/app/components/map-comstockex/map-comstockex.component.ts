import { Component, OnInit } from '@angular/core';

import {MapComStockex} from '../../models/MapComStockex';
import {MapComStockexService} from '../../services/map-comstockex.service';

@Component({
    selector: 'app-map-comstockex',
    templateUrl: './map-comstockex.component.html',
    styleUrls: ['./map-comstockex.component.css']
})

export class MapComStockexComponent implements OnInit {

    mapComStockex: MapComStockex = {
      companyCode: '',
      companyName: '',
      stockExchangeName: ''
    };
  
    constructor(private mapComStockexService: MapComStockexService) { }
  
    ngOnInit(): void {
    }
  
    onSubmit({value, valid}: {value: MapComStockex, valid: boolean}) {
      if(!valid) {
        
      }
      else{
        this.mapComStockexService.addMapComStockex(value); 
      }
    }
  }

 