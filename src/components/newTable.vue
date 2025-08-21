<template>
	<div class="mainDiv">
		<headers :name="name" :currentDate="dateTodayHE" :startDate="makePlan[0]"
			:endDate="makePlan[makePlan.length - 1]" :totalDays="sumInDay.length" :totalMishnayos="SumOfMishnayot"
			:days="daysInHe" :masechtos="MasechtotUpdate">
		</headers>

		<div class="actions no-print">
			<button class="print-btn" @click="printPdf"><bdi dir="rtl">ייצוא ל‑<bdi dir="ltr">PDF</bdi></bdi></button>
			<button class="excel-btn" @click="exportToExcel"><bdi dir="rtl">ייצוא ל‑Excel</bdi></button>
		</div>

		<div class="table-wrapper">
			<table class="schedule-table" dir="rtl">
				<colgroup>
					<col style="width: 10%" />
					<col style="width: 15%" />
					<col style="width: 32.5%" />
					<col style="width: 32.5%" />
					<col style="width: 10%" />
				</colgroup>
				<thead>
					<tr>
						<th class="col-day">יום</th>
						<th class="col-date">תאריך</th>
						<th class="col-from">מ־</th>
						<th class="col-to">עד</th>
						<th class="col-count">משניות ליום</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(date, index) in hePlan" :key="index">
						<td class="col-day">{{ hebrewDays[makePlan[index].getDay()] }}</td>
						<td class="col-date">{{ date }}</td>
						<td class="col-from">
							{{ formtHe(setDaySrart[index][0])[0] }} פרק {{ formtHe(setDaySrart[index][0])[1] }} משנה {{
								formtHe(setDaySrart[index][0])[2] }}
						</td>
						<td class="col-to">
							{{ formtHe(setDaySrart[index][1])[0] }} פרק {{ formtHe(setDaySrart[index][1])[1] }} משנה {{
								formtHe(setDaySrart[index][1])[2] }}
						</td>
						<td class="col-count">{{ sumInDay[index] }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { HebrewCalendar, HDate, Location, Event } from '@hebcal/core';
import * as XLSX from 'xlsx';
import headers from './headers.vue'
import Dayline from './Dayline.vue'
export default {
	name: 'newTable',
	components: {
		headers,
		Dayline
	},
	props: {
		masechtot: Array,
		sdorimShlemim: Array,
		date: String,
		name: String,
		days: Array,
		limit: String,
		duration: String,
	},
	data() {
		return {
			hePlan: [],
			abHebrew: {
				1: 'א',
				2: 'ב',
				3: 'ג',
				4: 'ד',
				5: 'ה',
				6: 'ו',
				7: 'ז',
				8: 'ח',
				9: 'ט',
				10: 'י',
				11: 'יא',
				12: 'יב',
				13: 'יג',
				14: 'יד',
				15: 'טו',
				16: 'טז',
				17: 'יז',
				18: 'יח',
				19: 'יט',
				20: 'כ',
				21: 'כא',
				22: 'כב',
				23: 'כג',
				24: 'כד',
				25: 'כה',
				26: 'כו',
				27: 'כז',
				28: 'כח',
				29: 'כט',
				30: 'ל',
			},

			hebrewDays: {
				0: 'ראשון',
				1: 'שני',
				2: 'שלישי',
				3: 'רביעי',
				4: 'חמישי',
				5: 'שישי',
				6: 'שבת'
			},
			dateTodayHE: '',
			shas: {
				sdarim: {
					1: 'zeroim',
					2: 'moed',
					3: 'nashim',
					4: 'nezikin',
					5: 'kodashim',
					6: 'taharot'
				},
				massechtot: {
					1: { name: 'berakhot', hebrewName: 'ברכות', seder: 1, perekim: 9, mishnayot: 57 },
					2: { name: 'peah', hebrewName: 'פאה', seder: 1, perekim: 8, mishnayot: 69 },
					3: { name: 'demai', hebrewName: 'דמאי', seder: 1, perekim: 7, mishnayot: 53 },
					4: { name: 'kilayim', hebrewName: 'כלאים', seder: 1, perekim: 9, mishnayot: 77 },
					5: { name: 'sheviit', hebrewName: 'שביעית', seder: 1, perekim: 10, mishnayot: 89 },
					6: { name: 'terumot', hebrewName: 'תרומות', seder: 1, perekim: 11, mishnayot: 101 },
					7: { name: 'maasrot', hebrewName: 'מעשרות', seder: 1, perekim: 5, mishnayot: 40 },
					8: { name: 'maaserSheni', hebrewName: 'מעשר שני', seder: 1, perekim: 5, mishnayot: 57 },
					9: { name: 'challah', hebrewName: 'חלה', seder: 1, perekim: 4, mishnayot: 38 },
					10: { name: 'orlah', hebrewName: 'ערלה', seder: 1, perekim: 3, mishnayot: 35 },
					11: { name: 'bikurim', hebrewName: 'ביכורים', seder: 1, perekim: 4, mishnayot: 39 },
					12: { name: 'shaboat', hebrewName: 'שבת', seder: 2, perekim: 24, mishnayot: 139 },
					13: { name: 'eruvin', hebrewName: 'עירובין', seder: 2, perekim: 10, mishnayot: 96 },
					14: { name: 'pesachim', hebrewName: 'פסחים', seder: 2, perekim: 10, mishnayot: 89 },
					15: { name: 'shekalim', hebrewName: 'שקלים', seder: 2, perekim: 8, mishnayot: 52 },
					16: { name: 'yoma', hebrewName: 'יומא', seder: 2, perekim: 8, mishnayot: 61 },
					17: { name: 'sukka', hebrewName: 'סוכה', seder: 2, perekim: 5, mishnayot: 53 },
					18: { name: 'beitza', hebrewName: 'ביצה', seder: 2, perekim: 5, mishnayot: 42 },
					19: { name: 'roshHashana', hebrewName: 'ראש השנה', seder: 2, perekim: 4, mishnayot: 35 },
					20: { name: 'taanit', hebrewName: 'תענית', seder: 2, perekim: 4, mishnayot: 34 },
					21: { name: 'megilla', hebrewName: 'מגילה', seder: 2, perekim: 4, mishnayot: 33 },
					22: { name: 'moedKatan', hebrewName: 'מועד קטן', seder: 2, perekim: 3, mishnayot: 24 },
					23: { name: 'chagiga', hebrewName: 'חגיגה', seder: 2, perekim: 3, mishnayot: 23 },
					24: { name: 'yevamot', hebrewName: 'יבמות', seder: 3, perekim: 16, mishnayot: 128 },
					25: { name: 'ketubot', hebrewName: 'כתובות', seder: 3, perekim: 13, mishnayot: 111 },
					26: { name: 'nedarim', hebrewName: 'נדרים', seder: 3, perekim: 11, mishnayot: 90 },
					27: { name: 'nazir', hebrewName: 'נזיר', seder: 3, perekim: 9, mishnayot: 60 },
					28: { name: 'sota', hebrewName: 'סוטה', seder: 3, perekim: 9, mishnayot: 67 },
					29: { name: 'gittin', hebrewName: 'גיטין', seder: 3, perekim: 9, mishnayot: 75 },
					30: { name: 'kidushin', hebrewName: 'קידושין', seder: 3, perekim: 4, mishnayot: 47 },
					31: { name: 'bavaKama', hebrewName: 'בבא קמא', seder: 4, perekim: 10, mishnayot: 79 },
					32: { name: 'bavaMetzia', hebrewName: 'בבא מציעא', seder: 4, perekim: 10, mishnayot: 101 },
					33: { name: 'bavaBatra', hebrewName: 'בבא בתרא', seder: 4, perekim: 10, mishnayot: 86 },
					34: { name: 'sanhedrin', hebrewName: 'סנהדרין', seder: 4, perekim: 11, mishnayot: 71 },
					35: { name: 'makkot', hebrewName: 'מכות', seder: 4, perekim: 3, mishnayot: 34 },
					36: { name: 'shevuot', hebrewName: 'שבועות', seder: 4, perekim: 8, mishnayot: 62 },
					37: { name: 'eduyot', hebrewName: 'עדיות', seder: 4, perekim: 8, mishnayot: 74 },
					38: { name: 'avodaZara', hebrewName: 'עבודה זרה', seder: 4, perekim: 5, mishnayot: 50 },
					39: { name: 'avot', hebrewName: 'אבות', seder: 4, perekim: 6, mishnayot: 108 },
					40: { name: 'horayot', hebrewName: 'הוריות', seder: 4, perekim: 3, mishnayot: 20 },
					41: { name: 'zevachim', hebrewName: 'זבחים', seder: 5, perekim: 14, mishnayot: 101 },
					42: { name: 'menachot', hebrewName: 'מנחות', seder: 5, perekim: 13, mishnayot: 93 },
					43: { name: 'chulin', hebrewName: 'חולין', seder: 5, perekim: 12, mishnayot: 74 },
					44: { name: 'bechorot', hebrewName: 'בכורות', seder: 5, perekim: 9, mishnayot: 73 },
					45: { name: 'arachin', hebrewName: 'ערכין', seder: 5, perekim: 9, mishnayot: 50 },
					46: { name: 'temura', hebrewName: 'תמורה', seder: 5, perekim: 7, mishnayot: 35 },
					47: { name: 'keritot', hebrewName: 'כריתות', seder: 5, perekim: 6, mishnayot: 43 },
					48: { name: 'meila', hebrewName: 'מעילה', seder: 5, perekim: 6, mishnayot: 38 },
					49: { name: 'tamid', hebrewName: 'תמיד', seder: 5, perekim: 7, mishnayot: 34 },
					50: { name: 'middot', hebrewName: 'מידות', seder: 5, perekim: 5, mishnayot: 34 },
					51: { name: 'kinnim', hebrewName: 'קנים', seder: 5, perekim: 3, mishnayot: 15 },
					52: { name: 'keilim', hebrewName: 'כלים', seder: 6, perekim: 30, mishnayot: 254 },
					53: { name: 'ohalot', hebrewName: 'אהלות', seder: 6, perekim: 18, mishnayot: 134 },
					54: { name: 'negaim', hebrewName: 'נגעים', seder: 6, perekim: 14, mishnayot: 115 },
					55: { name: 'para', hebrewName: 'פרה', seder: 6, perekim: 12, mishnayot: 96 },
					56: { name: 'taharot', hebrewName: 'טהרות', seder: 6, perekim: 10, mishnayot: 92 },
					57: { name: 'mikvaot', hebrewName: 'מקואות', seder: 6, perekim: 10, mishnayot: 71 },
					58: { name: 'nidda', hebrewName: 'נדה', seder: 6, perekim: 10, mishnayot: 79 },
					59: { name: 'machshirin', hebrewName: 'מכשירין', seder: 6, perekim: 6, mishnayot: 54 },
					60: { name: 'zavim', hebrewName: 'זבים', seder: 6, perekim: 5, mishnayot: 32 },
					61: { name: 'tevulYom', hebrewName: 'טבול יום', seder: 6, perekim: 4, mishnayot: 26 },
					62: { name: 'yadayim', hebrewName: 'ידיים', seder: 6, perekim: 4, mishnayot: 22 },
					63: { name: 'oktzin', hebrewName: 'עוקצין', seder: 6, perekim: 3, mishnayot: 28 },







				}
			},
			mishnayot: {

				1: {
					name: 'berakhot',
					mishnayot: 57,
					perekim: 9,
					perek1: 5,
					perek2: 8,
					perek3: 6,
					perek4: 7,
					perek5: 5,
					perek6: 8,
					perek7: 5,
					perek8: 8,
					perek9: 5
				},
				2: {
					name: 'peah',
					mishnayot: 69,
					perekim: 8,
					perek1: 6,
					perek2: 8,
					perek3: 8,
					perek4: 11,
					perek5: 8,
					perek6: 11,
					perek7: 8,
					perek8: 9
				},
				3: {
					name: 'demai',
					mishnayot: 53,
					perekim: 7,
					perek1: 4,
					perek2: 5,
					perek3: 6,
					perek4: 7,
					perek5: 11,
					perek6: 12,
					perek7: 8
				},

				4: {
					name: 'kilayim',
					mishnayot: 77,
					perekim: 9,
					perek1: 9,
					perek2: 11,
					perek3: 7,
					perek4: 9,
					perek5: 8,
					perek6: 9,
					perek7: 8,
					perek8: 6,
					perek9: 10
				},
				5: {
					name: 'sheviit',
					mishnayot: 89,
					perekim: 10,
					perek1: 8,
					perek2: 10,
					perek3: 10,
					perek4: 10,
					perek5: 9,
					perek6: 6,
					perek7: 7,
					perek8: 11,
					perek9: 9,
					perek10: 9
				},
				6: {
					name: 'terumot',
					mishnayot: 101,
					perekim: 11,
					perek1: 10,
					perek2: 6,
					perek3: 9,
					perek4: 13,
					perek5: 9,
					perek6: 6,
					perek7: 7,
					perek8: 12,
					perek9: 7,
					perek10: 12,
					perek11: 10

				},
				7: {
					name: 'maasrot',
					mishnayot: 40,
					perekim: 5,
					perek1: 8,
					perek2: 8,
					perek3: 10,
					perek4: 6,
					perek5: 8,

				},
				8: {
					name: 'maaserSheni',
					mishnayot: 57,
					perekim: 5,
					perek1: 7,
					perek2: 10,
					perek3: 13,
					perek4: 12,
					perek5: 15,
				},
				9: {
					name: 'challah',
					mishnayot: 38,
					perekim: 4,
					perek1: 9,
					perek2: 8,
					perek3: 10,
					perek4: 11,
				},
				10: {
					name: 'orlah',
					mishnayot: 35,
					perekim: 3,
					perek1: 9,
					perek2: 17,
					perek3: 9,
				},
				11: {
					name: 'bikurim',
					mishnayot: 39,
					perekim: 4,
					perek1: 11,
					perek2: 11,
					perek3: 12,
					perek4: 5,
				},



				12: {
					name: 'shaboat',
					mishnayot: 139,
					perekim: 24,
					perek1: 11,
					perek2: 7,
					perek3: 6,
					perek4: 2,
					perek5: 4,
					perek6: 10,
					perek7: 4,
					perek8: 7,
					perek9: 7,
					perek10: 6,
					perek11: 6,
					perek12: 6,
					perek13: 7,
					perek14: 4,
					perek15: 3,
					perek16: 8,
					perek17: 8,
					perek18: 3,
					perek19: 6,
					perek20: 5,
					perek21: 3,
					perek22: 6,
					perek23: 5,
					perek24: 5,
				},
				13: {
					name: 'eruvin',
					mishnayot: 96,
					perekim: 10,
					perek1: 10,
					perek2: 6,
					perek3: 9,
					perek4: 11,
					perek5: 9,
					perek6: 10,
					perek7: 11,
					perek8: 11,
					perek9: 4,
					perek10: 15,
				},
				14: {
					name: 'pesachim',
					mishnayot: 89,
					perekim: 10,
					perek1: 7,
					perek2: 8,
					perek3: 8,
					perek4: 9,
					perek5: 10,
					perek6: 6,
					perek7: 13,
					perek8: 8,
					perek9: 11,
					perek10: 9,
				},
				15: {
					name: 'shekalim',
					mishnayot: 52,
					perekim: 8,
					perek1: 7,
					perek2: 5,
					perek3: 4,
					perek4: 9,
					perek5: 6,
					perek6: 6,
					perek7: 7,
					perek8: 8
				},
				16: {
					name: 'yoma',
					mishnayot: 61,
					perekim: 8,
					perek1: 8,
					perek2: 7,
					perek3: 11,
					perek4: 6,
					perek5: 7,
					perek6: 8,
					perek7: 5,
					perek8: 9
				},
				17: {
					name: 'sukka',
					mishnayot: 53,
					perekim: 5,
					perek1: 11,
					perek2: 9,
					perek3: 15,
					perek4: 10,
					perek5: 8,
				},
				18: {
					name: 'beitza',
					mishnayot: 42,
					perekim: 5,
					perek1: 10,
					perek2: 10,
					perek3: 8,
					perek4: 7,
					perek5: 7
				},
				19: {
					name: 'roshHashana',
					mishnayot: 35,
					perekim: 4,
					perek1: 9,
					perek2: 9,
					perek3: 8,
					perek4: 9
				},
				20: {
					name: 'taanit',
					mishnayot: 34,
					perekim: 4,
					perek1: 7,
					perek2: 10,
					perek3: 9,
					perek4: 8
				},
				21: {
					name: 'megilla',
					mishnayot: 33,
					perekim: 4,
					perek1: 11,
					perek2: 6,
					perek3: 6,
					perek4: 10
				},
				22: {
					name: 'moedKatan',
					mishnayot: 24,
					perekim: 3,
					perek1: 10,
					perek2: 5,
					perek3: 9
				},
				23: {
					name: 'chagiga',
					mishnayot: 23,
					perekim: 3,
					perek1: 8,
					perek2: 7,
					perek3: 8
				},
				24: {
					name: 'yevamot',
					mishnayot: 128,
					perekim: 16,
					perek1: 4,
					perek2: 10,
					perek3: 10,
					perek4: 13,
					perek5: 6,
					perek6: 6,
					perek7: 6,
					perek8: 6,
					perek9: 6,
					perek10: 9,
					perek11: 7,
					perek12: 6,
					perek13: 13,
					perek14: 9,
					perek15: 10,
					perek16: 7,
				},
				25: {
					name: 'ketubot',
					mishnayot: 111,
					perekim: 13,
					perek1: 10,
					perek2: 10,
					perek3: 9,
					perek4: 12,
					perek5: 9,
					perek6: 7,
					perek7: 10,
					perek8: 8,
					perek9: 9,
					perek10: 6,
					perek11: 6,
					perek12: 4,
					perek13: 11,
				},
				26: {
					name: 'nedarim',
					mishnayot: 90,
					perekim: 11,
					perek1: 4,
					perek2: 5,
					perek3: 11,
					perek4: 8,
					perek5: 6,
					perek6: 9,
					perek7: 7,
					perek8: 10,
					perek9: 10,
					perek10: 8,
					perek11: 12,
				},
				27: {
					name: 'nazir',
					mishnayot: 60,
					perekim: 9,
					perek1: 7,
					perek2: 10,
					perek3: 7,
					perek4: 7,
					perek5: 7,
					perek6: 11,
					perek7: 4,
					perek8: 2,
					perek9: 5,
				},
				28: {
					name: 'sota',
					mishnayot: 67,
					perekim: 9,
					perek1: 9,
					perek2: 6,
					perek3: 8,
					perek4: 5,
					perek5: 5,
					perek6: 4,
					perek7: 8,
					perek8: 7,
					perek9: 15
				},
				29: {
					name: 'gittin',
					mishnayot: 75,
					perekim: 9,
					perek1: 6,
					perek2: 7,
					perek3: 8,
					perek4: 9,
					perek5: 9,
					perek6: 7,
					perek7: 9,
					perek8: 10,
					perek9: 10
				},
				30: {
					name: 'kidushin',
					mishnayot: 47,
					perekim: 4,
					perek1: 10,
					perek2: 10,
					perek3: 13,
					perek4: 14
				},
				31: {
					name: 'bavaKama',
					mishnayot: 79,
					perekim: 10,
					perek1: 4,
					perek2: 6,
					perek3: 11,
					perek4: 9,
					perek5: 7,
					perek6: 6,
					perek7: 7,
					perek8: 7,
					perek9: 12,
					perek10: 10
				},
				32: {
					name: 'bavaMetzia',
					mishnayot: 101,
					perekim: 10,
					perek1: 8,
					perek2: 11,
					perek3: 12,
					perek4: 12,
					perek5: 11,
					perek6: 8,
					perek7: 11,
					perek8: 9,
					perek9: 13,
					perek10: 6
				},
				33: {
					name: 'bavaBatra',
					mishnayot: 86,
					perekim: 10,
					perek1: 6,
					perek2: 14,
					perek3: 8,
					perek4: 9,
					perek5: 11,
					perek6: 8,
					perek7: 4,
					perek8: 8,
					perek9: 10,
					perek10: 8
				},
				34: {
					name: 'sanhedrin',
					mishnayot: 71,
					perekim: 11,
					perek1: 6,
					perek2: 5,
					perek3: 8,
					perek4: 5,
					perek5: 5,
					perek6: 6,
					perek7: 11,
					perek8: 7,
					perek9: 6,
					perek10: 6,
					perek11: 6
				},
				35: {
					name: 'makkot',
					mishnayot: 34,
					perekim: 3,
					perek1: 10,
					perek2: 8,
					perek3: 16
				},
				36: {
					name: 'shevuot',
					mishnayot: 62,
					perekim: 8,
					perek1: 7,
					perek2: 5,
					perek3: 11,
					perek4: 13,
					perek5: 5,
					perek6: 7,
					perek7: 8,
					perek8: 6
				},
				37: {
					name: 'eduyot',
					mishnayot: 74,
					perekim: 8,
					perek1: 14,
					perek2: 10,
					perek3: 12,
					perek4: 12,
					perek5: 7,
					perek6: 3,
					perek7: 9,
					perek8: 7
				},
				38: {
					name: 'avodaZara',
					mishnayot: 50,
					perekim: 5,
					perek1: 9,
					perek2: 7,
					perek3: 10,
					perek4: 12,
					perek5: 12
				},
				39: {
					name: 'avot',
					mishnayot: 108,
					perekim: 6,
					perek1: 18,
					perek2: 16,
					perek3: 18,
					perek4: 22,
					perek5: 23,
					perek6: 11
				},
				40: {
					name: 'horayot',
					mishnayot: 20,
					perekim: 3,
					perek1: 5,
					perek2: 7,
					perek3: 8
				},
				41: {
					name: 'zevachim',
					mishnayot: 101,
					perekim: 14,
					perek1: 4,
					perek2: 5,
					perek3: 6,
					perek4: 6,
					perek5: 8,
					perek6: 7,
					perek7: 6,
					perek8: 12,
					perek9: 7,
					perek10: 8,
					perek11: 8,
					perek12: 6,
					perek13: 8,
					perek14: 10
				},
				42: {
					name: 'menachot',
					mishnayot: 93,
					perekim: 13,
					perek1: 4,
					perek2: 5,
					perek3: 7,
					perek4: 5,
					perek5: 9,
					perek6: 7,
					perek7: 6,
					perek8: 7,
					perek9: 9,
					perek10: 9,
					perek11: 9,
					perek12: 5,
					perek13: 12
				},
				43: {
					name: 'chulin',
					mishnayot: 74,
					perekim: 12,
					perek1: 7,
					perek2: 10,
					perek3: 7,
					perek4: 7,
					perek5: 5,
					perek6: 7,
					perek7: 6,
					perek8: 6,
					perek9: 8,
					perek10: 4,
					perek11: 2,
					perek12: 5
				},
				44: {
					name: 'bechorot',
					mishnayot: 73,
					perekim: 9,
					perek1: 7,
					perek2: 9,
					perek3: 4,
					perek4: 10,
					perek5: 6,
					perek6: 12,
					perek7: 7,
					perek8: 10,
					perek9: 8
				},
				45: {
					name: 'arachin',
					mishnayot: 50,
					perekim: 9,
					perek1: 4,
					perek2: 6,
					perek3: 5,
					perek4: 4,
					perek5: 6,
					perek6: 5,
					perek7: 5,
					perek8: 7,
					perek9: 8
				},
				46: {
					name: 'temura',
					mishnayot: 35,
					perekim: 7,
					perek1: 6,
					perek2: 3,
					perek3: 5,
					perek4: 4,
					perek5: 6,
					perek6: 5,
					perek7: 6
				},
				47: {
					name: 'keritot',
					mishnayot: 43,
					perekim: 6,
					perek1: 7,
					perek2: 6,
					perek3: 10,
					perek4: 3,
					perek5: 8,
					perek6: 9
				},
				48: {
					name: 'meila',
					mishnayot: 38,
					perekim: 6,
					perek1: 4,
					perek2: 9,
					perek3: 8,
					perek4: 6,
					perek5: 5,
					perek6: 6
				},
				49: {
					name: 'tamid',
					mishnayot: 34,
					perekim: 7,
					perek1: 4,
					perek2: 5,
					perek3: 9,
					perek4: 3,
					perek5: 6,
					perek6: 3,
					perek7: 4
				},
				50: {
					name: 'middot',
					mishnayot: 34,
					perekim: 5,
					perek1: 9,
					perek2: 6,
					perek3: 8,
					perek4: 7,
					perek5: 4
				},
				51: {
					name: 'kinnim',
					mishnayot: 15,
					perekim: 3,
					perek1: 4,
					perek2: 5,
					perek3: 6
				},
				52: {
					name: 'keilim',
					mishnayot: 254,
					perekim: 30,
					perek1: 9,
					perek2: 8,
					perek3: 8,
					perek4: 4,
					perek5: 11,
					perek6: 4,
					perek7: 6,
					perek8: 11,
					perek9: 8,
					perek10: 8,
					perek11: 9,
					perek12: 8,
					perek13: 8,
					perek14: 8,
					perek15: 6,
					perek16: 8,
					perek17: 17,
					perek18: 9,
					perek19: 10,
					perek20: 7,
					perek21: 3,
					perek22: 10,
					perek23: 5,
					perek24: 17,
					perek25: 9,
					perek26: 9,
					perek27: 12,
					perek28: 10,
					perek29: 8,
					perek30: 4
				},
				53: {
					name: 'ohalot',
					mishnayot: 134,
					perekim: 18,
					perek1: 8,
					perek2: 7,
					perek3: 7,
					perek4: 3,
					perek5: 7,
					perek6: 7,
					perek7: 6,
					perek8: 6,
					perek9: 16,
					perek10: 7,
					perek11: 9,
					perek12: 8,
					perek13: 6,
					perek14: 7,
					perek15: 10,
					perek16: 5,
					perek17: 5,
					perek18: 10
				},
				54: {
					name: 'negaim',
					mishnayot: 115,
					perekim: 14,
					perek1: 6,
					perek2: 5,
					perek3: 8,
					perek4: 11,
					perek5: 5,
					perek6: 8,
					perek7: 5,
					perek8: 10,
					perek9: 3,
					perek10: 10,
					perek11: 12,
					perek12: 7,
					perek13: 12,
					perek14: 13
				},
				55: {
					name: 'para',
					mishnayot: 96,
					perekim: 12,
					perek1: 4,
					perek2: 5,
					perek3: 11,
					perek4: 4,
					perek5: 9,
					perek6: 5,
					perek7: 12,
					perek8: 11,
					perek9: 9,
					perek10: 6,
					perek11: 9,
					perek12: 11
				},
				56: {
					name: 'taharot',
					mishnayot: 92,
					perekim: 10,
					perek1: 9,
					perek2: 8,
					perek3: 8,
					perek4: 13,
					perek5: 9,
					perek6: 10,
					perek7: 9,
					perek8: 9,
					perek9: 9,
					perek10: 8
				},
				57: {
					name: 'mikvaot',
					mishnayot: 71,
					perekim: 10,
					perek1: 8,
					perek2: 10,
					perek3: 4,
					perek4: 5,
					perek5: 6,
					perek6: 11,
					perek7: 7,
					perek8: 5,
					perek9: 7,
					perek10: 8
				},
				58: {
					name: 'nidda',
					mishnayot: 79,
					perekim: 10,
					perek1: 7,
					perek2: 7,
					perek3: 7,
					perek4: 7,
					perek5: 9,
					perek6: 14,
					perek7: 5,
					perek8: 4,
					perek9: 11,
					perek10: 8
				},
				59: {
					name: 'machshirin',
					mishnayot: 54,
					perekim: 6,
					perek1: 6,
					perek2: 11,
					perek3: 8,
					perek4: 10,
					perek5: 11,
					perek6: 8
				},
				60: {
					name: 'zavim',
					mishnayot: 32,
					perekim: 5,
					perek1: 6,
					perek2: 4,
					perek3: 3,
					perek4: 7,
					perek5: 12
				},
				61: {
					name: 'tevulYom',
					mishnayot: 26,
					perekim: 4,
					perek1: 5,
					perek2: 8,
					perek3: 6,
					perek4: 7
				},
				62: {
					name: 'yadayim',
					mishnayot: 22,
					perekim: 4,
					perek1: 5,
					perek2: 4,
					perek3: 5,
					perek4: 8
				},
				63: {
					name: 'oktzin',
					mishnayot: 28,
					perekim: 3,
					perek1: 6,
					perek2: 10,
					perek3: 12
				}

			},
			hebrewSdorim: ["זרעים", "מועד", "נשים", "נזיקין", "קדשים", "טהרות"],

		}
	},
	computed:
	{
		daysInHe() {
			let dayshe = [];
			for (let i = 0; i < 7; i++) {
				if (this.days[i] == true) {
					dayshe.push(this.hebrewDays[i])

				}
			}
			return dayshe
		},
		masechtotIds() {
			let massectotids = [];
			for (let masechet of this.masechtot) {
				if (masechet === "כל השס") {
					return Object.keys(this.shas.massechtot)
				}
				else if (masechet === "זרעים") {
					for (let i = 1; i <= 11; i++) {
						massectotids.push(i)
					}
				}
				else if (masechet === "מועד") {
					for (let i = 12; i <= 23; i++) {
						massectotids.push(i)
					}
				}
				else if (masechet === "נשים") {
					for (let i = 24; i <= 30; i++) {
						massectotids.push(i)
					}
				}
				else if (masechet === "נזיקין") {
					for (let i = 31; i <= 40; i++) {
						massectotids.push(i)
					}
				}
				else if (masechet === "קדשים") {
					for (let i = 41; i <= 51; i++) {
						massectotids.push(i)
					}
				}
				else if (masechet === "טהרות") {
					for (let i = 52; i <= 63; i++) {
						massectotids.push(i)
					}
				}
				else {
					massectotids.push(this.findIdOfMasechet(masechet))
				}
			}
			console.log(massectotids);
			return massectotids.sort((a, b) => a - b)
		},
		MasechtotUpdate() {
			let sdorim = [];
			for (let i = 0; i < 6; i++) {
				if (this.sdorimShlemim[i] == true) {
					sdorim.push(this.hebrewSdorim[i])
				}
			}
			if (sdorim.length == 6) {
				return ["כל השס"]
			}
			let masechtotTemp = [];
			for (let masechet of this.masechtot) {
				console.log(masechet);
				if (this.sdorimShlemim[this.shas.massechtot[this.findIdOfMasechet(masechet)].seder - 1] != true) {
					masechtotTemp.push(masechet)
				}

			}
			masechtotTemp.sort((a, b) => this.findIdOfMasechet(a) - this.findIdOfMasechet(b));
			return sdorim.concat(masechtotTemp)


		},
		SumOfMishnayot() {
			let sum = 0;
			for (let masechetId of this.masechtotIds) {
				console.log(masechetId);
				sum += this.getSumOfMishnayot(masechetId)

			}
			return sum

		},
		SumOfPrakim() {
			let sum = 0;
			for (let masechetId of this.masechtotIds) {
				sum += this.getSumOfPrakim(masechetId)
			}
			return sum
		},
		SumOfMasechtot() {
			return this.masechtotIds.length
		},
		daysNeeded() {
			if (parseInt(this.limit) > 0) {
				return Math.ceil(this.SumOfMishnayot / this.limit)

			}
			else if (parseInt(this.duration) > 0) {
				return this.duration

			}
			else {

				return 30
			}



		},
		mishnayotPerDay() {
			return Math.ceil(this.SumOfMishnayot / this.daysNeeded)
		},
		sumInDay() {
			let total = this.SumOfMishnayot;
			let perDay = this.mishnayotPerDay;
			let days = this.daysNeeded;
			let sumInDay = [];
			let i = 1;
			while (i < days && total > perDay) {
				sumInDay.push(perDay)
				total -= perDay
				i++
			}
			sumInDay.push(total)
			this.daysNeeded = sumInDay.length
			return sumInDay
		},
		SelectedSorted() {
			return this.masechtot.sort((a, b) => this.findIdOfMasechet(a) - this.findIdOfMasechet(b));
		},
		makePlan() {
			let dayLeft = this.sumInDay.length;
			let plan = [];
			// Parse YYYY-MM-DD safely to local date (avoid TZ shift)
			let parts = String(this.date).split('-');
			let today = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
			while (dayLeft > 0) {
				// Map JS getDay(): 0=Sunday..6=Saturday to our days[0..6] where 0=Sunday
				const idx = today.getDay();
				if (this.days[idx] === true) {
					let clonetoday = new Date(today)

					plan.push(clonetoday)
					dayLeft--
				}
				today.setDate(today.getDate() + 1)
			}
			this.makeHe(plan)
			return plan
		},

		setDaySrart() {
			let starts = [];
			let ends = [];
			let start = [0, 1, 1];
			let end = [0, 1, 1];
			for (let i of this.sumInDay) {
				let sum = 1;
				while (sum < i) {

					let left = i - sum;
					let leftInCurrentChapter = (this.getSumOfMishnayotInPerek(this.masechtotIds[end[0]], end[1]) - end[2]);
					if (left <= leftInCurrentChapter) {
						end[2] += left;
						sum += left;

						break;
					}
					else {

						sum += leftInCurrentChapter + 1
						if (this.getSumOfPrakim(this.masechtotIds[end[0]]) > end[1]) {
							end[1]++
							end[2] = 1
						}
						else {
							end[0]++
							end[1] = 1
							end[2] = 1
						}

					}


				}
				let start1 = [...start];
				let end1 = [...end];
				start1[0] = this.masechtotIds[start[0]]
				end1[0] = this.masechtotIds[end[0]]
				starts.push(start1);
				ends.push(end1);
				start = [...end];
				if (this.getSumOfMishnayotInPerek(this.masechtotIds[end[0]], end[1]) - end[2] != 0) {
					start[2]++
				}
				else if (this.getSumOfPrakim(this.masechtotIds[end[0]]) - end[1] != 0) {
					start[1]++
					start[2] = 1
				}
				else {
					start[0]++
					start[1] = 1
					start[2] = 1
				}
				end = [...start];

			}
			let res = [];
			for (let i = 0; i < starts.length; i++) {
				let res1 = [];
				res1.push(starts[i], ends[i])
				res.push(res1)
			}
			return res



		},

	},
	mounted() {
		this.getDateTodayHE();


	},
	watch: {

	},

	methods: {
		printPdf() {
			window.print();
		},
		findIdOfMasechet(masechet) {
			for (let id in this.shas.massechtot) {

				if (this.shas.massechtot[id].hebrewName === masechet) {
					return id
				}
			}
		},
		getDateHE(date) {
			let hebDate = new HDate(date).renderGematriya();

			return hebDate
		},
		getDateTodayHE() {
			let d = new Date();
			let datehe = this.getDateHE(d)
			this.dateTodayHE = datehe
		},



		getSumOfPrakim(masechetId) {

			return this.mishnayot[masechetId].perekim
		},

		getSumOfMishnayot(masechetId) {
			return this.mishnayot[masechetId].mishnayot
		},

		getSumOfMishnayotInPerek(masechetId, perek) {
			return this.mishnayot[masechetId]['perek' + perek]
		},

		getSumOfMishnayotInMasechtot(massechtot) {
			let sum = 0;
			for (let masechetId of massechtot) {
				sum += getSumOfMishnayot(masechetId)
			}
			return sum
		},
		makeHe(plan) {
			for (let date of plan) {

				this.hePlan.push(this.getDateHE(date))
			}
		},

		formtHe(path) {
			let res = [];
			let massecet = this.shas.massechtot[path[0]].hebrewName;
			let perek = this.abHebrew[path[1]];
			let mishna = this.abHebrew[path[2]];
			res.push(massecet, perek, mishna)
			return res
		},
		exportToExcel() {
			// Build a 2D array representing the table (logical order)
			const header = ['יום', 'תאריך', 'מ־', 'עד', 'משניות ליום'];
			const rows = this.hePlan.map((date, index) => {
				const dayName = this.hebrewDays[this.makePlan[index].getDay()];
				const from = `${this.formtHe(this.setDaySrart[index][0])[0]} פרק ${this.formtHe(this.setDaySrart[index][0])[1]} משנה ${this.formtHe(this.setDaySrart[index][0])[2]}`;
				const to = `${this.formtHe(this.setDaySrart[index][1])[0]} פרק ${this.formtHe(this.setDaySrart[index][1])[1]} משנה ${this.formtHe(this.setDaySrart[index][1])[2]}`;
				return [dayName, date, from, to, this.sumInDay[index]];
			});

			const data = [header, ...rows];
			const ws = XLSX.utils.aoa_to_sheet(data);

			// Request Right-To-Left sheet UI and right alignment
			ws['!rtl'] = true; // flip sheet view so Column A is on the right in Excel

			// Column widths (in characters) roughly matching the colgroup
			ws['!cols'] = [
				{ wch: 8 },   // יום
				{ wch: 18 },  // תאריך
				{ wch: 32 },  // מ־
				{ wch: 32 },  // עד
				{ wch: 12 },  // משניות ליום
			];

			// Apply right alignment for Hebrew columns
			const range = XLSX.utils.decode_range(ws['!ref']);
			for (let C = range.s.c; C <= range.e.c; ++C) {
				for (let R = range.s.r; R <= range.e.r; ++R) {
					const addr = XLSX.utils.encode_cell({ r: R, c: C });
					if (!ws[addr]) continue;
					if (!ws[addr].s) ws[addr].s = {};
					ws[addr].s.alignment = { horizontal: 'right' };
				}
			}

			const wb = XLSX.utils.book_new();
			// Ensure the entire workbook opens in RTL (Excel UI places Column A on the right)
			wb.Workbook = wb.Workbook || {};
			wb.Workbook.Views = [{ RTL: true }];

			XLSX.utils.book_append_sheet(wb, ws, 'תכנית');
			XLSX.writeFile(wb, `משניות_${this.name || 'ללא_שם'}.xlsx`);
		}
	}
}
</script>
<style scoped>
.mainDiv {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-top: 20px;
	padding: 0 16px;
	/* symmetric side padding */
}

.actions {
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 8px;
	margin: 12px 0;
}

.print-btn {
	background-color: #0d6efd;
	color: #fff;
	border: none;
	border-radius: 6px;
	padding: 8px 14px;
	cursor: pointer;
	font-size: 14px;
}

.excel-btn {
	background-color: #198754;
	color: #fff;
	border: none;
	border-radius: 6px;
	padding: 8px 14px;
	cursor: pointer;
	font-size: 14px;
}

.table-wrapper {
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	/* center table area */
}

.schedule-table {
	width: 100%;
	border-collapse: collapse;
	table-layout: fixed;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	font-size: 14px;
	color: #222;
	background: #fff;
	border: 1px solid #ccc;
}

.schedule-table thead th {
	background: #f2f5f8;
	border-bottom: 2px solid #bbb;
	padding: 10px 8px;
	text-align: center;
	box-sizing: border-box;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.schedule-table tbody td {
	border-top: 1px solid #e2e6ea;
	padding: 10px 8px;
}

.schedule-table td.col-from,
.schedule-table td.col-to {
	text-align: right;
	word-break: keep-all;
	/* keep words intact in Hebrew */
	overflow-wrap: anywhere;
	/* allow breaking if absolutely needed */
}

.schedule-table tbody tr:nth-child(even) td {
	background: #fafbfc;
}

.schedule-table th.col-day,
.schedule-table th.col-date,
.schedule-table th.col-count,
.schedule-table td.col-day,
.schedule-table td.col-date,
.schedule-table td.col-count {
	text-align: center;
	white-space: nowrap;
}

/* Let colgroup define widths; just set reasonable min-widths to protect labels */
.schedule-table th.col-day,
.schedule-table td.col-day {
	min-width: 70px;
}

.schedule-table th.col-date,
.schedule-table td.col-date {
	min-width: 100px;
}

.schedule-table th.col-from,
.schedule-table td.col-from {
	min-width: 180px;
}

.schedule-table th.col-to,
.schedule-table td.col-to {
	min-width: 180px;
}

.schedule-table th.col-count,
.schedule-table td.col-count {
	min-width: 60px;
}

/* Improve header spacing vs. table */
.actions {
	margin: 16px 0;
}

@media print {
	.no-print {
		display: none !important;
	}

	.mainDiv {
		margin-top: 0;
	}

	.schedule-table {
		font-size: 12px;
		border: 1px solid #000;
	}

	.schedule-table thead th {
		background: #e9ecef !important;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}

	.schedule-table tbody td {
		border-top: 1px solid #000;
	}

	.schedule-table tr {
		break-inside: avoid;
		page-break-inside: avoid;
	}

	/* Optional: cleaner print */
	:root {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}

	@page {
		size: A4;
		margin: 12mm;
	}
}
</style>