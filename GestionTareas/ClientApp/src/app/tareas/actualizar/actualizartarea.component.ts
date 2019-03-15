import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/primeng';
import { AppAuthNService, User } from '../../app-auth-n.service';
import { TareasService } from '../servicios/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizarTarea } from '../servicios/Modelos/actualizartareamodel';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'app-actualizartarea',
    templateUrl: './actualizartarea.component.html',
    styleUrls: [
        './actualizartarea.component.css'
    ],
    providers: [AppAuthNService, TareasService]
})
export class ActualizarTareaComponent implements OnInit {

    actualizartarea: ActualizarTarea = new ActualizarTarea();
    selectedValue: string;
    fechaActual: string;

    constructor(public tareasService: TareasService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.actualizartarea.id = params['id'];
                this.actualizartarea.descripcion = params['descripcion'];
                this.actualizartarea.fechaVencimiento = new Date(params['fechaVencimiento']).toISOString().split('T')[0];
                this.actualizartarea.finalizada = params['finalizada'];
                this.selectedValue = this.actualizartarea.finalizada ? "Finalizado" : "Pendiente";
                console.log("Actualizar tarea: ", this.actualizartarea);
            });
    }

    guardar(): void {
        this.actualizartarea.finalizada = this.selectedValue == "Finalizado" ? true : false;
        if (this.actualizartarea.descripcion && this.actualizartarea.fechaVencimiento && this.selectedValue) {
            this.tareasService.actualizarTareaApi(this.actualizartarea).then(tarea => { console.log("Se actualizado la tarea a: ",tarea); alert("Tarea actualizada con exito"); });
        } else {
            alert("Error al actualizar tarea");
        }
    }

    cancelar(): void {
        this.router.navigate(['/buscartareas']);
    }
}