import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockPrice } from '../../models/StockPrice';
import * as XLSX from 'xlsx';
import { StockPriceService } from 'src/app/services/stock-price.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {
  file!: File;
  SERVER_URL = "http://localhost:8080/import-excel";
  uploadForm: FormGroup = new FormGroup({});
  fileName: any;



  hasData: boolean = false;
  stockPrice:StockPrice[]=[];
  // displayedColumns: string[] = ['companyCode', 'stockExchange', 'pricePerShare','date','time'];


  constructor(private stockPriceService : StockPriceService, private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  get f() { return this.uploadForm.controls; }

  onFileSelect(event:any) {
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.f.profile.setValue(file);
      this.fileName = file.name;

      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (e: any) => {
        const binarystr = e.target.result;

        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary',cellText:false,cellDates:true});

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws, { header:1,raw:false,dateNF:'dd-mm-yyyy'});

        const importData = <String[][]>data.slice(1,-1);
        console.log(importData);
        importData.forEach( i => {
          var sp: StockPrice;
          sp.companyCode = i[0].trim();
          sp.exchangeName = i[1].trim();
          sp.price = parseFloat(i[2].trim());
          sp.date = this.stringToDate( i[3].trim());
          sp.time = i[4].trim();
          this.stockPrice.push(sp);
        });
        this.stockPriceService.addStockPriceList(this.stockPrice);
        // console.log(this.stockPrice);
        this.hasData = true;
      }
    }
  }

  stringToDate(date : string): Date{
      var parts =date.split('-');
      var day=parseInt(parts[2]);
      var year=parseInt(parts[0]);
      var month=parseInt(parts[1]);
          month-=1;
      return new Date(year, month, day);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.f.profile.value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

  }
}