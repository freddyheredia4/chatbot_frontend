import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {path: 'training', component: TrainingComponent},
  {path: 'training/:id', component: TrainingComponent},
  {path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
