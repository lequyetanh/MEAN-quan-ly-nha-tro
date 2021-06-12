import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { AdminComponent } from './admin/admin.component';
import { PayComponent } from './pay/pay.component';
import { EditComponent } from './edit/edit.component';
import { EditPeopleComponent } from './edit-people/edit-people.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { ChartComponent } from './chart/chart.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { PagePayComponent } from './page-pay/page-pay.component';
import { CreateCatalogComponent } from './create-catalog/create-catalog.component';
import { CreateRoomComponent } from './create-room/create-room.component';

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: ContentComponent},
  {path: 'pay/:id', component: PayComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'create', component: CreateComponent},
  {path: 'createRoom', component: CreateRoomComponent},
  {path: 'pagePay', component: PagePayComponent},
  {path: 'search/:name', component: ListComponent},
  {path: 'createCatalog', component: CreateCatalogComponent},
  {path: 'login', component: LoginComponent},
  {path: 'favorite', component: FavoriteComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'chart/:year', component: ChartComponent},
  {path: 'editPeople/:id', component: EditPeopleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
