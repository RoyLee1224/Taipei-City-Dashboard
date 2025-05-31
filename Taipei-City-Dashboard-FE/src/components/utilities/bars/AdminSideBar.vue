<!-- Developed by Taipei Urban Intelligence Center 2023-2024-->

<script setup>
import { onMounted, ref, watch } from "vue";
import { useMapStore } from "../../../store/mapStore";
import { useContentStore } from "../../../store/contentStore";
import { useI18nStore } from "../../../store/i18nStore";
import { useI18n } from "../../../composables/useI18n";

import SideBarTab from "../miscellaneous/SideBarTab.vue";

const mapStore = useMapStore();
const contentStore = useContentStore();
const i18nStore = useI18nStore();
const { t } = useI18n();

// The expanded state is also stored in localstorage to retain the setting after refresh
const isExpanded = ref(true);

function toggleExpand() {
	isExpanded.value = isExpanded.value ? false : true;
	localStorage.setItem("isExpandedAdmin", isExpanded.value);
	if (!isExpanded.value) {
		mapStore.resizeMap();
	}
}

onMounted(() => {
	contentStore.initializeTranslation();
	const storedExpandedState = localStorage.getItem("isExpandedAdmin");
	if (storedExpandedState === "false") {
		isExpanded.value = false;
	} else {
		isExpanded.value = true;
	}
});

// Watch for language changes and reinitialize translation
watch(
	() => i18nStore.currentLocale,
	() => {
		contentStore.initializeTranslation();
	}
);
</script>

<template>
  <div
    :class="{
      adminsidebar: true,
      'adminsidebar-collapse': !isExpanded,
    }"
  >
    <button
      class="adminsidebar-collapse-button"
      @click="toggleExpand"
    >
      <span>{{
        isExpanded
          ? "keyboard_double_arrow_left"
          : "keyboard_double_arrow_right"
      }}</span>
    </button>
    <h2>{{ isExpanded ? t('adminSidebar.dashboardSettings') : t('adminSidebar.dashboard') }}</h2>
    <template
      v-for="city in contentStore.cityManager.activeCities"
      :key="city"
    >
      <SideBarTab
        icon="dashboard"
        :title="`${contentStore.cityManager.getExpandedNameName(city)}`"
        index="dashboard"
        :expanded="isExpanded"
        :city="city"
      />
    </template>
    <h2>{{ isExpanded ? t('adminSidebar.componentSettings') : t('adminSidebar.components') }}</h2>
    <SideBarTab
      icon="edit_note"
      :title="t('adminSidebar.editPublicComponents')"
      :expanded="isExpanded"
      index="edit-component"
    />
    <h2>{{ isExpanded ? t('adminSidebar.issueReports') : t('adminSidebar.issues') }}</h2>
    <SideBarTab
      icon="bug_report"
      :title="t('adminSidebar.pendingIssues')"
      :expanded="isExpanded"
      index="issue"
    />
    <SideBarTab
      icon="flood"
      :title="t('adminSidebar.citizenDisasterReports')"
      :expanded="isExpanded"
      index="disaster"
    />
    <h2>{{ isExpanded ? t('adminSidebar.systemOverview') : t('adminSidebar.system') }}</h2>
    <SideBarTab
      icon="person"
      :title="t('adminSidebar.userInfo')"
      :expanded="isExpanded"
      index="user"
    />
    <SideBarTab
      icon="handshake"
      :title="t('adminSidebar.contributorInfo')"
      :expanded="isExpanded"
      index="contributor"
    />
  </div>
</template>

<style scoped lang="scss">
.adminsidebar {
	width: 180px;
	min-width: 180px;
	height: calc(100vh - 80px);
	height: calc(var(--vh) * 100 - 80px);
	max-height: calc(100vh - 80px);
	max-height: calc(var(--vh) * 100 - 80px);
	position: relative;
	margin-top: 20px;
	padding: 0 10px 0 var(--font-m);
	border-right: 1px solid var(--color-border);
	transition: min-width 0.2s ease-out;
	overflow-x: hidden;
	overflow-y: scroll;
	user-select: none;

	h2 {
		color: var(--color-complement-text);
		font-weight: 400;
	}

	&-sub {
		margin-bottom: var(--font-s);

		&-add {
			width: 100%;
			display: flex;

			button {
				display: flex;
				align-items: center;
				margin-left: 0.5rem;
				padding: 2px 6px;
				border-radius: 5px;
				background-color: var(--color-highlight);
				color: var(--color-normal-text);

				span {
					margin-right: 4px;
					font-family: var(--font-icon);
				}
			}
		}
	}

	&-collapse {
		width: 45px;
		min-width: 45px;

		h2 {
			margin-left: 5px;
		}

		&-button {
			height: fit-content;
			position: absolute;
			bottom: 10px;
			right: 10px;
			padding: 5px;
			border-radius: 5px;
			font-size: var(--font-ms);
			transition: background-color 0.2s;

			&:hover {
				background-color: var(--color-component-background);
			}

			span {
				font-family: var(--font-icon);
				font-size: var(--font-l);
			}
		}
	}
}
</style>
