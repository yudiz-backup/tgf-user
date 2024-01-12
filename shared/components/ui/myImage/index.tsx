import React from 'react'
import Image from 'next/image'

interface ImageType {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

function MyImage({ src, alt, width, height, className }: ImageType) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} w-100 h-auto`}
    />
  )
}
export default React.memo(MyImage)
