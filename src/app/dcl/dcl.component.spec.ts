import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DclComponent } from './dcl.component';

describe('DclComponent', () => {
  let component: DclComponent;
  let fixture: ComponentFixture<DclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
