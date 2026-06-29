import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

function RadioGroup({ value, onValueChange, children, className }: RadioGroupProps) {
  return (
    <div className={className} role="radiogroup">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            groupValue: value,
            onGroupValueChange: onValueChange,
          })
        }
        return child
      })}
    </div>
  )
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  groupValue?: string
  onGroupValueChange?: (value: string) => void
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, groupValue, onGroupValueChange, ...props }, ref) => {
    return (
      <input
        type="radio"
        ref={ref}
        value={value}
        checked={groupValue === value}
        onChange={(e) => onGroupValueChange?.(e.target.value)}
        className={cn(
          "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
          className
        )}
        {...props}
      />
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
