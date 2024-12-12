import { lazy, Suspense } from 'react'

const LazyAaa = lazy(() => import('./Aaa.tsx')) 
function App() {
 
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAaa />
      </Suspense>
    </>
  )
}

export default App
