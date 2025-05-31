<!-- Developed by Taipei Urban Intelligence Center 2023-2024-->

<!-- Sidebar used in /component and /component/:index -->
<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useContentStore } from "../../../store/contentStore";
import { useI18n } from "../../../composables/useI18n";
import ComponentDragTags from "../forms/ComponentDragTags.vue";
import { allIcons } from "../../../assets/configs/AllIcons";

const contentStore = useContentStore();
const { t } = useI18n();

const iconSearch = ref("");
const selectedDashboard = ref("new");

const { editDashboard } = storeToRefs(contentStore);

const availableIcons = computed(() => {
	let filteredIcons = [...allIcons];
	if (iconSearch.value !== "") {
		filteredIcons = filteredIcons.filter((icon) =>
			icon.includes(iconSearch.value)
		);
	} else {
		const selected = filteredIcons.findIndex(
			(icon) => icon === editDashboard.value.icon
		);
		if (selected >= 54) {
			filteredIcons.splice(selected, 1);
			filteredIcons.unshift(editDashboard.value.icon);
		}
	}
	filteredIcons = filteredIcons.slice(0, 54);
	return filteredIcons;
});

function switchDashboard() {
	if (selectedDashboard.value === "new") {
		editDashboard.value = {
			name: t('sidebar.myNewDashboard'),
			icon: "dashboard",
			components: [],
		};
	} else {
		editDashboard.value = JSON.parse(
			JSON.stringify(
				contentStore.personalDashboards.find(
					(el) => el.index === selectedDashboard.value
				)
			)
		);
		editDashboard.value.components = editDashboard.value.components.map(
			(component) => {
				return {
					id: component,
					name: contentStore.components.find(
						(el) => el.id === component
					).name,
				};
			}
		);
	}
}

function handleConfirm() {
	if (selectedDashboard.value === "new") {
		contentStore.createDashboard();
	} else {
		contentStore.editCurrentDashboard();
	}
	selectedDashboard.value = "new";
	switchDashboard();
}
</script>

<template>
  <div :class="{ componentsidebar: true, 'hide-if-mobile': true }">
    <h2>{{ t('componentSidebar.addComponentToDashboard') }}</h2>
    <div class="componentsidebar-settings">
      <label>{{ t('componentSidebar.selectDashboard') }}</label>
      <!-- 之後要在contentStore寫處理的東西 -->
      <select
        v-model="selectedDashboard"
        @change="switchDashboard"
      >
        <option value="new">
          {{ t('componentSidebar.newDashboard') }}
        </option>
        <option
          v-for="dashboard in contentStore.personalDashboards.filter(
            (el) => el.index !== contentStore.favorites.index
          )"
          :key="dashboard.index"
          :value="dashboard.index"
        >
          {{ dashboard.name }}
        </option>
      </select>
    </div>
    <div
      v-if="selectedDashboard === 'new'"
      class="componentsidebar-settings"
    >
      <label>{{ t('componentSidebar.name') }}*</label>
      <input
        v-model="editDashboard.name"
        :placeholder="t('componentSidebar.enterName')"
        required
      >
      <label>{{ t('componentSidebar.icon') }}*</label>
      <input
        v-model="iconSearch"
        :placeholder="t('componentSidebar.searchIcon')"
      >
      <div class="componentsidebar-settings-icon">
        <div
          v-for="item in availableIcons"
          :key="item"
        >
          <input
            :id="item"
            v-model="editDashboard.icon"
            type="radio"
            :value="item"
          >
          <label :for="item">{{ item }}</label>
        </div>
      </div>
    </div>
    <div class="componentsidebar-settings">
      <label>{{ t('componentSidebar.dashboardComponents') }}</label>
      <div class="componentsidebar-settings-components">
        <ComponentDragTags
          :tags="editDashboard.components"
          @deletetag="
            (index) => {
              editDashboard.components.splice(index, 1);
            }
          "
          @updatetagorder="
            (updatedTags) => {
              editDashboard.components = updatedTags;
            }
          "
        />
      </div>
    </div>
    <div class="componentsidebar-footer">
      <button
        v-if="selectedDashboard === 'new' && editDashboard.name"
        @click="handleConfirm"
      >
        {{ t('componentSidebar.addToDashboard') }}
      </button>
      <button
        v-else-if="selectedDashboard !== 'new'"
        @click="handleConfirm"
      >
        {{ t('componentSidebar.updateDashboard') }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.componentsidebar {
	width: 280px;
	min-width: 280px;
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
		font-size: var(--font-m);
	}

	&-settings {
		display: flex;
		flex-direction: column;
		overflow-y: scroll;

		label {
			margin: 8px 0 4px;
			font-size: var(--font-s);
			color: var(--color-complement-text);
		}

		&-icon {
			height: 176px;
			display: grid;
			grid-template-columns: 26px 26px 26px 26px 26px 26px 26px 26px 26px;
			grid-template-rows: 26px 26px 26px 26px 26px 26px;
			column-gap: 4px;
			row-gap: 4px;
			margin: 0.5rem 0;
			padding-bottom: var(--font-ms);
			border-bottom: solid 1px var(--color-border);

			input {
				display: none;
				transition: border 0.2s;

				&:checked + label {
					border: solid 1px var(--color-highlight);
				}
			}

			label {
				width: 1.5rem;
				height: 1.5rem;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0;
				border: solid 1px transparent;
				border-radius: 5px;
				font-size: 1.2rem;
				font-family: var(--font-icon);
				cursor: pointer;

				&:hover {
					border: solid 1px var(--color-border);
				}
			}
		}

		&-components {
			height: 280px;
			display: grid;
			grid-template-columns: 85px 85px 85px;
			grid-auto-rows: 48px;
			column-gap: 6px;
			row-gap: 6px;
			padding: 6px;
			border: solid 1px var(--color-border);
			border-radius: 5px;
			overflow-y: scroll;

			button:last-child {
				height: 48px;
				display: flex;
				align-items: center;
				justify-content: center;
				border: dashed 2px var(--color-border);
				border-radius: 5px;
				color: var(--color-complement-text);
				font-size: 1.5rem;
			}
		}
	}
	&-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: var(--font-s);

		button {
			display: flex;
			align-items: center;
			padding: 2px 4px;
			border-radius: 5px;
			background-color: var(--color-highlight);
			font-size: var(--font-ms);
		}
	}
}
</style>
