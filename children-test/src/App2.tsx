import { Children, FC, useEffect } from 'react';

interface AaaProps {
  children: React.ReactNode | React.ReactNode[]
}

const Aaa: FC<AaaProps> = (props) => {
  const { children } = props;
  console.log(Children.toArray(children).sort());

  useEffect(() => {
    const count = Children.count(children);
  
    console.log('count', count);
    
    Children.forEach(children, (item, index) => {
      console.log('item' + index, item);
    });
  
    const first = Children.only(children);
    console.log('first', first);
  }, []);
  return <div className='container'>
    {
      Children.map(children, (item, ) => {
        return <div className='item'>{item}</div>
      })
    }
  </div>
}

function App() {
  return (
    <>
      <Aaa>
        {33}
        <span>hello world</span>
        {22}
        {11}
      </Aaa>
    </>
  )
}

export default App;
