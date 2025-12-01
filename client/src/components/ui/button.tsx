import React from "react"

interface ButtonProps {
  children?: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  variant: "primary" | "secondary"
  className: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, variant }) => {
  const base = "px-4 py-2 rounded font-medium"
  const styles = variant === "primary" ? `${base} bg-blue-600 text-white hover:bg-blue-700 ` : `${base} bg-gray-200 text-gray-800 hover:bg-gray-300`;


  return (
    <button className={styles} onClick={onClick} disabled={disabled} >
      {children}
    </button>
  )
}

export default Button