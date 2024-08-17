import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVideosComponent } from './ver-videos.component';

describe('VerVideosComponent', () => {
  let component: VerVideosComponent;
  let fixture: ComponentFixture<VerVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
