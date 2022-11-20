import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetails } from './details.component';

describe('DetailsComponent', () => {
  let component: RecipeDetails;
  let fixture: ComponentFixture<RecipeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDetails]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecipeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
