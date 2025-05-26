import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [UserService]
})
export class AppComponent implements AfterViewInit {
isDisabled: any;

  constructor(private userService: UserService) { }

  async ngAfterViewInit() {
    await this.updateuserList();
    setTimeout(() => {
      const el = document.getElementById("PlayerOne") as HTMLSelectElement;
      const el2 = document.getElementById("PlayerTwo") as HTMLSelectElement;
      const p1 = localStorage.getItem("playerOne");
      const p2 = localStorage.getItem("playerTwo");
      if (el && p1) el.value = p1;
      if (el2 && p2) el2.value = p2;
      this.updateTabelle();
    });
  }


  title = 'TheGames';
  userList: string[] = [];
  tabelleOne: object[] = [];
  tabelleTwo: object[] = [];


  ngOnInit() {

  }
  openModal() {
    const el = document.getElementById("nameModal");
    if (el) { el.style.display = "flex"; }
  }

  closeModal() {
    const el = document.getElementById("nameModal");
    const text = document.getElementById("playerName") as HTMLSelectElement;
    const fehlerBox = document.getElementById("fehlerText") as HTMLParagraphElement;
    if (el && text && fehlerBox) { el.style.display = "none"; fehlerBox.innerHTML = ""; text.value = ""; }

  }

  async submitName() {
    const el = document.getElementById("playerName") as HTMLSelectElement;
    const fehlerBox = document.getElementById("fehlerText") as HTMLParagraphElement;
    if (el && fehlerBox) {
      let fehler = this.usercheker(el.value);
      if (fehler != "") {
        fehlerBox.style.color = "#aa0d0d";
        fehlerBox.innerHTML = fehler;

      } else if (!await this.userService.addUser(el.value)) {
        fehlerBox.style.color = "#aa0d0d";
        fehlerBox.innerHTML = "Der Username ist schon vorhanden";

      } else {

        el.value = "";
        fehlerBox.style.color = "rgb(38, 214, 31)";
        fehlerBox.innerHTML = "Username hinzugefügt";
        this.updateuserList();

      }
    }
  }


  usercheker(user: string): string {

    if (user == "") { return "Bitte geben sie ein Username ein!"; }
    if (!/[a-zA-Z]/.test(user)) { return "Ihr Benutzername muss mindestens<br>einen Buchstaben enthalten!"; }
    return "";
  }

  async updateuserList() {
    this.userList = await this.userService.getUserList();
  }
  checkOptionBar(i: number) {
    const el = document.getElementById("PlayerOne") as HTMLSelectElement;
    const el2 = document.getElementById("PlayerTwo") as HTMLSelectElement;
    if (el && el2) {

      if (el.value == el2.value) {

        if (i == 1) { el2.value = "Bitte auswählen"; }
        else if (i == 2) { el.value = "Bitte auswählen"; }


      }
      localStorage.setItem("playerOne", el.value);
      localStorage.setItem("playerTwo", el2.value);
    }
    this.updateTabelle();
  }
  async updateTabelle() {
    const el = document.getElementById("PlayerOne") as HTMLSelectElement;
    const el2 = document.getElementById("PlayerTwo") as HTMLSelectElement;
    if (el && el2) {
      this.tabelleOne = await this.userService.getUserErgebnis(el.value);
      this.tabelleTwo = await this.userService.getUserErgebnis(el2.value);
    }
  }
  restartGame(){
    window.location.reload();

  }
}