import { useState } from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  style,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        style={{
          ...style,
          backgroundColor: '#E5E5E7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8E8E93',
          fontSize: '12px',
        }}
        className={props.className}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={fallbackSrc && hasError ? fallbackSrc : src}
      alt={alt}
      onError={() => setHasError(true)}
      style={style}
      {...props}
    />
  )
}
