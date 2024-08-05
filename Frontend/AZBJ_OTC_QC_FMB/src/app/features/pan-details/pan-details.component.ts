import { Component, OnInit } from '@angular/core';
import { PanDetailsModel } from '../../shared/models/pan-details.model';

@Component({
  selector: 'app-pan-details',
  templateUrl: './pan-details.component.html',
  styleUrls: ['./pan-details.component.css']
})
export class PanDetailsComponent implements OnInit {
  panDetails: PanDetailsModel[] = [];
  maxRecords: number = 3;

  constructor() {}

  ngOnInit(): void {
    // Initialize with some dummy data or fetch from a service
    this.panDetails = [
      { panNumber: '', panStatus: '', nameMatch: '', dobMatch: '', seedingFlag: '' },
      { panNumber: '', panStatus: '', nameMatch: '', dobMatch: '', seedingFlag: '' },
      { panNumber: '', panStatus: '', nameMatch: '', dobMatch: '', seedingFlag: '' }
    ];
  }

  managePanDetails(): void {
    // Logic to manage PAN details
    // Ensure the section can display and manage up to 3 records at a time
    // Implement add, update, delete functionality
  }

  addPanDetail(): void {
    if (this.panDetails.length < this.maxRecords) {
      this.panDetails.push({ panNumber: '', panStatus: '', nameMatch: '', dobMatch: '', seedingFlag: '' });
    }
  }

  updatePanDetail(index: number, panDetail: PanDetailsModel): void {
    if (index >= 0 && index < this.panDetails.length) {
      this.panDetails[index] = panDetail;
    }
  }

  deletePanDetail(index: number): void {
    if (index >= 0 && index < this.panDetails.length) {
      this.panDetails.splice(index, 1);
    }
  }
}
