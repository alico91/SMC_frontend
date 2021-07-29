import { Component, OnInit } from '@angular/core';

import { Company } from '../../../models/Company';
import { CompanyService } from 'src/app/services/company.service';
import { Sector } from 'src/app/models/Sector';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  company: Company = {
    name: '',
    turnover: '',
    ceo: '',
    boardOfDirectors: '',
    sectorName: '',
    companyBrief: ''
  };

  sectors : Sector[];
  sectorNames : string[];
  
  constructor(private companyService: CompanyService, private sectorService: SectorService) {  }

  ngOnInit(): void {
    this.sectorService.getSectors()
      .subscribe(response => {
        this.sectors = response;
      });
    
      for (let i = 0; i < this.sectors.length; i++) {
        var sectorName = this.sectors[i].name;
        this.sectorNames.push(sectorName);
      }
  }

  changeSector(e) {
    console.log(e.value)
    
  }

  onSubmit({value, valid}: {value: Company, valid: boolean}) {
    if(!valid) {

    }
    else {
      this.companyService.addCompany(value);
    }
  }
}
