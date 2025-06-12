import { useI18nStore } from "../store/i18nStore";

export function useDataTranslation() {
	const i18nStore = useI18nStore();

	// 翻譯組件資料（使用組件 ID 從 API 載入的翻譯）
	const translateComponentById = (component) => {
		if (!component || i18nStore.currentLocale === "zh-TW") {
			return component;
		}

		const translatedComponent = { ...component };

		// 使用組件 ID 從 API 翻譯中查找
		if (translatedComponent.id) {
			const translation = i18nStore.getComponentTranslationById(
				translatedComponent.id
			);
			if (translation) {
				translatedComponent.name = translation;
			}
		}

		return translatedComponent;
	};

	// 翻譯組件資料（兼容現有實作）
	const translateComponentData = (component) => {
		if (!component || i18nStore.currentLocale === "zh-TW") {
			return component;
		}

		// 直接使用 ID 翻譯（API 載入的動態翻譯）
		return translateComponentById(component);
	};

	// 翻譯儀表板資料（使用 ID 從 API 載入的翻譯）
	const translateDashboard = (dashboard) => {
		if (!dashboard || i18nStore.currentLocale === "zh-TW") {
			return dashboard;
		}

		const translatedDashboard = { ...dashboard };

		// 使用 ID 翻譯儀表板名稱
		if (translatedDashboard.id) {
			const dashboardTranslations =
				i18nStore.messages[i18nStore.currentLocale]?.data?.dashboards;
			if (
				dashboardTranslations &&
				dashboardTranslations[translatedDashboard.id]
			) {
				translatedDashboard.name =
					dashboardTranslations[translatedDashboard.id];
			}
		}

		// 翻譯儀表板中的組件
		if (
			translatedDashboard.components &&
			Array.isArray(translatedDashboard.components)
		) {
			translatedDashboard.components = translatedDashboard.components.map(
				translateComponentData
			);
		}

		return translatedDashboard;
	};

	// 翻譯儀表板陣列
	const translateDashboards = (dashboards) => {
		if (!Array.isArray(dashboards)) return dashboards;
		return dashboards.map(translateDashboard);
	};

	return {
		translateComponentData,
		translateComponentById,
		translateDashboard,
		translateDashboards,
	};
}
