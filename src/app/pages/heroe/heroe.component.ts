import { Component, OnInit } from '@angular/core';
import { HeroeModule } from '../../models/heroe/heroe.module';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  constructor(private heroesService: HeroesService) {}
  heroe: HeroeModule = new HeroeModule();

  ngOnInit(): void {}

  guardar(f: NgForm) {
    if (f.invalid) {
      return;
    }

    swal.fire({
      title: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success',
    });
    swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Actualizcion completada',
        icon: 'success',
      });
    });
  }
}
