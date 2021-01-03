import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResultsComponent } from './show-results.component';

describe('ShowCustomersComponent', () => {
  let component: ShowResultsComponent;
  let fixture: ComponentFixture<ShowResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
