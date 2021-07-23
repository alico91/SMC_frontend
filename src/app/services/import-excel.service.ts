import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportExcelService {

    url: string;
  
    constructor(private http: HttpClient, private router: Router) {
      this.url = 'http://localhost:8080/import-excel/';
    }
  
    addImportedData(file: File) {
      this.http.post<File>(this.url, file)
        .subscribe((responseData) => {
          this.router.navigate(['/stock-prices']);
        });
    }

  }