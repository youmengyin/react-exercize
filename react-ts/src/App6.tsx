import React, { CSSProperties, ReactNode } from "react";

type CccProps = React.PropsWithChildren<{
  // content: React.ReactElement;
  content: ReactNode;
  color: CSSProperties['color'];
  styles?: CSSProperties;
} >


const Ccc = (props: CccProps) => {
  return <div style={{...props.styles, color: props.color}} >ccc,{props.content}{props.children}</div>
}

function App() {

  return <div>
    <Ccc content={<div>666</div>}  color="yellow" styles={{
      backgroundColor: 'blue'
    }} >
      <button>7777</button>
    </Ccc>
  </div>
}

export default App;
