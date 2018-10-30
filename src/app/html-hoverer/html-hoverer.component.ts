import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'f2kHtmlHoverer',
    templateUrl: './html-hoverer.component.html',
    styleUrls: ['./html-hoverer.component.css']
})
export class HtmlHovererComponent {

    @Input() htmlString: string | void;
    @Input() height?: number;
    @Input() width?: number;

    @ViewChild('htmlContainer') containerEl: ElementRef;

    active = false;

    constructor(private cdRef: ChangeDetectorRef, private elRef: ElementRef) {}

    close(): void {
        this.active = false;
    }

    open(event?: MouseEvent): void {
        this.active = true;
        this.cdRef.detectChanges();
        if (event) {
            this.positionRelativeToMouse(event);
        }
    }

    toggle(event?: MouseEvent): void {
        this.active ? this.close() : this.open(event);
    }

    containsEl($event: MouseEvent): boolean {
        return this.elRef.nativeElement.contains($event.target);
    }

    positionRelativeToMouse(event: MouseEvent): void {
        if (!this.active || !this.containerEl) {
            return;
        }

        const wH = window.innerHeight;
        const wW = window.innerWidth;
        const elPos = this.containerEl.nativeElement.getBoundingClientRect();
        const elH = elPos.height;
        const elW = elPos.width;
        const styleRef = this.containerEl.nativeElement.style;

        styleRef.top = '';
        styleRef.right = '';
        styleRef.bottom = '';
        styleRef.left = '';

        if (event.x * 2 > wW) {
            styleRef.left = Math.max(0, event.x - (this.width || elW) - 20) + 'px';

        } else {
            styleRef.right = Math.max(0, wW - event.x - (this.width || elW) - 20) + 'px';
        }

        if (event.y * 2 > wH) {
            styleRef.top = Math.max(0, event.y - (this.height || elH) - 20) + 'px';
        } else {
            styleRef.bottom = Math.max(0, wH - event.y - (this.height || elH) - 20) + 'px';
        }
    }
}
