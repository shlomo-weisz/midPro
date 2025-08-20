<template>
	<div class="main">
		<div class="formDiv" v-show="!showTable">
			<form action="">
				<div class="form-line">
					<label for="name">שם:</label>
					<input type="text" id="name" v-model="name">
				</div>

				<div class="form-line">
					<label for="date">תאריך התחלה:</label>
					<input type="date" id="date" v-model="date" :min="currentDate">
				</div>

				<div class="form-line">
					<label for="date">ימי לימוד:</label>
				</div>
				<div class="form-line daysLine">
					<div class="days-box">
						<label for="all"> {{ chooseAll }}</label>
						<input type="checkbox" id="all" value="all" v-model="daysAll">
					</div>
					<div class="days-box">
						<label for="sunday">א</label>
						<input type="checkbox" id="sunday" value="א" v-model="days[0]">
					</div>
					<div class="days-box">
						<label for="monday">ב</label>
						<input type="checkbox" id="monday" value="ב" v-model="days[1]">
					</div>
					<div class="days-box">
						<label for="tuesday">ג</label>
						<input type="checkbox" id="tuesday" value="ג" v-model="days[2]">
					</div>
					<div class="days-box">
						<label for="wednesday">ד</label>
						<input type="checkbox" id="wednesday" value="ד" v-model="days[3]">
					</div>
					<div class="days-box">
						<label for="thursday">ה</label>
						<input type="checkbox" id="thursday" value="ה" v-model="days[4]">
					</div>
					<div class="days-box">
						<label for="friday">ו</label>
						<input type="checkbox" id="friday" value="ו" v-model="days[5]">
					</div>
					<div class="days-box">
						<label for="saturday">ש</label>
						<input type="checkbox" id="saturday" value="ש" v-model="days[6]">
					</div>
				</div>

				<div class="form-line">
					<label for="limit">הגבלת מספר המשניות לכל יום (אופציונלי)</label>
					<input id="limit" type="number" min="0" step="1" :disabled="thereIsDuration" v-model.number="limit"
						placeholder="ללא הגבלה = 0" />
				</div>

				<div class="form-line">
					<label for="duration">או בחר מספר ימים למחזור השינון</label>
					<input type="number" id="duration" min="0" max="365" :disabled="thereIsLimit"
						v-model.number="duration">
				</div>


				<div class="form-line">
					<!-- <div>
						<VueMultiselect v-model="selected" :options="options" :multiple="true">
						</VueMultiselect>
					</div> -->

				</div>
				<div class="masechtot">
					<div class="form-line">
						<div class="seder-box">
							<label for="shas">כל השס</label>
							<input type="checkbox" v-model="shasSelected" class="box-masecet" />
						</div>
					</div>
					<div class="form-line sdorim">
						<div class="seder-box">
							<label for="shas">זרעים</label>
							<input type="checkbox" v-model="zeroimSelected" class="box-masecet" />
							<div class="seder">
								<VueMultiselect v-model="selectedZeroim" :options="zeroim" :multiple="true">
								</VueMultiselect>
							</div>
						</div>
						<div class="seder-box">
							<label for="shas">מועד</label>
							<input type="checkbox" v-model="moadimSelected" class="box-masecet" />
							<div class="seder">
								<VueMultiselect v-model="selectedMoadim" :options="moadim" :multiple="true">
								</VueMultiselect>
							</div>
						</div>
						<div class="seder-box">
							<label for="shas">נשים</label>
							<input type="checkbox" v-model="nashimSelected" class="box-masecet" />
							<div class="seder">
								<VueMultiselect v-model="selectedNashim" :options="nashim" :multiple="true">
								</VueMultiselect>
							</div>
						</div>
						<div class="seder-box">
							<label for="shas">נזיקין</label>
							<input type="checkbox" v-model="nezikinSelected" class="box-masecet" />
							<div class="seder">
								<VueMultiselect v-model="selectedNezikin" :options="nezikin" :multiple="true">
								</VueMultiselect>
							</div>
						</div>
						<div class="seder-box">
							<label for="shas">קדשים</label>
							<input type="checkbox" v-model="kodashimSelected" class="box-masecet" />
							<div class="seder">
								<VueMultiselect v-model="selectedKodashim" :options="kodashim" :multiple="true">
								</VueMultiselect>
							</div>
						</div>
						<div class="seder-box">
							<label for="shas">טהרות</label>
							<input type="checkbox" v-model="taharotSelected" class="box-masecet" />
							<div class="seder">
								<VueMultiselect v-model="selectedTaharot" :options="taharot" :multiple="true">
								</VueMultiselect>
							</div>
						</div>
					</div>
					<div class="form-line">
						<div>
							<button @click.prevent="clearAll">נקה הכול</button>
						</div>
					</div>






				</div>
				<div class="btn">
					<div class="form-line">
						<button @click="">נקה טופס</button>
					</div>
					<div class="form-line">
						<button type="submit" @click.prevent="creatNewTable">צור טבלה</button>
					</div>
				</div>

			</form>
		</div>
		<button v-show="showTable" @click="showTable = !showTable">לעריכת המסלול</button>
		<newTable v-if="showTable" :sdorimShlemim="sdorimShlemim" :masechtot="selected" :date="date" :name="name"
			:days="days" :limit="limit" :duration="duration"></newTable>
	</div>
</template>



<script>
import { defineAsyncComponent } from 'vue'
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
			chooseAll: ' :בחר הכול',
			name: '',
			date: '',
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

		}
	},
	watch: {
		daysAll() {
			if (this.daysAll) {
				this.days = [true, true, true, true, true, true, true],
					this.chooseAll = 'בטל בחירת כולם'

			} else {
				this.days = [false, false, false, false, false, false, false]
				this.chooseAll = ' :בחר הכול'
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
		creatNewTable() {
			this.checkBox();
			if (this.name === '') {
				alert('יש להכניס שם לטבלה')
			} else if (this.date === '') {
				alert('יש להכניס תאריך התחלה')
			} else if (this.selectedZeroim.length === 0 && this.selectedMoadim.length === 0 && this.selectedNashim.length === 0 && this.selectedNezikin.length === 0 && this.selectedKodashim.length === 0 && this.selectedTaharot.length === 0) {
				alert('יש לבחור מסכתות')
			} else if (this.days[0] === false && this.days[1] === false && this.days[2] === false && this.days[3] === false && this.days[4] === false && this.days[5] === false && this.days[6] === false) {
				alert('יש לבחור ימי לימוד')
			}
			else {
				if (this.shasSelected)
					this.selected = ["כל השס"]
				// else if (this.zeroimSelected && this.moadimSelected && this.nashimSelected && this.nezikinSelected && this.kodashimSelected && this.taharotSelected)
				// 	this.selected = ["כל השס"]
				else {
					this.selected = []
					this.selected = this.selected.concat(this.selectedZeroim, this.selectedMoadim, this.selectedNashim, this.selectedNezikin, this.selectedKodashim, this.selectedTaharot)
				}
				this.showTable = true
			}
		}

	}
}




</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.form-line {
	display: flex;
	flex-direction: row-reverse;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
	margin: 10px;
}

.sdorim {
	display: flex;
	flex-direction: row-reverse;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
}

.days-box {
	display: flex;
	flex-direction: row-reverse;
	justify-content: center;
	align-items: center;
	margin: 10px;
	padding: 10px;
	border: 3px solid #ccc;
	border-radius: 5px;
}

.formDiv {
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgb(36, 184, 204);
	margin: 10px;
	padding: 10px;
	border: 9px solid #1b1313;
	border-radius: 5px;
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
	padding: 10px;
	border: 3px solid #ccc;
	border-radius: 5px;
}

.masechtot {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px;
	padding: 10px;
	border: 9px solid #1b1313;
	border-radius: 5px;
}

.btn {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 10px;
	padding: 10px;
	border: 9px solid #171d01;
	border-radius: 5px;
}

button {
	margin: 10px;
	padding: 10px;
	border: 3px solid #ccc;
	border-radius: 5px;
}
</style>