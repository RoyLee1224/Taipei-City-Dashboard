<template>
  <div class="language-switcher">
    <button @click="toggleLanguage" class="language-button">
      <span class="language-icon">language</span>
      <span class="language-text">{{ getCurrentLanguageName() }}</span>
    </button>
  </div>
</template>

<script setup>
import { useI18nStore } from '../../store/i18nStore';
import { storeToRefs } from 'pinia';

const i18nStore = useI18nStore();
const { currentLocale, availableLocales } = storeToRefs(i18nStore);

const toggleLanguage = () => {
  // 在中英文之間切換
  const newLocale = currentLocale.value === 'zh-TW' ? 'en-US' : 'zh-TW';
  console.log('Switching language from', currentLocale.value, 'to', newLocale);
  i18nStore.setLocale(newLocale);
};

const getCurrentLanguageName = () => {
  const current = availableLocales.value.find(locale => locale.code === currentLocale.value);
  return current ? current.name : currentLocale.value;
};
</script>

<style scoped lang="scss">
.language-switcher {
  display: flex;
  align-items: center;

  .language-button {
    display: flex;
    align-items: center;
    margin-right: var(--font-m);
    padding: 6px 8px;
    border-radius: 4px;
    background: none;
    border: none;
    color: var(--color-text);
    font-size: var(--font-m);
    cursor: pointer;
    transition: background-color 0.25s;
    min-width: 90px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .language-icon {
      font-family: var(--font-icon);
      font-size: calc(var(--font-l) * var(--font-to-icon));
      margin-right: 4px;
      flex-shrink: 0;
    }

    .language-text {
      font-size: var(--font-s);
      white-space: nowrap;
      width: 60px;
      text-align: center;
      flex-shrink: 0;
    }
  }
}

// 隱藏在手機版
@media screen and (max-width: 750px) {
  .language-switcher {
    display: none;
  }
}

@media screen and (max-height: 500px) {
  .language-switcher {
    display: none;
  }
}
</style> 