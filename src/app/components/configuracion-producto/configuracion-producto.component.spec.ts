import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionProductoComponent } from './configuracion-producto.component';

describe('ConfiguracionProductoComponent', () => {
  let component: ConfiguracionProductoComponent;
  let fixture: ComponentFixture<ConfiguracionProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
