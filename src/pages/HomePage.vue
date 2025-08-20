<template>
	<div class="main" dir="rtl">
		<div class="formDiv" v-show="!showTable">
			<h2 class="form-title">הגדרות תכנית לימוד</h2>
			<p class="form-subtitle">בחר ימים, מסכתות ומגבלות — הכל בהיר ופשוט</p>
			<form @submit.prevent="creatNewTable">
				<div class="form-line">
					<label for="name">שם:</label>
					<input type="text" id="name" v-model="name" />
				</div>
				<div class="form-line">
					<label>תאריך התחלה (עברי):</label>
					<div class="heb-date">
						<select v-model.number="hebDay" aria-label="יום עברי">
							<option v-for="opt in daysHebOptions" :key="`d-${opt.value}`" :value="opt.value">{{ opt.label }}</option>
						</select>
						<select v-model.number="hebMonth" aria-label="חודש עברי">
							<option v-for="m in hebMonths" :key="`m-${m.value}`" :value="m.value">{{ m.label }}</option>
						</select>
						<select v-model.number="hebYear" aria-label="שנה עברית" class="year-select">
							<option v-for="opt in hebYearOptions" :key="`y-${opt.value}`" :value="opt.value">{{ opt.label }}</option>
						</select>
					</div>
				</div>
				<div class="form-line">
					<label>ימי לימוד:</label>
				</div>
				<div class="form-line daysLine">
					<div class="days-box choose-all">
						<label for="all"><bdi dir="rtl">{{ chooseAll }}</bdi></label>
						<input type="checkbox" id="all" value="all" v-model="daysAll" />
					</div>
					<div class="days-box"><label for="sunday">א</label><input type="checkbox" id="sunday" value="א"
							v-model="days[0]" /></div>
					<div class="days-box"><label for="monday">ב</label><input type="checkbox" id="monday" value="ב"
							v-model="days[1]" /></div>
					<div class="days-box"><label for="tuesday">ג</label><input type="checkbox" id="tuesday" value="ג"
							v-model="days[2]" /></div>
					<div class="days-box"><label for="wednesday">ד</label><input type="checkbox" id="wednesday"
							value="ד" v-model="days[3]" /></div>
					<div class="days-box"><label for="thursday">ה</label><input type="checkbox" id="thursday" value="ה"
							v-model="days[4]" /></div>
					<div class="days-box"><label for="friday">ו</label><input type="checkbox" id="friday" value="ו"
							v-model="days[5]" /></div>
					<div class="days-box"><label for="saturday">ש</label><input type="checkbox" id="saturday" value="ש"
							v-model="days[6]" /></div>
				</div>
				<div class="form-line">
					<label for="limit">הגבלת מספר המשניות לכל יום (אופציונלי)</label>
					<input id="limit" type="number" min="0" step="1" :disabled="thereIsDuration" v-model.number="limit"
						placeholder="ללא הגבלה = 0" />
				</div>
				<div class="form-line">
					<label for="duration">או בחר מספר ימים למחזור השינון</label>
					<input type="number" id="duration" min="0" max="365" :disabled="thereIsLimit"
						v-model.number="duration" />
				</div>
				<div class="masechtot">
					<div class="form-line">
						<div class="seder-box">
							<div class="seder-header">
								<label for="shas">כל השס</label>
								<input type="checkbox" v-model="shasSelected" class="box-masecet" />
							</div>
						</div>
					</div>
					<div class="form-line sdorim">
						<div class="seder-box">
							<div class="seder-header"><label>זרעים</label><input type="checkbox"
									v-model="zeroimSelected" class="box-masecet" /></div>
							<div class="seder">
								<VueMultiselect v-model="selectedZeroim" :options="zeroim" :multiple="true" />
							</div>
						</div>
						<div class="seder-box">
							<div class="seder-header"><label>מועד</label><input type="checkbox" v-model="moadimSelected"
									class="box-masecet" /></div>
							<div class="seder">
								<VueMultiselect v-model="selectedMoadim" :options="moadim" :multiple="true" />
							</div>
						</div>
						<div class="seder-box">
							<div class="seder-header"><label>נשים</label><input type="checkbox" v-model="nashimSelected"
									class="box-masecet" /></div>
							<div class="seder">
								<VueMultiselect v-model="selectedNashim" :options="nashim" :multiple="true" />
							</div>
						</div>
						<div class="seder-box">
							<div class="seder-header"><label>נזיקין</label><input type="checkbox"
									v-model="nezikinSelected" class="box-masecet" /></div>
							<div class="seder">
								<VueMultiselect v-model="selectedNezikin" :options="nezikin" :multiple="true" />
							</div>
						</div>
						<div class="seder-box">
							<div class="seder-header"><label>קדשים</label><input type="checkbox"
									v-model="kodashimSelected" class="box-masecet" /></div>
							<div class="seder">
								<VueMultiselect v-model="selectedKodashim" :options="kodashim" :multiple="true" />
							</div>
						</div>
						<div class="seder-box">
							<div class="seder-header"><label>טהרות</label><input type="checkbox"
									v-model="taharotSelected" class="box-masecet" /></div>
							<div class="seder">
								<VueMultiselect v-model="selectedTaharot" :options="taharot" :multiple="true" />
							</div>
						</div>
					</div>
					<div class="form-line">
						<div><button @click.prevent="clearAll" type="button">נקה הכול</button></div>
					</div>
				</div>
				<div class="btn">
					<div class="form-line">
						<button type="button" @click="resetForm">נקה טופס</button>
					</div>
					<div class="form-line">
						<button type="submit">צור טבלה</button>
					</div>
				</div>
			</form>
		</div>
		<button class="no-print" v-show="showTable" @click="showTable = !showTable">לעריכת המסלול</button>
		<newTable v-if="showTable" :sdorimShlemim="sdorimShlemim" :masechtot="selected" :date="date" :name="name"
			:days="days" :limit="limit" :duration="duration" />
	</div>
</template>



<script>
import { defineAsyncComponent } from 'vue'
import { HDate } from '@hebcal/core'
import newTable from '../components/newTable.vue'
import VueMultiselect from 'vue-multiselect'
export default {
	components: { VueMultiselect, newTable },  //: defineAsyncComponent(() => import('./components/newTable.vue')) },
	name: 'App',
	data() {
		return {
			showTable: false,
			limit: null,
			thereIsLimit: false,
			duration: null,
			thereIsDuration: false,
			labelName: ':שם',
			daysAll: false,
			chooseAll: 'בחר הכול',
			name: '',
			date: '',
			hebDay: null,
			hebMonth: null,
			hebYear: null,
			days: [false, false, false, false, false, false, false],
			selected: [],
			selectedZeroim: [],
			selectedMoadim: [],
			selectedNashim: [],
			selectedNezikin: [],
			selectedKodashim: [],
			selectedTaharot: [],
			options: ["כל הש\"ס", "זרעים", "מועד", "נשים", "נזיקין", "קדשים", "טהרות", "ברכות", "פאה", "דמאי", "כלאים", "שביעית", "תרומות", "מעשרות", "מעשר שני", "חלה", "ערלה", "ביכורים", "שבת", "עירובין", "פסחים", "שקלים", "יומא", "סוכה", "ביצה", "ראש השנה", "תענית", "מגילה", "מועד קטן", "חגיגה", "יבמות", "כתובות", "נדרים", "נזיר", "סוטה", "גיטין", "קידושין", "בבא קמא", "בבא מציעא", "בבא בתרא", "סנהדרין", "מכות", "שבועות", "עדיות", "עבודה זרה", "אבות", "הוריות", "זבחים", "מנחות", "חולין", "בכורות", "ערכין", "תמורה", "כריתות", "מעילה", "תמיד", "מידות", "קנים", "כלים", "אהלות", "נגעים", "פרה", "טהרות", "מקואות", "נדה", "מכשירין", "זבים", "טבול יום", "ידיים", "עוקצין"],
			zeroim: ["ברכות", "פאה", "דמאי", "כלאים", "שביעית", "תרומות", "מעשרות", "מעשר שני", "חלה", "ערלה", "ביכורים"],
			moadim: ["שבת", "עירובין", "פסחים", "שקלים", "יומא", "סוכה", "ביצה", "ראש השנה", "תענית", "מגילה", "מועד קטן", "חגיגה"],
			nashim: ["יבמות", "כתובות", "נדרים", "נזיר", "סוטה", "גיטין", "קידושין"],
			nezikin: ["בבא קמא", "בבא מציעא", "בבא בתרא", "סנהדרין", "מכות", "שבועות", "עדיות", "עבודה זרה", "אבות", "הוריות"],
			kodashim: ["זבחים", "מנחות", "חולין", "בכורות", "ערכין", "תמורה", "כריתות", "מעילה", "תמיד", "מידות", "קנים"],
			taharot: ["כלים", "אהלות", "נגעים", "פרה", "טהרות", "מקואות", "נדה", "מכשירין", "זבים", "טבול יום", "ידיים", "עוקצין"],
			shasSelected: false,
			zeroimSelected: false,
			moadimSelected: false,
			nashimSelected: false,
			nezikinSelected: false,
			kodashimSelected: false,
			taharotSelected: false,
			sdorimShlemim: [false, false, false, false, false, false]
		}
	},
	computed:
	{
		currentDate() {
			const currentDate = new Date();
			const year = currentDate.getFullYear(); // Get the current year (YYYY)
			const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (0-11) and add 1 to get (1-12)
			const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day of the month

			const formattedDate = `${year}-${month}-${day}`;
			return formattedDate;

		},
		isHebLeap() {
			return this.hebYear ? this.isHebLeapYear(this.hebYear) : false;
		},
		hebMonths() {
			const base = [
				{ value: 1, label: 'ניסן' },
				{ value: 2, label: 'אייר' },
				{ value: 3, label: 'סיון' },
				{ value: 4, label: 'תמוז' },
				{ value: 5, label: 'אב' },
				{ value: 6, label: 'אלול' },
				{ value: 7, label: 'תשרי' },
				{ value: 8, label: 'חשון' },
				{ value: 9, label: 'כסלו' },
				{ value: 10, label: 'טבת' },
				{ value: 11, label: 'שבט' },
			];
			if (this.isHebLeap) {
				base.push({ value: 12, label: "אדר א'" }, { value: 13, label: "אדר ב'" });
			} else {
				base.push({ value: 12, label: 'אדר' });
			}
			return base;
		},
		daysInHebMonth() {
			if (!this.hebMonth || !this.hebYear) return 30;
			try {
				const d = new HDate(1, this.hebMonth, this.hebYear);
				return d.daysInMonth();
			} catch (e) {
				return 30;
			}
		},
		daysHebOptions() {
			// Build 1..daysInHebMonth, label in Hebrew letters (א, ב, ...)
			const n = this.daysInHebMonth || 30;
			const out = [];
			for (let i = 1; i <= n; i++) out.push({ value: i, label: this.toHebNum(i) });
			return out;
		},
		hebYearOptions() {
			// starting current Hebrew year, then next 9 years
			try {
				const todayHd = new HDate(new Date());
				const start = todayHd.getFullYear();
				const years = Array.from({ length: 10 }, (_, k) => start + k);
				return years.map(y => ({ value: y, label: this.toHebYear(y) }));
			} catch {
				const y = 5785;
				return Array.from({ length: 10 }, (_, k) => y + k).map(v => ({ value: v, label: this.toHebYear(v) }));
			}
		},
	},
	mounted() {
		this.initHebDateToday();
	},
	watch: {
		daysAll() {
			if (this.daysAll) {
				this.days = [true, true, true, true, true, true, true],
					this.chooseAll = 'בטל בחירת כולם'

			} else {
				this.days = [false, false, false, false, false, false, false]
				this.chooseAll = 'בחר הכול'
			}
		},
		limit() {
			if (parseInt(this.limit) > 0) {
				this.thereIsLimit = true
			} else {
				this.thereIsLimit = false
			}
		},
		duration() {
			// if (parseInt(this.duration) === NaN) {
			//   this.duration = 0
			//   alert('יש להכניס מספר')
			// }
			if (parseInt(this.duration) > 0) {
				this.thereIsDuration = true
			} else {
				this.thereIsDuration = false
			}
		},
		shasSelected() {
			if (this.shasSelected) {
				this.zeroimSelected = true,
					this.moadimSelected = true,
					this.nashimSelected = true,
					this.nezikinSelected = true,
					this.kodashimSelected = true,
					this.taharotSelected = true
			}
			// else {
			// 	this.zeroimSelected = false,
			// 		this.moadimSelected = false,
			// 		this.nashimSelected = false,
			// 		this.nezikinSelected = false,
			// 		this.kodashimSelected = false,
			// 		this.taharotSelected = false
			// }
		},
		zeroimSelected() {
			if (this.zeroimSelected) {
				this.selectedZeroim = this.zeroim
				this.sdorimShlemim[0] = true

			} else {
				this.sdorimShlemim[0] = false
				this.shasSelected = false
			}
		},
		moadimSelected() {
			if (this.moadimSelected) {
				this.selectedMoadim = this.moadim
				this.sdorimShlemim[1] = true
			} else {
				this.sdorimShlemim[1] = false
				this.shasSelected = false

			}
		},
		nashimSelected() {
			if (this.nashimSelected) {
				this.selectedNashim = this.nashim
				this.sdorimShlemim[2] = true
			} else {
				this.sdorimShlemim[2] = false
				this.shasSelected = false

			}
		},
		nezikinSelected() {
			if (this.nezikinSelected) {
				this.selectedNezikin = this.nezikin
				this.sdorimShlemim[3] = true
			} else {
				this.sdorimShlemim[3] = false
				this.shasSelected = false
			}
		},
		kodashimSelected() {
			if (this.kodashimSelected) {
				this.selectedKodashim = this.kodashim
				this.sdorimShlemim[4] = true
			} else {
				this.sdorimShlemim[4] = false
				this.shasSelected = false
			}
		},
		taharotSelected() {
			if (this.taharotSelected) {
				this.selectedTaharot = this.taharot
				this.sdorimShlemim[5] = true
			} else {
				this.sdorimShlemim[5] = false
				this.shasSelected = false
				console.log(this.sdorimShlemim);
			}
		},
		sdorimShlemim() {
			if (this.sdorimShlemim[0] && this.sdorimShlemim[1] && this.sdorimShlemim[2] && this.sdorimShlemim[3] && this.sdorimShlemim[4] && this.sdorimShlemim[5]) {
				this.shasSelected = true
				console.log(this.sdorimShlemim);
			} else {
				console.log('false');
				this.shasSelected = false
			}
		},
		hebMonth() {
			if (this.hebDay && this.hebDay > this.daysInHebMonth) this.hebDay = this.daysInHebMonth;
		},
		hebYear() {
			if (this.hebDay && this.hebDay > this.daysInHebMonth) this.hebDay = this.daysInHebMonth;
			// collapse Adar II to Adar when switching to non-leap year
			if (!this.isHebLeap && this.hebMonth && this.hebMonth > 12) {
				this.hebMonth = 12;
				if (this.hebDay && this.hebDay > this.daysInHebMonth) this.hebDay = this.daysInHebMonth;
			}
		},
		selectedZeroim() {
			if (this.selectedZeroim.length === this.zeroim.length) {
				this.zeroimSelected = true
			} else {
				this.zeroimSelected = false
			}
		},
		selectedMoadim() {
			if (this.selectedMoadim.length === this.moadim.length) {
				this.moadimSelected = true
			} else {
				this.moadimSelected = false
			}
		},
		selectedNashim() {
			if (this.selectedNashim.length === this.nashim.length) {
				this.nashimSelected = true
			} else {
				this.nashimSelected = false
			}
		},
		selectedNezikin() {
			if (this.selectedNezikin.length === this.nezikin.length) {
				this.nezikinSelected = true
			} else {
				this.nezikinSelected = false
			}
		},
		selectedKodashim() {
			if (this.selectedKodashim.length === this.kodashim.length) {
				this.kodashimSelected = true
			} else {

				this.kodashimSelected = false
			}
		},
		selectedTaharot() {
			if (this.selectedTaharot.length === this.taharot.length) {
				this.taharotSelected = true
			} else {
				this.taharotSelected = false
			}
		},



	},
	methods: {
		resetForm() {
			// Reset basic fields
			this.name = '';
			this.daysAll = false;
			this.chooseAll = 'בחר הכול';
			this.days = [false, false, false, false, false, false, false];
			this.limit = null;
			this.duration = null;
			this.thereIsLimit = false;
			this.thereIsDuration = false;
			// Reset masechtot and related checkboxes
			this.clearAll();
			// Hide table and clear date
			this.showTable = false;
			this.date = '';
			// Reset Hebrew date to today for a valid default
			this.initHebDateToday();
		},
		clearAll() {
			this.selected = []
			this.selectedZeroim = []
			this.selectedMoadim = []
			this.selectedNashim = []
			this.selectedNezikin = []
			this.selectedKodashim = []
			this.selectedTaharot = []
			this.limit = null
			this.duration = null
			this.zeroimSelected = false
			this.moadimSelected = false
			this.nashimSelected = false
			this.nezikinSelected = false
			this.kodashimSelected = false
			this.taharotSelected = false
			this.shasSelected = false
			this.thereIsLimit = false
			this.thereIsDuration = false
			this.sdorimShlemim = [false, false, false, false, false, false]

		},
		checkBox() {
			if (this.selectedZeroim.length === this.zeroim.length) {
				this.zeroimSelected = true
				this.sdorimShlemim[0] = true
			}
			if (this.selectedMoadim.length === this.moadim.length) {
				this.moadimSelected = true
				this.sdorimShlemim[1] = true
			}
			if (this.selectedNashim.length === this.nashim.length) {
				this.nashimSelected = true
				this.sdorimShlemim[2] = true
			}
			if (this.selectedNezikin.length === this.nezikin.length) {
				this.nezikinSelected = true
				this.sdorimShlemim[3] = true
			}
			if (this.selectedKodashim.length === this.kodashim.length) {
				this.kodashimSelected = true
				this.sdorimShlemim[4] = true
			}
			if (this.selectedTaharot.length === this.taharot.length) {
				this.taharotSelected = true
				this.sdorimShlemim[5] = true
			}
			if (this.zeroimSelected && this.moadimSelected && this.nashimSelected && this.nezikinSelected && this.kodashimSelected && this.taharotSelected) {
				this.shasSelected = true
			}
			console.log(this.sdorimShlemim);

		},
		hebrewToIso() {
			try {
				if (!this.hebDay || !this.hebMonth || !this.hebYear) return '';
				const hd = new HDate(this.hebDay, this.hebMonth, this.hebYear);
				const g = hd.greg();
				const y = g.getFullYear();
				const m = String(g.getMonth() + 1).padStart(2, '0');
				const d = String(g.getDate()).padStart(2, '0');
				return `${y}-${m}-${d}`;
			} catch (e) {
				return '';
			}
		},
		initHebDateToday() {
			try {
				const todayHd = new HDate(new Date());
				this.hebDay = todayHd.getDate();
				this.hebMonth = todayHd.getMonth();
				this.hebYear = todayHd.getFullYear();
			} catch (e) {
				// leave as nulls
			}
		},
		creatNewTable() {
			// override existing to inject Hebrew date
			// ...existing code before validations...
			this.checkBox();
			if (this.name === '') {
				alert('יש להכניס שם לטבלה')
			} else {
				const iso = this.hebrewToIso();
				if (!iso) {
					alert('יש לבחור תאריך עברי תקין');
					return;
				}
				this.date = iso;
			}
			// continue with existing validations
			if (this.selectedZeroim.length === 0 && this.selectedMoadim.length === 0 && this.selectedNashim.length === 0 && this.selectedNezikin.length === 0 && this.selectedKodashim.length === 0 && this.selectedTaharot.length === 0) {
				alert('יש לבחור מסכתות')
			} else if (this.days[0] === false && this.days[1] === false && this.days[2] === false && this.days[3] === false && this.days[4] === false && this.days[5] === false && this.days[6] === false) {
				alert('יש לבחור ימי לימוד')
			} else {
				if (this.shasSelected)
					this.selected = ["כל השס"]
				else {
					this.selected = []
					this.selected = this.selected.concat(this.selectedZeroim, this.selectedMoadim, this.selectedNashim, this.selectedNezikin, this.selectedKodashim, this.selectedTaharot)
				}
				this.showTable = true
			}
		},
		toHebNum(num) {
			// 1..30 into Hebrew letters (א..ל); for >30 fallback to gematriya via @hebcal/core if desired
			const map = ['','א','ב','ג','ד','ה','ו','ז','ח','ט','י','יא','יב','יג','יד','טו','טז','יז','יח','יט','כ','כא','כב','כג','כד','כה','כו','כז','כח','כט','ל'];
			if (num >= 1 && num <= 30) return map[num];
			try {
				// fallback using @hebcal/core gematriya if available
				// HDate.gematriya isn't exposed here; simple approximation for tens/hundreds
				return String(num);
			} catch { return String(num); }
		},
		toHebYear(year) {
			// Render Hebrew year as proper gematria (e.g., תשפ"ה for 5785)
			try {
				let n = year % 1000; // omit thousands (ה׳)
				const letters = [];
				const hundreds = [400, 300, 200, 100];
				const hLet = { 400: 'ת', 300: 'ש', 200: 'ר', 100: 'ק' };
				for (const h of hundreds) { while (n >= h) { letters.push(hLet[h]); n -= h; } }
				const tens = [90, 80, 70, 60, 50, 40, 30, 20, 10];
				const tLet = { 90: 'צ', 80: 'פ', 70: 'ע', 60: 'ס', 50: 'נ', 40: 'מ', 30: 'ל', 20: 'כ', 10: 'י' };
				for (const t of tens) { while (n >= t) { letters.push(tLet[t]); n -= t; } }
				if (n === 15) { letters.push('ט', 'ו'); n = 0; }
				else if (n === 16) { letters.push('ט', 'ז'); n = 0; }
				else {
					const uLet = { 9: 'ט', 8: 'ח', 7: 'ז', 6: 'ו', 5: 'ה', 4: 'ד', 3: 'ג', 2: 'ב', 1: 'א' };
					if (n > 0) letters.push(uLet[n] || '');
				}
				if (letters.length === 0) return 'א׳';
				if (letters.length === 1) return `${letters[0]}׳`;
				const last = letters.pop();
				return `${letters.join('')}״${last}`;
			} catch { return String(year); }
		},
		isHebLeapYear(y) {
			// Hebrew leap years in 19-year cycle: 3,6,8,11,14,17,19
			const r = y % 19;
			return r === 0 || r === 3 || r === 6 || r === 8 || r === 11 || r === 14 || r === 17;
		},
	}
}




</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
/* Ensure predictable sizing and no overflow surprises */
*,
*::before,
*::after {
	box-sizing: border-box;
}

.form-title {
	margin: 0 0 4px;
	font-size: 1.35rem;
	font-weight: 700;
	color: #111827;
	text-align: center;
}

.form-subtitle {
	margin: 0 0 10px;
	font-size: 0.95rem;
	color: #6b7280;
	text-align: center;
}

.form-line {
	display: flex;
	flex-direction: row;
	/* with RTL container, items render right-to-left naturally */
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
	margin: 10px;
}

.sdorim {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 10px;
}

.days-box {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 6px;
	padding: 6px 10px;
	border: 1px solid #e5e7eb;
	border-radius: 999px;
	background: #fff;
}

.choose-all {
	background: #eef6ff;
	border-color: #cfe3ff;
}

.formDiv {
	display: flex;
	width: 100%;
	max-width: 1000px;
	direction: rtl;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
	background: #f7fbfd;
	/* light tint */
	margin: 16px auto;
	padding: 18px 20px;
	border: 1px solid #dbe5ea;
	border-radius: 12px;
	box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
	overflow: hidden;
	/* prevent children from spilling out */
}

.main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

}

.daysLine {
	width: 100%;
	flex-wrap: wrap;
}

.seder-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px;
	padding: 12px;
	border: 1px solid #e5e7eb;
	border-radius: 10px;
	background: #f8fafc;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
	flex: 1 1 300px;
	/* responsive wrapping */
	max-width: 100%;
}

.seder-header {
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
	justify-content: flex-start;
}

.seder-header label {
	margin: 0;
}

.seder-header .box-masecet {
	width: 18px;
	height: 18px;
}

.masechtot {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px 0;
	padding: 12px 8px;
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	background: #ffffff;
}

.btn {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 12px;
	margin: 12px 0 0;
	padding: 8px 0 0;
}

button {
	margin: 0;
	padding: 10px 16px;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	background: #0d6efd;
	color: #fff;
	cursor: pointer;
	transition: all .15s ease-in-out;
}

button:hover {
	background: #0b5ed7;
}

button:disabled {
	opacity: .6;
	cursor: not-allowed;
}

/* Inputs */
input[type="text"],
input[type="date"],
input[type="number"],
select {
	width: 100%;
	max-width: 420px;
	padding: 10px 12px;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	background: #fff;
	color: #111827;
	text-align: right;
	/* RTL-friendly */
}

/* Hebrew date inline selects: content-based width and a wider year */
.heb-date select { width: auto; max-width: none; }
.heb-date .year-select { min-width: 180px; }

label {
	min-width: 120px;
	color: #111827;
	font-weight: 600;
}

/* Days */
.daysLine {
	width: 100%;
	flex-wrap: wrap;
	gap: 6px;
}

.days-box input {
	width: 18px;
	height: 18px;
	margin-right: 8px;
}

.days-box label {
	min-width: auto;
	margin: 0 0 0 6px;
	font-weight: 600;
}

.choose-all label {
	direction: rtl !important;
	unicode-bidi: isolate-override;
}

/* Multiselect width tuning */
.seder {
	width: 100%;
}

.seder :deep(.multiselect) {
	width: 100%;
	min-width: 220px;
	direction: rtl;
	text-align: right;
}

.seder :deep(.multiselect__tags) {
	border-radius: 8px;
	border-color: #e5e7eb;
	direction: rtl;
	text-align: right;
}

.seder :deep(.multiselect__content) {
	direction: rtl;
	text-align: right;
}

.seder :deep(.multiselect__tags) {
	border-radius: 8px;
	border-color: #e5e7eb;
}

.seder :deep(.multiselect__option--highlight) {
	background: #0d6efd;
}

/* Sections spacing */
.masechtot .form-line {
	margin: 8px 6px;
}

/* Small screens: stack label above input to avoid overflow */
@media (max-width: 640px) {
	.form-line {
		flex-direction: column;
		align-items: stretch;
	}

	label {
		margin-bottom: 6px;
	}
}

@media print {
	.no-print {
		display: none !important;
	}

	.form-title,
	.form-subtitle {
		display: none;
	}

	.formDiv {
		box-shadow: none;
		border: 1px solid #000;
	}
}

.heb-date {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>