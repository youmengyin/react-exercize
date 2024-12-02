import { createContext, useContext } from 'react';

const countContext = createContext({num: 111});

function Aaa() {
  return <div>
      <countContext.Provider value={{num: 222}}>
        <Bbb></Bbb>
      </countContext.Provider>
  </div>
} 

function Bbb() {
  return <div><Ccc></Ccc></div>
}

function Ccc() {
  const ctx = useContext(countContext);
  return <h2>context 的值为：{ctx.num}</h2>
}

export default Aaa;
