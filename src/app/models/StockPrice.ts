import { Time } from "@angular/common";

export interface StockPrice {
  id?: number;
  companyCode?: string;
  exchangeName?: string;
  currentPrice?: number;
  date?: string;
  time?: string;

}
