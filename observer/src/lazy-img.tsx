import { useEffect, useRef, useState } from 'react';
import './lazy-img.css'

//枚举图片填充方式
enum ObjectFit {
  contain = 'contain',
  cover = 'cover',
  fill = 'fill',
  none = 'none',
  scaleDown = 'scale-down',
}

interface LazyImgProps {
  src: string,
  alt?: string,
  isLazy?: boolean
  style?: React.CSSProperties,
  /** 加载完毕*/
  finishedLoading?: (imgDom: HTMLImageElement) => void,
  objectfit?: ObjectFit
}
function LazyImage(props: LazyImgProps) {
  const srcDom = useRef<HTMLImageElement>(null)
  const { src, alt = "", isLazy = false, finishedLoading = () => { }, objectfit = ObjectFit.cover } = props
  const [isFinishLoad, setIsFinishLoad] = useState(false)
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Intersecting", entry);
        srcDom.current!.src = src
        srcDom.current!.onload = () => {
          setIsFinishLoad(true)
        }
        //使 IntersectionObserver 停止监听特定目标元素。
        intersectionObserver.unobserve(srcDom.current!);
      }
    })
    console.log("Loaded new items", entries);
  })
  useEffect(() => {
    if (srcDom.current === null || !isFinishLoad ) {
      return
    }
    if (isFinishLoad) {
      finishedLoading(srcDom.current)
    }
  }, [isFinishLoad])
  useEffect(() => {
    if (srcDom.current === null || src === '') {
      return
    }
    if (!isLazy) {
      srcDom.current.src = src
      srcDom.current.onload = () => {
        setIsFinishLoad(true)
      }
      return
    }
    intersectionObserver.observe(srcDom.current!)
    return () => {
      intersectionObserver.disconnect()
    }
  }, [src])
  return (
    <>
      <img className="img-box" ref={srcDom} alt={alt} style={{objectFit: objectfit}} />
    </>
  )
}



export default LazyImage;
