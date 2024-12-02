# React + TypeScript + Vite

## **useState**

useState ==> App1.tsx

## **useEffect**

useEffect ==> App2.tsx

## **useLayoutEffect**

它和 useEffect 的区别是它的 effect 执行是同步的, 这样浏览器会等 effect 逻辑执行完再渲染, 会阻塞渲染。
useLayoutEffect ==> App2-1.tsx

## **useReducer**

useReducer ==> App3.tsx
useReducer + immer ==> App3-2.tsx
useState + immer ==> App3-3.tsx

## **useRef**

useRef ==> App4-1.tsx
useRef + ForwardRef ==> App4-2.tsx
useRef + ForwardRef + useImperativeHandle ==> App4-3.tsx

## **memo、useMemo、useCallback**

memo 是防止 props 没变时的重新渲染，useMemo 和 useCallback 是防止 props 的不必要变化。

如果子组件用了 memo，那给它传递的对象、函数类的 props 就需要用 useMemo、useCallback 包裹，否则，每次 props 都会变，memo 就没用了。

反之，如果 props 使用 useMemo、useCallback，但是子组件没有被 memo 包裹，那也没意义，因为不管 props 变没变都会重新渲染，只是做了无用功。

memo + useCallback、useMemo 是搭配着来的，少了任何一方，都会使优化失效。

但 useMemo 和 useCallback 也不只是配合 memo 用的：

比如有个值的计算，需要很大的计算量，你不想每次都算，这时候也可以用 useMemo 来缓存。

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
