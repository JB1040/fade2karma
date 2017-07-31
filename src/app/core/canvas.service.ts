import {Injectable} from '@angular/core';

@Injectable()
export class CanvasService {
    ctx = document.createElement('canvas').getContext('2d');

    getTextWidht(text: string, fontWeight, fontSize, fontStyle) {
        this.ctx.font = [fontWeight, fontSize, fontStyle].filter(value => value).join(' ');
        return this.ctx.measureText(text).width;
    }
}
