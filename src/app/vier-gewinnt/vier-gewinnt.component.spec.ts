import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VierGewinntComponent } from './vier-gewinnt.component';

describe('VierGewinntComponent', () => {
  let component: VierGewinntComponent;
  let fixture: ComponentFixture<VierGewinntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VierGewinntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VierGewinntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
