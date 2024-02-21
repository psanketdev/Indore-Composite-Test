import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-visitor-entry-table',
  templateUrl: './visitor-entry-table.component.html',
  styleUrls: ['./visitor-entry-table.component.css']
})
export class VisitorEntryTableComponent {
  @Input() visitorsEntries:any = [];

  ngOnInit(){
  }
}
