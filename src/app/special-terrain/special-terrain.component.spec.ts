import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTerrainComponent } from './special-terrain.component';

describe('SpecialTerrainComponent', () => {
  let component: SpecialTerrainComponent;
  let fixture: ComponentFixture<SpecialTerrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialTerrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
