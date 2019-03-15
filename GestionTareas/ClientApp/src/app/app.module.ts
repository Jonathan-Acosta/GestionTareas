import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { BuscarTareasComponent } from './tareas/buscar/buscartareas.component';
import { DropdownModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CrearTareaComponent } from './tareas/crear/creartarea.component';
import { ActualizarTareaComponent } from './tareas/actualizar/actualizartarea.component';
import { BorrarTareaComponent } from './tareas/borrar/borrartarea.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    BuscarTareasComponent,
    CrearTareaComponent,
    ActualizarTareaComponent,
    BorrarTareaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'buscartareas', component: BuscarTareasComponent },
      { path: 'creartarea', component: CrearTareaComponent },
      { path: 'actualizartarea', component: ActualizarTareaComponent },
      { path: 'borrartarea', component: BorrarTareaComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
