"use client";
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-0", className)}
      classNames={{
        month: "w-full relative",
        caption: "relative flex items-center justify-center pt-1 mb-3",
        caption_label: "mt-2 text-sm font-medium",
        button_previous: "absolute z-50 -left-14 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md",
        button_next: "absolute z-50 -right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md",
        month_grid: "w-full border-collapse",
        weekdays: "flex justify-between",
        weekday: "text-muted-foreground w-8 font-normal text-[0.7rem] flex items-center justify-center",
        week: "flex w-full mt-1 justify-between",
        day_button: cn(
          "h-8 w-8 p-0 font-normal text-sm rounded-md hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center",
          "focus-visible:outline-none focus-visible:rounded-md focus-visible:ring-1 focus-visible:ring-ring",
          props.mode === "range"
            ? "data-[selected]:bg-accent data-[selected]:text-accent-foreground"
            : ""
        ),
        day: cn(
          "relative p-0 text-center",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
            : "rounded-md"
        ),
        range_start: "day-range-start rounded-l-md",
        range_end: "day-range-end rounded-r-md",
        selected:
          "bg-[#D1E2FF] border border-[#1757B9] text-[#101828] hover:bg-[#D1E2FF] hover:text-[#101828] focus:bg-[#D1E2FF] focus:text-[#101828]",
        today: "bg-[#D1E2FF] text-[#101828] rounded-lg",
        outside:
          "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-6 w-6 border-none", className)} {...props} />
        ),
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-6 w-6 border-none", className)} {...props} />
        ),
      }}
      {...props} />
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
