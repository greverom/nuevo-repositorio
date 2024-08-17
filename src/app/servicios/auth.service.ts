import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/usuario.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase
  ) { }

  register(email: string, password: string, firstName: string, lastName: string, phone: number) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(({ user }) => {
        if (user) {
          const newUser: User = {
            uid: user.uid,
            firstName,
            lastName,
            email,
            phone 
          };
          return this.db.object(`/users/${user.uid}`).set(newUser);
        }
        return [];
      })
    );
  }

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
        map(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                return true;
            } else {
                localStorage.removeItem('user');
                return false;
            }
        })
    );
}
  

  logout(): Observable<void> {
    return from(this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      return;
    }));
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}