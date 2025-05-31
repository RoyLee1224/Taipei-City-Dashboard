import { useI18nStore } from '../store/i18nStore';

export default {
  install(app) {
    // 全域屬性
    app.config.globalProperties.$t = (key, fallback) => {
      const i18nStore = useI18nStore();
      return i18nStore.t(key, fallback);
    };
    
    app.config.globalProperties.$locale = () => {
      const i18nStore = useI18nStore();
      return i18nStore.currentLocale;
    };
    
    // 全域方法
    app.provide('i18n', {
      t: (key, fallback) => {
        const i18nStore = useI18nStore();
        return i18nStore.t(key, fallback);
      },
      setLocale: (locale) => {
        const i18nStore = useI18nStore();
        return i18nStore.setLocale(locale);
      },
      currentLocale: () => {
        const i18nStore = useI18nStore();
        return i18nStore.currentLocale;
      }
    });
  }
}; 