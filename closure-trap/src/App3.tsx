import { useEffect, useState } from 'react';

function App() {

    const [count,setCount] = useState(0);

    useEffect(() => {
        console.log(count);
      // 可以使用 useEffect Hook 依赖数组deps 来更新状态，消除闭包陷阱
        const timer = setInterval(() => {
            setCount(count + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [count]);

    return <div>{count}</div>
}

export default App;
