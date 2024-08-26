import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaManagerComponent } from './comida-manager.component';

describe('ComidaManagerComponent', () => {
  let component: ComidaManagerComponent;
  let fixture: ComponentFixture<ComidaManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComidaManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComidaManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
