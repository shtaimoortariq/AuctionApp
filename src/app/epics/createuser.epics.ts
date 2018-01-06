// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { ActionsObservable } from 'redux-observable';
// import { SessionActions } from '../actions/session.actions';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

// const BASE_URL = '/api';

// @Injectable()
// export class LoginEpics {
//   constructor(private http: Http) {}

//   login = (action$: ActionsObservable<any>) => {
//     return action$.ofType(SessionActions.LOGIN_USER)
//       .mergeMap(({payload}) => {
//         return this.http.post(`${BASE_URL}/auth/login`, payload)
//           .map(result => ({
//             type: SessionActions.LOGIN_USER_SUCCESS,
//             payload: result.json().meta
//           }))
//           .catch(error => Observable.of({
//             type: SessionActions.LOGIN_USER_ERROR
//           }));
//         });
//   }
// }


import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable } from 'redux-observable';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS, LOGIN_DATA, SIGNUP_DATA, SIGNUP_DATA_SUCESS, SIGNUP_FAIL, LOGIN_DATA_SUCESS, LOGIN_FAIL } from '../todo.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Injectable()
export class CreateUserEpics {
    constructor(public afAuth: AngularFireAuth, public router: Router) { }

    createNewUser = (action$) => {
        return action$.ofType(SIGNUP_DATA)
            .mergeMap(({ signup }) => {
                return Observable.fromPromise(<Promise<any>>this.afAuth.auth.createUserWithEmailAndPassword(signup.email, signup.password)
                ).map(signup => {
                    console.log(signup)
                    this.router.navigate(['/home']);
                    return {
                        type: SIGNUP_DATA_SUCESS,
                        payload: signup
                    }
                })
                .catch(err => {
            
                    return Observable.of({
                      type: SIGNUP_FAIL,
                      payload: signup 
                    })
                  })
            });
    }


    loginUser = (action$) => {
        return action$.ofType(LOGIN_DATA)
            .mergeMap(({ login }) => {
                return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithEmailAndPassword(login.email, login.password)
                ).map(login => {
                    console.log(login)
                    this.router.navigate(['/home']);
                    return {
                        type: LOGIN_DATA_SUCESS,
                        payload: login
                    }
                })
                .catch(err => {
                    alert("Wrong User");
                    return Observable.of({
                      type: LOGIN_FAIL,
                      payload: {email: "", uid: ""}
                    })
                  })
            });
    }


}