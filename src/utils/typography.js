import Typography from "typography"

const typography = new Typography({
  headerFontFamily: ["Lato", "sans-serif"],
  bodyFontFamily: ["Lato", "sans-serif"],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
