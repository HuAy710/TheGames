import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss'],
  providers: [UserService]
})

export class TicTacToeComponent {
  board: string[][] = Array.from({ length: 3 }, () => Array(3).fill(''));
  currentPlayer: string = 'X';
  rounds: number=0;
  winner: Boolean = false;

  constructor(private userService: UserService,private appComponent: AppComponent){}
  ngOnInit() {}

  handleClick(i: number, j: number) {
    if(!this.checkUseername()) return;
    if(this.rounds == 0) this.startGame();
    this.rounds++;
    if (this.board[i][j] != '' || this.winner) return;
    this.board[i][j] = this.currentPlayer;
    const el = document.getElementById("turnText");
    this.winner = this.checkWinner();
    if (this.winner) {
      if (el) {
        el.textContent = `${this.currentPlayer} won the game`;
        el.style.color = this.currentPlayer === 'X' ? 'var(--baby-blue)' : 'var(--vivid-pink)';
        this.sendWinnerToDatabase(this.currentPlayer);
      }
    } else if(this.rounds == 9){
      if (el) {
        el.textContent = `Is't a draw`;
        el.style.color = 'black';
      }
    }else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      if (el) {
        el.textContent = `It's ${this.currentPlayer} turn`;
        el.style.color = this.currentPlayer === 'X' ? 'var(--baby-blue)' : 'var(--vivid-pink)';
        }
      }
    }
  getCellColor(value: string): string {
    if (value === 'X') return 'var(--baby-blue)';
    if (value === 'O') return 'var(--vivid-pink)';
    return 'inherit';
  }
  checkWinner() {
      for (let i = 0; i < 3; i++) {
            if (this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
              return true;
            }
            if (this.board[0][i] && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
              return true;
            }
          }

          if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
            return true;
          }

          if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
            return true;
          }

          return false;

  }
  async sendWinnerToDatabase(winner: string){
    const el = document.getElementById("PlayerOne") as HTMLSelectElement;
    const el2 = document.getElementById("PlayerTwo") as HTMLSelectElement;
    if(el&& el2){}

    	if(winner=='X'){
          await this.userService.userWon(el.value,el2.value,"tictactoe");
      }else{
        await this.userService.userWon(el2.value,el.value,"tictactoe");
      }
      await this.appComponent.updateTabelle();

  }
  checkUseername(){
     const el = document.getElementById("PlayerOne") as HTMLSelectElement;
    const el2 = document.getElementById("PlayerTwo") as HTMLSelectElement;
    const fbox = document.getElementById("fehlerBox") as HTMLParagraphElement
    if(el.value == "Bitte auswählen" || el2.value == "Bitte auswählen"){
       
       fbox.style.display = "flex";
       return false;
      }
    fbox.style.display = "none";
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
