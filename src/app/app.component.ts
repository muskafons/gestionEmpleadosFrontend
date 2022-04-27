import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GESTION DE TECNICOS';
  public empleados!: Empleado[];
  public editEmpleado!: Empleado;
  public deleteEmpleado!: Empleado;

  constructor(private empleadoServicio : EmpleadoService) {
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
      next: (response: Empleado[]) => { this.empleados = response; },
      error: (error: HttpErrorResponse) => { alert(error.message); }
    });
  }

  public onAddEmpleado(addForm : NgForm): void {
    //alert("OK");
    document.getElementById('add-employee-form')?.click(); //Una vez reciba los datos del modal, dar click para cerrarlo...
    
    this.empleadoServicio.addEmpleado(addForm.value).subscribe({
      next: (response: Empleado) => {
        console.log(response);
        this.getEmpleados();
      },
      error: (error: HttpErrorResponse) => { alert(error.message); }
    }
    );
    addForm.reset();
  }


  public onUpdateEmpleado(empleado: Empleado): void {
    //alert("OK");
    this.empleadoServicio.updateEmpleado(empleado).subscribe({
      next: (response: Empleado) => {
        console.log(response);
        this.getEmpleados();
      },
      error: (error: HttpErrorResponse) => { alert(error.message); }
    }
    );
  }

  public onDeleteEmpleado(id: number): void {
    this.empleadoServicio.deleteEmpleado(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEmpleados();
      },
      error: (error: HttpErrorResponse) => { alert(error.message); }


    }
    )

  }

  public searchEmpleado(key: string): void {
    const resultados: Empleado[] = [];
    for (const empleado of this.empleados) {
      if (
        empleado.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        empleado.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        empleado.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        empleado.cargo.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        resultados.push(empleado);
      }
    }
    this.empleados = resultados;
    if (resultados.length === 0 || !key) {
      this.getEmpleados();
    }
  }

  public onOpenModal(mode: string, empleado: Empleado): void {

    if (mode == "#updateEmployeeModal") {
      this.editEmpleado = empleado;
      document.getElementById('modalarUpdate')?.click();
    }
    else if (mode == "#deleteEmployeeModal") {
      this.deleteEmpleado = empleado;
      document.getElementById('modalarDelete')?.click();
    }


  }

  // public onOpenModal(mode: string, empleado: Empleado): void {
  //   const container = document.getElementById('main-container');

  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   // button.style.display = 'none';
  //   button.setAttribute('data-toogle', 'modal');

  //   if (mode === 'edit') {
  //     this.editEmpleado = empleado;
  //     button.setAttribute('data-target', '#updateEmployeeModal');
  //   }
  //   else if (mode === 'delete') {
  //     button.setAttribute('data-target', '#deleteEmployeeModal');
  //   }

  //   container?.appendChild(button);
  //   button.click();
  // }

}
