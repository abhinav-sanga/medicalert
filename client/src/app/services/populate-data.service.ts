import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PopulateDataService {

  apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  // memberAsset(reqParams) {
  //   return this.http.get(this.apiUrl + 'memberAsset', { params: new HttpParams().append('memberId', reqParams) });
  // }

  medicAlertMemberId(reqParams) {
    return this.http.get(this.apiUrl + 'medicAlertMemberId', { params: new HttpParams().append('memberId', reqParams) });
  }

  firstNamelastName(firstName, lastName) {
    return this.http.get(this.apiUrl + 'firstNamelastName', { params: new HttpParams().append('firstName', firstName)
    .append('lastName', lastName) });
  }

  firstNameOnly(reqParams) {
    return this.http.get(this.apiUrl + 'firstNameNoLastName', { params: new HttpParams().append('firstName', reqParams) });
  }
}
