import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[6px] w-full grow overflow-hidden rounded-full bg-[#1c1c30]">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-[#4f46ff] to-[#ff4d4d]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-[18px] w-[18px] rounded-full border-2 border-[#4f46ff] bg-[#f5f5ff] ring-offset-background transition-all hover:bg-white hover:border-[#7c7cff] hover:shadow-[0_2px_12px_rgba(79,70,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c62ff] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-[0_2px_8px_rgba(79,70,255,0.3)]" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
