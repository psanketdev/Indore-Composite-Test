import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ThankYouModalComponent } from '../thank-you-modal/thank-you-modal.component';

@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.css'],
})
export class VisitorFormComponent {
  visitorForm!: FormGroup ;
  visitorFormSubmittedData:any = [];
  bsModalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private modalService: BsModalService, private modalRef: BsModalRef) {}

  ngOnInit() {
    this.visitorForm = this.fb.group({
      idNumber: [1, [Validators.required]], 
      date: ['', [Validators.required]], 
      vName: ['', [Validators.required]],
      vNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]], 
      vCompanyName: ['', [Validators.required]], 
      whoomToMeet: ['', [Validators.required]],
      purpose: ['', [Validators.required]]
    })

    let localStgData = localStorage.getItem('visitData');
    if(localStgData) {
      this.visitorFormSubmittedData = JSON.parse(localStgData);
    }

    if(this.visitorFormSubmittedData?.length > 0) {
      let lastEntry = this.visitorFormSubmittedData[this.visitorFormSubmittedData.length - 1 ];
      console.log('lastEntry object ' + lastEntry);
      this.visitorForm.get('idNumber')?.setValue(lastEntry.idNumber + 1);
    }
  }

  get registerFormControl() {
    return this.visitorForm.controls;
  }

  onSubmitForm() {
    if(this.visitorForm.valid) {
      let formData = this.visitorForm.value;
      formData.date = this.formatData(formData.date);
      this.visitorFormSubmittedData.push(formData);
      localStorage.setItem('visitData', JSON.stringify(this.visitorFormSubmittedData));
      this.openModalWithComponent();
      this.visitorForm.reset();
      formData.idNumber += 1;
      this.visitorForm.get('idNumber')?.setValue(formData.idNumber);
    }
  }

  public formatData(date: string): string {
    return date;
  }

  public openModalWithComponent(){
    this.bsModalRef = this.modalService.show(ThankYouModalComponent, { initialState: { visitorForm: this.visitorForm.value } });
  }
}
