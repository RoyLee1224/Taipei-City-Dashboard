import { defineStore } from "pinia";
import { ref } from "vue";
import http from "../router/axios";

export const useI18nStore = defineStore("i18n", () => {
	const currentLocale = ref(localStorage.getItem("locale") || "zh-TW");

	// 語言列表
	const availableLocales = ref([
		{ code: "zh-TW", name: "繁體中文" },
		{ code: "en-US", name: "English" },
	]);

	// 翻譯資源 - 動態載入
	const messages = ref({
		"zh-TW": {
			// 動態載入的組件翻譯
			data: {
				components: {},
				dashboards: {},
			},
		},
		"en-US": {
			// 動態載入的組件翻譯
			data: {
				components: {},
				dashboards: {},
			},
		},
	});

	const isLoadingTranslations = ref(false);
	const translationsLoaded = ref(false);

	// 【新增】載入靜態翻譯文件（從 JSON 文件）
	const loadStaticTranslations = async (
		languageCode = currentLocale.value
	) => {
		try {
			console.log(`Loading static translations for ${languageCode}...`);

			// 動態導入靜態翻譯文件
			const translationModule = await import(
				`../locales/${languageCode}.json`
			);
			const staticTranslations = translationModule.default;

			// 確保翻譯物件結構存在
			if (!messages.value[languageCode]) {
				messages.value[languageCode] = {
					data: { components: {}, dashboards: {} },
				};
			}

			// 合併靜態翻譯到現有結構中（保留 data 部分）
			const existingData = messages.value[languageCode].data;
			messages.value[languageCode] = {
				...staticTranslations,
				data: existingData,
			};

			console.log(`Static translations loaded for ${languageCode}`);
			return true;
		} catch (error) {
			console.error(
				`Failed to load static translations for ${languageCode}:`,
				error
			);
			return false;
		}
	};

	// 從 API 載入組件翻譯（帶重試機制）
	const loadComponentTranslations = async (
		languageCode = currentLocale.value,
		retryCount = 0
	) => {
		if (languageCode === "zh-TW") {
			// 中文不需要從 API 載入，但要確保狀態正確
			translationsLoaded.value = false;
			return;
		}

		isLoadingTranslations.value = true;
		try {
			console.log(
				"Loading component translations for:",
				languageCode,
				retryCount > 0 ? `(retry ${retryCount})` : ""
			);

			const response = await http.get(
				`/translation/components?language_code=${languageCode}`
			);

			if (response.data.status === "success") {
				const apiTranslations = response.data.data;
				const componentTranslations = {};

				Object.entries(apiTranslations).forEach(
					([componentId, translation]) => {
						componentTranslations[componentId] = translation;
					}
				);

				// 更新翻譯資料
				if (!messages.value[languageCode]) {
					messages.value[languageCode] = {
						data: { components: {}, dashboards: {} },
					};
				}
				if (!messages.value[languageCode].data) {
					messages.value[languageCode].data = {
						components: {},
						dashboards: {},
					};
				}

				messages.value[languageCode].data.components =
					componentTranslations;
				translationsLoaded.value = true;

				console.log(
					"Component translations loaded:",
					componentTranslations
				);
			} else {
				throw new Error(`API returned status: ${response.data.status}`);
			}
		} catch (error) {
			console.error("Failed to load component translations:", error);

			// 重試機制：最多重試 2 次
			if (retryCount < 2) {
				console.log(
					`Retrying component translations load (attempt ${
						retryCount + 1
					})`
				);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				return loadComponentTranslations(languageCode, retryCount + 1);
			} else {
				console.error(
					"Failed to load component translations after 3 attempts"
				);
			}
		} finally {
			isLoadingTranslations.value = false;
		}
	};

	// 從 API 載入儀表板翻譯（帶重試機制）
	const loadDashboardTranslations = async (
		languageCode = currentLocale.value,
		retryCount = 0
	) => {
		if (languageCode === "zh-TW") {
			return;
		}

		isLoadingTranslations.value = true;
		try {
			console.log(
				"Loading dashboard translations for:",
				languageCode,
				retryCount > 0 ? `(retry ${retryCount})` : ""
			);

			const response = await http.get(
				`/translation/dashboards?language_code=${languageCode}`
			);

			if (response.data.status === "success") {
				const apiTranslations = response.data.data;
				const dashboardTranslations = {};

				Object.entries(apiTranslations).forEach(
					([dashboardId, translation]) => {
						dashboardTranslations[dashboardId] = translation;
					}
				);

				// 更新翻譯資料
				if (!messages.value[languageCode]) {
					messages.value[languageCode] = {
						data: { components: {}, dashboards: {} },
					};
				}
				if (!messages.value[languageCode].data) {
					messages.value[languageCode].data = {
						components: {},
						dashboards: {},
					};
				}

				messages.value[languageCode].data.dashboards =
					dashboardTranslations;

				console.log(
					"Dashboard translations loaded:",
					dashboardTranslations
				);
			} else {
				throw new Error(`API returned status: ${response.data.status}`);
			}
		} catch (error) {
			console.error("Failed to load dashboard translations:", error);

			// 重試機制：最多重試 2 次
			if (retryCount < 2) {
				console.log(
					`🔄 Retrying dashboard translations load (attempt ${
						retryCount + 1
					})`
				);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				return loadDashboardTranslations(languageCode, retryCount + 1);
			} else {
				console.error(
					"❌ Failed to load dashboard translations after 3 attempts"
				);
			}
		} finally {
			isLoadingTranslations.value = false;
		}
	};

	// 載入所有翻譯（靜態 + 動態）
	const loadAllTranslations = async (languageCode = currentLocale.value) => {
		console.log(`🚀 Loading all translations for ${languageCode}...`);

		const results = await Promise.allSettled([
			loadStaticTranslations(languageCode),
			loadComponentTranslations(languageCode),
			loadDashboardTranslations(languageCode),
		]);

		const staticSuccess =
			results[0].status === "fulfilled" && results[0].value;
		const componentSuccess = results[1].status === "fulfilled";
		const dashboardSuccess = results[2].status === "fulfilled";

		console.log(`Translation loading results for ${languageCode}:`, {
			static: staticSuccess ? "✅" : "❌",
			component: componentSuccess ? "✅" : "❌",
			dashboard: dashboardSuccess ? "✅" : "❌",
		});
	};

	// 切換語言
	const setLocale = async (locale) => {
		console.log(`Starting language switch to: ${locale}`);

		isLoadingTranslations.value = true;

		try {
			currentLocale.value = locale;
			localStorage.setItem("locale", locale);

			// 載入該語言的所有翻譯
			await loadAllTranslations(locale);

			// 觸發內容重新載入
			await triggerContentRefresh();
		} catch (error) {
			console.error("Error during language switch:", error);
		} finally {
			isLoadingTranslations.value = false;
			console.log(`Language switch to ${locale} completed`);
		}
	};

	// 觸發內容重新載入
	const triggerContentRefresh = async () => {
		if (typeof window !== "undefined" && window.dispatchEvent) {
			window.dispatchEvent(
				new CustomEvent("languageChanged", {
					detail: { locale: currentLocale.value },
				})
			);
		}
	};

	// 翻譯函數
	const t = (key, fallback = key) => {
		const keys = key.split(".");
		let value = messages.value[currentLocale.value];

		for (const k of keys) {
			if (value && typeof value === "object" && value[k] !== undefined) {
				value = value[k];
			} else {
				// 如果找不到翻譯，嘗試使用繁體中文作為 fallback
				if (currentLocale.value !== "zh-TW") {
					let fallbackValue = messages.value["zh-TW"];
					for (const k of keys) {
						if (
							fallbackValue &&
							typeof fallbackValue === "object" &&
							fallbackValue[k] !== undefined
						) {
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

		return typeof value === "string" ? value : fallback;
	};

	// 根據組件 ID 獲取翻譯
	const getComponentTranslationById = (componentId) => {
		const componentTranslations =
			messages.value[currentLocale.value]?.data?.components;
		return componentTranslations?.[componentId] || null;
	};

	// 初始化時載入當前語言的翻譯
	const initialize = async () => {
		console.log("Initializing i18n store...");
		await loadAllTranslations(currentLocale.value);
	};

	return {
		currentLocale,
		availableLocales,
		messages,
		isLoadingTranslations,
		translationsLoaded,
		loadStaticTranslations,
		loadComponentTranslations,
		loadDashboardTranslations,
		loadAllTranslations,
		setLocale,
		triggerContentRefresh,
		t,
		getComponentTranslationById,
		initialize,
	};
});
