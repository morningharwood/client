/**
 * Created by matth on 2/20/2017.
 */
import { Pipe, PipeTransform } from "@angular/core";
import { IPipe } from './pipe.interface';


const NAME: IPipe = {name: 'capitalize'};

@Pipe(NAME)
export class CapitalizePipe implements PipeTransform {

  transform(value: any) {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }
}
