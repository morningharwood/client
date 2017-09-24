/**
 * Created by matth on 2/19/2017.
 */


/**
 * @whatItDoes Shuffles data randomly based on the hilarious bogo sort.
 * @visualize https://www.youtube.com/watch?v=DaPJkYo2quc
 * @reference https://rosettacode.org/wiki/Sorting_algorithms/Bogosort
 */
export function bogo<T>(v:Array<T>):Array<T> {
  for(let j, x, i = v.length; i; j = Math.floor(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
  return v;
}
