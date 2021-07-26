import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

import { Comparison } from '../../models/Comparison';
import { StockPriceService } from '../../services/stock-price.service';

@Component({
  selector: 'app-comparison-charts',
  templateUrl: './comparison-charts.component.html',
  styleUrls: ['./comparison-charts.component.css']
})
export class ComparisonChartsComponent implements OnInit {

  chart: any = [];
  //show: boolean = false;

  comparison: Comparison = {
    companyName: '',
    stockExchangeName: '',
    fromPeriod: '',
    toPeriod: '',
    periodicity: ''
  }

  constructor(private stockPriceService: StockPriceService, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  onSubmit({value, valid}: {value: Comparison, valid: boolean}) {
    if(!valid) {
      console.log("Error in chart values")
    }
    else {
      console.log(value);
      this.stockPriceService.getCompanyStockPrices(value)
        .subscribe(response => {
          console.log(response);
          let prices = response.map(res => res.currentPrice);
          let dates = response.map(res => res.date);
          console.log(prices);
          console.log(dates);
          //this.show = true;
          let htmlRef = this.elementRef.nativeElement.querySelector("#canvasId");
          console.log(htmlRef);
          this.chart = new Chart(htmlRef, {
            type: 'line',
            data: {
              labels: dates,
              datasets: [
                {
                  data: prices,
                  borderColor: "#3cba9f",
                  label: 'Price'
                },,
              ]
            },
            options: {
              legend: {
                display: false,
                position: 'top',
              },
              scales: {
                yAxes: [{
                  display: true
                }],
              }
            }
          });
          console.log(this.chart);
        });
    }
  }

}
