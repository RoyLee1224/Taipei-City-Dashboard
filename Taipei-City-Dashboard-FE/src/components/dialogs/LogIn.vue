<!-- Developed by Taipei Urban Intelligence Center 2023-2024-->

<script setup>
import { computed, ref } from "vue";
import { useDialogStore } from "../../store/dialogStore";
import { useAuthStore } from "../../store/authStore";
import { useI18n } from "../../composables/useI18n";

import DialogContainer from "./DialogContainer.vue";

const {
	VITE_APP_TITLE,
	PROD,
	VITE_TAIPEIPASS_URL,
	VITE_TAIPEIPASS_CLIENT_ID,
	VITE_TAIPEIPASS_SCOPE,
} = import.meta.env;

const dialogStore = useDialogStore();
const authStore = useAuthStore();
const { t } = useI18n();

const loginMode = ref("tp");
const email = ref("");
const password = ref("");

const taipeiPassUrl = computed(() => {
	return `${VITE_TAIPEIPASS_URL}/oauth2/authorize?response_type=code&client_id=${VITE_TAIPEIPASS_CLIENT_ID}&scope=${VITE_TAIPEIPASS_SCOPE}`;
});

function handleSwitchMode() {
	if (PROD) {
		return;
	} else {
		loginMode.value = loginMode.value === "tp" ? "email" : "tp";
		email.value = "";
		password.value = "";
	}
}
function handleTaipeiPassLogin() {
	window.open(taipeiPassUrl.value, "_self");
}
async function handleEmailLogin() {
	const loggedIn = await authStore.loginByEmail(email.value, password.value);
	if (loggedIn) {
		handleClose();
	}
}
function handleClose() {
	loginMode.value = "tp";
	dialogStore.hideAllDialogs();
}
</script>

<template>
  <DialogContainer
    dialog="login"
    @on-close="handleClose"
  >
    <div class="login">
      <div class="login-logo">
        <div class="login-logo-image">
          <img
            src="../../assets/images/TUIC.svg"
            alt="tuic logo"
            @click.shift="handleSwitchMode"
          >
        </div>
        <div>
          <h1>{{ VITE_APP_TITLE || t('login.appTitle') }}</h1>
          <h2>{{ t('login.engTitle') }}</h2>
        </div>
      </div>
      <div
        v-if="loginMode === 'tp'"
        class="login-form"
      >
        <button @click="handleTaipeiPassLogin">
          <img src="../../assets/images/taipeipass.png">{{ t('login.taipeiPassLogin') }}
        </button>
      </div>
      <div
        v-if="loginMode === 'email'"
        class="login-form"
      >
        <label>{{ t('login.email') }}</label>
        <input
          v-model="email"
          required
          type="email"
        >
        <label>{{ t('login.password') }}</label>
        <input
          v-model="password"
          required
          type="password"
        >
        <button @click="handleEmailLogin">
          {{ t('login.loginButton') }}
        </button>
      </div>
      <p>{{ t('login.agreementText') }}</p>
      <p>
        <a
          href="https://tuic.gov.taipei/zh/works/dashboard"
          target="_blank"
        >{{ t('login.appTitle') }}</a>{{ t('login.privacyPolicyText') }}<a
          href="https://tuic.gov.taipei/zh/privacy"
          target="_blank"
        >{{ t('login.privacyPolicy') }}</a>
      </p>
      <p
        :style="{
          color: '#302C2E',
          cursor: 'default',
          userSelect: 'none',
        }"
      >
        TUIC Igor Ann Iima Chu Jack 2023-2024
      </p>
      <p>{{ t('login.slogan') }}</p>
    </div>
  </DialogContainer>
</template>

<style scoped lang="scss">
.login {
	width: 300px;

	p {
		text-align: center;
		color: var(--color-complement-text);
	}

	p:last-child {
		background: linear-gradient(
			75deg,
			var(--color-complement-text),
			var(--color-highlight) 70%,
			var(--color-complement-text)
		);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: title-gradient 10s linear none infinite;
	}

	a {
		color: var(--color-highlight);
	}

	button {
		width: 180px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 12px 0;
		padding: 6px;
		font-size: var(--font-m);
		background-color: #03b2c3;
		border-radius: 100px;

		img {
			width: 1.5rem;
			margin: 0 10px 0 0;
		}
	}

	label {
		margin-bottom: 4px;
		color: var(--color-complement-text);
		font-size: var(--font-s);
		align-self: flex-start;
	}

	input {
		margin-bottom: 8px;
		width: calc(100% - 14px);
	}

	&-logo {
		display: flex;
		justify-content: center;

		h1 {
			font-weight: 500;
		}

		h2 {
			font-size: var(--font-s);
			font-weight: 400;
		}

		&-image {
			width: 22.94px;
			height: 45px;
			margin: 0 10px 0 0;

			img {
				height: 45px;
				filter: invert(1);
			}
		}
	}

	&-form {
		width: 100%;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
}

@keyframes title-gradient {
	0% {
		background-position: 0;
	}

	50% {
		background-position: 600px;
	}

	100% {
		background-position: 0;
	}
}
</style>
