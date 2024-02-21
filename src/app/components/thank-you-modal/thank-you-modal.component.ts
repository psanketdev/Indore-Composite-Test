import { Component, OnInit  } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-thank-you-modal',
  templateUrl: './thank-you-modal.component.html',
  styleUrls: ['./thank-you-modal.component.css']
})
export class ThankYouModalComponent implements OnInit {
  modalRef?: BsModalRef;
  visitorForm?: any;
  constructor(public bsModalRef: BsModalRef){}

  ngOnInit() {
    console.log('Data passed to Modal 2:', this.visitorForm);
    // this.visitorName = this.modalRef?.content.visitorDetails.  
  };

  closeModal() {
    this.modalRef?.hide();
  }
}
