// src/app/components/states/states.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatesService, State } from '../../services/states/states';

@Component({
  selector: 'app-states',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './states.html',
})
export class StatesComponent implements OnInit, OnChanges {
  @Input()  countryId!: number;
  @Input()  selectedId: number | null = null;
  @Output() selectedIdChange = new EventEmitter<number>();

  states: State[] = [];

  constructor(private statesService: StatesService) {}

  ngOnInit(): void {
    this.loadStates();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['countryId']) {
      this.loadStates();
    }
  }

  private loadStates() {
    if (!this.countryId) {
      this.states = [];
      return;
    }
    this.statesService.getStatesByCountry(this.countryId).subscribe({
      next: data => this.states = data,
      error: err  => console.error('Error al cargar estados', err)
    });
  }

  onSelect(id: number) {
    this.selectedId = id;
    this.selectedIdChange.emit(id);
  }
}
