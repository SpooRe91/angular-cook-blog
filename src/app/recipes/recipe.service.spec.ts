import { RecipeService } from './recipe.service';
import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
