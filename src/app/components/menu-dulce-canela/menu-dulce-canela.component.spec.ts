import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDulceCanelaComponent } from './menu-dulce-canela.component';

describe('MenuDulceCanelaComponent', () => {
  let component: MenuDulceCanelaComponent;
  let fixture: ComponentFixture<MenuDulceCanelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuDulceCanelaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuDulceCanelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
