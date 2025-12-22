/*
even deligation --> it is concept where we can add one event listener for multiple element and even when we add new element the new element also get the event listener.we can do that by add event listener to the parent element then all the child element can get the event listener

<ul id="list">
<li>Apple</li>
<li>Graph</li>
<li>Guava</li>
</ul>

const a = document.getElementById("list")
a.addEventListener("click",(e)=>{
    console.dir(e)
    })
here all the li get the evenListener
*/

/*
event propagation - when we put event listener to the parent and all the child element and click the leaf child element then how the all event listener will work
event bubble - it will work leaf child to parent
event capture - it will work parent to leaf child

<div id="con">
    <p id="para">
        <button id="btn">Click me</button>
    </p>
</div>

const c = document.getElementById('con')
const p = document.getElementById('para')
const b = document.getElementById('btn')

c.addEventListener("click",listener)
p.addEventListener("click",listener)
b.addEventListener("click",listener)

// apply capture - we can use {capture:true} or normally write true
c.addEventListener("click",listener,{capture:true})
p.addEventListener("click",listener,true)
b.addEventListener("click",listener,true)

function listener(e){
// console.log(e.currentTarget)
// console.log(this)
console.log(this.tagName)
}

by default if you click button then it will print BUTTON P DIV (event bubble)
if apply capture if you click button then it will print DIV P BUTTON (event capture)
we can use capture if different order to print differently like to print DIV BUTTON P
c.addEventListener("click",listener)
p.addEventListener("click",listener,true)
b.addEventListener("click",listener)
*/

/*
DOM - document(html page) object(all elements(<tag></tag>) ) model(HTML tree structure)
by using DOM we can apply CRUD to any elements in HTML
to see the DOM - console.dir(document) to see the type of DOM - console.log(typeof(document))
to get HTML Collection - console.log(document.all). it is a array like object

to select a element ::
1. getElementById('idName') it will return the element
2. getElementsByClassName('className') it will return a htmlCollection so use indexing to get the element like [0]
3. getElementsByTagName('tagName') it will return a htmlCollection so use indexing to get the element like [0]
4. document.querySelector('.className' / '#idName") [most important and widely used] it will return one element
5. document.querySelectorAll('.className' / '#idName")  it will return all element of that class or id
5. document.querySelector('.className:nth-child(3)')  it will return the particular element from all element
5. document.querySelector('input[type="text"]')  

to change the text content of a element - after selecting the element -> textContent or innerText
textContent show how we write it in the html 
innerText show how the text display after rendering(applying css)

we can use innerHTML to do that but it gives use all the content like element,tag and text
we can change a element css by using style. first select the element and change it by style like
const a = document.getElementById('idName)
a.style.backgroundColor='red' the property have to be in camelCase


parent-child relation
first select a parent element like
const parent = document.querySelector('#p')
to get all the children - parent.children (htmlCollection)

to get parent of a children
const children = document.querySelector('#c')
to get all the children - children.parentElement

to get closest parent - children.closest('.className' or '#idName')
to get next sibling - children.nextElementSibling;
to get previous sibling - children.previousElementSibling


// creating an element
1. document.createElement('tagName')
like const divElement = document.createElement('tagName')

to create class of and element --> .className = 'className' like divElement.className = 'red'
to set attribute like id,class,title,style --> .setAttribute('attributeTypeName', 'attributeName') like divElement.setAttribute('id','blue')

to insert the element before another element
first select parent element and the previousElement then - parentElement.insertBefore(elementName,previousElement)

to insert the element in the last of a parent element as child element
first select the parentElement then - parentElement.appendChild(elementName) or parentElement.append(elementName)
for append i can use anything to append like text but for appendChild i have to put an element
we can append multiple thing in .append but only one element in .appendChild
.appendChild return the element but .append return undefined


// event listener
first select the element then elementName.addEventListener("eventName", functionName/function)
first select the element then elementName.addEventListener("eventName", (event)=>{})
use prevent form from submit and reloading use event.preventDefault()
https://www.w3schools.com/js/js_htmldom_events.asp
https://www.w3schools.com/jsref/dom_obj_event.asp

to remove child get the parent then parentNode.removeChild(child)
*/