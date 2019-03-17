import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/primeng';
import { AppAuthNService, User } from '../../app-auth-n.service';
import { TareasService } from '../servicios/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManager } from 'oidc-client';
import { Tarea } from '../servicios/Modelos/tareamodel';
import { Parametros } from '../servicios/Modelos/parametrosmodel';

@Component({
  selector: 'app-buscartareas',
  templateUrl: './buscartareas.component.html',
  styleUrls: [
    './buscartareas.component.css'
  ],
  providers: [AppAuthNService, TareasService]
})
export class BuscarTareasComponent implements OnInit {
    constructor(public authn: AppAuthNService, public tareasService: TareasService, private router: Router) {
  }

    filtrosTareas: any[] = [{ label: "Todas", value: "Todo" },
        { label: "Finalizadas", value: "Finalizado" },
        { label: "Pendientes", value: "Pendientes" }];

    tareas: Tarea[];
    filtroSeleccionado: string = "";
    descripcionTarea: string = "";

    ngOnInit(): void {
        console.log("Iniciando BuscarTareasComponent");
        this.tareasService.getAllTareasApi().then(tareas => { console.log(tareas); this.tareas = tareas as Tarea[] });
    }

    actualizar(tarea:Tarea): void {
        console.log("Actualizar");
        this.router.navigate(['/actualizartarea'],
            { queryParams: { id: tarea.id, descripcion: tarea.descripcion, fechaVencimiento: tarea.fechaVencimiento, finalizada: tarea.finalizada } });
    }

    borrar(tarea: Tarea): void {
        console.log("Borrar");
        this.router.navigate(['/borrartarea'],
            { queryParams: { id: tarea.id, descripcion: tarea.descripcion, fechaVencimiento: tarea.fechaVencimiento, finalizada: tarea.finalizada } });
    }

    crear(): void {
        this.router.navigate(['/creartarea']);
    }

    cerrarsesion(): void {
        localStorage.removeItem("usuario");
        this.authn.logout();
    }

    buscar(): void {
        console.log("Buscando");
        var parametros = new Parametros();
        parametros.descripcion = this.descripcionTarea;
        /*
        switch (this.filtroSeleccionado) {
            case "Todo":
                this.tareasService.getAllTareasApi().then(tareas => { console.log(tareas); this.tareas = tareas as Tarea[] });
                break;
            case "Finalizado":
                parametros.finalizada = true;
                this.tareasService.getTareasConParametrosApi(parametros).then(tareas => { console.log(tareas); this.tareas = tareas as Tarea[] });
                break;
            case "Pendientes":
                parametros.finalizada = false;
                this.tareasService.getTareasConParametrosApi(parametros).then(tareas => { console.log(tareas); this.tareas = tareas as Tarea[] });
                break;
            default:
                this.tareasService.getAllTareasApi().then(tareas => { console.log(tareas); this.tareas = tareas as Tarea[] });
                break;
        }
        */
        parametros.finalizada = (this.filtroSeleccionado == "Finalizado") ? true : (this.filtroSeleccionado == "Pendientes") ? false : null;
        this.tareasService.getTareasConParametrosApi(parametros).then(tareas => { console.log(tareas); this.tareas = tareas as Tarea[] });
    }

}
