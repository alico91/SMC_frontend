import { Component, OnInit } from '@angular/core';
import { MapComStockex } from 'src/app/models/MapComStockex';
import { MapComStockexService } from 'src/app/services/map-comstockex.service';

import { Company } from '../../models/Company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[];
  mapComStockexs : MapComStockex[];

  constructor(private companyService: CompanyService, private mapComStockexService: MapComStockexService) { }

  ngOnInit(): void {
    this.companyService.getCompanies()
      .subscribe((response) => {
        this.companies = response;
      });
    this.mapComStockexService.getMapComStockex()
      .subscribe((response) => {
        this.mapComStockexs = response;
      });
  }

  onDeleteClick(id: string) {
    this.companyService.deleteCompany(id);
  }

}
