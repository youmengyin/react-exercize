import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef } from "react";

interface RefProps {
  aaa: () => void;
}
const Child: ForwardRefRenderFunction<RefProps> = (_props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      aaa() {
        console.log('focus')
        inputRef.current?.focus()
      }
    }

  }, [inputRef])

  return (
    <div>
      <input ref={inputRef}/>
    </div>
  )
}
const WrapedChild = forwardRef(Child)
function App() {
  const ref = useRef<RefProps>(null);
 
  useEffect(()=> {
    console.log('ref', ref.current)
    ref.current?.aaa()
  }, []);

  return (
    <div className="App">
      <WrapedChild ref={ref}/>
    </div>
  );
}

export default App;
