import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // === BASE STYLES ===
  `
    inline-flex items-center justify-center whitespace-nowrap rounded-lg 
    font-semibold text-sm transition-all duration-200 ease-material
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    relative overflow-hidden group
    cursor-pointer select-none
  `,
  {
    variants: {
      variant: {
        // === GLOW (Primary Action) ===
        glow: `
          bg-gradient-to-br from-brand-purple to-brand-blue text-white font-bold
          shadow-lg shadow-brand-purple/30
          hover:shadow-xl hover:shadow-brand-purple/50 
          hover:-translate-y-1.5 hover:scale-105
          active:translate-y-0 active:scale-95 active:shadow-md
          focus-visible:ring-2 focus-visible:ring-brand-purple/50
          transition-all duration-200 ease-material
          before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-200
          hover:before:opacity-10
          relative
        `,

        // === GLOW PREMIUM (Hero/High-Impact) ===
        "glow-premium": `
          bg-gradient-to-r from-brand-purple via-brand-blue to-brand-pink text-white font-bold
          shadow-[0_0_40px_rgba(94,106,210,0.5)]
          hover:shadow-[0_0_60px_rgba(94,106,210,0.7)]
          hover:-translate-y-1.5 hover:scale-105
          active:translate-y-0 active:scale-95
          focus-visible:ring-2 focus-visible:ring-brand-purple/50
          transition-all duration-200 ease-material
          after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/20 after:to-transparent after:opacity-0 after:hover:opacity-100 after:transition-opacity after:duration-300
        `,

        // === OUTLINE (Secondary Action) ===
        outline: `
          border-2 border-border-light bg-transparent text-text-primary font-semibold
          hover:border-brand-purple hover:bg-glass-light hover:scale-105 hover:-translate-y-1
          hover:shadow-[0_0_30px_rgba(94,106,210,0.3)]
          active:border-brand-purple/80 active:scale-95 active:translate-y-0
          focus-visible:ring-2 focus-visible:ring-brand-purple/50
          transition-all duration-200 ease-material
        `,

        // === OUTLINE HOVER (Tertiary Action) ===
        "outline-hover": `
          border-2 border-border-medium bg-glass-light text-text-primary font-medium
          hover:border-brand-purple hover:bg-glass-medium hover:scale-105
          hover:shadow-[0_0_40px_rgba(94,106,210,0.4)]
          hover:-translate-y-0.5
          active:translate-y-0 active:scale-95
          focus-visible:ring-2 focus-visible:ring-brand-purple/50
          transition-all duration-200 ease-material
        `,

        // === GHOST (Minimal) ===
        ghost: `
          bg-transparent text-text-secondary font-semibold
          hover:text-text-primary hover:bg-glass-light hover:scale-105 hover:-translate-y-0.5
          hover:shadow-md
          active:translate-y-0 active:scale-95
          focus-visible:ring-2 focus-visible:ring-brand-purple/30
          transition-all duration-200 ease-material
        `,

        // === SECONDARY (Supporting) ===
        secondary: `
          bg-glass-medium border border-border-light text-text-primary font-semibold
          hover:bg-glass-heavy hover:border-brand-purple/50 hover:scale-105
          hover:shadow-[0_0_30px_rgba(94,106,210,0.3)]
          hover:-translate-y-0.5
          active:translate-y-0 active:scale-95
          focus-visible:ring-2 focus-visible:ring-brand-purple/50
          transition-all duration-200 ease-material backdrop-blur-md
        `,

        // === MINIMAL (Text Only) ===
        minimal: `
          bg-transparent text-brand-purple font-semibold
          hover:text-brand-purple-light 
          hover:translate-x-1
          active:translate-x-0
          focus-visible:ring-2 focus-visible:ring-brand-purple/30
          transition-all duration-200 ease-material
          underline-offset-2 hover:underline
        `,

        // === ACCENT (Highlight) ===
        accent: `
          bg-gradient-to-r from-brand-pink to-brand-purple text-white font-bold
          shadow-lg shadow-brand-pink/30
          hover:shadow-xl hover:shadow-brand-pink/50
          hover:-translate-y-1.5 hover:scale-105
          active:translate-y-0 active:scale-95
          focus-visible:ring-2 focus-visible:ring-brand-pink/50
          transition-all duration-200 ease-material
        `,
      },

      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        "2xl": "h-16 px-12 text-xl",
      },

      fullWidth: {
        true: "w-full sm:w-auto",
        false: "",
      },
    },

    defaultVariants: {
      variant: "glow",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          "group relative"
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* === RIPPLE EFFECT === */}
        <span className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 scale-0 group-active:scale-100 transition-transform duration-500 origin-center rounded-full" />
        </span>

        {/* === CONTENT === */}
        <span className="relative flex items-center justify-center gap-2 transition-all duration-200">
          {isLoading ? (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : null}
          {children}
        </span>
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
