import './App.css'
import PlayGround from './playground'
import { PlaygroundProvider } from './playground/context'

function App() {
  return (
    <>
      <PlaygroundProvider>
        <PlayGround />
      </PlaygroundProvider>
    </>
  )
}

export default App
