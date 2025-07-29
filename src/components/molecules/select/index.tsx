import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

const selectVariants = cva(
  "min-w-0 inline-flex items-center justify-between rounded-lg border bg-white px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50",
  {
    variants: {
      variant: {
        default: "border-neutral-40 hover:border-neutral-60",
        error:
          "border-danger-main focus:ring-danger-main focus:border-danger-main",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SelectProps extends VariantProps<typeof selectVariants> {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  errorMessage,
  disabled = false,
  variant,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Find the selected option based on the value prop
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (!option.disabled && onChange) {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  const displayValue = selectedOption ? selectedOption.label : placeholder;
  const hasError = !!errorMessage;

  return (
    <div className="relative w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-neutral-100">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div ref={selectRef} className="relative w-full">
        <div
          className={cn(
            selectVariants({ variant: hasError ? "error" : variant }),
            "box-border flex w-full",
            disabled && "cursor-not-allowed opacity-50",
            !disabled && "cursor-pointer",
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={label}
        >
          <span
            className={cn(
              "flex-1 truncate text-base font-medium",
              !selectedOption && "text-neutral-60"
            )}
          >
            {displayValue}
          </span>
          <ChevronDown
            className={cn(
              "ml-2 h-4 w-4 flex-shrink-0 text-neutral-60 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-neutral-40 bg-white shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex min-w-0 cursor-pointer items-center justify-between px-3 py-2",
                  option.value === value && "bg-primary-20 text-primary-80",
                  option.disabled && "cursor-not-allowed opacity-50",
                  !option.disabled && "hover:bg-neutral-20"
                )}
                onClick={() => handleSelect(option)}
              >
                <span className="min-w-0 flex-1 truncate text-base font-medium">
                  {option.label}
                </span>
                {option.value === value && (
                  <Check className="ml-2 h-4 w-4 flex-shrink-0 text-primary-80" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="mt-1 text-xs text-danger-main">{errorMessage}</p>
      )}
    </div>
  );
};

export default Select;
