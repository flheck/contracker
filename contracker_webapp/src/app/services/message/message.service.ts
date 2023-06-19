import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/*
 Create a Communication: https://jasonwatmore.com/post/2022/11/17/angular-14-communicating-between-components-with-rxjs-observable-subject
 observable.subscribe -> to messages that are sent to an observable
 subject.next -> used to send messages to an observable which are sent to all angular components that are subscribers
https://angular.io/tutorial/tour-of-heroes/toh-pt4

*/

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next(null);
  }

  onMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
