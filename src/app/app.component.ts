import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ApiService } from './apiService/api-service';
import { SuccessMessageService } from './alertService/success-message-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Contact-us';
  form: FormGroup;
  messageNew='';
  ngOnInit(): void {
    this.buildForm();
  }

  constructor(private formBuilder: FormBuilder,private apiService: ApiService, private successMessageService:SuccessMessageService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
    
    this.successMessageService.successMessage$.subscribe((message: string) => {
      this.messageNew = message;
      setTimeout(() => {
        this.messageNew = ''; // Clear the message after a certain time
      }, 5000); // Adjust the time as needed
    });
  }

  send(): void {
    const { name, email, message } = this.form.value;
    console.log(this.form.value)
    
    this.apiService.postData(this.form.value).subscribe(
      (response) => {
        console.log('Data to dynamodb API Response:', response);
        // Handle the response as needed
        this.apiService.postData(this.form.value).subscribe((response) => {
          console.log('Publish message API Response:', response);
          this.successMessageService.showSuccess('You are successfully contacted our team.');
          this.buildForm();
        },(error) => {
          console.error('Publish message API Response Error:', error);
          this.successMessageService.showSuccess('Something went wrong while sending mail.');
        });
      },
      (error) => {
        console.error('API Error:', error);
        this.successMessageService.showSuccess('Something went wrong while contacting us');
        // Handle the error
      }
    );
  
   
    
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(null),
      email: this.formBuilder.control(null),
      message: this.formBuilder.control(null),
    });
  }
}
