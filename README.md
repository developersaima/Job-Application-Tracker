
Answers to Questions

1️. Difference between getElementById, getElementsByClassName, querySelector, querySelectorAll
getElementById → Selects one element using ID.

getElementsByClassName → Selects multiple elements using class name.

querySelector → Selects first matching element using CSS selector.

querySelectorAll → Selects all matching elements.

2️. How to create and insert a new element into DOM?
We use:

const div = document.createElement("div");
div.textContent = "New Job";
document.body.appendChild(div);

3️. What is Event Bubbling?
Event bubbling means when an event happens on a child element, it also moves upward to parent elements automatically.

4️. What is Event Delegation?
Event delegation means adding one event listener to a parent instead of multiple children. It works using event bubbling.

It is useful because:

Better performance

Works for dynamic elements

5️. Difference between preventDefault() and stopPropagation()
preventDefault() → Stops default browser behavior.

stopPropagation() → Stops event from bubbling to parent.