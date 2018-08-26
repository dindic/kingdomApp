import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedKingdomsComponent } from './saved-kingdoms.component';

describe('SavedKingdomsComponent', () => {
  let component: SavedKingdomsComponent;
  let fixture: ComponentFixture<SavedKingdomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedKingdomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedKingdomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
