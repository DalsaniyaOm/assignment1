import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private msgSource = new BehaviorSubject<string>('');
  currentMessage = this.msgSource.asObservable();

  setMessage(msg: string) {
    this.msgSource.next(msg);
  }
}
