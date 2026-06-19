#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

usage() {
  cat <<'EOF'
Wire team AI config from .ide/ into your local IDE directory (gitignored).

Usage:
  pnpm setup:ide:cursor
  pnpm setup:ide:claude
  pnpm setup:ide:kiro
  pnpm setup:ide -- ide:cursor ide:claude   # multiple IDEs

Accepted values: ide:cursor | ide:claude | ide:kiro
                 (cursor | claude | kiro also work)
EOF
}

link_subdir() {
  local parent_dir="$1"
  local name="$2"
  local target_rel="$3"

  local path="$parent_dir/$name"
  mkdir -p "$parent_dir"

  if [[ -L "$path" ]]; then
    local current
    current="$(readlink "$path")"
    if [[ "$current" == "$target_rel" ]]; then
      echo "  OK: $path -> $target_rel"
      return
    fi
    rm "$path"
  elif [[ -e "$path" ]]; then
    echo "  Skip: $path exists and is not a symlink (remove manually to use team config)"
    return
  fi

  ln -sf "$target_rel" "$path"
  echo "  Linked: $path -> $target_rel"
}

wire_tool() {
  local label="$1"
  local config_dir="$2"
  local rules_name="$3"
  local skills_name="$4"
  local rules_target="$5"
  local skills_target="$6"

  echo "$label ($config_dir/)"
  link_subdir "$config_dir" "$rules_name" "$rules_target"
  link_subdir "$config_dir" "$skills_name" "$skills_target"
  echo ""
}

wire_cursor() {
  wire_tool "Cursor" "$ROOT/.cursor" "rules" "skills" "../.ide/rules" "../.ide/skills"
}

wire_claude() {
  wire_tool "Claude Code" "$ROOT/.claude" "rules" "skills" "../.ide/rules" "../.ide/skills"
}

wire_kiro() {
  wire_tool "Kiro" "$ROOT/.kiro" "steering" "skills" "../.ide/rules" "../.ide/skills"
}

normalize_ide() {
  local raw="${1#ide:}"
  echo "$raw"
}

wire_ide() {
  case "$(normalize_ide "$1")" in
    cursor) wire_cursor ;;
    claude) wire_claude ;;
    kiro) wire_kiro ;;
    *)
      echo "Unknown IDE: $1" >&2
      echo "Use ide:cursor, ide:claude, or ide:kiro" >&2
      exit 1
      ;;
  esac
}

if [[ $# -eq 0 ]]; then
  usage
  exit 1
fi

echo "Wiring team AI config from .ide/ ..."
echo ""

for arg in "$@"; do
  wire_ide "$arg"
done

echo "AI IDE setup complete."
echo "Source: .ide/rules/  .ide/skills/"
