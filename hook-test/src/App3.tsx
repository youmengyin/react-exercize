import { useReducer } from "react";

type Action = {
  type: 'add' | 'minus',
  num: number
}
type ReduceState = {
  result: number
}

function reducer(state: ReduceState, action: Action){
  switch(action.type) {
    case 'add':
      return {
        result: state.result + action.num
      }
      // 直接修改原始的 state 返回，是触发不了重新渲染的
      // state.result += action.num
      // return state;
    case 'minus': 
      return {
        result: state.result - action.num
      }
  }
  // return state;
}


function App(){
  const [res, dispatch] = useReducer(reducer, 'zero', (param) => {
    return {
        result: param === 'zero' ? 0 : 1
    }
  })
  return (
    <div>
        <div onClick={() => dispatch({ type: 'add', num: 2 })}>加</div>
        <div onClick={() => dispatch({ type: 'minus', num: 1 })}>减</div>
        <div>{res.result}</div>
    </div>
  );
}
export default App;
