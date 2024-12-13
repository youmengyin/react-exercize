import { useRef } from 'react'

import { transform } from '@babel/standalone'
import { PluginObj } from '@babel/core';

function App() {
  const code = `import { useEffect, useState } from "react";
    function App() {
      const [num, setNum] = useState(() => {
        const num1 = 1 + 2;
        const num2 = 2 + 3;
        return num1 + num2
      });

      return (
        <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
      );
    }

    export default App;
    `
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        console.log(path.node.source.value);
        
        const source = path.node.source.value;
        if(source === 'react') {
          path.node.source.value = 'preact/compat';
        }
      }
    }}
  function onClick() {
    if(!textareaRef.current) {
      return ;
    }
    const res = transform(textareaRef.current.value, {
      presets: ['react', 'typescript'],
      filename: 'test.tsx',
      plugins: [transformImportSourcePlugin]
    });
    console.log(res.code);
  }


  const code2 =`
  function add(a, b) {
      return a + b;
  }
  export { add };
  `;

  const url = URL.createObjectURL(new Blob([code2], { type: 'application/javascript' }));

  const transformImportSourcePlugin1: PluginObj = {
      visitor: {
          ImportDeclaration(path) {
              path.node.source.value = url;
              console.log(path.node.source.value);
          }
      },
  }


  const code3 = `import { add } from './add.ts'; console.log(add(2, 3));`

  function onClick1() {
    if(!textareaRef.current) {
      return ;
    }
    const res = transform(textareaRef.current.value, {
      presets: ['react', 'typescript'],
      filename: 'test.tsx',
      plugins: [transformImportSourcePlugin1]
    });
  }
  return (
    <div>
      <textarea ref={textareaRef} style={{ width: '500px', height: '300px'}} defaultValue={code3}></textarea>
      <button onClick={onClick}>编译</button>
      <button onClick={onClick1}>编译1</button>
    </div>
  )
}

export default App
