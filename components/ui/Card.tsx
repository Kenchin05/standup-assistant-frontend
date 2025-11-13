import React from "react";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-xl shadow", className)} {...props}>
      {children}
    </div>
  );
}
