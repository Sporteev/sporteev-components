import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, Check, Search } from "lucide-react";
import {
  CHIP_COLORS,
  ChipColor,
  LabelChip,
} from "@/components/atoms/label-chip";
import { getHashNumber } from "@/lib/utils/hash";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  photoUrl?: string;
  chip?: string;
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

// Function to map chip text to appropriate colors using hash-based approach
export const getChipColor = (chipText: string): ChipColor => {
  const colorIndex = getHashNumber(chipText, CHIP_COLORS.length - 2); // exclude "gray" and "dark"
  return CHIP_COLORS[colorIndex];
};

export interface SelectProps extends VariantProps<typeof selectVariants> {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[] | undefined | null;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  emptyLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
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
      emptyLabel = "No options available",
      searchable = false,
      searchPlaceholder = "Search...",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Check if options are empty, null, or undefined
    const hasOptions = options && Array.isArray(options) && options.length > 0;

    // Filter options based on search term
    const filteredOptions = hasOptions
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

    // Find the selected option based on the value prop
    const selectedOption = hasOptions
      ? options.find((option) => option.value === value)
      : undefined;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      }
    }, [isOpen, searchable]);

    const handleSelect = (option: SelectOption) => {
      if (!option.disabled && onChange) {
        onChange(option.value);
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Prevent event bubbling to parent select
      e.stopPropagation();

      // Handle Escape to close dropdown
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (isDisabled) return;

      // Don't handle key events when searchable and open (let search input handle them)
      if (searchable && isOpen) {
        // Only handle Escape to close dropdown
        if (event.key === "Escape") {
          setIsOpen(false);
          setSearchTerm("");
        }
        return;
      }

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
    const isDisabled = disabled; // Only disable when explicitly disabled, not when no options

    return (
      <div ref={ref} className="relative w-full">
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
              isDisabled && "cursor-not-allowed opacity-50",
              !isDisabled && "cursor-pointer",
              className
            )}
            onClick={() => !isDisabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            tabIndex={isDisabled ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-labelledby={label}
          >
            {searchable && isOpen ? (
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Search className="h-4 w-4 flex-shrink-0 text-neutral-60" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  className="min-w-0 flex-1 border-none bg-transparent text-base font-medium outline-none placeholder:text-neutral-60"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ) : (
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {selectedOption?.photoUrl && (
                  <img
                    src={selectedOption.photoUrl}
                    alt={selectedOption.label}
                    className="h-6 w-6 flex-shrink-0 rounded-full object-cover"
                  />
                )}
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate text-base font-medium",
                    !selectedOption && "text-neutral-60"
                  )}
                >
                  {displayValue}
                </span>
              </div>
            )}
            <ChevronDown
              className={cn(
                "ml-2 h-4 w-4 flex-shrink-0 text-neutral-60 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>

          {isOpen && (
            <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-neutral-40 bg-white shadow-lg">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
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
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      {option.photoUrl && (
                        <img
                          src={option.photoUrl}
                          alt={option.label}
                          className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <span className="min-w-0 flex-1 truncate text-base font-medium">
                        {option.label}
                      </span>
                      {option.chip && (
                        <LabelChip
                          text={option.chip}
                          size="small"
                          color={getChipColor(option.chip)}
                        />
                      )}
                    </div>
                    {option.value === value && (
                      <Check className="ml-2 h-4 w-4 flex-shrink-0 text-primary-80" />
                    )}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-neutral-60">
                  {searchTerm ? "No matching options found" : emptyLabel}
                </div>
              )}
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="mt-1 text-xs text-danger-main">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
