import { Component, OnInit } from '@angular/core';
import { DeqcDisplay } from '../../shared/models/deqc-display.model';

@Component({
  selector: 'app-deqc-display',
  templateUrl: './deqc-display.component.html',
  styleUrls: ['./deqc-display.component.css']
})
export class DeqcDisplayComponent implements OnInit {
  displayData: DeqcDisplay[] = [];

  ngOnInit(): void {
    this.fetchData();
    this.initializeActions();
  }

  fetchData(): void {
    // Mock data for demonstration purposes
    this.displayData = [
      {
        applicationNumber: '123456',
        applicationStatus: 'Pending',
        receiptNumber: '78910',
        receiptDate: '2023-10-01',
        laName: 'John Doe',
        phName: 'Jane Smith',
        changeDescription: 'Address Change',
        proposalNumber: '54321',
        partnerName: 'Partner A',
        documentStatus: 'Incomplete',
        pendingDocs: 'ID Proof',
        checkbox: false
      },
      // Add more mock data as needed
    ];
  }

  initializeActions(): void {
    this.displayData.forEach(data => {
      data.checkbox = false;
      this.updateActions(data);
    });
  }

  onCheckboxChange(event: Event, index: number): void {
    const checkbox = event.target as HTMLInputElement;
    this.displayData[index].checkbox = checkbox.checked;
    this.updateActions(this.displayData[index]);
  }

  updateActions(data: DeqcDisplay): void {
    if (data.checkbox) {
      data['LINKSAVE'] = true;
      data['VIEW_DOCS'] = true;
      data['UPLOAD_DOCS'] = false;
      data['QC'] = true;
      data['REJECT'] = true;
    } else {
      data['LINKSAVE'] = false;
      data['VIEW_DOCS'] = false;
      data['UPLOAD_DOCS'] = false;
      data['QC'] = false;
      data['REJECT'] = false;
    }
  }
}
