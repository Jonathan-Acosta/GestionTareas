import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../../constants';
import { AppAuthNService, User } from '../../app-auth-n.service';
import { UserManager } from 'oidc-client';
import { Parametros } from './Modelos/parametrosmodel';
import { CrearTarea } from './Modelos/creartareamodel';
import { ActualizarTarea } from './Modelos/actualizartareamodel';
import { BorrarTarea } from './Modelos/borrartareamodel';

@Injectable()
export class TareasService{

  _user: User;

  constructor(private _httpClient: HttpClient, private _authn: AppAuthNService) {
  }

    public getAllTareasApi(): Promise<any> {
        try {
            return this._authn.getUserFromUrl().then(user => {
                console.log("Error en promesa");
                if (user && user.access_token) {
                    this._user = user;
                    localStorage.setItem("usuario", JSON.stringify(user));
                    return this._getAllTareasApi(user.access_token);
                }
                else if (user) {
                    return this._authn.renewToken().then(user => {
                        return this._getAllTareasApi(user.access_token);
                    });
                }
                else {
                    alert("Usuario no logueado");
                    throw new Error("user is not logged in");
                }
            }).catch(error =>
            {
                var usuario = JSON.parse(localStorage.getItem("usuario")) as User;
                return this._getAllTareasApi(usuario.access_token)
            }

            );
        } catch (e) {
            console.log("Error en promesa");
        }
    
  }

    public getTareasConParametrosApi(parametros: Parametros): Promise<any> {
        try {
            return this._authn.getUserFromUrl().then(user => {
                if (user && user.access_token) {
                    this._user = user;
                    localStorage.setItem("usuario", JSON.stringify(user));
                    return this._getTareasConParametrosApi(user.access_token, parametros);
                }
                else if (user) {
                    return this._authn.renewToken().then(user => {
                        return this._getTareasConParametrosApi(user.access_token, parametros);
                    });
                }
                else {
                    alert("Usuario no logueado");
                    throw new Error("user is not logged in");
                }
            }).catch(error =>
            {
                var usuario = JSON.parse(localStorage.getItem("usuario")) as User;
                return this._getTareasConParametrosApi(usuario.access_token, parametros)
             });
        } catch (e) {
            console.log("Error en promesa");
        }
       
  }

    public crearTareasApi(creartarea: CrearTarea): Promise<any> {
        try {
            return this._authn.getUserFromUrl().then(user => {
                if (user && user.access_token) {
                    this._user = user;
                    localStorage.setItem("usuario", JSON.stringify(user));
                    return this._crearTareaApi(user.access_token, creartarea);
                }
                else if (user) {
                    return this._authn.renewToken().then(user => {
                        return this._crearTareaApi(user.access_token, creartarea);
                    });
                }
                else {
                    alert("Usuario no logueado");
                    throw new Error("user is not logged in");
                }
            }).catch(error =>
            {
                var usuario = JSON.parse(localStorage.getItem("usuario")) as User;
                console.log("Usuario al crear tarea: ", usuario);
                return this._crearTareaApi(usuario.access_token, creartarea)
             });
        } catch (e) {
            console.log("Error en promesa");
        }
   
  }

    public actualizarTareaApi(actualizartarea: ActualizarTarea): Promise<any> {
        try {
            return this._authn.getUserFromUrl().then(user => {
                if (user && user.access_token) {
                    this._user = user;
                    localStorage.setItem("usuario", JSON.stringify(user));
                    return this._actualizarTareaApi(user.access_token, actualizartarea);
                }
                else if (user) {
                    return this._authn.renewToken().then(user => {
                        return this._actualizarTareaApi(user.access_token, actualizartarea);
                    });
                }
                else {
                    alert("Usuario no logueado");
                    throw new Error("user is not logged in");
                }
            }).catch(error =>
            {
                var usuario = JSON.parse(localStorage.getItem("usuario")) as User;
                return this._actualizarTareaApi(this._user.access_token, actualizartarea)
             });
        } catch (e) {
            console.log("Error en promesa");
        }
  }

    public borrarTareaApi(borrartarea: BorrarTarea): Promise<any> {
        try {
            return this._authn.getUserFromUrl().then(user => {
                if (user && user.access_token) {
                    this._user = user;
                    localStorage.setItem("usuario", JSON.stringify(user));
                    return this._borrarTareaApi(user.access_token, borrartarea);
                }
                else if (user) {
                    return this._authn.renewToken().then(user => {
                        return this._borrarTareaApi(user.access_token, borrartarea);
                    });
                }
                else {
                    alert("Usuario no logueado");
                    throw new Error("user is not logged in");
                }
            }).catch(error =>
            {
                var usuario = JSON.parse(localStorage.getItem("usuario")) as User;
                return this._borrarTareaApi(this._user.access_token, borrartarea)
             });
        } catch (e) {
            console.log("Error en promesa");
        }
   
  }

  private _borrarTareaApi(token: string, borrartarea: BorrarTarea) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });

      return this._httpClient.post(Constants.apiRoot + "tareas/borrar", { "id": borrartarea.id }, { headers: headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
        if (result.status === 401) {
          return this._authn.renewToken().then(user => {
            return this._borrarTareaApi(user.access_token, borrartarea);
          });
        }
        throw result;
      });
  }

  private _actualizarTareaApi(token: string, actualizartarea: ActualizarTarea) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });

      return this._httpClient.post(Constants.apiRoot + "tareas/actualizar", { "id": actualizartarea.id, "descripcion": actualizartarea.descripcion, "fechaVencimiento": actualizartarea.fechaVencimiento, "finalizada": actualizartarea.finalizada }, { headers: headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
        if (result.status === 401) {
          return this._authn.renewToken().then(user => {
            return this._actualizarTareaApi(user.access_token, actualizartarea);
          });
        }
        throw result;
      });
  }

  private _crearTareaApi(token: string, creartarea: CrearTarea) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });

      return this._httpClient.post(Constants.apiRoot + "tareas/crear", { "descripcion": creartarea.descripcion, "fechaVencimiento": creartarea.fechaVencimiento }, { headers: headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
        if (result.status === 401) {
          return this._authn.renewToken().then(user => {
            return this._crearTareaApi(user.access_token, creartarea);
          });
        }
        throw result;
      });
  }

  private _getTareasConParametrosApi(token: string, parametros: Parametros) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
      });
      var parametrosQuery = this.objectToQuerystring(parametros).trim();
      parametrosQuery = parametrosQuery.substring(1, parametrosQuery.length);
      console.log("Parametros Query = " + parametrosQuery);
      return this._httpClient.get(Constants.apiRoot + "tareas/consultar?" + parametrosQuery, { headers: headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
        if (result.status === 401) {
          return this._authn.renewToken().then(user => {
            return this._getTareasConParametrosApi(user.access_token, parametros);
          });
        }
        throw result;
      });
  }

    private _getAllTareasApi(token: string) {
        try {
            let headers = new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            });

            return this._httpClient.get(Constants.apiRoot + "tareas/consultar", { headers: headers })
                .toPromise()
                .catch((result: HttpErrorResponse) => {
                    if (result.status === 401) {
                        return this._authn.renewToken().then(user => {
                            return this._getAllTareasApi(user.access_token);
                        });
                    }
                    throw result;
                });
        } catch (e) {
            console.log("Error en promesa");
        }
    
  }

    private objectToQuerystring(obj): string {
        let contador = 0;
        return Object.keys(obj).reduce( (str, key, i) => {
            var delimiter, val = encodeURIComponent(obj[key]);
            if (obj[key]) {
                delimiter = (str == undefined) ? '?' : '&';
                key = encodeURIComponent(key);
                return [str, delimiter, key, '=', val].join('');
            }
        }, '');
    }
}

