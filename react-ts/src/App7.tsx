import {  CSSProperties, HTMLAttributes } from "react";

interface CccProps extends HTMLAttributes<HTMLDivElement> {
  styles?: CSSProperties
}
const Ccc = (props: CccProps) => {
  return <div style={{color: props.color}} >ccc,{props.content}{props.children}</div>
}

function App() {

  return <div>
    <Ccc onClick={()=>{}}  color="yellow"  >
      <button>7777</button>
    </Ccc>
  </div>
}

export default App;
