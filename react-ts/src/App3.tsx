import React, { useEffect, useImperativeHandle, useRef } from "react";

interface WrapedRef {
  aaa: () => void;
}
interface WrapedProps {
  name: string;
}


const WrapedBox = React.forwardRef< WrapedRef, WrapedProps>((props, ref) => {
  const aaa = () => {
    console.log('aaa', props);
    inputRef.current?.focus();
  }
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    aaa,
    ccc: 'ccc',
    bbb: aaa,
  }), [inputRef]);
  return <div>
    <input ref={inputRef}></input>
    <div>{props.name}</div>
  </div>
})
function App() {
  const ref = useRef<WrapedRef>(null);
 
  useEffect(()=> {
    console.log('ref', ref.current)
    ref.current?.aaa();
  }, []);

  return (
    <div className="App">
      <WrapedBox name="WrapedBox" ref={ref}/>
    </div>
  );
}

export default App;
