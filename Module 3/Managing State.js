/*
Controlled component :: In a controlled component, the form data is handled by the React state. The input value is driven by the state, and every update to the input is handled by an event handler like onChange.
1. Source of Truth: React State.
2. Data Flow: Bi-directional (State updates the UI, and UI events update the State).
example ::
function ControlledInput() {
  const [name, setName] = React.useState('');

  return (
    <input 
      type="text" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );
}
Uncontrolled component :: Uncontrolled components work more like traditional HTML form elements. Instead of writing an event handler for every state update, you use a ref to pull the value from the DOM when you need it (usually upon submission).
1.Source of Truth: The DOM itself.
2. Data Flow: Pull-based (You grab the value only when necessary).
example:
function UncontrolledInput() {
  const inputRef = React.useRef(null);

  const handleSubmit = () => {
    alert('A name was submitted: ' + inputRef.current.value);
  };

  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
*/

/*
** Reacting to Input with State
React provides a declarative way to manipulate the UI. Instead of manipulating individual pieces of the UI directly, you describe the different states that your component can be in, and switch between them in response to the user input. This is similar to how designers think about the UI.

In imperative programming, the above corresponds directly to how you implement interaction. You have to write the exact instructions to manipulate the UI depending on what just happened. Here’s another way to think about this: imagine riding next to someone in a car and telling them turn by turn where to go.They don’t know where you want to go, they just follow your commands. (And if you get the directions wrong, you end up in the wrong place!) It’s called imperative because you have to “command” each element, from the spinner to the button, telling the computer how to update the UI.

In React, you don’t directly manipulate the UI—meaning you don’t enable, disable, show, or hide components directly. Instead, you declare what you want to show, and React figures out how to update the UI. Think of getting into a taxi and telling the driver where you want to go instead of telling them exactly where to turn. It’s the driver’s job to get you there, and they might even know some shortcuts you haven’t considered! It’s called declarative 

* Thinking about UI declaratively
You’ve seen how to implement a form imperatively above. To better understand how to think in React, you’ll walk through reimplementing this UI in React below:

1. Identify your component’s different visual states
2. Determine what triggers those state changes
3. Represent the state in memory using useState
4. Remove any non-essential state variables
5. Connect the event handlers to set the state

Step 1: Identify your component’s different visual states 
In computer science, you may hear about a “state machine” being in one of several “states”. If you work with a designer, you may have seen mockups for different “visual states”. React stands at the intersection of design and computer science, so both of these ideas are sources of inspiration.Just like a designer, you’ll want to “mock up” / screenshot or create “mocks”/screenshot for the different states before you add logic. 

If a component has a lot of visual states, it can be convenient to show them all on one page.Pages like this are often called “living styleguides” or “storybooks”.

Step 2: Determine what triggers those state changes
You can trigger state updates in response to two kinds of inputs:

1. Human inputs, like clicking a button, typing in a field, navigating a link.
2. Computer inputs, like a network response arriving, a timeout completing, an image loading.
In both cases, you must set state variables to update the UI.Notice that human inputs often require event handlers!

Step 3: Represent the state in memory with useState 
Next you’ll need to represent the visual states of your component in memory with useState. Simplicity is key: each piece of state is a “moving piece”, and you want as few “moving pieces” as possible. More complexity leads to more bugs!
Start with the state that absolutely must be there.
Then, you’ll need a state variable representing which one of the visual states that you want to display. There’s usually more than a single way to represent that in memory, so you’ll need to experiment with it.If you struggle to think of the best way immediately, start by adding enough state that you’re definitely sure that all the possible visual states are covered

Step 4: Remove any non-essential state variables
You want to avoid duplication in the state content so you’re only tracking what is essential. Spending a little time on refactoring your state structure will make your components easier to understand, reduce duplication, and avoid unintended meanings. Your goal is to prevent the cases where the state in memory doesn’t represent any valid UI that you’d want a user to see. 

Here are some questions you can ask about your state variables:

1. Does this state cause a paradox? For example, isTyping and isSubmitting can’t both be true. A paradox usually means that the state is not constrained enough. There are four possible combinations of two booleans, but only three correspond to valid states. To remove the “impossible” state, you can combine these into a status that must be one of three values: 'typing', 'submitting', or 'success'.
2. Is the same information available in another state variable already? Another paradox: isEmpty and isTyping can’t be true at the same time. By making them separate state variables, you risk them going out of sync and causing bugs. Fortunately, you can remove isEmpty and instead check answer.length === 0.
3. Can you get the same information from the inverse of another state variable? isError is not needed because you can check error !== null instead.

Step 5: Connect the event handlers to set state 

Lastly, create event handlers that update the state. Below is the final form, with all event handlers wired up


*/

/*
*** Choosing the State Structure
Structuring state well can make a difference between a component that is pleasant to modify and debug, and one that is a constant source of bugs. 
** Principles for structuring state
When you write a component that holds some state, you’ll have to make choices about how many state variables to use and what the shape of their data should be. While it’s possible to write correct programs even with a suboptimal state structure, there are a few principles that can guide you to make better choices:

1. Group related state. If you always update two or more state variables at the same time, consider merging them into a single state variable.
2. Avoid contradictions in state. When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.
3. Avoid redundant state. If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
4. Avoid duplication in state. When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.
5. Avoid deeply nested state. Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.
The goal behind these principles is to make state easy to update without introducing mistakes. Removing redundant and duplicate data from state helps ensure that all its pieces stay in sync.

* Group related state
But if some two state variables always change together, it might be a good idea to unify them into a single state variable. Then you won’t forget to always keep them in sync,
const [x, setX] = useState(0);
const [y, setY] = useState(0);
instead of write the mouse onPointerMove like this use const [position, setPosition] = useState({ x: 0, y: 0 });
as x and y always change together.

If your state variable is an object, remember that you can’t update only one field in it without explicitly copying the other fields. For example, you can’t do setPosition({ x: 100 }) in the above example because it would not have the y property at all! Instead, if you wanted to set x alone, you would either do setPosition({ ...position, x: 100 }), or split them into two state variables and do setX(100).

Another case where you’ll group data into an object or an array is when you don’t know how many pieces of state you’ll need. For example, it’s helpful when you have a form where the user can add custom fields.
then use useState([]) and add the item in it.and use map to show them

* Avoid contradictions in state

import { useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false); // if we forget to write these two line then there will be problem
    setIsSent(true); // as setIsSending and setIsSent cannot be true at the same time then we can use them together using one state variable like status like this   const [status, setStatus] = useState('typing');
  }

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

While this code works, it leaves the door open for “impossible” states. For example, if you forget to call setIsSent and setIsSending together, you may end up in a situation where both isSending and isSent are true at the same time. The more complex your component is, the harder it is to understand what happened.

async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

so if two state variable can't be true at the same time we can write it in one state variable

* Avoid redundant state
If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  This form has three state variables: firstName, lastName, and fullName. However, fullName is redundant. You can always calculate fullName from firstName and lastName during render, so remove it from state..so we will use derive state
  // derive state
  const fullName = firstName + " "+lastName
  Here, fullName is not a state variable. Instead, it’s calculated during render.As a result, the change handlers don’t need to do anything special to update it. When you call setFirstName or setLastName, you trigger a re-render, and then the next fullName will be calculated from the fresh data.

  * Don’t mirror props in state
 function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);

  Here, a color state variable is initialized to the messageColor prop. The problem is that if the parent component passes a different value of messageColor later (for example, 'red' instead of 'blue'), the color state variable would not be updated! The state is only initialized during the first render.

This is why “mirroring” some prop in a state variable can lead to confusion. Instead, use the messageColor prop directly in your code. If you want to give it a shorter name, use a constant:
function Message({ messageColor }) {
  const color = messageColor;

”Mirroring” props into state only makes sense when you want to ignore all updates for a specific prop. By convention, start the prop name with initial or default to clarify that its new values are ignored:
function Message({ initialColor }) {
  // The `color` state variable holds the *first* value of `initialColor`.
  // Further changes to the `initialColor` prop are ignored.
  const [color, setColor] = useState(initialColor);

* Avoid duplication in state
const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

Currently, it stores the selected item as an object in the selectedItem state variable. However, this is not great: the contents of the selectedItem is the same object as one of the items inside the items list. This means that the information about the item itself is duplicated in two places.

Although you could update selectedItem too, an easier fix is to remove duplication. In this example, instead of a selectedItem object (which creates a duplication with objects inside items), you hold the selectedId in state, and then get the selectedItem by searching the items array for an item with that ID:

  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }
  
so if i have the data like an array of object then i will use state variable to store id and then use find method to find in it in the array of object. i will not store the entire object in a state variable as it will cause duplication because the entire object is present in the array of object.


*/