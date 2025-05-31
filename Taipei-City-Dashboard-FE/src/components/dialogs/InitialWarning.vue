<!-- Developed by Taipei Urban Intelligence Center 2023-2024-->

<script setup>
import { ref } from "vue";
import { useDialogStore } from "../../store/dialogStore";
import { useAuthStore } from "../../store/authStore";
import { useI18n } from "../../composables/useI18n";

import DialogContainer from "./DialogContainer.vue";
import CustomCheckBox from "../utilities/forms/CustomCheckBox.vue";

const dialogStore = useDialogStore();
const authStore = useAuthStore();
const { t } = useI18n();

// Stores whether the user doesn't want to see this dialog again
const dontShowAgain = ref(false);

function handleSubmit() {
	if (dontShowAgain.value) {
		localStorage.setItem("initialWarning", "shown");
	}
	handleClose();
}
function handleClose() {
	dontShowAgain.value = false;
	dialogStore.hideAllDialogs();
}
</script>

<template>
  <DialogContainer
    dialog="initialWarning"
    @on-close="handleClose"
  >
    <div class="initialwarning">
      <h2 v-if="authStore.isMobileDevice">
        {{ t('initialWarning.mobileTitle') }}
      </h2>
      <h2 v-else>
        {{ t('initialWarning.desktopTitle') }}
      </h2>
      <div
        v-if="authStore.isMobileDevice"
        class="initialwarning-message"
      >
        <p>
          {{ t('initialWarning.mobileMessage1') }}
        </p>
        <br>
        <p>
          {{ t('initialWarning.mobileMessage2') }}
        </p>
        <br>
        <p>{{ t('initialWarning.mobileMessage3') }}</p>
      </div>
      <div
        v-else
        class="initialwarning-message"
      >
        <p>
          {{ t('initialWarning.desktopMessage1') }}
        </p>
        <br>
        <p>
          {{ t('initialWarning.desktopMessage2') }}
        </p>
        <br>
        <p>
          {{ t('initialWarning.desktopMessage3') }}
        </p>
      </div>
      <div class="initialwarning-dontshow">
        <input
          id="dontshow"
          v-model="dontShowAgain"
          type="checkbox"
          :value="true"
          class="custom-check-input"
        >
        <CustomCheckBox for="dontshow">
          {{ t('initialWarning.dontShowAgain') }}
        </CustomCheckBox>
      </div>
      <div class="initialwarning-control">
        <button
          class="initialwarning-control-confirm"
          @click="handleSubmit"
        >
          {{ t('initialWarning.confirm') }}
        </button>
      </div>
    </div>
  </DialogContainer>
</template>

<style scoped lang="scss">
.initialwarning {
	width: 300px;

	&-message {
		display: flex;
		flex-direction: column;
		margin: var(--font-ms) 0;
	}

	&-dontshow {
		margin: var(--font-ms) 0 0.5rem;

		input {
			display: none;
		}
	}

	&-control {
		display: flex;
		justify-content: flex-end;

		&-confirm {
			margin: 0 2px;
			padding: 4px 10px;
			border-radius: 5px;
			background-color: var(--color-highlight);
			transition: opacity 0.2s;

			&:hover {
				opacity: 0.8;
			}
		}
	}
}
</style>
