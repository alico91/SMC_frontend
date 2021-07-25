import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MapComStockex } from '../models/MapComStockex';

@Injectable({providedIn: 'root'})
export class MapComStockexService {

  url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = 'http://localhost:8080/mapcompanycode/';
  }

  addMapComStockex(mapComStockex: MapComStockex) {
    this.http.post<MapComStockex>(this.url, mapComStockex)
      .subscribe((responseData) => {
        this.router.navigate(['/companies']);
      });
  }

  getMapComStockex(): Observable<MapComStockex[]> {
    return this.http.get<MapComStockex[]>(this.url);
  }
}
