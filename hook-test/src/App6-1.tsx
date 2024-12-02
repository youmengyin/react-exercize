import { memo, useCallback, useEffect, useMemo, useState } from "react";

function Aaa() {
    const [,setNum] = useState(1);

    const [count, setCount] = useState(2);

    useEffect(() => {
        setInterval(()=> {
          setNum(Math.random());
        }, 2000)
    },[]);
    useEffect(() => {
      setTimeout(()=> {
          setCount(Math.random());
      }, 2000)
  },[]);
    const bbbCallback = useCallback(function () {
        // xxx
    }, []);

    const count2 = useMemo(() => {
      console.log('useMemo');
      
        return count * 10;
    }, [count]);

    return <div>
        <MemoBbb count={count2} callback={bbbCallback}></MemoBbb>
        {/* <Bbb count={count2} callback={bbbCallback}></Bbb> */}
    </div>
} 

interface BbbProps {
    count: number;
    callback: () => void;
}

function Bbb(props: BbbProps) {
    console.log('bbb render');

    return <h2>{props.count}</h2>
}

const MemoBbb = memo(Bbb);

export default Aaa;
