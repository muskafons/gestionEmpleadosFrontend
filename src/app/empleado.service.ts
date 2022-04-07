import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiServerUrl}/lista`);
  }

  public addEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiServerUrl}/add`,empleado);
  }

  public updateEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiServerUrl}/update`,empleado);
  }

  public deleteEmpleado(empleadoId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${empleadoId}`);
  }

  public getEmpleado(empleadoId : number):Observable<Empleado>{
    return this.http.get<Empleado>(`${this.apiServerUrl}/find/${empleadoId}`);
  }


}
