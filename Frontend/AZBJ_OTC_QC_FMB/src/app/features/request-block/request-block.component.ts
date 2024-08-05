import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-request-block',
  templateUrl: './request-block.component.html',
  styleUrls: ['./request-block.component.css']
})
export class RequestBlockComponent implements OnInit {
  testNumberField: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.testNumberField = this.getTestNumber();
  }

  getTestNumber(): string {
    // Simulate fetching the test number from a backend service
    // In a real application, you would use this.http.get<YourDataType>('your-api-endpoint')
    // and handle the Observable accordingly.
    return '123456'; // Placeholder for the actual test number
  }
}