import React from "react";
// 使用 TypeScript 定义函数式组件
interface AaaProps {
  name: string;
  content: number;
}
function Aaa(props: AaaProps) {

  return <div>
    {props.name}
    {props.content}
  </div>
}

const Aaa2: React.FunctionComponent<AaaProps> = (props) => {

  return <div>
    {props.name}
    {props.content}
  </div>
}

const Aaa3: React.FC<AaaProps> = (props) => {
  return <div>
    {props.name}
    {props.content}
  </div>
}

const content: React.ReactElement = <div>aaa</div>

function App() {
  return <div>
    <Aaa name="xzz" content={123}></Aaa>
    <Aaa2 name="FunctionComponent" content={123}></Aaa2>
    <Aaa3 name="FC" content={123}></Aaa3>
    {content}
  </div>
}

export default App;
