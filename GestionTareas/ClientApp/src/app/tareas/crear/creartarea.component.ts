import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/primeng';
import { AppAuthNService, User } from '../../app-auth-n.service';
import { TareasService } from '../servicios/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearTarea } from '../servicios/Modelos/creartareamodel';

@Component({
    selector: 'app-creartarea',
    templateUrl: './creartarea.component.html',
    styleUrls: [
        './creartarea.component.css'
    ],
    providers: [AppAuthNService,TareasService]
})
export class CrearTareaComponent {

    creartarea: CrearTarea = new CrearTarea();

    constructor(public tareasService: TareasService, private router : Router) {
    }

    guardar(): void {
        console.log("Crear tarea: ", this.creartarea);
        if (this.creartarea.descripcion && this.creartarea.fechaVencimiento) {
            this.tareasService.crearTareasApi(this.creartarea).then(tarea => { console.log("Se creó la tarea: ",tarea); alert("Tarea creada con exito"); });
        } else {
            alert("Error al crear tarea");
        }
    }

    cancelar(): void {
        this.router.navigate(['/buscartareas']);
    }
}