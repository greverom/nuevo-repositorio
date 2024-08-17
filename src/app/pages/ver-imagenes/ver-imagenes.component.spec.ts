import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerImagenesComponent } from './ver-imagenes.component';

describe('VerImagenesComponent', () => {
  let component: VerImagenesComponent;
  let fixture: ComponentFixture<VerImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerImagenesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
