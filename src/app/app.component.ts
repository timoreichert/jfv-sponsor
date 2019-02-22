import { Component, OnInit } from '@angular/core';

export class Cell {
  id: string;

  constructor(r: number, c: number) {
    this.id = `${r}_${c}`;
  }
}

export class Row {
  cells: Array<Cell>;

  constructor() {
    this.cells = new Array<Cell>();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  amount: number;
  rows: Array<Row>;
  selectedCellIds: Array<string>;

  ngOnInit() {
    this.amount = 0;
    this.rows = new Array<Row>();
    this.selectedCellIds = new Array<string>();
    for (let r = 0; r < 21; r++) {
      const row = new Row();
      for (let c = 0; c < 35; c++) {
        row.cells.push(new Cell(r, c));
      }
      this.rows.push(row);
    }
  }

  getClass(id: string) {
    return this.selectedCellIds.indexOf(id) >= 0 ? [`cell_${id}`, 'selected'] : [`cell_${id}`];
  }

  select(id: string) {
    const index = this.selectedCellIds.indexOf(id);
    console.log(index);
    if (index >= 0) {
      this.selectedCellIds.splice(index, 1);
    } else {
      this.selectedCellIds.push(id);
    }

    this.amount = 10 * this.selectedCellIds.length;
  }

  reset() {
    this.selectedCellIds = new Array<string>();
  }

  submit() {
    this.selectedCellIds = new Array<string>();

  }
}
