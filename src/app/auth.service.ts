import { Injectable,OnInit } from '@angular/core';
import { TwitterAuthProvider , getAuth, signOut } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}

  public auth:any;
  public user:any;

  ngOnInit(): void {
    this.auth = getAuth();
    console.log('auth',this.auth);
  }

  // Sign in with Twitter
  TwitterAuth() {
    return this.AuthLogin(new TwitterAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log(result.additionalUserInfo?.username);
        // console.log(result.user?.displayName);
        // console.log(result.user?.email);
        // console.log(result.user?.photoURL);
        console.log(result.additionalUserInfo?.profile);
        
        this.user = result.additionalUserInfo?.profile;
        
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signOut(){
    const auth = getAuth();
    // console.log(auth.currentUser);
    signOut(auth).then(() => {
      alert("Sigining Out ...");
      this.user = '';
      
    }).catch((error) => {
      console.log(error);
      
    });
  }
}