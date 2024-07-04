import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBaseProductosComponent } from './data-base-productos.component';

describe('DataBaseProductosComponent', () => {
  let component: DataBaseProductosComponent;
  let fixture: ComponentFixture<DataBaseProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataBaseProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataBaseProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
