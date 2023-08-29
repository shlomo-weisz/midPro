

<template>
  <form action="">
    <div class="form-line">
      <label for="name">שם:</label>
      <input type="text" id="name" v-model="name">
    </div>
    <div class="form-line">
      <label for="date">תאריך התחלה:</label>
      <input type="date" id="date" v-model="date">
    </div>
    <div class="form-line">
      <label for="date">ימי לימוד:</label>
    </div>
    <div class="form-line">
      <label for="sunday">א</label>
      <input type="checkbox" id="sunday" value="א" v-model="days[0]">
      <input type="checkbox" id="monday" value="ב" v-model="days[1]">ב
      <input type="checkbox" id="tuesday" value="ג" v-model="days[2]">ג
      <input type="checkbox" id="wednesday" value="ד" v-model="days[3]">ד
      <input type="checkbox" id="thursday" value="ה" v-model="days[4]">ה
      <input type="checkbox" id="friday" value="ו" v-model="days[5]">ו
      <input type="checkbox" id="saturday" value="ש" v-model="days[6]">ש
    </div>
    <div class="form-line">
      <div>
        <VueMultiselect v-model="selected" :options="options"   :multiple="true"
>
        </VueMultiselect>
      </div>
      <!-- <select name="masechet" id="masechet">
        <option value="ברכות">ברכות</option>
        <option value="פאה">פאה</option>
        <option value="דמאי">דמאי</option>
        <option value="כלאים">כלאים</option>
        <option value="שביעית">שביעית</option>
        <option value="תרומות">תרומות</option>
        <option value="מעשרות">מעשרות</option>
        <option value="מעשר שני">מעשר שני</option>
        <option value="חלה">חלה</option>
        <option value="ערלה">ערלה</option>
        <option value="ביכורים">ביכורים</option>
        <option value="שבת">שבת</option>
        <option value="עירובין">עירובין</option>
        <option value="פסחים">פסחים</option>
        <option value="שקלים">שקלים</option>
        <option value="יומא">יומא</option>
        <option value="סוכה">סוכה</option>
        <option value="ביצה">ביצה</option>
        <option value="ראש השנה">ראש השנה</option>
        <option value="תענית">תענית</option>
        <option value="מגילה">מגילה</option>
        <option value="מועד קטן">מועד קטן</option>
        <option value="חגיגה">חגיגה</option>
        <option value="יבמות">יבמות</option>
        <option value="כתובות">כתובות</option>
        <option value="נדרים">נדרים</option>
        <option value="נזיר">נזיר</option>
        <option value="סוטה">סוטה</option>
        <option value="גיטין">גיטין</option>
        <option value="קידושין">קידושין</option>
        <option value="בבא קמא">בבא קמא</option>
        <option value="בבא מציעא">בבא מציעא</option>
        <option value="בבא בתרא">בבא בתרא</option>
        <option value="סנהדרין">סנהדרין</option>
        <option value="מכות">מכות</option>
        <option value="שבועות">שבועות</option>
        <option value="עבודה זרה">עבודה זרה</option>
        <option value="הוריות">הוריות</option>
        <option value="זבחים">זבחים</option>
        <option value="מנחות">מנחות</option>
        <option value="חולין">חולין</option>
        <option value="בכורות">בכורות</option>
        <option value="ערכין">ערכין</option>
        <option value="תמורה">תמורה</option>
        <option value="כריתות">כריתות</option>
        <option value="מעילה">מעילה</option>
        <option value="תמיד">תמיד</option>
        <option value="מדות">מדות</option>
        <option value="קינים">קינים</option>
        <option value="טהרות">טהרות</option>
        <option value="מקואות">מקואות</option>
        <option value="נגעים">נגעים</option>
        <option value="פרה">פרה</option>
        <option value="טהרות">טהרות</option>
        <option value="מקואות">מקואות</option>
        <option value="נגעים">נגעים</option>
        <option value="פרה">פרה</option>
        <option value="זבים">זבים</option>
        <option value="טבול יום">טבול יום</option>
        <option value="ידים">ידים</option>
        <option value="עוקצין">עוקצין</option>
        <option value="נידה">נידה</option>

      </select> -->
    </div>
    <!-- <div>
      {{ name }}
      {{ date }}
      {{ days }}
    </div> -->



  </form>
  {{ selected }}
</template>



<script>
import VueMultiselect from 'vue-multiselect'
export default {
  components: { VueMultiselect },
  name: 'App',
  data() {
    return {
      name: '',
      date: '',
      days: [false, false, false, false, false, false, false],
      selected: null,
      options: []

    }
  }
}




</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
