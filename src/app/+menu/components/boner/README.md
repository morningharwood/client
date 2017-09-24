#Boner Component

## Type:
- Introduction sequence.

## Type:
- Animation Sequence

## Description:
- Onload create a black 3d gl rectangle will grow and raise up like a boner.  A sun will stagger in behind it.  The boner
  geometry will be like clouds shrouding the sun cutting it in half. maybe real clouds will pass over and behind
  the boner.

## How to use
- A single component/directive that is or decorates a canvas tag.
- A set of directive to control look and feel properties. e.g. color of boner.

## Ideas
- Allow to track mouse and edit the position, shadow, light of the boner.


##Example
```
<!--structural  implemenetation-->
<canvas boner></canvas> 

<!--behaviorial implemenetation-->
<button [bonerAction]='{bgColor: red}'>
    turn me red
</button>
```