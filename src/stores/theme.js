import { ref } from "vue";
import { defineStore } from "pinia";
import { themeOptions } from "../constants/themeOptions.js";

export const useThemeStore = defineStore("theme", () => {
  const themesList = ref(themeOptions);
  const activeTheme = ref(themeOptions[0]);

  const changeTheme = (newTheme) => {
    activeTheme.value = newTheme;
  };

  return {
    themesList,
    activeTheme,
    changeTheme,
  };
});
