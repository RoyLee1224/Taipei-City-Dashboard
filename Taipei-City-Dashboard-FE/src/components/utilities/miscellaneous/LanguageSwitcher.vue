<template>
  <div class="language-switcher">
    <select 
      :value="i18nStore.currentLocale" 
      @change="handleLanguageChange"
      :disabled="i18nStore.isLoadingTranslations"
    >
      <option 
        v-for="locale in i18nStore.availableLocales" 
        :key="locale.code" 
        :value="locale.code"
      >
        {{ locale.name }}
      </option>
    </select>
    <div v-if="i18nStore.isLoadingTranslations" class="loading-indicator">
      {{ t('common.loading') }}
    </div>
  </div>
</template>

<script setup>
import { useI18nStore } from '../../../store/i18nStore';
import { useI18n } from '../../../composables/useI18n';

const i18nStore = useI18nStore();
const { t } = useI18n();

async function handleLanguageChange(event) {
  const newLocale = event.target.value;
  await i18nStore.setLocale(newLocale);
}
</script>

<style scoped lang="scss">
.language-switcher {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  select {
    padding: 4px 8px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background-color: var(--color-component-background);
    color: var(--color-normal-text);
    font-size: var(--font-s);

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
      border-color: var(--color-highlight);
    }
  }

  .loading-indicator {
    font-size: var(--font-xs);
    color: var(--color-complement-text);
    font-style: italic;
  }
}
</style> 