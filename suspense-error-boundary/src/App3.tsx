
import { Component, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary'

class CErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>出错了： {this.state.message}</div>;
    }
    return this.props.children;
  }
}

function Bbb() {
  const b = window.a.b;

  return <div>{b}</div>
}

const fallbackRender = ({ error }) => {
  // console.log(error);
  
  return <div>
      <p>出错了：</p>
      <div>{error?.message}</div>
  </div>
}
function BbbInner() {
  useEffect(() => {
      throw new Error('xxxsd');
  }, [])
  return <div>bbb</div>
}

function BbbOuter() {
  return <BbbInner></BbbInner>
}
function Aaa() {
 
  return (
    <>
      122
      <CErrorBoundary>
        <Bbb />
      </CErrorBoundary>
      <ErrorBoundary fallback={<div>render error</div>}>
        <Bbb />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <BbbOuter />
      </ErrorBoundary>
      
    </>
  )
}

export default Aaa
