import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComStockexComponent } from './map-comstockex.component';

describe('MapCompStockexComponent', () => {
  let component: MapComStockexComponent;
  let fixture: ComponentFixture<MapComStockexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComStockexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComStockexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});