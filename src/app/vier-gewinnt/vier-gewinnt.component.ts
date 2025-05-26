import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-vier-gewinnt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vier-gewinnt.component.html',
  styleUrl: './vier-gewinnt.component.scss',
  providers: [UserService]
})
export class VierGewinntComponent {
  board: string[][] = Array.from({ length: 7 }, () => Array(6).fill(''));
  touchBoard: string[] = Array(7).fill('./assert/pfeil.png');
  currentPlayer: string = 'X';
  rounds: number = 0;
  winner: Boolean = false;
  leerPos: number = 5;
  isAnimating: boolean = false;

  constructor(private userService: UserService,private appComponent: AppComponent){}

  ngOnInit() { }

  async handleClick(i: number) {
    if(!this.checkUseername()) return;
    if(this.rounds == 0) this.startGame();
    if (this.isAnimating || this.board[i][0] != '' || this.winner) return;
    this.rounds++;
    this.leerPos = 5;
    for (let idx = 0; idx < 6; idx++) {
      if (this.board[i][idx] != '') {
        this.leerPos = idx - 1;
        break;
      }
    }
    this.isAnimating = true;
    await this.animation(i, this.leerPos);

    this.board[i][this.leerPos] = this.currentPlayer;

    const el = document.getElementById("turnText");
    console.log("starte check");
    this.winner = this.checkWinner();
    console.log("ende check: " + this.winner);

    if (this.winner) {
      if (el) {
        el.textContent = `${this.currentPlayer} won the game`;
        el.style.color = this.currentPlayer === 'X' ? 'var(--baby-blue)' : 'var(--vivid-pink)';
        this.sendWinnerToDatabase(this.currentPlayer);
      }
    } else if (this.rounds == 42) {
      if (el) {
        el.textContent = `Is't a draw`;
        el.style.color = 'black';
      }
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      if (el) {
        el.textContent = `It's ${this.currentPlayer} turn`;
        el.style.color = this.currentPlayer === 'X' ? 'var(--baby-blue)' : 'var(--vivid-pink)';
      }
    }
    this.isAnimating = false;
  }


  getCellColor(value: string): string {
    if (value === 'X') return 'var(--baby-blue)';
    if (value === 'O') return 'var(--vivid-pink)';
    return 'inherit';
  }


  checkWinner() {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {

        const current = this.board[row][col];
        if (current == 'X' || current == 'O') {

          // Horizontal prüfen (nach rechts)
          if (col + 3 < 7 &&
            current === this.board[row][col + 1] &&
            current === this.board[row][col + 2] &&
            current === this.board[row][col + 3]) {
            return true;
          }
          // Vertikal prüfen (nach unten)
          if (row + 3 < 6 &&
            current === this.board[row + 1][col] &&
            current === this.board[row + 2][col] &&
            current === this.board[row + 3][col]) {
            return true;
          }
          // Diagonal nach unten rechts prüfen
          if (row + 3 < 6 && col + 3 < 7 &&
            current === this.board[row + 1][col + 1] &&
            current === this.board[row + 2][col + 2] &&
            current === this.board[row + 3][col + 3]) {
            return true;
          }
          // Diagonal nach unten links prüfen
          if (row + 3 < 6 && col - 3 >= 0 &&
            current === this.board[row + 1][col - 1] &&
            current === this.board[row + 2][col - 2] &&
            current === this.board[row + 3][col - 3]) {
            return true;
          }
        }
      }
    }
    return false;
  }
  async animation(i: number, zielZeile: number) {
    for (let row = 0; row <= zielZeile; row++) {
      if (row > 0) {
        this.board[i][row - 1] = '';
      }

      this.board[i][row] = this.currentPlayer;

      await new Promise(resolve => setTimeout(resolve, 100)); // 100ms Pause
    }
  }

  async sendWinnerToDatabase(winner: string){
    const el = document.getElementById("PlayerOne") as HTMLSelectElement;
    const el2 = document.getElementById("PlayerTwo") as HTMLSelectElement;
    if(el&& el2){}

    	if(winner=='X'){
          this.userService.userWon(el.value,el2.value,"viergewinnt");
      }else{
        this.userService.userWon(el2.value,el.value,"viergewinnt");
      }
      await this.appComponent.updateTabelle();

  }

  checkUseername(){
     const el = document.getElementById("PlayerOne") as HTMLSelectElement;
    const el2 = document.getElementById("PlayerTwo") as HTMLSelectElement;
    if(el.value == "Bitte auswählen" || el2.value == "Bitte auswählen") return false;
    return true;

  }
  startGame(){
    console.log("startet speil");
    
    const el = document.getElementById("PlayerOne") as HTMLSelectElement;
    const el2 = document.getElementById("PlayerTwo") as HTMLSelectElement;
    el.disabled = true;
    el2.disabled = true;
       
  }
}
