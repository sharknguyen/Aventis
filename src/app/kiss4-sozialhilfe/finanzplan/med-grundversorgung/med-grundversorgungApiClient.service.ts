import { Adapter, Body, DefaultHeaders, DELETE, GET, HttpService, Path, POST, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MedGrundversorgungService } from './med-grundversorgung.service';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class MedGrundversorgungApiClient extends HttpService {

}
