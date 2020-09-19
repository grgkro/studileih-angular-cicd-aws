import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDormComponent } from './add-dorm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AddDormComponent', () => {
  let component: AddDormComponent;
  let fixture: ComponentFixture<AddDormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule],
      
      declarations: [ AddDormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.dormForm.valid).toBeFalsy();
  })

  it('should check the city input validity', () => {
    let city = component.dormForm.controls['city'];
    expect(city.valid).toBeFalsy();
  })

  it('should check the street input validity', () => {
    let street = component.dormForm.controls['street'];
    expect(street.valid).toBeFalsy();
  })

  it('should check the houseNumber input validity', () => {
    let houseNumber = component.dormForm.controls['houseNumber'];
    expect(houseNumber.valid).toBeFalsy();
  })


});
