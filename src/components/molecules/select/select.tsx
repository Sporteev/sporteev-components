import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle } from "@solar-icons/react-perf/Linear";
import { ChevronIcon, SearchIcon } from "@/components/icons/custom";
import {
  CHIP_COLORS,
  type ChipColor,
  LabelChip,
} from "@/components/atoms/label-chip";
import { FieldShell } from "@/components/molecules/input-text/field-shell";
import { getHashNumber } from "@/lib/utils/hash";
import type { SelectOption, SelectProps } from "./types";
import {
  SELECT_CHECK_ICON_SIZE_CLASSES,
  SELECT_ICON_SIZE_CLASSES,
  SELECT_OPTION_PHOTO_SIZE_CLASSES,
  SELECT_OPTION_SIZE_CLASSES,
  SELECT_TRIGGER_PHOTO_SIZE_CLASSES,
} from "./sizes";
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
      helperText,
      disabled = false,
      size = "m",
      fullWidth = true,
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
    const hasError = Boolean(errorMessage);
    const isDisabled = disabled;
    const iconSizeClass = SELECT_ICON_SIZE_CLASSES[size];

    return (
      <div ref={ref} className={cn(fullWidth && "w-full")}>
        <FieldShell
          size={size}
          label={label}
          required={required}
          helperText={helperText}
          errorMessage={errorMessage}
          fullWidth={fullWidth}
        >
          <div
            ref={selectRef}
            className="relative w-full"
            style={{ zIndex: isOpen ? 9999 : "auto" }}
          >
            <div
              ref={selectButtonRef}
              className={cn(
                getSelectTriggerClasses(hasError, isDisabled, size, isOpen),
                !isDisabled && "cursor-pointer",
                className
              )}
              onClick={() => !isDisabled && setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              tabIndex={isDisabled ? -1 : 0}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-invalid={hasError || undefined}
              aria-required={required || undefined}
            >
              {searchable && isOpen ? (
                <div className="flex min-w-0 flex-1 items-center gap-8">
                  <SearchIcon
                    className={cn("text-grey-500 shrink-0", iconSizeClass)}
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    className="placeholder:text-grey-500 min-w-0 flex-1 border-none bg-transparent text-inherit outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ) : (
                <div className="flex min-w-0 flex-1 items-center gap-8">
                  {selectedOption?.photoUrl && (
                    <img
                      src={selectedOption.photoUrl}
                      alt={selectedOption.label}
                      className={cn(
                        "shrink-0 rounded-full object-cover",
                        SELECT_TRIGGER_PHOTO_SIZE_CLASSES[size]
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate",
                      !selectedOption && "text-grey-500"
                    )}
                  >
                    {displayValue}
                  </span>
                </div>
              )}
              <ChevronIcon
                direction="down"
                className={cn(
                  "text-grey-500 ml-8 shrink-0 transition-transform duration-200",
                  iconSizeClass,
                  isOpen && "rotate-180"
                )}
              />
            </div>

            {isOpen && dropdownStyle && (
              <div
                className="border-grey-400 rounded-8 shadow-secondary z-[9999] max-h-240 overflow-auto border bg-white"
                style={dropdownStyle}
                role="listbox"
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        "flex min-w-0 cursor-pointer items-center justify-between",
                        SELECT_OPTION_SIZE_CLASSES[size],
                        option.value === value &&
                          "bg-primary-200 text-primary-600",
                        option.disabled && "cursor-not-allowed opacity-50",
                        !option.disabled && "hover:bg-grey-200"
                      )}
                      onClick={() => handleSelect(option)}
                      role="option"
                      aria-selected={option.value === value}
                    >
                      <div className="flex min-w-0 items-center gap-8">
                        {option.photoUrl && (
                          <img
                            src={option.photoUrl}
                            alt={option.label}
                            className={cn(
                              "shrink-0 rounded-full object-cover",
                              SELECT_OPTION_PHOTO_SIZE_CLASSES[size]
                            )}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}
                        <span className="shrink-0">{option.label}</span>
                        {option.chip && (
                          <LabelChip
                            text={option.chip}
                            size="s"
                            color={getChipColor(option.chip)}
                          />
                        )}
                      </div>
                      {option.value === value && (
                        <CheckCircle
                          className={cn(
                            "text-primary-600 ml-8 shrink-0",
                            SELECT_CHECK_ICON_SIZE_CLASSES[size]
                          )}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div
                    className={cn(
                      "text-grey-500",
                      SELECT_OPTION_SIZE_CLASSES[size]
                    )}
                  >
                    {searchTerm ? "No matching options found" : emptyLabel}
                  </div>
                )}
              </div>
            )}
          </div>
        </FieldShell>
      </div>
    );
  }
);

Select.displayName = "Select";
