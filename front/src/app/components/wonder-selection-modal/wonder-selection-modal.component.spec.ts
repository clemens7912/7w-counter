import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonderSelectionModalComponent } from './wonder-selection-modal.component';

describe('WonderSelectionModalComponent', () => {
  let component: WonderSelectionModalComponent;
  let fixture: ComponentFixture<WonderSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WonderSelectionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WonderSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
