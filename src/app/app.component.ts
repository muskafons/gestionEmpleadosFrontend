import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'gestionEmpleadosFronte';
  public empleados!: Empleado[];

  constructor(private empleadoServicio: EmpleadoService) {
    this.getEmpleados();
  } // Se adiciona al servicio
  


  //DEPRECATED
  // public getEmpleados(): void {
  //   this.empleadoServicio.getEmpleados().subscribe(
  //     (response: Empleado[]) => {
  //       this.empleados = response;
  //     },
  //   );
  // }

  // NO DEPRECATED o sea forma actual... 07/04/2022
  public getEmpleados(): void {
    this.empleadoServicio.getEmpleados().subscribe({
      next : (response: Empleado[]) => {this.empleados = response;},
      error : (error : HttpErrorResponse) => {alert(error.message);}
    });
  }

}
