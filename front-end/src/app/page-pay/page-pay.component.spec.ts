import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePayComponent } from './page-pay.component';

describe('PagePayComponent', () => {
  let component: PagePayComponent;
  let fixture: ComponentFixture<PagePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
