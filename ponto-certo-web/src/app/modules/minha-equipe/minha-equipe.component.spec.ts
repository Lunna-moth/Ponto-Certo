import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaEquipeComponent } from './minha-equipe.component';

describe('MinhaEquipeComponent', () => {
  let component: MinhaEquipeComponent;
  let fixture: ComponentFixture<MinhaEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhaEquipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhaEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
