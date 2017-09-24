/**
 * Created by matth on 2/20/2017.
 */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

/**
 * @whatItDoes Take an Array makes a interval stream and emits one item based on that interval.
 * @visualize https://www.youtube.com/watch?v=DaPJkYo2quc
 * @reference https://rosettacode.org/wiki/Sorting_algorithms/Bogosort
 */
export function pulseData$<T>(data:Array<T>, param?:string, interval:number = 1000):Observable<T> {
  const length = data.length - 1;
  return Observable
    .interval(interval)
    .take(length)
    .map(i => data[i][param])
}
