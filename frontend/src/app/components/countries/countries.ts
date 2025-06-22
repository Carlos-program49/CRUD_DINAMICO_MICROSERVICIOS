// src/app/components/countries/countries.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountriesService, Country } from '../../services/countries/countries';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './countries.html',
})
export class CountriesComponent implements OnInit {
  @Input()  selectedId: number | null = null;
  @Output() selectedIdChange = new EventEmitter<number>();

  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe({
      next: data => this.countries = data,
      error: err  => console.error('Error al cargar países', err)
    });
  }

  onSelect(id: number) {
    this.selectedId = id;
    this.selectedIdChange.emit(id);
  }
}
