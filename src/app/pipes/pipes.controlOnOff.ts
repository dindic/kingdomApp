import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'onOff'})
export class ControlOnOffPipe implements PipeTransform {
    transform(value) {
        return value ? 'On' : 'Off';
    }
}
