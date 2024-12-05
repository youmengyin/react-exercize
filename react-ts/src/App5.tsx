import  { useCallback , useMemo} from "react";

interface CccProps {
  obj: {
    aaa: number;
  },
  fn: () => number;
}
function Ccc(props: CccProps) {
    return <div>ccc {props.obj.aaa}</div>
}

function App() {

  const obj = useMemo<{ aaa: number}>(() => {
    return {
      aaa: 1
    }
  }, []);

  const fn = useCallback<() => number>(() => {
    return 666;
  }, []);

  return <div>
    <Ccc obj={obj} fn={fn}></Ccc>
  </div>
}

export default App;
