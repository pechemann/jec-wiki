import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class JecReferenceMenuService {

  constructor(private _http: HttpClient) { }

  public getData(): Observable<any> {
    return this._http.get(environment.dataSource + "resources/wiki/config.json");
  }
}
