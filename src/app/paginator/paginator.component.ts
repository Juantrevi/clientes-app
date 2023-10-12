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
      const currentPage = this.paginatorChild.number;
      const totalPages = this.paginatorChild.totalPages;

      this.from = Math.max(1, currentPage - 2);
      this.to = Math.min(totalPages, currentPage + 2);

      if (totalPages > 5) {
        if (currentPage <= 3) {
          this.to = 5;
        } else if (currentPage >= totalPages - 2) {
          this.from = totalPages - 4;
        }

        this.pages = new Array(5).fill(0).map((_value, index) => index + this.from);
      } else {
        this.pages = new Array(totalPages).fill(0).map((_value, index) => index + 1);
      }
    }
}
