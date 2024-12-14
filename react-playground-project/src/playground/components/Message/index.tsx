import { useEffect, useState } from "react"
import cs from 'classnames'

import styles from './index.module.scss'

export interface MessageProps {
  type: 'error' | 'warn'
  content: string
}

export const Message  = (props: MessageProps) => {
  const { type, content } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!!content)
  }, [content])
  return visible ? (
    <div className={cs(styles.msg, styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={styles.dismiss} onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  ) : null
}
