import { Component, OnInit } from '@angular/core';
import { StockPrice } from 'src/app/models/StockPrice';


import { StockPriceService } from '../../services/stock-price.service';

@Component({
  selector: 'app-stock-prices',
  templateUrl: './stock-prices.component.html',
  styleUrls: ['./stock-prices.component.css']
})
export class StockPricesComponent implements OnInit {

  stockPrices: StockPrice[];

  constructor(private stockpricesService: StockPriceService) { }

  ngOnInit(): void {
    this.stockpricesService.getStockPrices()
      .subscribe(response => {
        this.stockPrices = response;
      });
  }

 

  
}