import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate";
import { Files } from "./context";
import JSZip from "jszip";
import { saveAs } from 'file-saver'

// 解压base64编码的字符串
export function uncompress(base64: string): string {
  const str = atob(base64);
  const uintArr = strToU8(str, true);

  const zip = unzlibSync(uintArr);
  return strFromU8(zip);
}

// 压缩字符串
export function compress(str: string): string {
  const uintArr = strToU8(str);
  const zipped = zlibSync(uintArr, { level: 9 });
  return btoa(strFromU8(zipped, true));
}

// 从文件名中获取语言类型
export const fileName2Language = (name: string) => {
  const suffix = name.split('.').pop() || ''
  if (['js', 'jsx'].includes(suffix)) return 'javascript'
  if (['ts', 'tsx'].includes(suffix)) return 'typescript'
  if (['json'].includes(suffix)) return 'json'
  if (['css'].includes(suffix)) return 'css'
  return 'javascript'
}


export async function downloadFiles(files: Files) {
  const zip = new JSZip()
  Object.keys(files).forEach((name) => {
    zip.file(name, files[name].value)
  })
  const blob = await zip.generateAsync({ type: 'blob' })

  saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`)  
}
