export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl";
export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

const breakpointPrefix: Record<Exclude<Breakpoint, "base">, string> = {
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
};

export function responsiveClasses<T extends string>(
  value: Responsive<T> | undefined,
  tokenToClass: Record<T, string>
): string {
  if (value === undefined) return "";

  if (typeof value === "string") {
    return tokenToClass[value] ?? "";
  }

  return Object.entries(value)
    .map(([breakpoint, token]) => {
      if (!token) return "";
      const className = tokenToClass[token as T];
      if (!className) return "";
      if (breakpoint === "base") return className;
      const prefix =
        breakpointPrefix[breakpoint as Exclude<Breakpoint, "base">];
      return className
        .split(/\s+/)
        .filter(Boolean)
        .map((c) => `${prefix}${c}`)
        .join(" ");
    })
    .filter(Boolean)
    .join(" ");
}
