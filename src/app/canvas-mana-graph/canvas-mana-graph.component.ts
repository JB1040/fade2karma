import { Component, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'f2kCanvasManaGraph',
    template: '',
    styles: [`:host {
        display: block;
        width: 100%;
        height: 100%;
    }`]
})
export class CanvasManaGraphComponent implements OnInit, OnChanges {

    @Input() data: { [key: string]: number } = { '0': 2, '1': 4, '2': 7, '3': 4, '4': 2, '5': 0, '6': 1, '7+': 4 }; // as fallback

    canvas = document.createElement('canvas');
    ctx = this.canvas.getContext('2d');
    colWidth: number;
    width: number;
    height: number;
    header = 25;
    footer = 35;
    keys: Array<string>;
    maxDataHeightProportion = 0.8;
    valueHeightRep: number;
    hexagon: HTMLImageElement;

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        this.build();
    }

    constructor(private elRef: ElementRef) {
        new Promise(resolve => {
            this.hexagon = document.createElement('img');
            const path = 'assets/graph-images/mana.png';

            this.hexagon.onload = () => resolve({ path, status: 'ok' });
            this.hexagon.onerror = () => resolve({ path, status: 'error' });

            this.hexagon.src = path;
        }).then(() => {
            this.build(true);
        });
    }

    ngOnChanges(): void {
        this.build(true);
    }

    ngOnInit(): void {
        this.elRef.nativeElement.appendChild(this.canvas);
    }

    build(forceBuild?: boolean): void {
        console.log(this.elRef);
        const width = this.elRef.nativeElement.clientWidth - 1; // -1 for the up most right side border
        const height = this.elRef.nativeElement.clientHeight;
        if (forceBuild || this.width !== width || this.height !== height) {
            this.keys = Object.keys(this.data);
            this.width = width;
            this.height = height;
            this.canvas.width = this.width + 1;
            this.canvas.height = this.height;
            this.colWidth = Math.floor(this.width / this.keys.length);
            this.valueHeightRep = Math.ceil(((this.height - this.header - this.footer) * this.maxDataHeightProportion) / this.keys.reduce((acc, key) => Math.max(acc, this.data[key]), 0));
            this.draw();
        }
    }

    draw() {
        this.drawColumns();
        this.keys.forEach((key, index) => {
            this.drawHeader(key, index);
            this.drawFooter(key, index);
            this.drawData(key, index);
        });
    }

    drawCenteredText(text: string, xPos, yPos, font, style) {
        this.ctx.fillStyle = style;
        this.ctx.font = font;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, xPos, yPos);
    }

    drawHeader(key: string, index: number) { // Header height is 25px
        this.drawCenteredText(`${this.data[key]}`, ((this.colWidth * index) + (this.colWidth / 2)), (this.header - 5), 'bold 16px Roboto', '#333');
    }

    drawFooter(key: string, index: number) { // Footer height is 35px
        this.ctx.drawImage(this.hexagon, this.colWidth * index + Math.floor((this.colWidth - 31) / 2), this.height - this.footer + 4, 31, 31); // 31 image width
        this.ctx.shadowColor = 'black';
        this.ctx.shadowBlur = 4;
        this.drawCenteredText(key, ((this.colWidth * index) + (this.colWidth / 2)), this.height - 9, 'bold 16px Roboto', 'white');
        this.ctx.shadowBlur = 0;
    }

    drawColumns() {
        this.ctx.fillStyle = 'lightgray';
        // draw horizontal lines
        this.ctx.fillRect(0, this.header, (this.keys.length * this.colWidth) + 1, 1);
        this.ctx.fillRect(0, this.height - this.footer, (this.keys.length * this.colWidth) + 1, 1);

        for (let i = 0; i <= this.keys.length; i++) { // draw vertical lines
            this.ctx.fillRect(((i * (this.colWidth - 1)) + i), this.header, 1, (this.height - this.header - this.footer));
        }
    }

    drawData(key: string, index: number) {
        const height = this.data[key] * this.valueHeightRep;
        this.ctx.rect(((this.colWidth * index) + 1), (this.height - this.footer - height), this.colWidth - 1, height);
        this.ctx.fillStyle = '#67c8ff';
        this.ctx.fill();
    }
}
