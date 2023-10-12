import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit{
   @Input() paginatorChild: any;

   pages: number[];

   constructor() { }  

    ngOnInit(): void {
      this.pages = new Array(this.paginatorChild.totalPages).fill(0).map((_value, index) => index + 1);
    }
}
