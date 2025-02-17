import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../context";
import styles from './index.module.scss'
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from "../../../files"
import FileNameItem from "./FileNameItem";

export default function FileNameList() {
  const { 
    files, 
    removeFile, 
    addFile, 
    updateFileName, 
    selectedFileName,
    setSelectedFileName
  } = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState([''])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])
  const [creating, setCreating] = useState(false);

  const addTab = () => {
    const newFileName = 'Comp' + Math.random().toString().slice(2,6) + '.tsx';
    addFile(newFileName)
    setSelectedFileName(newFileName)
    setCreating(true)
  }

  const handleEditComplete = (name: string, oldName: string) => {
    updateFileName(oldName, name)
    setSelectedFileName(name)
    setCreating(false)
  }

  const handleRemove = (name: string) => {
    removeFile(name)
    setSelectedFileName(ENTRY_FILE_NAME)
  }
  const readonlyFileNames = [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME];
  return (
    <div className={styles.tabs}>
      {
        tabs.map((item, index, arr) => (
          <FileNameItem
            key={item + index}  
            value={item} 
            readonly={readonlyFileNames.includes(item)}
            creating={creating && index === arr.length - 1}
            actived={selectedFileName === item} 
            onClick={() => setSelectedFileName(item)}
            onEditComplete={(name: string) => handleEditComplete(name, item)}
            onRemove={() => handleRemove(item)}
          />
        ))
      }
      <div className={styles.add} onClick={addTab}>+</div>
    </div>
  )
}
