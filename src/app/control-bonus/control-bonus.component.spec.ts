import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlBonusComponent } from './control-bonus.component';

describe('ControlBonusComponent', () => {
  let component: ControlBonusComponent;
  let fixture: ComponentFixture<ControlBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
