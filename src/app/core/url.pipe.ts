import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'f2kUrlPipe'})
export class F2kUrlPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/ /g, '_').replace(/[^a-zA-Z0-9;,+*()\'$!-._~?/]/g, '').toLowerCase();
    }
}
