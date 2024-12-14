import { FC, useContext } from 'react';
import FileNameList from './FileNameList';
import Editor from './Editor';
import { PlaygroundContext } from '../../context';
import { debounce } from 'lodash-es'
const CodeEditor: FC = () => {
  const { 
    theme,
    files, 
    setFiles, 
    selectedFileName
  } = useContext(PlaygroundContext)

  const file = files[selectedFileName];

  const onEditorChange = (value?: string) => {
    files[file.name].value = value!;
    setFiles({...files})
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor 
        file={file} 
        onChange={debounce(onEditorChange, 500)} 
        options={{
          theme: `vs-${theme}`,
          fontSize: 14,
          // 到达文件的最后一行时，编辑器将不再继续滚动
          scrollBeyondLastLine: false,
          // 设置滚动条大小
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  )
};

export default CodeEditor;
