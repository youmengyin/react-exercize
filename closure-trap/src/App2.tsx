import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count);
      // handleClick()
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default App;
