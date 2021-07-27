import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { StockPrice } from 'src/app/models/StockPrice';
import { Comparison } from '../../models/Comparison';
import { StockPriceService } from '../../services/stock-price.service';

@Component({
  selector: 'app-comparison-charts',
  templateUrl: './comparison-charts.component.html',
  styleUrls: ['./comparison-charts.component.css']
})
export class ComparisonChartsComponent implements OnInit {

  chart: any = [];

  comparison: Comparison = {
    companyName: '',
    stockExchangeName: '',
    fromPeriod: '',
    toPeriod: '',
    periodicity: ''
  }
  stockprices: StockPrice[];

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
        .subscribe((response) => {
          console.log(response);
          let prices = response.map((res) => res.currentPrice);
          let dates = response.map((res) => res.date);
          let times = response.map((res)=> res.time);
          console.log(prices);
          console.log(dates);
          //this.show = true;
          let htmlRef = this.elementRef.nativeElement.querySelector("#canvasId");
          console.log(htmlRef);
          this.chart = new Chart(htmlRef, {
            type: 'line',
            data: {
              labels: times,
              datasets: [
                {
                  label: 'Price',
                  backgroundColor: 'rgba(0, 129, 214, 0.8)',
                  data: prices,
                  fill: false,
                  borderColor: "#3e95cd",
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: 'Stock Price Data Chart'
              },
              legend: {
                display: false,
                position: 'top',
                
              },
              scales: {
                yAxes: [
                  {
                    display: true,
                  },
                ],
              },
            },
          });
        });
      console.log(this.chart);
    }
  }

}
