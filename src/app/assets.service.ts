import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface OTDSTokenResponse {
  token: string;
  userId: string;
  ticket: string;
  resourceID: string;
  failureReason: string;
  passwordExpirationTime: number;
  continuation: boolean;
  continuationContext: string;
  continuationData: string;
}

export interface sessionId {
  session_resource: {
    session: {
      domain_name: string;
      id: number;
      local_session: boolean;
      login_name: string;
      message_digest: string;
      role_name: string;
      user_full_name: string;
      user_id: string;
      user_role_id: 1;
      validation_key: number;
    };
  };
}
export interface inputSession {}

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  assetValue$: Subject<string> = new Subject();
  constructor(private http: HttpClient) {}

  changeAsset(asset: string) {
    this.assetValue$.next(asset);
  }

  username = 'nayeem';
  password = 'TrainingE11';

  tokenUrl = 'http://training-otmm.acheron-tech.com:11090/otmmapi/v6/sessions';

  sessionUrl =
    'http://training-otmm.acheron-tech.com:11090/otmmapi/v6/sessions';
  // getSessionId(): Observable<any> {
  //   const body = new HttpParams()
  //     .set(`username`, this.username)
  //     .set(`password`, this.password);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   });

  //   return this.http.post(this.tokenUrl, body.toString(), {
  //     headers,
  //     observe: 'response',
  //   });
  // }

  body = {
    username: 'nayeem',
    password: 'TrainingE11',
    targetResourceId: 'e1332625-4b8e-4e40-94a8-012f81846665',
    ticketType: 'OTDSTICKET',
  };
  otdsTicket = '';
  generatedSessionId = '';

  getOtdsToken() {
    return this.http
      .post(this.tokenUrl, this.body)
      .subscribe((data: any) => (data.ticket = this.otdsTicket));
  }

  // getSession() {
  //   const urlBody = new URLSearchParams();
  //   urlBody.set('username', this.username);
  //   urlBody.set('password', this.password);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   });
  //   const options = { headers: headers };
  //   return this.http.get(this.otdsTicket, options);
  // }

  getSession() {
    this.http
      .get(this.sessionUrl, { headers: { OTDSToken: this.otdsTicket } })
      .subscribe((data: any) => {
        console.log(data);
        this.generatedSessionId = data.session_resource.session.id;
        console.log(this.generatedSessionId);
      });
  }

  searchAssest() {
    this.http
      .get(this.sessionUrl, {
        headers: {
          'X-Requested-By': this.generatedSessionId,
        },
      })
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
