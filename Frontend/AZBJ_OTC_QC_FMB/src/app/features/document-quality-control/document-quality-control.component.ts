import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { DocumentStatus } from '../../shared/models/document.model';

@Component({
  selector: 'app-document-quality-control',
  templateUrl: './document-quality-control.component.html',
  styleUrls: ['./document-quality-control.component.css']
})
export class DocumentQualityControlComponent implements OnInit {
  documentStatuses: DocumentStatus[] = [];
  selectedStatus: string = '';

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.getDocumentStatus();
  }

  getDocumentStatus(): void {
    this.documentService.getDocumentStatus().subscribe((statuses: DocumentStatus[]) => {
      this.documentStatuses = statuses;
    });
  }

  onDropdownChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus = target.value;
  }
}
