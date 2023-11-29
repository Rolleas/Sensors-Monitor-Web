import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { environment } from '../../../environments/environment';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  login(loginRequest: LoginModel): Observable<TokenModel> {
    const path = 'oauth/signin';

    return this.httpClient.post<TokenModel>(environment.api + path, loginRequest);
  }
}
