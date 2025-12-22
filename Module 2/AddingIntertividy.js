/*
Responding to Events
React lets you add event handlers to your JSX. Event handlers are your own functions that will be triggered in response to interactions like clicking, hovering, focusing form inputs, and so on.

To add an event handler, you will first define a function and then pass it as a prop to the appropriate JSX tag. 
1. Declare a function called handleClick inside your Button component.
2. Implement the logic inside that function 
3. Add onClick={handleClick} to the <button> JSX.
here handleClick is an event handler. 

Event handler functions:

1. Are usually defined inside your components.
2. Have names that start with handle, followed by the name of the event.

Functions passed to event handlers must be passed, not called.
like <button onClick={handleClick}></button>. not <button onClick={handleClick()}></button>

Because event handlers are declared inside of a component, they have access to the component’s props.
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}
here onClick event handler has accessed to message props of AlertButton

we can also pass event handler function as a props
function AlertButton({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}
here onSmash is a event handler function

Built-in components like <button> and <div> only support browser event names like onClick. However, when you’re building your own components, you can name their event handler props/function any way that you like.

By convention, event handler props should start with on, followed by a capital letter like onSmash
*/

/*
** Event propagation
Event handlers will also catch events from any children your component might have. We say that an event “bubbles” or “propagates” up the tree: it starts with where the event happened, and then goes up the tree.

All events propagate in React except onScroll, which only works on the JSX tag you attach it to.

** Stopping propagation
Event handlers receive an event object as their only argument. By convention, it’s usually called e, which stands for “event”. You can use this object to read information about the event.

That event object also lets you stop the propagation. If you want to prevent an event from reaching parent components, you need to call e.stopPropagation()

function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
You could add more code to this handler before calling the parent onClick event handler, too. This pattern provides an alternative to propagation. It lets the child component handle the event, while also letting the parent component specify some additional behavior like we can use onClick for not only use only one function like onClick={handleClick} we can use multiple work in onClick like onClick={(e)=>{ e.stopPropagation(); handleStop(); handleClick() }}

to prevent form from submitting : e.preventDefault();
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}

e.stopPropagation() stops the event handlers attached to the tags above from firing.
e.preventDefault() prevents the default browser behavior for the few events that have it.

Event handlers are the best place for side effects.Unlike rendering functions, event handlers don’t need to be pure, so it’s a great place to change something—for example, change an input’s value in response to typing, or change a list in response to a button press. However, in order to change some information, you first need some way to store it. 


*/


/*
State: A Component's Memory
Components often need to change what’s on the screen as a result of an interaction. Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” should put a product in the shopping cart. Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called state.

 two things prevent that change from being visible:

1.Local variables don’t persist between renders. When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.
2.Changes to local variables won’t trigger renders. React doesn’t realize it needs to render the component again with the new data.

To update a component with new data, two things need to happen:

1.Retain the data between renders.
2.Trigger React to render the component with new data (re-rendering).

The useState Hook provides those two things:

1. A state variable to retain the data between renders.
2. A state setter function to update the variable and trigger React to render the component again.

const [index, setIndex] = useState(0);
here index is a state variable and setIndex is the setter function.

In React, useState, as well as any other function starting with “use”, is called a Hook.
Hooks are special functions that are only available while React is rendering (which we’ll get into in more detail on the next page). They let you “hook into” different React features.

Hooks—functions starting with use—can only be called at the top level of your components or your own Hooks. You can’t call Hooks inside conditions, loops, or other nested functions

Every time your component renders, useState gives you an array containing two values:

1. The state variable (index) with the value you stored.
2. The state setter function (setIndex) which can update the state variable and trigger React to render the component again.
You can have as many state variables of as many types as you like in one component.

State is local to a component instance on the screen. In other words, if you render the same component twice, each copy will have completely isolated state! Changing one of them will not affect the other.
 Unlike props, state is fully private to the component declaring it. The parent component can’t change it. This lets you add state to any component or remove it without impacting the rest of the components.
 What if you wanted both galleries to keep their states in sync? The right way to do it in React is to remove state from child components and add it to their closest shared parent.


*/

/*
**Render and Commit

Before your components are displayed on screen, they must be rendered by React. Understanding the steps in this process will help you think about how your code executes and explain its behavior.

This process of requesting and serving UI has three steps:

1. Triggering a render (delivering the guest’s order to the kitchen)
2. Rendering the component (preparing the order in the kitchen)
3. Committing to the DOM (placing the order on the table)

Step 1: Trigger a render
There are two reasons for a component to render:
1. It’s the component’s initial render.
2. The component’s (or one of its ancestors’) state has been updated.
Once the component has been initially rendered, you can trigger further renders by updating its state with the set function. Updating your component’s state automatically queues a render. 

Step 2: React renders your components 

After you trigger a render, React calls your components to figure out what to display on screen. “Rendering” is React calling your components.

On initial render, React will call the root component.
For subsequent renders, React will call the function component whose state update triggered the render.
This process is recursive: if the updated component returns some other component, React will render that component next, and if that component also returns something, it will render that component next, and so on. The process will continue until there are no more nested components and React knows exactly what should be displayed on screen.

Rendering must always be a pure calculation:

Same inputs, same output. Given the same inputs, a component should always return the same JSX. (When someone orders a salad with tomatoes, they should not receive a salad with onions!)
It minds its own business. It should not change any objects or variables that existed before rendering. (One order should not change anyone else’s order.)
Otherwise, you can encounter confusing bugs and unpredictable behavior as your codebase grows in complexity. When developing in “Strict Mode”, React calls each component’s function twice, which can help surface mistakes caused by impure functions.

Step 3: React commits changes to the DOM 
After rendering (calling) your components, React will modify the DOM.

For the initial render, React will use the appendChild() DOM API to put all the DOM nodes it has created on screen.
For re-renders, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.
React only changes the DOM nodes if there’s a difference between renders.

Epilogue: Browser paint 
After rendering is done and React updated the DOM, the browser will repaint the screen. Although this process is known as “browser rendering”, we’ll refer to it as “painting” to avoid confusion throughout the docs.
You can use Strict Mode to find mistakes in your components
React does not touch the DOM if the rendering result is the same as last time
*/

/*
**State as a Snapshot
State variables might look like regular JavaScript variables that you can read and write to. However, state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.

“Rendering” means that React is calling your component, which is a function. The JSX you return from that function is like a snapshot of the UI in time. Its props, event handlers, and local variables were all calculated using its state at the time of the render.

When React re-renders a component:
1. React calls your function again.
2. Your function returns a new JSX snapshot.
3. React then updates the screen to match the snapshot your function returned.

When React re-renders a component:

React calls your function again.
Your function returns a new JSX snapshot.
React then updates the screen to match the snapshot your function returned.

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
If you use the substitution method from before, you can guess that the alert shows “0”:

setNumber(0 + 5);
alert(0);

      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);

A state variable’s value never changes within a render, even if its event handler’s code is asynchronous. Inside that render’s onClick, the value of number continues to be 0 even after setNumber(number + 5) was called. Its value was “fixed” when React “took the snapshot” of the UI by calling your component.

React keeps the state values “fixed” within one render’s event handlers. You don’t need to worry whether the state has changed while the code is running.

Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
*/