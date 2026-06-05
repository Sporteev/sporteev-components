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
  "min-w-0 inline-flex items-center justify-between rounded-8 border bg-white px-12 py-8 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
  {
    variants: {
      variant: {
        default: "border-grey-400 hover:border-grey-6000",
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
    const selectButtonRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [dropdownStyle, setDropdownStyle] =
      useState<React.CSSProperties | null>(null);

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

    // Calculate dropdown position using fixed positioning with smart placement
    useEffect(() => {
      if (isOpen && selectButtonRef.current) {
        const updatePosition = () => {
          if (selectButtonRef.current) {
            const rect = selectButtonRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const dropdownMaxHeight = 240; // max-h-60 = 15rem = 240px
            const gap = 4; // mt-1 = 0.25rem = 4px

            // Calculate available space below and above
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;

            // Determine if dropdown should open above or below
            const openAbove =
              spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow;

            // Calculate top position
            let top: number;
            if (openAbove) {
              top = rect.top - dropdownMaxHeight - gap;
            } else {
              top = rect.bottom + gap;
            }

            // Ensure dropdown doesn't go off-screen vertically
            const maxTop = Math.max(8, viewportHeight - dropdownMaxHeight - 8); // 8px padding from edges
            const minTop = 8;
            top = Math.max(minTop, Math.min(maxTop, top));

            // Calculate left position and handle horizontal overflow
            let left = rect.left;
            const dropdownWidth = rect.width;

            // If dropdown would overflow on the right, align it to the right edge
            if (left + dropdownWidth > viewportWidth - 8) {
              left = viewportWidth - dropdownWidth - 8;
            }

            // If dropdown would overflow on the left, align it to the left edge
            if (left < 8) {
              left = 8;
            }

            // Calculate max height based on available space
            let maxHeight = dropdownMaxHeight;
            if (openAbove) {
              maxHeight = Math.min(dropdownMaxHeight, rect.top - gap - 8);
            } else {
              maxHeight = Math.min(dropdownMaxHeight, viewportHeight - top - 8);
            }

            setDropdownStyle({
              position: "fixed",
              top: `${top}px`,
              left: `${left}px`,
              width: `${dropdownWidth}px`,
              maxHeight: `${maxHeight}px`,
            });
          }
        };

        // Calculate immediately
        updatePosition();

        // Also calculate after a frame to ensure DOM is ready
        requestAnimationFrame(() => {
          updatePosition();
        });

        const handleResize = () => updatePosition();
        const handleScroll = () => updatePosition();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll, true);
        return () => {
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("scroll", handleScroll, true);
        };
      } else {
        setDropdownStyle(null);
      }
    }, [isOpen]);

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
          <label className="text-grey-950 mb-8 block text-sm font-medium">
            {label}
            {required && <span className="ml-4 text-red-500">*</span>}
          </label>
        )}

        <div
          ref={selectRef}
          className="relative w-full"
          style={{ zIndex: isOpen ? 9999 : "auto" }}
        >
          <div
            ref={selectButtonRef}
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
              <div className="flex min-w-0 flex-1 items-center gap-12">
                <Search className="text-grey-600 h-16 w-16 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  className="placeholder:text-grey-600 min-w-0 flex-1 border-none bg-transparent text-base font-medium outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ) : (
              <div className="flex min-w-0 flex-1 items-center gap-12">
                {selectedOption?.photoUrl && (
                  <img
                    src={selectedOption.photoUrl}
                    alt={selectedOption.label}
                    className="h-24 w-24 flex-shrink-0 rounded-full object-cover"
                  />
                )}
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate text-base font-medium",
                    !selectedOption && "text-grey-600"
                  )}
                >
                  {displayValue}
                </span>
              </div>
            )}
            <ChevronDown
              className={cn(
                "text-grey-600 ml-8 h-16 w-16 flex-shrink-0 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>

          {isOpen && dropdownStyle && (
            <div
              className="border-grey-400 rounded-8 z-[9999] mt-4 max-h-240 overflow-auto border bg-white shadow-lg"
              style={dropdownStyle}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "flex min-w-0 cursor-pointer items-center justify-between px-12 py-8",
                      option.value === value &&
                        "bg-primary-200 text-primary-600",
                      option.disabled && "cursor-not-allowed opacity-50",
                      !option.disabled && "hover:bg-grey-200"
                    )}
                    onClick={() => handleSelect(option)}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-12">
                      {option.photoUrl && (
                        <img
                          src={option.photoUrl}
                          alt={option.label}
                          className="h-32 w-32 flex-shrink-0 rounded-full object-cover"
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
                      <Check className="text-primary-600 ml-8 h-16 w-16 flex-shrink-0" />
                    )}
                  </div>
                ))
              ) : (
                <div className="text-grey-600 px-12 py-8">
                  {searchTerm ? "No matching options found" : emptyLabel}
                </div>
              )}
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="text-danger-main mt-4 text-xs">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
