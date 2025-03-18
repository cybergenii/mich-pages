import { Loader2 } from 'lucide-react';
import React from 'react';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  isLoading = false,
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled,
  ...props
}) => {
  // Base styling
  const baseStyles = 'relative flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size variations
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-400'
  };
  
  // Disabled state
  const disabledStyles = 'opacity-60 cursor-not-allowed pointer-events-none';
  
  const buttonClasses = `
    ${baseStyles} 
    ${sizeStyles[size]} 
    ${variantStyles[variant]} 
    ${(disabled || isLoading) ? disabledStyles : ''}
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="animate-spin h-4 w-4" />
        </span>
      )}
      
      <span className={`flex items-center ${isLoading ? 'invisible' : ''}`}>
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </span>
    </button>
  );
};

export default StyledButton;