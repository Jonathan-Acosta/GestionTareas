import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/primeng';
import { AppAuthNService, User } from '../../app-auth-n.service';
import { TareasService } from '../servicios/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizarTarea } from '../servicios/Modelos/actualizartareamodel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Tarea } from '../servicios/Modelos/tareamodel';
import { BorrarTarea } from '../servicios/Modelos/borrartareamodel';

@Component({
    selector: 'app-borrartarea',
    templateUrl: './borrartarea.component.html',
    styleUrls: [
        './borrartarea.component.css'
    ],
    providers: [AppAuthNService, TareasService]
})
export class BorrarTareaComponent implements OnInit {

    tarea: Tarea = new Tarea();
    borrartarea: BorrarTarea = new BorrarTarea();
    selectedValue: string;

    constructor(public tareasService: TareasService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.tarea.id = params['id'];
                this.tarea.descripcion = params['descripcion'];
                this.tarea.fechaVencimiento = new Date(params['fechaVencimiento']).toISOString().split('T')[0];
                this.tarea.finalizada = params['finalizada'];
                this.selectedValue = this.tarea.finalizada ? "Finalizado" : "Pendiente";
                console.log("Borrar tarea: ", this.tarea);
            });
    }

    borrar(): void {
        if (this.tarea.id) {
            this.borrartarea.id = this.tarea.id;
            this.tareasService.borrarTareaApi(this.borrartarea).then(tarea => { alert("Tarea eliminada con exito"); });
        } else {
            alert("Error al borrar tarea");
        }
    }

    cancelar(): void {
        this.router.navigate(['/buscartareas']);
    }
}