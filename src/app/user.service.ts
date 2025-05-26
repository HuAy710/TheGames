import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/user';
  private apiUrlGetList = 'http://localhost:8080/userlist';
  private apiUrlGetErgebnis = 'http://localhost:8080/userergebnis';
  private apiUrlGameErgebnis = 'http://localhost:8080/gameErgebnis';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  async addUser(username: string) {
    let resp = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username }),
    });
    let json = await resp.json();
    return json.success;
  }

  async userWon(nameGewinner: string, nameVerlierer: string,game: string) {
    let resp = await fetch(this.apiUrlGameErgebnis, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ winner: nameGewinner,loser: nameVerlierer, game: game }),
    });
    let json = await resp.json();
    return json.success;
  }

  async getUserList() {
    let resp = await fetch(this.apiUrlGetList, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    let json = await resp.json();
    return json.list as string[] ;
  }

  async getUserErgebnis(username: string ) {
    if(username == "Bitte auswählen"){return [];}
    let resp = await fetch(this.apiUrlGetErgebnis, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username }),
    });    
    let json = await resp.json();
    return json.list as object[];
  }

}