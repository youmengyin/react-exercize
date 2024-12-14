import { transform } from '@babel/standalone'
import { ENTRY_FILE_NAME } from '../../files';
import { File, Files } from '../../context';
import { PluginObj } from '@babel/core';

const getModuleFile = (files: Files, modulePath: string) => {
    let moduleName = modulePath.split('./').pop() || ''
    if(!moduleName.includes('.')){
      const realModuleName = Object.keys(files)
        .filter(key => ['.ts', '.tsx', '.js', '.jsx'].some(suffix => key.endsWith(suffix)))
        .find(key => key.split('.').includes(moduleName))
      if(realModuleName){
        moduleName = realModuleName
      }
    }
    return files[moduleName]
}

const json2Js = (file: File) => {
  const js = `export default ${file.value}`
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}
const css2Js = (file: File) => {
  const randomId = new Date().getTime()
  const js = `
(() => {
  const stylesheet = document.createElement('style')
  stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
  document.head.appendChild(stylesheet)

  const styles = document.createTextNode(\`${file.value}\`)
  stylesheet.innerHTML = ''
  stylesheet.appendChild(styles)
})()
  `
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}
const customResolver = (files: Files): PluginObj => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value
        if(modulePath.startsWith('.')) {
          const file = getModuleFile(files, modulePath)
          if(!file) return
          if (file.name.endsWith('.css')) {
            path.node.source.value = css2Js(file)
          } else if (file.name.endsWith('.json')) {
            path.node.source.value = json2Js(file)
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                  type: 'application/javascript',
              })
            )
          }
        }
      }
    }
  }
}
export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code
  const regexReact = /import\s+React/g
  if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)) {
    _code = `import React from 'react';\n${code}`
  }
  return _code
}
export const babelTransform = (filename: string, code: string, files: Files) => {
  let result = ""
  const _code = beforeTransformCode(filename, code);
  try {
    result = transform(_code, {
      // 指定 react 和 typescript，也就是对 jsx 和 ts 语法做处理
      presets: ['react', 'typescript'],
      filename,
      plugins: [customResolver(files)],
      // 编译后保持原有行列号不变
      retainLines: true
    }).code!
  } catch (error) {
    console.error('编译出错', error);
  }

  return result
}

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME]
  return babelTransform(ENTRY_FILE_NAME, main.value, files)
}

self.addEventListener('message', async ({ data }) => {
  try {
      self.postMessage({
          type: 'COMPILED_CODE',
          data: compile(data)
      })
  } catch (e) {
    self.postMessage({ type: 'ERROR', error: e })
  }
})
