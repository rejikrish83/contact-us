

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessMessageService {
  private successMessage = new Subject<string>();
  constructor() {}
  successMessage$ = this.successMessage.asObservable();

  showSuccess(message: string) {
    this.successMessage.next(message);
  }
}
