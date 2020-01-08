import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchMemberComponent } from './search-member/search-member.component';


const routes: Routes = [
  {
    path: '',
    component: SearchMemberComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
