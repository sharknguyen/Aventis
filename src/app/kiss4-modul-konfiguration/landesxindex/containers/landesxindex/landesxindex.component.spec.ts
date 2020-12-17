import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandesindexComponent } from './landesxindex.component';

describe('LandesindexListComponent', () => {
  let component: LandesindexComponent;
  let fixture: ComponentFixture<LandesindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandesindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandesindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
