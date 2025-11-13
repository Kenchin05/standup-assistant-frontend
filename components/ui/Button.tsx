import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx("btn", {
        "btn-primary": variant === "primary",
        "btn-secondary": variant === "secondary",
        "btn-danger": variant === "danger",
      }, className)}
    />
  );
}
