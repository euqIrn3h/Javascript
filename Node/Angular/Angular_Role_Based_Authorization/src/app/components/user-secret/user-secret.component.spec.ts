import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSecretComponent } from './user-secret.component';

describe('UserSecretComponent', () => {
  let component: UserSecretComponent;
  let fixture: ComponentFixture<UserSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSecretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
