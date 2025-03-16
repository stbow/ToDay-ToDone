# notes

* set up class for today vs tomorrow to determine which list it should go in
    * or use two different arrays?
    * pop() returns what it removes, so could pop from one array to add to the other
    * rename the data sets in js
* move add button outside the today/tomorrow boxes?
* jump between days - make each section an achor and link the button to the anchor
* css - is it possible to NOT show the tomorrow section (overflow: hidden) and still jump to it?
* will need to restyle .task-container
* need to look at how editing tasks worked
* use sticky for headers so they stay at the top of their divs but don't stay at the top of the page

## changes

* edit and delete buttons move to the right
* remove delete button?
* complete button - toggles .done, edits the font to strikethrough
* two data sets - today vs tomorrow

## arrays

- push - adds at the end
- pop - removes last element
- shift - removes first, shifts all others down
- unshift - adds to first slot, shifts all others up
- splice:
    - .splice(index to add, how many to remove, item to add, ...)
    - returns an array with the deleted items
