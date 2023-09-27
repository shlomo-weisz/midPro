<template>
  <div class="main">
  <formUser v-show="!showTable" @creatNewTable="creatNewTable"></formUser>
  <button v-show="showTable" @click="showTable=!showTable">לעריכת המסלול</button>
  <newTable v-if="showTable" :masechtot="selected" :date="date" :name="name" :days="days" :limit="limit"
    :duration="duration"></newTable>
  </div>
</template>



<script>
import newTable from './components/newTable.vue'
import formUser from './components/formUser.vue'
export default {
  components: { newTable, formUser},  //: defineAsyncComponent(() => import('./components/newTable.vue')) },
  name: 'App',
  data() {
    return {
      showTable: false,
      limit: 0,
      duration: "",
      name: '',
      date: '',
      days: [false, false, false, false, false, false, false],
      selected: null,

    }
  },
  
  methods: {
  
    creatNewTable(arr) {
      this.name = arr[0];
      this.date = arr[1];
      this.days = arr[2];
      this.limit = arr[3];
      this.duration = arr[4];
      this.selected = arr[5];
      this.showTable = true
    }
    
  }
}




</script>

<style scoped>

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

</style>