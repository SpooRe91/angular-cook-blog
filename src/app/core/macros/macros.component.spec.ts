import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosComponent } from './macros.component';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { CoreService } from '../core-service.service';

describe('MacrosComponent', () => {
  let component: MacrosComponent;
  let fixture: ComponentFixture<MacrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MacrosComponent],
      imports: [HttpClientTestingModule],
      providers: [RecipeService, CoreService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MacrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
