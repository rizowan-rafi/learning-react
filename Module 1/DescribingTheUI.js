/*
** Component

React lets you create components, reusable UI elements for your app.
In a React app, every piece of UI is a component.
we can use the component in other component
you can create components that are composed of other components.
React components are regular JavaScript functions except:
    1. Their names always begin with a capital letter.
    2. They return JSX markup.

export default function Profile() {
    return (
        <h1>good job!</h1>
    )
}
*/

/*
** Importing and Exporting

You can move a component in three steps:

1. Make a new JS file to put the components in.
2. Export your function component from that file (using either default or named exports).
3. Import it in the file where you’ll use the component (using the corresponding technique for importing default or named exports).

for default export - export default function Button() {}
for default import - import Button from './Button.js';
for named export - export function Button() {}
for default import - import { Button } from './Button.js';

there is only one default export for one file but can do several named export for one file. 
we can import in any name for default but can have to use the exact name for named import
People often use default exports if the file exports only one component, and use named exports if it exports multiple components and values.

*/

/*
** JSX
JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. 
JSX is a syntax extension, while React is a JavaScript library.

The rules of JSX
    1. single root file - To return multiple elements from a component, wrap them with a single parent tag like <div></div> or <></>(Fragment)
    jsx consider each tag and content as a object
    2. close all tags even self closing like <img/> and <li> <li/>. 
    3. camelCase almost all of the things! - like className,backgroundColor,strokeWidth 
*/

/*
** JavaScript in JSX with Curly Braces
Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to open a window to JavaScript.
JSX is a special way of writing JavaScript. That means it’s possible to use JavaScript inside it—with curly braces { }.

export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}

You can only use curly braces in two ways inside JSX:

1.As text directly inside a JSX tag: <h1>{name}'s To Do List</h1> works, but <{tag}>Gregorio Y. Zara's To Do List</{tag}> will not.
2.As attributes immediately following the = sign: src={avatar} will read the avatar variable, but src="{avatar}" will pass the string "{avatar}".

you can pass variable,number,string,function and even object in {}. for object you can write like {{name:'rafi'}}[double curly]

Inline style properties are written in camelCase. For example, HTML <ul style="background-color: black"> would be written as <ul style={{ backgroundColor: 'black' }}>  in your component.

example ::

const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={`${baseUrl}${person.imageId}${person.imageSize}.jpg`}
        src={baseUrl + person.imageId + person.imageSize + '.jpg'}
        
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}

*/

/*
** Passing Props to a Component
React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props. 
you can pass any JavaScript value through them, including objects, arrays, and functions.

but i can pass the prop to the child component from parent component.but not child to parent. 

Passing props to a component
1. First, pass some props to Component like 
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}

2. Read props inside the child component
You can read these props by listing their names person, size separated by the commas inside ({ and }) directly after function Avatar. This lets you use them inside the Avatar code, like you would with a variable.
like 
function Avatar({ person, size }) {
  // person and size are available here
}

we can read the prop without “destructuring” like
function Avatar(props) {
  // person and size are available here
  let person = props.person;
  let size = props.size;
}

If you want to give a prop a default value to fall back on when no value is specified, you can do it with the destructuring by putting = and the default value right after the parameter:
function Avatar({ person, size=100 }) {
  // person and size are available here
}

if the props what i get is exactly same props for the child then we can write it like {...props}
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}

we can pass children component as prop.
When you nest content inside a JSX tag, the parent component will receive that content in a prop called children. 
like 
<Card><Avatar/><Card/>
for Card component it will get as {children}
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

a component may receive different props over time. Props are not always static! Here, the time prop changes every second, and the color prop changes when you select another color. Props reflect a component’s data at any point in time, rather than only in the beginning.
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}

However, props are immutable in respect to child component —a term from computer science meaning “unchangeable”. When a component needs to change its props (for example, in response to a user interaction or new data), it will have to “ask” its parent component to pass it different props—a new object! Its old props will then be cast aside, and eventually the JavaScript engine will reclaim the memory taken by them.

*/

/*
** Conditional Rendering
    In React, you can conditionally render JSX using JavaScript syntax like if statements, &&, and ? : operators.
    In some situations, you won’t want to render anything at all.In this case, you can return null:
    Like 
    if (isPacked) {
        return null;
    }
    return <li className="item">{name}</li>;

we can use ternary operator also
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);

A JavaScript && expression returns the value of its right side (in our case, the checkmark) if the left side (our condition) is true
return (
  <li className="item">
    {name} {isPacked && '✅'}
  </li>
);

Don’t put numbers on the left side of && rather put boolean value like messageCount > 0 && <p>New messages</p>.
as if we write count && 'new'.if the count is 0 it will print 0 but it should print nothing.

we can store the conditional rendering in a variable
item = isPacked && '✅'
we can also render component like this. like isTrue ? <A/> : <B/>


*/

/*
** Rendering List
You will often want to display multiple similar components from a collection of data. You can use the JavaScript array methods to manipulate an array of data. On this page, you’ll use filter() and map() with React to filter and transform your array of data into an array of components.

Arrow functions implicitly return the expression right after =>, so you didn’t need a return statement.if there is only one return statement
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return!
);

 you must write return explicitly if your => is followed by a { curly brace! } if there is more than one return statement
 const listItems = chemists.map(person => { // Curly brace
  return <li>...</li>;
});

You need to give each array item a key — a string or a number that uniquely identifies it among other items in that array:
<li key={person.id}>...</li>

when we have to return more than one statement then to pass key we have to use Fragment
 const listItems = chemists.map(person => { 
  return{ 
  <Fragment key={person.id}>
  <li>...</li>
  <h1></h1>
  </Fragment>
  }
});

Rules of keys 
1.Keys must be unique among siblings. However, it’s okay to use the same keys for JSX nodes in different arrays.
2.Keys must not change or that defeats their purpose! Don’t generate them while rendering.


don't use any random number or index as a key.
Note that your components won’t receive key as a prop. It’s only used as a hint by React itself. If your component needs an ID, you have to pass it as a separate prop: <Profile key={id} userId={id} />.

when we work with component within a map or filter we will use the key in the component
 const listItems = chemists.map(person => { 
  return{ 
  <Profile key={person.id} name={person.name}/>
  }
});


*/

/*
** Keeping Components Pure
Some JavaScript functions are pure. Pure functions only perform a calculation and nothing more. By strictly only writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows.

 a pure function is a function with the following characteristics:

1.It minds its own business. It does not change any objects or variables that existed before it was called.
2.Same inputs, same output. Given the same inputs, a pure function should always return the same result.

React assumes that every component you write is a pure function. This means that React components you write must always return the same JSX given the same inputs

In React, side effects usually belong inside event handlers. Event handlers are functions that React runs when you perform some action—for example, when you click a button. Even though event handlers are defined inside your component, they don’t run during rendering! So event handlers don’t need to be pure.

When possible, try to express your logic with rendering alone. You’ll be surprised how far this can take you!

1. don't use global variable and use it in component it will make the component impure
2. can use local variable in a component which is called local mutation
3. don't change the props in child component it will make the component impure
4. don't change any style or logic outside rather return a jsx and use it inside the component

export default function Clock({ time }) {
  const hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
  );
}
here we change the h1 class but this make the component impure rathe store the class in a variable and put it inside the return like

export default function Clock({ time }) {
  const hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }
  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}

*/

/*
** Understanding Your UI as a Tree
React, and many other UI libraries, model UI as a tree. Thinking of your app as a tree is useful for understanding the relationship between components. This understanding will help you debug future concepts like performance and state management.

UI Tree
The Module Dependency Tree

Trees are a common way to represent the relationship between entities. They are often used to model UI.
Render trees represent the nested relationship between React components across a single render.
With conditional rendering, the render tree may change across different renders. With different prop values, components may render different children components.
Render trees help identify what the top-level and leaf components are. Top-level components affect the rendering performance of all components beneath them and leaf components are often re-rendered frequently. Identifying them is useful for understanding and debugging rendering performance.
Dependency trees represent the module dependencies in a React app.
Dependency trees are used by build tools to bundle the necessary code to ship an app.
Dependency trees are useful for debugging large bundle sizes that slow time to paint and expose opportunities for optimizing what code is bundled.
*/
