import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuccessfullDialogComponent } from './register-successfull-dialog.component';

describe('RegisterSuccessfullDialogComponent', () => {
  let component: RegisterSuccessfullDialogComponent;
  let fixture: ComponentFixture<RegisterSuccessfullDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSuccessfullDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSuccessfullDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
