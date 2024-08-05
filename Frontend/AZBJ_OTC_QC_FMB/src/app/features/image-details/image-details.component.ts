import { Component, OnInit } from '@angular/core';
import { ImageDetailsService } from '../../services/image-details.service';
import { ImageDetails } from '../../shared/models/image-details.model';
import { DtlsBlkComponent } from '../dtls-blk/dtls-blk.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  imageDetails: ImageDetails[] = [];
  displayedImageDetails: ImageDetails[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 5;

  constructor(private imageDetailsService: ImageDetailsService, private dtlsBlkComponent: DtlsBlkComponent) { }

  ngOnInit(): void {
    this.imageDetailsService.getImageDetails().subscribe((data: ImageDetails[]) => {
      this.imageDetails = data;
      this.paginate(1);
    });
  }

  viewImage(imagePath: string): void {
    window.open(imagePath, '_blank');
  }

  hideImage(imageId: number): void {
    this.imageDetailsService.hideImage(imageId).subscribe(() => {
      this.imageDetails = this.imageDetails.filter(image => image.id !== imageId);
      this.paginate(this.currentPage);
    });
  }

  paginate(pageNumber: number): void {
    this.currentPage = pageNumber;
    const startIndex = (pageNumber - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    this.displayedImageDetails = this.imageDetails.slice(startIndex, endIndex);
  }

  onHideButtonClick(): void {
    this.dtlsBlkComponent.focusProposalNoField();
  }

  onViewImageClick(): void {
    this.imageDetailsService.getImageDetails().subscribe(
      (data: ImageDetails) => {
        const localFilePath = `${data.proposal_no}/${data.image_name}`;
        this.transferImageFile(data.image_path, localFilePath);
        this.logTransferDetails(data.contract_id, data.appln_no, `OTC: filename: ${data.image_name} v_client_path ${localFilePath}`);
        this.openFile(localFilePath);
      },
      (error: HttpErrorResponse) => {
        this.logErrorDetails('contract_id', 'appln_no', `OTC EXC:: ${error.status} - ${error.message}`);
        alert('An error occurred while retrieving the image details.');
      }
    );
  }

  private transferImageFile(serverPath: string, localPath: string): void {
    // Logic to transfer the image file from the server to the local machine
    // This is a placeholder for the actual file transfer logic
  }

  private logTransferDetails(contractId: string, applnNo: string, logMessage: string): void {
    this.imageDetailsService.logTransferDetails(contractId, applnNo, logMessage).subscribe();
  }

  private logErrorDetails(contractId: string, applnNo: string, logMessage: string): void {
    this.imageDetailsService.logErrorDetails(contractId, applnNo, logMessage).subscribe();
  }

  private openFile(filePath: string): void {
    const fileExtension = filePath.split('.').pop();
    if (fileExtension === 'pdf') {
      window.open(filePath, '_blank');
    } else {
      window.open(filePath, '_blank');
    }
  }
}
