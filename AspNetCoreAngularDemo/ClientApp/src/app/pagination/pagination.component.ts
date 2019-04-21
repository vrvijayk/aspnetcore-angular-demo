import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  pagesCount;
  pages = [];
  currentPage;

  @Input("data-last-loaded") dataLastLoaded;
  @Input("total-items") totalItems;
  @Input("page-size") pageSize;
  @Output("page-changed") pageChanged = new EventEmitter()


  constructor() { }

  ngOnInit() {
  }


  ngOnChanges() {
    this.currentPage = 1;
    this.pages = [];

    if (this.totalItems > 0) {
      this.pagesCount = Math.ceil(this.totalItems / this.pageSize);
      for (var i = 1; i <= this.pagesCount; i++)
        this.pages.push(i);
    }
  }
  onPrevious() {
    this.raisePageChanged(this.currentPage > 1 ? this.currentPage - 1 : 1);
  }

  onNext() {
    this.raisePageChanged(this.currentPage < this.pagesCount ? this.currentPage + 1 : this.pagesCount);
  }

  onNavigate(page) {
    this.raisePageChanged(page);
  }

  raisePageChanged(page) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }
}
