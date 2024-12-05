import { MouseEvent, PropsWithChildren } from "react";


interface CccProps extends PropsWithChildren {
  clickHandler: (e: MouseEvent<HTMLDivElement>) => void;
}

function Ccc(props: CccProps) {
  return <div onClick={props.clickHandler}>ccc{props.children}</div>
}

function App() {

  return <div>
    <Ccc clickHandler={(e)=>{console.log(e)}} >
      <button>7777</button>
    </Ccc>
  </div>
}

export default App;
