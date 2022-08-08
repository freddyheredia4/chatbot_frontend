import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../chat/chat';
import { Intent } from './intent';


@Injectable({
  providedIn: 'root'
})
export class IntentService {

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  private url = 'http://192.168.1.21:8000/api/bot/intent'

  public save(intent: Intent): Observable<Intent>{
    return this.http.post<Intent>(this.url+"/", intent, this.httpOptions)
  }

  public findById(id: number): Observable<Intent>{
    return this.http.get<Intent>(this.url+"/"+id, this.httpOptions);
  }

  public replace(intent: Intent): Observable<Intent> {
    return this.http.put<Intent> (this.url+"/"+intent.id+"/", intent, this.httpOptions);
  }

  public update(intent: Intent): Observable<Intent> {
    return this.http.patch<Intent> (this.url+"/"+ intent.id+"/", intent, this.httpOptions);
  }

  public train(): Observable<string> {
    return this.http.post<string>(this.url+"/1/train/", {} , this.httpOptions );
  }

  public ask(term: Chat): Observable<Chat>{
    return this.http.post<Chat>(this.url+"/1/ask/", term, this.httpOptions);
  }
}
