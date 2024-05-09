import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFavoriteComponent } from './remove-favorite.component';

describe('RemoveFavoriteComponent', () => {
  let component: RemoveFavoriteComponent;
  let fixture: ComponentFixture<RemoveFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveFavoriteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
