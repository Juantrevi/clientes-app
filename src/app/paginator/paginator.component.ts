import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges{
   @Input() paginatorChild: any;

   pages: number[];

   from: number;
    to: number;

   constructor() { }  

    ngOnInit(): void {
      this.initPaginator();
    }

    ngOnChanges(change: SimpleChanges): void {
      let updatedPaginator = change['paginatorChild'];

      if (updatedPaginator.previousValue) {
        this.initPaginator();
      }
    }

    
    public initPaginator(): void {
      this.from = Math.min(Math.max(1, this.paginatorChild.number - 4), this.paginatorChild.totalPages - 5);
      this.to = Math.max(Math.min(this.paginatorChild.totalPages, this.paginatorChild.number + 4), 6);

      if (this.paginatorChild.totalPages > 5) {
        this.pages = new Array(this.to - this.from + 1).fill(0).map((_value, index) => index + this.from);


      } else {

        this.pages = new Array(this.paginatorChild.totalPages).fill(0).map((_value, index) => index + 1);

      }
    }
}
