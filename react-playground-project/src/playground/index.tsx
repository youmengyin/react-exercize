import { Allotment } from "allotment";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import './index.scss'
import { useContext } from "react";
import { PlaygroundContext } from "./context";

function PlayGround() {
  const { theme } = useContext(PlaygroundContext)
  return (
    <div className={theme} style={{ height: '100vh', width: '100vw' }}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default PlayGround;
