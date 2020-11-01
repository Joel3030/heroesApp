import { Injectable } from '@angular/core';
import { HeroeModule } from '../models/heroe/heroe.module';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://login-app-96239.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModule) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return resp;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModule) {
    const heroeTemp = {
      ...heroe,
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArreglo));
  }

  private crearArreglo(heroeObj: object) {
    const heroes: HeroeModule[] = [];

    if (heroes === null) {
      return [];
    }

    Object.keys(heroeObj).forEach((key) => {
      const heroe: HeroeModule = heroeObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }
}
