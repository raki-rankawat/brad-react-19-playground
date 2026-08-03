import type { ReactNode } from 'react'

type TabButtonProps = {
  children: ReactNode
  isActive: boolean
  onClick: () => void
}

const TabButton = ({ children, isActive, onClick }: TabButtonProps) => {
  if (isActive) {
    return <div className='text-blue-600 font-bold'>{children}</div>
  }
  return (
    <button
      onClick={() => {
        onClick()
      }}
    >
      {children}
    </button>
  )
}
export default TabButton
