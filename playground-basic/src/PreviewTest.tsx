import iframe from './iframe.html?raw'

const iframeUrl = URL.createObjectURL(
  new Blob([iframe], { type: 'text/html' })
)

const Preview: React.FC = () => {

  return (
    <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none'
        }}
    />
  )
}

export default Preview;
