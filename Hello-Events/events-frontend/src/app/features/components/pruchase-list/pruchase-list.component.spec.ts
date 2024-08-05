import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruchaseListComponent } from './pruchase-list.component';

describe('PruchaseListComponent', () => {
  let component: PruchaseListComponent;
  let fixture: ComponentFixture<PruchaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruchaseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
