import { useCallback, useEffect, useRef, useState } from "react";

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();
  // savedCallback.current = callback;
  // useEffect(() => {
  //     savedCallback.current = callback;
  // }, [callback]);
  useEffect(() => {
      savedCallback.current = callback;
  });

  // useEffect(() => {
  //   function tick() {
  //     savedCallback.current?.();
  //   }
  //   const id = setInterval(tick, delay);
  //   return () => clearInterval(id); 
  // }, []);

  // useEffect(() => {
  //   function tick() {
  //     savedCallback.current?.();
  //   }

  //   if (delay!== null) {
  //     const id = setInterval(tick, delay);
  //     return () => clearInterval(id);
  //   }
  // }, [delay]);

  const cleanFnRef = useRef<() => void>();
  // function clean() {
  //   cleanFnRef.current?.();
  // }
  const clean = useCallback(() => {
    cleanFnRef.current?.();
  }, []);
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay!== null) {
      const id = setInterval(tick, delay);
      cleanFnRef.current = () => clearInterval(id);
      return clean;
    }
  }, [delay]);

  return clean;
}



function App() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const updateCount = () => {
      setCount(count + 1);
  };

  const clean = useInterval(updateCount, delay);
  setTimeout(() => {
    setDelay(1000);
  }, 5000)
  return <>
    <div>{count}</div>
    <button onClick={() => clean()}>stop</button>
  </>;
}

export default App;
