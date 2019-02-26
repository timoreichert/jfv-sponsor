import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

export class Cell {
  id: string;
  customerId: string;

  constructor(r: number, c: number, customerId?: string) {
    this.id = `${r}_${c}`;
    this.customerId = customerId;
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

  form: FormGroup;
  rows: Array<Row>;
  private readonly spezialCellIds = ['10_5', '10_29'];
  private soldCells: Map<string, Cell>;
  private reservedCells: Map<string, Cell>;
  private selectedCellIds: Array<string>;

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.rows = new Array();
    this.soldCells = new Map<string, Cell>();
    this.reservedCells = new Map<string, Cell>();
    this.selectedCellIds = new Array<string>();
    for (let r = 0; r < 21; r++) {
      const row = new Row();
      for (let c = 0; c < 35; c++) {
        row.cells.push(new Cell(r, c));
      }
      this.rows.push(row);
    }

    [7, 8, 9, 10, 11, 12, 13].forEach(x => [0, 1, 2]
      .map(y => new Cell(x, y, '4711'))
      .forEach(c => this.soldCells.set(c.id, c))
    );

    [8, 9, 10, 11, 12].forEach(x => [15, 16, 17, 18, 19]
      .map(y => new Cell(x, y, '4712'))
      .forEach(c => this.reservedCells.set(c.id, c))
    );

    this.form = new FormGroup({
      amount: new FormControl(0, Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }

  getTitle(id: string) {
    if (this.reservedCells.has(id)) {
      return this.reservedCells.get(id).customerId;
    } else if (this.soldCells.has(id)) {
      return this.soldCells.get(id).customerId;
    } else {
      return this.getCellPrice(id) + ' €';
    }
  }

  getClass(id: string) {
    const classes = ['cell', `cell_${id}`];
    if (this.selectedCellIds.indexOf(id) >= 0) {
      classes.push('selected');
    } else if (this.reservedCells.has(id)) {
      classes.push('reserved');
    } else if (this.soldCells.has(id)) {
      classes.push('sold');
    }
    return classes;
  }

  select(id: string): void {
    if (this.reservedCells.has(id)) {
      this.bottomSheet.open(CustomerComponent, {
        data: {
          state: 'reserved',
          customerId: this.reservedCells.get(id).customerId
        }
      });
    } else if (this.soldCells.has(id)) {
      this.bottomSheet.open(CustomerComponent, {
        data: {
          state: 'sold',
          customerId: this.soldCells.get(id).customerId
        }
      });
    } else {
      const index = this.selectedCellIds.indexOf(id);
      if (index >= 0) {
        this.selectedCellIds.splice(index, 1);
      } else {
        this.selectedCellIds.push(id);
      }

      this.form.patchValue({
        amount: this.getCellPrice(id) * this.selectedCellIds.length
      });
    }
  }

  getCellPrice(id: string): number {
    console.dir(this.spezialCellIds);
    console.log(id, this.spezialCellIds.indexOf(id));
    return this.spezialCellIds.indexOf(id) > -1 ? 50 : 10;
  }

  reset() {
    this.ngOnInit();
  }

  submit() {
    console.dir(this.form.value);
  }
}

@Component({
  selector: 'app-sheet-overview-example-sheet',
  template: `
  <h1>{{state}}</h1>
  <h2>Name: {{customerId}}</h2>`,
})
export class CustomerComponent {
  public state: string;
  public customerId: string;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.state = data.state;
    this.customerId = data.customerId;
  }


}
