<template>
	<div class="app-shell">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
};
</script>

<style>
/* עיצוב פשוט */
nav {
	text-align: center;
	margin: 20px;
}

/* App layout container */
.app-shell {
	position: relative;
	min-height: 100vh;
}
</style>