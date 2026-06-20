import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle } from "@solar-icons/react-perf/Linear";
import { ChevronIcon, SearchIcon } from "@/components/icons/custom";
import {
  CHIP_COLORS,
  type ChipColor,
  LabelChip,
} from "@/components/atoms/label-chip";
import { getHashNumber } from "@/lib/utils/hash";
import type { SelectOption, SelectProps } from "./types";
import { getSelectTriggerClasses } from "./variants";

export const getChipColor = (chipText: string): ChipColor => {
  const colorIndex = getHashNumber(chipText, CHIP_COLORS.length - 2);
  return CHIP_COLORS[colorIndex];
};

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

    const hasOptions = options && Array.isArray(options) && options.length > 0;

    const filteredOptions = hasOptions
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

    const selectedOption = hasOptions
      ? options.find((option) => option.value === value)
      : undefined;

    useEffect(() => {
      if (isOpen && selectButtonRef.current) {
        const updatePosition = () => {
          if (!selectButtonRef.current) return;

          const rect = selectButtonRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          const dropdownMaxHeight = 240;
          const gap = 4;
          const edgePadding = 8;

          const spaceBelow = viewportHeight - rect.bottom;
          const spaceAbove = rect.top;

          const openAbove =
            spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow;

          let left = rect.left;
          const dropdownWidth = rect.width;

          if (left + dropdownWidth > viewportWidth - edgePadding) {
            left = viewportWidth - dropdownWidth - edgePadding;
          }

          if (left < edgePadding) {
            left = edgePadding;
          }

          if (openAbove) {
            const maxHeight = Math.min(
              dropdownMaxHeight,
              rect.top - gap - edgePadding
            );

            setDropdownStyle({
              position: "fixed",
              bottom: `${viewportHeight - rect.top + gap}px`,
              left: `${left}px`,
              width: `${dropdownWidth}px`,
              maxHeight: `${maxHeight}px`,
            });
          } else {
            const top = rect.bottom + gap;
            const maxHeight = Math.min(
              dropdownMaxHeight,
              viewportHeight - top - edgePadding
            );

            setDropdownStyle({
              position: "fixed",
              top: `${top}px`,
              left: `${left}px`,
              width: `${dropdownWidth}px`,
              maxHeight: `${maxHeight}px`,
            });
          }
        };

        updatePosition();

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
      e.stopPropagation();

      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (isDisabled) return;

      if (searchable && isOpen) {
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
    const isDisabled = disabled;

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
              getSelectTriggerClasses(hasError, variant),
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
                <SearchIcon className="text-grey-600 h-16 w-16 flex-shrink-0" />
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
            <ChevronIcon
              direction="down"
              className={cn(
                "text-grey-600 ml-8 h-16 w-16 flex-shrink-0 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>

          {isOpen && dropdownStyle && (
            <div
              className="border-grey-400 rounded-8 shadow-secondary z-[9999] max-h-240 overflow-auto border bg-white"
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
                      <span className="w-fit min-w-0 flex-1 truncate text-base font-medium">
                        {option.label}
                      </span>
                      {option.chip && (
                        <LabelChip
                          text={option.chip}
                          size="s"
                          color={getChipColor(option.chip)}
                        />
                      )}
                    </div>
                    {option.value === value && (
                      <CheckCircle className="text-primary-600 ml-8 h-16 w-16 flex-shrink-0" />
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
