import { produce } from "immer";
import { Reducer, useReducer } from "react";

interface Data {
  a: {
      c: {
          e: number,
          f: number
      },
      d: number
  },
  b: number
}

interface Action {
  type: 'add',
  num: number
}

const reducer = (state: Data, action: Action) => {
  switch (action.type) {
    case 'add':
      return produce(state, state => {
        state.a.c.e += action.num
        state.b += action.num
      })

    //   return {
    //    ...state,
    //     a: {
    //      ...state.a,
    //       c: {
    //        ...state.a.c,
    //         e: state.a.c.e + action.num
    //       }
    //     },
    //     b: state.b + action.num
    // }
  }

}

function App() {
  const [res, dispatch] = useReducer<Reducer<Data, Action>, string>(reducer, 'zero', (param: string) => {
    return {
        a: {
            c: {
                e: 0,
                f: 0
            },
            d: 0
        },
        b: 0,
        param,
    }
  });

  return (
    <div>
        <div onClick={() => dispatch({ type: 'add', num: 2 })}>加</div>
        <div>{JSON.stringify(res)}</div>
    </div>
  );
}

export default App;
