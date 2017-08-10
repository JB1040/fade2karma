import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

    transform(value: string): string {
        if (value) {
            return value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        }
        return value;
    }
}
