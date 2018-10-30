import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'f2kPagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

    @Input() totalPages: number;
    @Input() activePage: number;

    @Output() activePageChange = new EventEmitter<number>();

    pages: Array<number> = [];

    constructor() {}

    ngOnInit(): void {
        this.setPages();
    }

    setPages(): void {
        this.pages = [];
        const firstDisplayedPage = Math.max(Math.min(this.activePage - 2, this.totalPages - 4), 1);

        for (let i = firstDisplayedPage; i < 5 + firstDisplayedPage && i <= this.totalPages; i++) {
            this.pages.push(i);
        }
    }

    changeCurrentPage(page: number | 'last' | 'first' | 'next' | 'previous') {
        if (typeof page === 'number') {
            this.activePage = page;
        } else {
            switch (page) {
                case 'last':
                    this.activePage = this.totalPages;
                    break;
                case 'first':
                    this.activePage = 1;
                    break;
                case 'next':
                    ++this.activePage;
                    break;
                case 'previous':
                    --this.activePage;
                    break;
            }
        }

        this.setPages();
        this.activePageChange.emit(this.activePage);
    }
}
