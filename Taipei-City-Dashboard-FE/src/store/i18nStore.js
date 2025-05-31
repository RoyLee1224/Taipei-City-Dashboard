import { defineStore } from 'pinia';
import { ref } from 'vue';
import http from '../router/axios';

export const useI18nStore = defineStore('i18n', () => {
  const currentLocale = ref(localStorage.getItem('locale') || 'zh-TW');
  
  // 語言列表
  const availableLocales = ref([
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'en-US', name: 'English' },
  ]);

  // 翻譯資源
  const messages = ref({
    'zh-TW': {
      common: {
        dashboard: '儀表板',
        map: '地圖',
        component: '組件',
        settings: '用戶設定',
        login: '登入',
        logout: '登出',
        save: '儲存',
        cancel: '取消',
        confirm: '確認',
        delete: '刪除',
        edit: '編輯',
        add: '新增',
        search: '搜尋',
        loading: '載入中...',
        noData: '無資料',
        error: '錯誤',
        documentation: '技術文件',
        contributors: '專案貢獻者',
        backToDashboard: '返回儀表板'
      },
      navigation: {
        dashboard: '儀表板總覽',
        map: '地圖交叉比對',
        components: '組件瀏覽平台',
        admin: '管理員後臺'
      },
      sidebar: {
        personalDashboard: '私人儀表板',
        personal: '私人',
        myFavorites: '我的最愛',
        favorites: '最愛',
        favoriteComponents: '收藏組件',
        myDashboards: '個人儀表板',
        my: '個人',
        noPersonalDashboards: '尚無個人儀表板',
        none: '尚無',
        publicDashboards: '公共儀表板',
        public: '公共',
        myNewDashboard: '我的新儀表板',
        privateDashboard: '私人儀表板',
        personalDashboards: '個人儀表板',
        noPersonalDashboard: '尚無個人儀表板',
        publicDashboard: '公共儀表板'
      },
      componentSidebar: {
        addComponentToDashboard: '新增組件至儀表板',
        selectDashboard: '選擇儀表板',
        newDashboard: '新增儀表板',
        name: '名稱',
        enterName: '輸入名稱',
        icon: '圖示',
        searchIcon: '尋找圖示 (英文)',
        dashboardComponents: '儀表板組件 (點擊右側組件 [+] 圖示以新增)',
        addToDashboard: '新增組件至儀表板',
        updateDashboard: '更新儀表板'
      },
      adminSidebar: {
        dashboardSettings: '儀表板設定',
        dashboard: '表板',
        componentSettings: '組件設定',
        components: '組件',
        editPublicComponents: '編輯公開組件',
        issueReports: '問題回報',
        issues: '問題',
        pendingIssues: '待回覆問題',
        citizenDisasterReports: '民眾災害通報',
        systemOverview: '系統總覽',
        system: '系統',
        userInfo: '使用者資訊',
        contributorInfo: '貢獻者資訊'
      },
      settingsBar: {
        settings: '設定',
        addLandmark: '新增地標',
        clickToCreateLandmark: '雙擊以建立地標'
      },
      cities: {
        taipei: '臺北',
        metrotaipei: '雙北',
        newtaipei: '新北',
        taoyuan: '桃園',
        taipeiDashboard: '臺北儀表板',
        metrotaipeiDashboard: '雙北儀表板示範',
        newtaipeiDashboard: '新北儀表板',
        taoyuanDashboard: '桃園儀表板'
      },
      initialWarning: {
        mobileTitle: '臺北城市儀表板行動版注意事項',
        desktopTitle: '臺北城市儀表板使用說明',
        mobileMessage1: '臺北城市儀表板主要為給平板與電腦使用的平台，手機版僅為概覽使用，因此許多功能在行動版無法使用。',
        mobileMessage2: '手機版不支援的功能包含：登入、地圖檢視、組件瀏覽平台、回報問題等。',
        mobileMessage3: '如希望完整體驗本產品，建議改成使用平板或電腦檢視。',
        desktopMessage1: '歡迎使用臺北城市儀表板，本產品的目的為 1. 分享府內重要決策工具與成果 2. 促進府內與民間開發者的交流互動 3. 推廣臺北開放資料應用。',
        desktopMessage2: '本產品所呈現的資料集均以臺北開放資料為基礎，經由臺北大數據中心清理建構，並在本平台展示供民眾使用下載。',
        desktopMessage3: '如果希望新增並儲存自己的儀表板，請點擊右上方的「登入」按鈕，並使用台北通APP註冊/登入本平台。',
        dontShowAgain: '下次不再顯示此視窗',
        confirm: '確定了解'
      },
      downloadData: {
        title: '下載資料',
        enterFileName: '請輸入檔名',
        selectFileFormat: '請選擇檔案格式',
        cancel: '取消',
        downloadJSON: '下載JSON',
        downloadCSV: '下載CSV'
      },
      contributorsList: {
        title: '專案貢獻者清單',
        clickToLearnMore: '點擊貢獻者頭貼以了解更多',
        contributor: '貢獻者'
      },
      // 動態載入的組件翻譯
      data: {
        components: {}
      }
    },
    'en-US': {
      common: {
        dashboard: 'Dashboard',
        map: 'Map',
        component: 'Component',
        settings: 'User Settings',
        login: 'Login',
        logout: 'Logout',
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        search: 'Search',
        loading: 'Loading...',
        noData: 'No Data',
        error: 'Error',
        documentation: 'Technical Documentation',
        contributors: 'Project Contributors',
        backToDashboard: 'Back to Dashboard'
      },
      navigation: {
        dashboard: 'Dashboard Overview',
        map: 'Map Cross Comparison',
        components: 'Component Library',
        admin: 'Admin Panel'
      },
      sidebar: {
        personalDashboard: 'Personal Dashboards',
        personal: 'Personal',
        myFavorites: 'My Favorites',
        favorites: 'Favorites',
        favoriteComponents: 'Components',
        myDashboards: 'My Dashboards',
        my: 'My',
        noPersonalDashboards: 'No Personal Dashboards',
        none: 'None',
        publicDashboards: 'Public Dashboards',
        public: 'Public',
        myNewDashboard: 'My New Dashboard',
        privateDashboard: 'Personal Dashboard',
        personalDashboards: 'Personal Dashboards',
        noPersonalDashboard: 'No Personal Dashboard',
        publicDashboard: 'Public Dashboard'
      },
      componentSidebar: {
        addComponentToDashboard: 'Add Component to Dashboard',
        selectDashboard: 'Select Dashboard',
        newDashboard: 'New Dashboard',
        name: 'Name',
        enterName: 'Enter name',
        icon: 'Icon',
        searchIcon: 'Search icon (English)',
        dashboardComponents: 'Dashboard Components (Click [+] icon on right-side components to add)',
        addToDashboard: 'Add to Dashboard',
        updateDashboard: 'Update Dashboard'
      },
      adminSidebar: {
        dashboardSettings: 'Dashboard Settings',
        dashboard: 'Dashboard',
        componentSettings: 'Component Settings',
        components: 'Components',
        editPublicComponents: 'Edit Public Components',
        issueReports: 'Issue Reports',
        issues: 'Issues',
        pendingIssues: 'Pending Issues',
        citizenDisasterReports: 'Citizen Disaster Reports',
        systemOverview: 'System Overview',
        system: 'System',
        userInfo: 'User Info',
        contributorInfo: 'Contributor Info'
      },
      settingsBar: {
        settings: 'Settings',
        addLandmark: 'Add Landmark',
        clickToCreateLandmark: 'Double-click to create landmark'
      },
      cities: {
        taipei: 'Taipei',
        metrotaipei: 'Metro Taipei',
        newtaipei: 'New Taipei',
        taoyuan: 'Taoyuan',
        taipeiDashboard: 'Taipei',
        metrotaipeiDashboard: 'Metro Taipei',
        newtaipeiDashboard: 'New Taipei',
        taoyuanDashboard: 'Taoyuan'
      },
      initialWarning: {
        mobileTitle: 'Taipei City Dashboard Mobile Version Notice',
        desktopTitle: 'Taipei City Dashboard Usage Instructions',
        mobileMessage1: 'The Taipei City Dashboard is primarily designed for tablets and computers, with the mobile version serving as a summary view only. Many features are unavailable in the mobile version.',
        mobileMessage2: 'The mobile version does not support features such as logging in, viewing maps, accessing the component library, or reporting issues.',
        mobileMessage3: 'If you wish to fully experience this product, we recommend using a tablet or computer instead.',
        desktopMessage1: 'Welcome to the Taipei City Dashboard, the purpose of this product is 1. Sharing government decision-making tools and results 2. Promoting communication and interaction between the government and the public 3. Promoting the application of Taipei open data.',
        desktopMessage2: 'The data sets displayed in this product are based on Taipei open data, cleaned and constructed by the Taipei Big Data Center, and are available for public use and download on this platform.',
        desktopMessage3: 'If you wish to add and save your own dashboard, please click the "Login" button in the upper right corner and register/log in using the Taipei Pass APP.',
        dontShowAgain: 'Do not show this window again',
        confirm: 'Confirm understanding'
      },
      downloadData: {
        title: 'Download Data',
        enterFileName: 'Enter File Name',
        selectFileFormat: 'Select File Format',
        cancel: 'Cancel',
        downloadJSON: 'Download JSON',
        downloadCSV: 'Download CSV'
      },
      contributorsList: {
        title: 'Project Contributors List',
        clickToLearnMore: 'Click contributor avatar to learn more',
        contributor: 'Contributor'
      },
      // 動態載入的組件翻譯
      data: {
        components: {}
      }
    }
  });

  // 載入翻譯資料的狀態
  const isLoadingTranslations = ref(false);
  const translationsLoaded = ref(false);

  // 從 API 載入組件翻譯
  const loadComponentTranslations = async (languageCode = currentLocale.value) => {
    if (languageCode === 'zh-TW') {
      // 中文不需要從 API 載入，但要確保狀態正確
      translationsLoaded.value = false;
      return;
    }
    
    // 移除 translationsLoaded.value 的檢查，允許重新載入
    isLoadingTranslations.value = true;
    try {
      console.log('Loading translations for:', languageCode);
      console.log('API call URL:', `/translation/components?language_code=${languageCode}`);
      
      const response = await http.get(`/translation/components?language_code=${languageCode}`);

      console.log('Translation API response:', response);

      if (response.data.status === 'success') {
        const apiTranslations = response.data.data;
        const componentTranslations = {};
        
        Object.entries(apiTranslations).forEach(([componentId, translation]) => {
          componentTranslations[componentId] = translation;
        });

        // 更新翻譯資料
        if (!messages.value[languageCode]) {
          messages.value[languageCode] = { data: { components: {}, dashboards: {} } };
        }
        if (!messages.value[languageCode].data) {
          messages.value[languageCode].data = { components: {}, dashboards: {} };
        }
        
        messages.value[languageCode].data.components = componentTranslations;
        translationsLoaded.value = true;
        
        console.log('Component translations loaded:', componentTranslations);
      }
    } catch (error) {
      console.error('Failed to load component translations:', error);
    } finally {
      isLoadingTranslations.value = false;
    }
  };

  // 從 API 載入儀表板翻譯
  const loadDashboardTranslations = async (languageCode = currentLocale.value) => {
    if (languageCode === 'zh-TW') {
      return;
    }
    
    isLoadingTranslations.value = true;
    try {
      console.log('Loading dashboard translations for:', languageCode);
      console.log('API call URL:', `/translation/dashboards?language_code=${languageCode}`);
      
      const response = await http.get(`/translation/dashboards?language_code=${languageCode}`);

      console.log('Dashboard Translation API response:', response);

      if (response.data.status === 'success') {
        const apiTranslations = response.data.data;
        const dashboardTranslations = {};
        
        Object.entries(apiTranslations).forEach(([dashboardId, translation]) => {
          dashboardTranslations[dashboardId] = translation;
        });

        // 更新翻譯資料
        if (!messages.value[languageCode]) {
          messages.value[languageCode] = { data: { components: {}, dashboards: {} } };
        }
        if (!messages.value[languageCode].data) {
          messages.value[languageCode].data = { components: {}, dashboards: {} };
        }
        
        messages.value[languageCode].data.dashboards = dashboardTranslations;
        
        console.log('Dashboard translations loaded:', dashboardTranslations);
      }
    } catch (error) {
      console.error('Failed to load dashboard translations:', error);
    } finally {
      isLoadingTranslations.value = false;
    }
  };

  // 載入所有翻譯
  const loadAllTranslations = async (languageCode = currentLocale.value) => {
    if (languageCode === 'zh-TW') {
      translationsLoaded.value = false;
      return;
    }
    
    await Promise.all([
      loadComponentTranslations(languageCode),
      loadDashboardTranslations(languageCode)
    ]);
  };

  // 切換語言
  const setLocale = async (locale) => {
    currentLocale.value = locale;
    localStorage.setItem('locale', locale);
    
    // 重要修正：切換語言時重置翻譯狀態
    if (locale === 'zh-TW') {
      // 切換回中文時，清除所有動態翻譯並重置狀態
      translationsLoaded.value = false;
      // 清空英文組件翻譯
      if (messages.value['en-US']?.data?.components) {
        messages.value['en-US'].data.components = {};
      }
      if (messages.value['en-US']?.data?.dashboards) {
        messages.value['en-US'].data.dashboards = {};
      }
    } else {
      // 切換到其他語言時也重置狀態，確保重新載入
      translationsLoaded.value = false;
      await loadAllTranslations(locale);
    }
  };

  // 翻譯函數
  const t = (key, fallback = key) => {
    const keys = key.split('.');
    let value = messages.value[currentLocale.value];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value[k] !== undefined) {
        value = value[k];
      } else {
        // 如果找不到翻譯，嘗試使用繁體中文作為 fallback
        if (currentLocale.value !== 'zh-TW') {
          let fallbackValue = messages.value['zh-TW'];
          for (const k of keys) {
            if (fallbackValue && typeof fallbackValue === 'object' && fallbackValue[k] !== undefined) {
              fallbackValue = fallbackValue[k];
            } else {
              return fallback;
            }
          }
          return fallbackValue;
        }
        return fallback;
      }
    }
    
    return value || fallback;
  };

  // 根據組件 ID 獲取翻譯
  const getComponentTranslationById = (componentId) => {
    if (currentLocale.value === 'zh-TW') {
      return null; // 中文不需要翻譯
    }
    
    return messages.value[currentLocale.value]?.data?.components?.[componentId] || null;
  };

  return {
    currentLocale,
    availableLocales,
    messages,
    isLoadingTranslations,
    translationsLoaded,
    setLocale,
    t,
    loadComponentTranslations,
    getComponentTranslationById,
    loadAllTranslations
  };
}); 