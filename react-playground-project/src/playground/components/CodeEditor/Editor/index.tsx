import MonacoEditor, { EditorProps, loader, OnMount } from "@monaco-editor/react"
import { editor } from "monaco-editor"


export interface EditorFile {
  name: string
  value: string
  language: string
}
interface Props {
  file: EditorFile
  onChange?: EditorProps['onChange'],
  options?: editor.IStandaloneEditorConstructionOptions
}
loader.config({paths:{vs: 'https://gw.alipayobjects.com/os/lib/monaco-editor/0.43.0/min/vs'}})
export default function Editor(props: Props) {
  const { file, onChange, options } = props

  const handleEditorMount: OnMount = (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      // 输入 <div> 输出 <div>，保留原样
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      // 编译的时候自动加上 default 属性
      esModuleInterop: true,
    });
    // ctrl或者cmd+s保存
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })
  };

  return (
    <MonacoEditor
      width={'50vh'}
      height={'100vh'}
      value={file.value}
      path={file.name}
      language={file.language}
      onChange={onChange}
      onMount={handleEditorMount}
      options={options}
    />
  )
}
