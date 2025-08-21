import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaPage } from './transferencia-page';

describe('TransferenciaPage', () => {
  let component: TransferenciaPage;
  let fixture: ComponentFixture<TransferenciaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferenciaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
