import { useI18nStore } from '../store/i18nStore';
import { storeToRefs } from 'pinia';

export function useI18n() {
  const i18nStore = useI18nStore();
  const { currentLocale } = storeToRefs(i18nStore);
  
  return {
    t: i18nStore.t,
    locale: currentLocale,
    setLocale: i18nStore.setLocale
  };
} 