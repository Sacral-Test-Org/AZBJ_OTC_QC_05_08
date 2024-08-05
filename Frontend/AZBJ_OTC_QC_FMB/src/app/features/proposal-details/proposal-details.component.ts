import { Component, OnInit } from '@angular/core';
import { ProposalDetailsService } from '../../services/proposal-details.service';
import { ProposalDetails } from '../../shared/models/proposal-details.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css']
})
export class ProposalDetailsComponent implements OnInit {
  proposalDetails: ProposalDetails;

  constructor(private proposalDetailsService: ProposalDetailsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.proposalDetailsService.getProposalDetails().subscribe(
      (data: ProposalDetails) => {
        this.proposalDetails = data;
      },
      (error) => {
        console.error('Error fetching proposal details', error);
      }
    );
  }

  onSubmit(): void {
    console.log('Submit button clicked');
  }

  onExit(): void {
    console.log('Exit button clicked');
  }

  onViewAllDocuments(): void {
    console.log('View All Documents button clicked');
    const applicationNumber = this.proposalDetails.applicationNumber;
    const folderPath = `C:\\temp\\${applicationNumber}`;

    this.proposalDetailsService.getDocuments(applicationNumber).pipe(
      catchError(error => {
        console.error('Error fetching documents', error);
        return of([]);
      })
    ).subscribe(files => {
      if (files && files.length > 0) {
        files.forEach(file => {
          if (file.path) {
            this.http.get(file.url, { responseType: 'blob' }).subscribe(blob => {
              const fileName = file.path.split('/').pop();
              const filePath = `${folderPath}\\${fileName}`;
              saveAs(blob, filePath);

              if (fileName.endsWith('.pdf')) {
                window.open(filePath, '_blank');
              } else {
                const img = new Image();
                img.src = filePath;
                const w = window.open('');
                w.document.write(img.outerHTML);
              }
            }, error => {
              console.error('Error downloading file', error);
            });
          }
        });
      }
    });
  }

  onProposalForm(): void {
    console.log('Proposal Form button clicked');
    this.proposalDetailsService.setProposalFormFlag('Y').pipe(
      catchError(error => {
        console.error('Error setting proposal form flag', error);
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.proposalDetailsService.generateProposalFormUrl(this.proposalDetails.applicationNumber, this.proposalDetails.otherParams).pipe(
          catchError(error => {
            console.error('Error generating proposal form URL', error);
            return of(null);
          })
        ).subscribe(url => {
          if (url) {
            window.open(url, '_blank');
          } else {
            console.error('Generated URL is null');
          }
        });
      }
    });
  }
}
