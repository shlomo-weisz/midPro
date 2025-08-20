<template>
	<div class="summary-card" dir="rtl">
		<div class="card-header">
			<div class="brand">בס"ד</div>
			<div class="header-right">
				<div class="greeting">שלום {{ name }}</div>
				<div class="date">{{ currentDate }}</div>
			</div>
		</div>

		<div class="row chips-row">
			<div class="label">תכנית לימוד:</div>
			<div class="chips">
				<span class="chip" v-for="(m, i) in masechtos" :key="'m' + i">{{ m }}</span>
			</div>
		</div>

		<div class="row chips-row">
			<div class="label">ימים:</div>
			<div class="chips">
				<span class="chip" v-for="(d, i) in days" :key="'d' + i">{{ d }}</span>
			</div>
		</div>

		<div class="row dates-row">
			<div class="label">מתאריך</div>
			<div class="value">{{ hestartDate }}</div>
			<div class="separator">עד</div>
			<div class="value">{{ heendDate }}</div>
		</div>

		<div class="row stats-row">
			<div class="stat">
				<div class="stat-number">{{ totalMishnayos }}</div>
				<div class="stat-label">סה"כ משניות</div>
			</div>
			<div class="stat">
				<div class="stat-number">{{ totalDays }}</div>
				<div class="stat-label">ימי לימוד</div>
			</div>
		</div>
	</div>

</template>
<script>
import { HebrewCalendar, HDate, Location, Event } from '@hebcal/core';

export default {
	name: 'header',
	props: {
		name: String,
		currentDate: String,
		startDate: String,
		endDate: String,
		totalDays: Number,
		totalMishnayos: Number,
		days: Array,
		masechtos: Array,

	},
	data() {
		return {
			hestartDate: "",
			heendDate: "",

		}
	},
	computed: {

	},
	mounted() {
		this.setHeDate();
	},
	methods: {
		setHeDate() {
			let hebDate = new HDate(this.startDate).renderGematriya();
			this.hestartDate = hebDate;
			hebDate = new HDate(this.endDate).renderGematriya();
			this.heendDate = hebDate;
		},

	}
}
</script>
<style scoped>
.summary-card {
	width: 100%;
	background: #f7fbfd;
	/* גוון עדין */
	border: 1px solid #dbe5ea;
	border-radius: 12px;
	padding: 12px 16px;
	margin: 10px auto;
	/* center within parent */
	max-width: 1200px;
	box-sizing: border-box;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	color: #111827;
}

.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	margin-bottom: 8px;
}

.brand {
	font-weight: 700;
	color: #0d9488;
}

.header-right {
	display: flex;
	gap: 12px;
	align-items: center;
}

.greeting {
	font-weight: 600;
}

.date {
	color: #6b7280;
	font-size: 0.95rem;
}

.row {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;
	margin: 6px 0;
}

.label {
	color: #374151;
	font-weight: 600;
	min-width: 64px;
}

.chips {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}

.chip {
	background: #f3f4f6;
	color: #111827;
	border: 1px solid #e5e7eb;
	padding: 4px 10px;
	border-radius: 999px;
	font-size: 0.9rem;
}

.dates-row .value {
	font-weight: 600;
}

.dates-row .separator {
	color: #6b7280;
	margin: 0 6px;
}

.stats-row {
	display: grid;
	grid-template-columns: repeat(2, minmax(120px, 1fr));
	gap: 8px;
	margin-top: 8px;
}

.stat {
	background: #f9fafb;
	border: 1px solid #e5e7eb;
	border-radius: 10px;
	padding: 10px;
	text-align: center;
}

.stat-number {
	font-size: 1.25rem;
	font-weight: 700;
	color: #1f2937;
}

.stat-label {
	font-size: 0.9rem;
	color: #6b7280;
}

@media print {
	.summary-card {
		box-shadow: none;
		border: 1px solid #000;
	}

	.chip {
		background: #eee !important;
		border-color: #000;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}
}
</style>