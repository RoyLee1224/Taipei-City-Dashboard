import { useI18nStore } from '../store/i18nStore';

export function useDataTranslation() {
  const i18nStore = useI18nStore();

  // 翻譯文字的核心函數
  const translateText = (text, type = 'dashboards') => {
    if (!text || typeof text !== 'string') return text;
    
    // 如果當前語言是中文，直接返回
    if (i18nStore.currentLocale === 'zh-TW') {
      return text;
    }
    
    // 嘗試從翻譯對照表中找到翻譯
    const translations = i18nStore.messages[i18nStore.currentLocale]?.data?.[type];
    if (translations && translations[text]) {
      return translations[text];
    }
    
    // 如果沒找到翻譯，返回原文
    return text;
  };

  // 翻譯組件資料（使用組件 ID）
  const translateComponentById = (component) => {
    if (!component || i18nStore.currentLocale === 'zh-TW') {
      return component;
    }

    const translatedComponent = { ...component };
    
    // 使用組件 ID 從資料庫翻譯中查找
    if (translatedComponent.id) {
      const translation = i18nStore.getComponentTranslationById(translatedComponent.id);
      if (translation) {
        translatedComponent.name = translation;
      }
    }

    return translatedComponent;
  };

  // 翻譯儀表板組件資料（兼容舊的實作）
  const translateComponentData = (component) => {
    if (!component) return component;

    // 先嘗試使用 ID 翻譯
    let translatedComponent = translateComponentById(component);
    
    // 如果 ID 翻譯沒有結果，回退到原來的方式
    if (translatedComponent.name === component.name && i18nStore.currentLocale !== 'zh-TW') {
      translatedComponent = { ...component };
      
      // 翻譯組件名稱
      if (translatedComponent.name) {
        translatedComponent.name = translateText(translatedComponent.name, 'components');
      }
      
      // 翻譯組件標題
      if (translatedComponent.title) {
        translatedComponent.title = translateText(translatedComponent.title, 'components');
      }
    }

    return translatedComponent;
  };

  // 翻譯儀表板資料
  const translateDashboard = (dashboard) => {
    if (!dashboard) return dashboard;

    const translatedDashboard = { ...dashboard };
    
    // 如果當前語言是中文，直接返回
    if (i18nStore.currentLocale === 'zh-TW') {
      return translatedDashboard;
    }
    
    // 先嘗試使用 ID 翻譯（如果有 id 屬性）
    if (translatedDashboard.id) {
      const dashboardTranslations = i18nStore.messages[i18nStore.currentLocale]?.data?.dashboards;
      if (dashboardTranslations && dashboardTranslations[translatedDashboard.id]) {
        translatedDashboard.name = dashboardTranslations[translatedDashboard.id];
        // 如果有組件陣列，也要翻譯組件
        if (translatedDashboard.components && Array.isArray(translatedDashboard.components)) {
          translatedDashboard.components = translatedDashboard.components.map(translateComponentData);
        }
        return translatedDashboard;
      }
    }
    
    // 如果 ID 翻譯沒有結果，回退到原來的方式（使用文字）
    if (translatedDashboard.name) {
      translatedDashboard.name = translateText(translatedDashboard.name, 'dashboards');
    }
    
    // 如果有組件陣列，也要翻譯組件
    if (translatedDashboard.components && Array.isArray(translatedDashboard.components)) {
      translatedDashboard.components = translatedDashboard.components.map(translateComponentData);
    }

    return translatedDashboard;
  };

  // 翻譯儀表板陣列
  const translateDashboards = (dashboards) => {
    if (!Array.isArray(dashboards)) return dashboards;
    return dashboards.map(translateDashboard);
  };

  // 簡單的資料翻譯函數
  const td = (type, text, fallback = text) => {
    return translateText(text, type) || fallback;
  };

  // 翻譯陣列
  const translateArray = (type, array, textField = 'name') => {
    if (!Array.isArray(array)) return array;
    
    return array.map(item => {
      if (typeof item === 'string') {
        return translateText(item, type);
      } else if (typeof item === 'object' && item !== null) {
        const translatedItem = { ...item };
        if (textField && translatedItem[textField]) {
          translatedItem[textField] = translateText(translatedItem[textField], type);
        }
        return translatedItem;
      }
      return item;
    });
  };

  // 翻譯物件
  const translateObject = (type, obj, fieldsMap = { name: 'name' }) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    const translatedObj = { ...obj };
    
    Object.entries(fieldsMap).forEach(([objField, translationType]) => {
      if (translatedObj[objField]) {
        translatedObj[objField] = translateText(translatedObj[objField], type);
      }
    });
    
    return translatedObj;
  };

  // 動態添加翻譯（更新為支援 ID 映射）
  const addTranslation = (type, chineseText, englishText, componentId = null) => {
    if (!chineseText || !englishText) return;
    
    // 添加到英文翻譯對照表
    if (!i18nStore.messages['en-US'].data[type]) {
      i18nStore.messages['en-US'].data[type] = {};
    }
    
    if (type === 'components' && componentId) {
      // 如果是組件翻譯且有 ID，優先使用 ID 作為 key
      i18nStore.messages['en-US'].data[type][componentId] = englishText;
    } else {
      // 其他情況使用文字作為 key
      i18nStore.messages['en-US'].data[type][chineseText] = englishText;
    }
    
    console.log(`Added translation: ${chineseText} -> ${englishText}${componentId ? ` (ID: ${componentId})` : ''}`);
  };

  // 獲取所有現有的翻譯
  const getAllTranslations = (type) => {
    return i18nStore.messages['en-US']?.data?.[type] || {};
  };

  // 確保翻譯資料已載入
  const ensureTranslationsLoaded = async () => {
    if (i18nStore.currentLocale !== 'zh-TW') {
      await i18nStore.loadComponentTranslations();
    }
  };

  return {
    translateComponentData,
    translateComponentById,
    translateDashboard,
    translateDashboards,
    translateText,
    td,
    translateArray,
    translateObject,
    addTranslation,
    getAllTranslations,
    ensureTranslationsLoaded
  };
} 