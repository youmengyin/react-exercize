import { forwardRef, ForwardRefRenderFunction, useEffect, useRef } from "react";

const Child: ForwardRefRenderFunction<HTMLInputElement> = (_props, ref) => {
  return (
    <div>
      <input ref={ref}/>
    </div>
  )
}
const WrapedChild = forwardRef(Child)
function App() {
  const ref = useRef<HTMLInputElement>(null);
 
  useEffect(()=> {
    console.log('ref', ref.current)
    ref.current?.focus()
  }, []);

  return (
    <div className="App">
      <WrapedChild ref={ref}/>
    </div>
  );
}

export default App;
