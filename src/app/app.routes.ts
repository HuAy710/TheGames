
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { VierGewinntComponent } from './vier-gewinnt/vier-gewinnt.component';





const routes: Routes = [

  //{ path: '', component: AppComponent },  // Verwende AppComponent als Home
  { path: 'tictactoe', component: TicTacToeComponent },
   { path: 'vier_gewinnt', component: VierGewinntComponent },// Die TicTacToe-Seite

];



export { routes };  // Exportiere die routes hier
