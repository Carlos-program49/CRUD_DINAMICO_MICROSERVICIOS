// src/app/components/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { CountriesComponent } from '../countries/countries';
import { StatesComponent }    from '../states/states';
import { UserDTO, UsersService, User }      from '../../services/users/users';
import { CountriesService, Country }        from '../../services/countries/countries';
import { StatesService, State }             from '../../services/states/states';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CountriesComponent, StatesComponent],
  templateUrl: './user-form.html',
})
export class UserFormComponent implements OnInit {
  model: UserDTO = { nombre:'', apellido:'', edad:0, countryId:0, stateId:0 };
  countries: Country[] = [];
  users: Array<User & { countryName: string; stateName: string }> = [];
  editingId: number | null = null;

  constructor(
    private usersSrv:     UsersService,
    private countriesSrv: CountriesService,
    private statesSrv:    StatesService
  ) {}

  ngOnInit(): void {
    this.countriesSrv.getAllCountries().subscribe({
      next: data => {
        this.countries = data;
        this.loadUsers();
      },
      error: err => console.error('Error cargando países', err)
    });
  }

  save() {
    if (this.editingId != null) {
      this.usersSrv.update(this.editingId, this.model).subscribe({
        next: () => { this.cancelEdit(); this.loadUsers(); },
        error: err => console.error('Error al actualizar usuario', err)
      });
    } else {
      this.usersSrv.add(this.model).subscribe({
        next: () => { this.resetForm(); this.loadUsers(); },
        error: err => console.error('Error al guardar usuario', err)
      });
    }
  }

  edit(u: User) {
    this.editingId = u.id;
    this.model = {
      nombre:    u.nombre,
      apellido:  u.apellido,
      edad:      u.edad,
      countryId: u.countryId,
      stateId:   u.stateId
    };
  }

  cancelEdit() {
    this.editingId = null;
    this.resetForm();
  }

  delete(u: User) {
    if (!confirm(`¿Borrar a ${u.nombre} ${u.apellido}?`)) return;
    this.usersSrv.delete(u.id).subscribe({
      next: () => this.loadUsers(),
      error: err => console.error('Error al borrar usuario', err)
    });
  }

  private loadUsers() {
    this.usersSrv.getAll().subscribe({
      next: data => {
        this.users = data.map(u => ({
          ...u,
          countryName: this.countries.find(c => c.id === u.countryId)?.nombre ?? '—',
          stateName:   ''
        }));
        this.users.forEach(u => {
          this.statesSrv.getStatesByCountry(u.countryId).subscribe({
            next: (states: State[]) => {
              u.stateName = states.find(s => s.id === u.stateId)?.nombre ?? '—';
            },
            error: err => console.error(`Error cargando estados país ${u.countryId}`, err)
          });
        });
      },
      error: err => console.error('Error al cargar usuarios', err)
    });
  }

  private resetForm() {
    this.model = { nombre:'', apellido:'', edad:0, countryId:0, stateId:0 };
  }
}
