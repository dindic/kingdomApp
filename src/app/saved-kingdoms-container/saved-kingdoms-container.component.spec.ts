import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedKingdomsContainerComponent } from './saved-kingdoms-container.component';

describe('SavedKingdomsContainerComponent', () => {
  let component: SavedKingdomsContainerComponent;
  let fixture: ComponentFixture<SavedKingdomsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedKingdomsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedKingdomsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
