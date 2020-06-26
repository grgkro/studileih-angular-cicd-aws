// Der Update Service sorgt dafür, dass immer bekannt ist, welcher User gerade eingeloggt ist, welches Produkt gerade angeschaut wird, etc.
// Statt die userId in die URL zu schreiben und so zwischen den einzelnen Components zu übermitteln,
// wird hier die UserId vom UpdateService an alle Components automatisch geschickt, die die Info brauchen.
// Immer wenn sich die userId ändert, wird das an alle Components die beim userId Observable subscribed haben geschickt.
// -> Was passiert, wenn zwei User gleichzeitig auf den Service zugreifen? 

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  user: User;
  private userSource = new BehaviorSubject(this.user);  // userId = 0 is the default value. The id in the DB always starts at 1, so this will result in an error (you have to insert a value there, so we need any default value)
  currentUser = this.userSource.asObservable();
  
  constructor() { }

  changeUser(user: User) {
    this.userSource.next(user);
  }

}
