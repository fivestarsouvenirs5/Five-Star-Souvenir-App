/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./app/**/*.{js,jsx,mdx}",
    "./src/**/*.{js,jsx,mdx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        /* shadcn semantic system */
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",

        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },

        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },

        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",

          light: "oklch(var(--primary-light))",
          dark: "oklch(var(--primary-dark))",
        },

        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",

          light: "oklch(var(--secondary-light))",
          dark: "oklch(var(--secondary-dark))",
        },

        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },

        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",

        /* Custom palette */
        text: {
          DEFAULT: "oklch(var(--text))",
          light: "oklch(var(--text-light))",
          dark: "oklch(var(--text-dark))",
        },

        neutral: {
          beige: {
            DEFAULT: "oklch(var(--neutral-beige))",
            light: "oklch(var(--neutral-beige-light))",
            dark: "oklch(var(--neutral-beige-dark))",
          },

          blue: {
            DEFAULT: "oklch(var(--neutral-blue))",
            light: "oklch(var(--neutral-blue-light))",
            dark: "oklch(var(--neutral-blue-dark))",
          },
        },

        surface: "oklch(var(--surface))",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      keyframes: {
        flash: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.25 },
        },
      },

      animation: {
        flash: "flash 1s infinite",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};