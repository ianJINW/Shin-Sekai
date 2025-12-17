import React from "react"

interface ButtonProps {
  children?: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  variant: "primary" | "secondary" | "ghost"
  className: string
  type?: "submit" | "reset" | "button"
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, variant, className, type }) => {
  const base = "px-4 py-2 rounded font-medium"
  const styles = variant === "primary" ? `${base} bg-blue-600 text-white hover:bg-blue-700 ` : variant === "secondary" ? `${base} bg-gray-200 text-gray-800 hover:bg-gray-300` : `${base} bg-transparent text-gray-800 hover:bg-gray-100`;


  return (
    <button type={type} className={`${styles} ${className}`} onClick={onClick} disabled={disabled} >
      {children}
    </button>
  )
}

export default Button