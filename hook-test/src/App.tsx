import { useState } from "react";

function App() {
  const [num, setNum] = useState(() => {
    const num1 = 1 + 2;
    const num2 = 2 + 3;
    console.log(num1 + num2);
    
    return num1 + num2
  });

  return (
    <div style={{color: 'red'}} onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
  );
}

export default App;

