# Lab Quiz 2 – Pacman Math Challenge

## Question
Explain how the HTML structure, CSS design, and JavaScript logic can work together so that when the calculator result matches the target number, one dot disappears and Pacman appears to eat it.

## Answer

### HTML Structure
- Pacman is built using three `<div>` elements: two halves (top jaw and bottom jaw) and a small circle for the eye, all nested inside a parent `.pacman` container.
- The dots are simple `<div>` elements with unique IDs (`d1` through `d8`) placed inside a `.track` container alongside Pacman.
- A calculator is built using an `<input>` field for the display and `<button>` elements arranged in a grid for digits and operators.
- A target number is displayed at the top of the page using a `<span>` element.

### CSS Design
- Pacman's shape is created using `border-radius` to make semi-circles for the top and bottom jaws, with a yellow background color.
- The chomping animation is done purely with CSS `@keyframes` that rotate the top jaw upward and the bottom jaw downward repeatedly.
- Dots are styled as small white circles using `border-radius: 50%`.
- Each dot is positioned along the track using `nth-child` selectors with specific `left` values.
- A `.eaten` CSS class is pre-defined with `opacity: 0` and `scale(0)` along with a `transition` so when this class is applied, the dot smoothly fades and shrinks away.
- Pacman has a CSS `transition` on its `left` property so when its position changes, it smoothly slides to the new location.

### JavaScript Logic
- JavaScript does **not** create any new HTML elements or CSS animations.
- It only does two things when the calculator result matches the target:
  1. **Adds the `.eaten` class** to the next dot element — the CSS transition handles the disappearing animation.
  2. **Updates `pacman.style.left`** to the position of that dot — the CSS transition handles the sliding movement.
- This makes it look like Pacman moves to the dot and eats it, but all the visual animation is handled by CSS transitions and keyframes.
- If the result does not match the target, a message is displayed telling the user the result was wrong.

### Summary
HTML provides the structure (Pacman parts, dots, calculator), CSS handles all visual styling and animations (chomping, dot disappearing, Pacman sliding), and JavaScript acts as the controller that only modifies CSS classes and style attributes based on the calculator result — it never creates elements or animations directly.
