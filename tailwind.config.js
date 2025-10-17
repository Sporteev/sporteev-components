/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "soft-gradient": "linear-gradient(to right, #58AEFF, #6F72FF)",
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        primary: {
          100: "#001C37",
          90: "#00325A",
          80: "#006493",
          70: "#0474A8",
          60: "#2092C8",
          50: "#49AEDE",
          40: "#80CCEF",
          30: "#A8DEF8",
          20: "#E6F2FF",
          10: "#F5FCFF",
        },
        secondary: {
          100: "#101C2B",
          90: "#253141",
          80: "#3C4858",
          70: "#535F70",
          60: "#6C788A",
          50: "#8592A4",
          40: "#BBC7DB",
          30: "#D7E3F8",
          20: "#EAF1FF",
          10: "#FDFCFF",
        },
        tertiary: {
          100: "#150066",
          90: "#2C217A",
          80: "#433A91",
          70: "#5B52AB",
          60: "#746CC6",
          50: "#8E86E2",
          40: "#C6C0FF",
          30: "#E4DFFF",
          20: "#F3EEFF",
          10: "#FFFBFF",
        },
        neutral: {
          100: "#1C1B1F",
          90: "#2F3033",
          80: "#45474A",
          70: "#5D5E61",
          60: "#76777A",
          50: "#909094",
          40: "#E3E2E6",
          30: "#F1F0F4",
          20: "#FDFCFF",
          10: "#FFFFFF",
        },
        danger: {
          main: "#BA1A1A",
          accent: "#FFEDEA",
          "main-hover": "#EA2B2B",
          "accent-hover": "#FFE0DB",
        },
        warning: {
          main: "#EEA604",
          accent: "#FFF7E4",
          "main-hover": "#FAB61D",
          "accent-hover": "#FFF2D2",
        },
        success: {
          main: "#007A0D",
          accent: "#D6FFDA",
          "main-hover": "#089016",
          "accent-hover": "#C1FFC8",
        },
        gradient: {
          primary: "linear-gradient(90deg, #0474A8 0%, #0459A8 100%)",
          mixed: "linear-gradient(90deg, #3584CE 0%, #503894 100%)",
          dark: "linear-gradient(90deg, #2F3033 0%, #5D5E61 100%)",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      fontSize: {
        // Exact typography from sporteev-crm
        h1: [
          "36px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        h2: [
          "32px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        h3: [
          "28px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        h4: [
          "24px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        h5: [
          "20px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        h6: [
          "18px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "bold-large-text": [
          "16px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "regular-large-text": [
          "16px",
          { lineHeight: "120%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "multiline-large-text": [
          "16px",
          { lineHeight: "150%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "bold-medium-text": [
          "14px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "regular-medium-text": [
          "14px",
          { lineHeight: "120%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "multiline-medium-text": [
          "14px",
          { lineHeight: "150%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "bold-small-text": [
          "12px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "regular-small-text": [
          "12px",
          { lineHeight: "120%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "multiline-small-text": [
          "12px",
          { lineHeight: "150%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        // Desktop sizes for responsive typography
        "h1-desktop": [
          "64px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "h2-desktop": [
          "56px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "h3-desktop": [
          "48px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "h4-desktop": [
          "36px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "h5-desktop": [
          "24px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "h6-desktop": [
          "20px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "bold-large-text-desktop": [
          "18px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "regular-large-text-desktop": [
          "18px",
          { lineHeight: "120%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "multiline-large-text-desktop": [
          "18px",
          { lineHeight: "150%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "bold-medium-text-desktop": [
          "16px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "regular-medium-text-desktop": [
          "16px",
          { lineHeight: "120%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "multiline-medium-text-desktop": [
          "16px",
          { lineHeight: "150%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "bold-small-text-desktop": [
          "14px",
          { lineHeight: "140%", letterSpacing: "-1%", fontWeight: "600" },
        ],
        "regular-small-text-desktop": [
          "14px",
          { lineHeight: "120%", letterSpacing: "-1%", fontWeight: "400" },
        ],
        "multiline-small-text-desktop": [
          "14px",
          { lineHeight: "150%", letterSpacing: "-1%", fontWeight: "400" },
        ],
      },
      screens: {
        lg: "960px", // Match sporteev-crm breakpoint
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
