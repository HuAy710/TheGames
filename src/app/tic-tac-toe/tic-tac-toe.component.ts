import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  board: string[][] = Array.from({ length: 3 }, () => Array(3).fill(''));
  currentPlayer: string = 'X';
  rounds: number=0;
  winner: Boolean = false;
  //winner: { type: 'row' | 'col' | 'diag', index: number } | null = null; // <-- jetzt existiert winner!

  ngOnInit() {}

  handleClick(i: number, j: number) {
    this.rounds++;
    if (this.board[i][j] != '' || this.winner) return;
    this.board[i][j] = this.currentPlayer;
    const el = document.getElementById("turnText");
    this.winner = this.checkWinner();
    if (this.winner) {
      if (el) {
        el.textContent = `${this.currentPlayer} won the game`;
        el.style.color = this.currentPlayer === 'X' ? 'var(--baby-blue)' : 'var(--vivid-pink)';
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



  /*get winLineClass(): string {
    if (!this.winner) return '';
    switch (this.winner.type) {
      case 'row': return `row-${this.winner.index}`;
      case 'col': return `col-${this.winner.index}`;
      case 'diag': return `diag-${this.winner.index}`;
      default: return '';
    }
  }*/

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
}
