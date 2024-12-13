// import * as monaco from 'monaco-editor';
import Editor, {loader} from '@monaco-editor/react';

loader.config({paths:{vs: 'https://gw.alipayobjects.com/os/lib/monaco-editor/0.43.0/min/vs'}})
// loader.config({ paths: { vs: "https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.49.0/min/vs"} })

function App() {

    const code =`import { useEffect, useState } from "react";

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
`;

    return <Editor height="500px" defaultLanguage="javascript" defaultValue={code} />;
}

export default App;

