import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'f2kUrlPipe'})
export class F2kUrlPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/ /g, '_').toLowerCase();
    }
}
