export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`mx-auto w-full max-w-[1440px] px-5 md:px-10 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
