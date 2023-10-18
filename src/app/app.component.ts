import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ApiService } from './apiService/api-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Contact-us';
  form: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(private formBuilder: FormBuilder,private apiService: ApiService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  send(): void {
    const { name, email, message } = this.form.value;
    console.log(this.form.value)
    
    this.apiService.postData(this.form.value).subscribe(
      (response) => {
        console.log('API Response:', response);
        // Handle the response as needed
      },
      (error) => {
        console.error('API Error:', error);
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
