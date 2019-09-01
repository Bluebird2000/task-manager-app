import { Utils } from "expo-ui-kit";

const theme = {
  COLORS: {
    // base colors
    primary: "#4630EB",
    // color variations
    gray: "#535453",
    // color utils
    circle: "#ff0066",
  },
  SIZES: {
    // global sizes
    base: 8,
    font: 16,
    radius: 30,
    padding: 26,

    // font sizes
    h1: 34,
    h2: 24,
    h3: 20,
    title: 16,
    subtitle: 13,
    caption: 14,
    small: 10
  }
};

export default Utils.mergeTheme(Utils.theme, theme);
