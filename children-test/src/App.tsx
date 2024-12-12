import { Children, FC } from 'react';

interface AaaProps {
  children: React.ReactNode | React.ReactNode[]
}

const Aaa: FC<AaaProps> = (props) => {
  const { children } = props;

  return <div className='container'>
    {
      Children.map(children, (item, ) => {
        return <div className='item'>{item}</div>
      })
    }
      <div>----------</div>
    {
      // React.Children.map(children, (item) => {
      Array.isArray(children) ? children?.map(item => {
        return <div className='item'>{item}</div>
      }) : null
    }
  </div>
}

function App() {
  return (
    <>
      <Aaa>
        <a href="#">111</a>
        <a href="#">222</a>
        <a href="#">333</a>
      </Aaa>
      <div>???????</div>
      <Aaa>
        {
            [
              <span>111</span>,
              <span>333</span>,
              [<span>444</span>, <span>222</span>]
            ]
        }
      </Aaa>
    </>
  )
}

export default App;
