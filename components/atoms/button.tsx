import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold smooth-transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ripple relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300",
        glow: "bg-white text-black hover:bg-white/95 shadow-[0_0_40px_rgba(94,106,210,0.5)] hover:shadow-[0_0_60px_rgba(94,106,210,0.7)] hover:scale-105 active:scale-95 transition-all duration-300",
        "glow-premium": "bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 text-white hover:shadow-[0_0_50px_rgba(94,106,210,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 font-bold",
        outline: "border-2 border-white/20 bg-transparent hover:bg-white/10 text-white hover:border-white/40 hover:shadow-[0_0_30px_rgba(94,106,210,0.3)] transition-all duration-300",
        "outline-hover": "border-2 border-white/20 bg-transparent hover:bg-white/10 text-white hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(94,106,210,0.4)] transition-all duration-300",
        ghost: "hover:bg-white/10 text-gray-400 hover:text-white hover:shadow-md transition-all duration-300",
        secondary: "bg-white/10 text-white hover:bg-white/15 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 backdrop-blur-md",
      },
      size: {
        default: "h-10 px-6 py-2",
        lg: "h-12 px-8 text-base",
        sm: "h-8 px-4 text-xs",
        xl: "h-14 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
export { Button }