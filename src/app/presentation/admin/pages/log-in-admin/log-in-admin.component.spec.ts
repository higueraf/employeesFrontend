import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInAdminComponent } from './log-in-admin.component';

describe('LogInComponent', () => {
  let component: LogInAdminComponent;
  let fixture: ComponentFixture<LogInAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogInAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
