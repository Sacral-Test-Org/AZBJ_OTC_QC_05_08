import { Component, OnInit } from '@angular/core';
import { QcTabModel } from 'src/app/shared/models/qc-tab.model';

@Component({
  selector: 'app-qc-tab',
  templateUrl: './qc-tab.component.html',
  styleUrls: ['./qc-tab.component.css']
})
export class QcTabComponent implements OnInit {
  qcTabModel: QcTabModel = new QcTabModel();
  referToSupervisorOptions: string[] = ['Yes', 'No'];

  ngOnInit(): void {
    this.qcTabModel.referToSupervisor = 'No';
    // Initialize any other necessary properties or event listeners here
  }

  onDropdownChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.qcTabModel.referToSupervisor = selectElement.value;
  }

  onDoubleClick(event: MouseEvent): void {
    this.displayNewView();
    this.shiftFocusToInputField();
  }

  displayNewView(): void {
    // Logic to display a new view when the comments text area is double-clicked
    console.log('Displaying new view');
  }

  shiftFocusToInputField(): void {
    // Logic to shift focus to a different input field within the new view
    console.log('Shifting focus to a different input field');
  }
}
