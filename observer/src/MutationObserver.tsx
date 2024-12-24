import { useEffect, useRef, useState } from "react"
import { useDeepCompareEffect, useMutationObserver as useMutObs } from 'ahooks'
const DEFAULT_OPTIONS = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
};
type AnyFun = (args: any)=>void
function useMutationObserver(targetEl: any, cb: AnyFun, options = DEFAULT_OPTIONS) {
  useDeepCompareEffect(() => {
    if (targetEl.current) {
      const observer = new MutationObserver(cb);
      observer.observe(targetEl.current, options);
      return () => observer?.disconnect();
    }
  }, [cb, options]);
}
function MutationObserverTest() {

  const mutationRef = useRef<HTMLDivElement>(null);
  const [mutationCount, setMutationCount] = useState(0);
  const incrementMutationCount = (mutationsList) => {
    console.log(123, mutationsList);
    // mutationsList.forEach(() => setMutationCount((c) => c + 1));
    setMutationCount((num) => num + 1);
  };
  useMutationObserver(mutationRef, incrementMutationCount);
  const [content, setContent] = useState('Hello world');

  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mutationObserver = new MutationObserver((mutationsList) => {
        console.log(mutationsList)
    });

    mutationObserver.observe(box.current!, {
      attributes: true,
      childList: true
    });
    setTimeout(() => {
      box.current!.style.background = 'red';
    },2000);

    setTimeout(() => {
        const dom = document.createElement('button');
        dom.textContent = '东东东';
        box.current!.appendChild(dom);
    },3000);

    setTimeout(() => {
      document.querySelectorAll('button')[0].remove();
    },5000);

    return () => {
      mutationObserver.disconnect();
    }
  }, [])
  return (
    <>
      <div ref={box} ><button>test</button></div>
      <label htmlFor="content-input">Edit this to update the text:</label>
      <textarea
        id="content-input"
        style={{ width: '100%' }}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={() => setContent((w) => w + 1)}>widening</button>
      <div ref={mutationRef} className={content} style={{ padding: 12, border: '1px solid #000', marginBottom: 8 }}>
        current width：{content}
      </div>
       <p>Mutation count {content}</p>
      {/* <div
        style={{ width: '100%' }}
        ref={mutationRef}
      >
        <div
          style={{
            resize: 'both',
            overflow: 'auto',
            maxWidth: '100%',
            border: '1px solid black',
          }}
        >
          <h2>Resize or change the content:</h2>
          <p>{content}</p>
        </div>
      </div> */}
      <div>
        <h3>Mutation count {mutationCount}</h3>
      </div>
    </>
  )
}


// const MutationObserverTest: React.FC = () => {
//   const [width, setWidth] = useState(200);
//   const [count, setCount] = useState(0);

//   const ref = useRef<HTMLDivElement>(null);

//   useMutObs(
//     (mutationsList) => {
//       mutationsList.forEach(() => setCount((c) => c + 1));
//     },
//     ref,
//     { attributes: true },
//   );

//   return (
//     <div>
//       <div ref={ref} style={{ width, padding: 12, border: '1px solid #000', marginBottom: 8 }}>
//         current width：{width}
//       </div>
//       <button onClick={() => setWidth((w) => w + 10)}>widening</button>
//       <p>Mutation count {count}</p>
//     </div>
//   );
// };


export default MutationObserverTest
