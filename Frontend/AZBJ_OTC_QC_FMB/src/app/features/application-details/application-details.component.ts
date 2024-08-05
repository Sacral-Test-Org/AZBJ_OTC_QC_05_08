import { Component, OnInit } from '@angular/core';
import { Application } from '../../shared/models/application.model';
import { ApplicationService } from '../../services/application.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  application: Application;
  isAuthorized: boolean;
  isEligible: boolean;

  constructor(private applicationService: ApplicationService, private logger: NGXLogger) {}

  ngOnInit(): void {
    const applicationNumber = '12345'; // This should be dynamically set
    const userId = 'user123'; // This should be dynamically set
    this.fetchApplicationDetails(applicationNumber);
    this.checkUserAuthorization(userId);
  }

  fetchApplicationDetails(applicationNumber: string): void {
    this.applicationService.getApplicationDetails(applicationNumber)
      .pipe(catchError(this.handleException.bind(this)))
      .subscribe((application: Application) => {
        this.application = application;
        this.isEligible = this.determineEligibility(application);
      });
  }

  checkUserAuthorization(userId: string): void {
    this.applicationService.checkAuthorization(userId)
      .pipe(catchError(this.handleException.bind(this)))
      .subscribe((isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
      });
  }

  determineEligibility(application: Application): boolean {
    // Implement the logic to determine eligibility based on the application details
    return application.kycFlag === 'Y' && application.eKycFlag === 'Y';
  }

  logInformation(message: string): void {
    this.logger.info(message);
  }

  handleException(error: any): Observable<never> {
    this.logger.error('An error occurred', error);
    throw error;
  }

  onTeleVideoMerApprovedChange(newValue: string): void {
    try {
      const teleVideoCheck = this.application.getTeleVideoCheck();
      if (teleVideoCheck === 'N') {
        alert('Please verify the document before selecting Yes or No option');
        this.application.teleVideoMerApproved = null;
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
      this.logger.error('An error occurred while changing Tele/Video Mer (Approved) field', error);
    }
  }
}