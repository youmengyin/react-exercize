import useHistory from "./hooks/useHistory"
import useStorage from "./hooks/useStorage"


function App() {
  const [count, setCount] = useStorage<number>('__key', 1)
  const [path, push, replace] = useHistory()
  console.log(path);
  
  return <div>
      <h1>{ count }</h1>
      <button onClick={() => setCount(()=>count+1)}>add</button>
      <button onClick={() => push("http://localhost:5173/Ad")}>push </button>
      <button onClick={() => replace("http://localhost:5173/Ar")}>replace </button>
  </div>
}


export default App
