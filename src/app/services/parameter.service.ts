import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InformationReseau } from '../models/information-reseau';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  primaryColor = "#333333";

  public static configuration = {
    primaryColor: "#333333",
    secondaryColor: "#910e3a",
    reseauName: "Dunamis"
  } as InformationReseau;



  constructor() { }

  getPrimaryColor(): Observable<string> {
    // TO DO
    return of(this.primaryColor);
  }

  getConfigurationReseau(): Observable<InformationReseau> {
    // TO DO
    return of(ParameterService.configuration);
  }

}
