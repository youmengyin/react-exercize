import {  useRef } from 'react';
import reactSvg from '@/assets/react.svg'
import LazyImage from './lazy-img';
import MutationObserverTest from './MutationObserver';

function App() {
  const dom1 = useRef<HTMLDivElement>(null)
  const dom2 = useRef<HTMLDivElement>(null)

  return (
    <>
      <div>
        <div id="box1" ref={dom1}>BOX111</div>
        <div id="box2" ref={dom2}>BOX222</div>  
        <LazyImage src={reactSvg} isLazy alt='img' />
        <MutationObserverTest />
      </div>

    </>
  )
}

export default App
