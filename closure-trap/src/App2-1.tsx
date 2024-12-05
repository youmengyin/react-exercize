import { useState } from "react";

function sayHi(person: Record<string, string>) {

  const name = person.name;
  setTimeout(() => {
    alert('Hello, ' + name);
  }, 3000);
}
 
let someone = {name: 'Dan'};
sayHi(someone);
 
someone = {name: 'Yuzhi'};
sayHi(someone);
 
someone = {name: 'Dominic'};
sayHi(someone);
function Counter() {
  const [count, setCount] = useState(0);
 
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
export default Counter
