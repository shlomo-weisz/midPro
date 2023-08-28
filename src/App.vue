<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'


const mishnayot = {
  zeroim : {
    berakhot : {
      mishnayot : 57,
      perekim : 9,
      perek1 : 5,
      perek2 : 8,
      perek3 : 6,
      perek4 : 7,
      perek5 : 5,
      perek6 : 8,
      perek7 : 5,
      perek8 : 8,
      perek9 : 5
  },
    peah : {
      mishnayot : 69,
      perekim : 8,
      perek1 : 6,
      perek2 : 8,
      perek3 : 8,
      perek4 : 11,
      perek5 : 8,
      perek6 : 11,
      perek7 : 8,
      perek8 : 9
    },
    demai : {
      mishnayot : 53,
      perekim : 7,
      perek1 : 4,
      perek2 : 5,
      perek3 : 6,
      perek4 : 7,
      perek5 : 11,
      perek6 : 12,
      perek7 : 8
    },
    
    kilayim : {
      mishnayot : 77,
      perekim : 9,
      perek1 : 9,
      perek2 : 11,
      perek3 : 7,
      perek4 : 9,
      perek5 : 8,
      perek6 : 9,
      perek7 : 8,
      perek8 : 6,
      perek9 : 10
        },
    sheviit : {
      mishnayot : 89,
      perekim : 10,
      perek1 : 8,
      perek2 : 10,
      perek3 : 10,
      perek4 : 10,
      perek5 : 9,
      perek6 : 6,
      perek7 : 7,
      perek8 : 11,
      perek9 : 9,
      perek10 : 9
    },
    terumot : {
      mishnayot : 101,
      perekim : 11,
      perek1 : 10,
      perek2 : 6,
      perek3 : 9,
      perek4 : 13,
      perek5 : 9,
      perek6 : 6,
      perek7 : 7,
      perek8 : 12,
      perek9 : 7,
      perek10 : 12,
      perek11 : 10

    },
    maasrot : {
      mishnayot : 40,
      perekim : 5,
      perek1 : 8,
      perek2 : 8,
      perek3 : 10,
      perek4 : 6,
      perek5 : 8,
      
    },
    maaserSheni : {
      mishnayot : 57,
      perekim : 5,
      perek1 : 7,
      perek2 : 10,
      perek3 : 13,
      perek4 : 12,
      perek5 : 15,
    },
    challah : {
      mishnayot : 38,
      perekim : 4,
      perek1 : 9,
      perek2 : 8,
      perek3 : 10,
      perek4 : 11,
    },
    orlah : {
      mishnayot : 35,
      perekim : 3,
      perek1 : 9,
      perek2 : 17,
      perek3 : 9,
    },
    bikurim : {
      mishnayot : 39,
      perekim : 4,
      perek1 : 11,
      perek2 : 11,
      perek3 : 12,
      perek4 : 5,
    },
    
   
  },
  moed : {
    shaboat : {
      mishnayot : 139,
      perekim : 24,
      perek1 : 11,
      perek2 : 7,
      perek3 : 6,
      perek4 : 2,
      perek5 : 4,
      perek6 : 10,
      perek7 : 4,
      perek8 : 7,
      perek9 : 7,
      perek10 : 6,
      perek11 : 6,
      perek12 : 6,
      perek13 : 7,
      perek14 : 4,
      perek15 : 3,
      perek16 : 8,
      perek17 : 8,
      perek18 : 3,
      perek19 : 6,
      perek20 : 5,
      perek21 : 3,
      perek22 : 6,
      perek23 : 5,
      perek24 : 5,
    },
    eruvin : {
      mishnayot : 96,
      perekim : 10,
      perek1 : 10,
      perek2 : 6,
      perek3 : 9,
      perek4 : 11,
      perek5 : 9,
      perek6 : 10,
      perek7 : 11,
      perek8 : 11,
      perek9 : 4,
      perek10 : 15,
    },
    pesachim : {
      mishnayot : 89,
      perekim : 10,
      perek1 : 7,
      perek2 : 8,
      perek3 : 8,
      perek4 : 9,
      perek5 : 10,
      perek6 : 6,
      perek7 : 13,
      perek8 : 8,
      perek9 : 11,
      perek10 : 9,
    },
    shekalim : {
      mishnayot : 52,
      perekim : 8,
      perek1 : 7,
      perek2 : 5,
      perek3 : 4,
      perek4 : 9,
      perek5 : 6,
      perek6 : 6,
      perek7 : 7,
      perek8 : 8
    },
    yoma : {
      mishnayot : 61,
      perekim : 8,
      perek1 : 8,
      perek2 : 7,
      perek3 : 11,
      perek4 : 6,
      perek5 : 7,
      perek6 : 8,
      perek7 : 5,
      perek8 : 9
    },
    sukka : {
      mishnayot : 53,
      perekim : 5,
      perek1 : 11,
      perek2 : 9,
      perek3 : 15,
      perek4 : 10,
      perek5 : 8,
    },
    beitza : {
      mishnayot : 42,
      perekim : 5,
      perek1 : 10,
      perek2 : 10,
      perek3 : 8,
      perek4 : 7,
      perek5 : 7
    },
    roshHashana : {
      mishnayot : 35,
      perekim : 4,
      perek1 : 9,
      perek2 : 9,
      perek3 : 8,
      perek4 : 9
    },
    taanit : {
      mishnayot : 34,
      perekim : 4,
      perek1 : 7,
      perek2 : 10,
      perek3 : 9,
      perek4 : 8
    },
    megilla : {
      mishnayot : 33,
      perekim : 4,
      perek1 : 11,
      perek2 : 6,
      perek3 : 6,
      perek4 : 10
    },
    moedKatan : {
      mishnayot : 24,
      perekim : 3,
      perek1 : 10,
      perek2 : 5,
      perek3 : 9
    },
    chagiga : {
      mishnayot : 23,
      perekim : 3,
      perek1 : 8,
      perek2 : 7,
      perek3 : 8
    },
  },
  nashim : {
    yevamot : {
      mishnayot : 128,
      perekim : 16,
      perek1 : 10,
      perek2 : 10,
      perek3 : 10,
      perek4 : 10,
      perek5 : 10,
      perek6 : 10,
      perek7 : 10,
      perek8 : 10,
      perek9 : 10,
      perek10 : 10,
      perek11 : 10,
      perek12 : 10,
      perek13 : 10,
      perek14 : 10,
      perek15 : 10,
      perek16 : 10,
    },
    ketubot : {
      mishnayot : 112,
      perekim : 13,
      perek1 : 10,
      perek2 : 10,
      perek3 : 10,
      perek4 : 10,
      perek5 : 10,
      perek6 : 10,
      perek7 : 10,
      perek8 : 10,
      perek9 : 10,
      perek10 : 10,
      perek11 : 10,
      perek12 : 10,
      perek13 : 10,
    },
    nedarim : {
      mishnayot : 90,
      perekim : 11,
      perek1 : 10,
      perek2 : 10,
      perek3 : 10,
      perek4 : 10,
      perek5 : 10,
      perek6 : 10,
      perek7 : 10,
      perek8 : 10,
      perek9 : 10,
      perek10 : 10,
      perek11 : 10,
    },
    nazir : {
      mishnayot : 66,
      perekim : 9,
      perek1 : 10,
      perek2 : 10,
      perek3 : 10,
      perek4 : 10,
      perek5 : 10,
      perek6 : 10,
      perek7 : 10,
      perek8 : 10,
      perek9 : 6,
    },
    sota : {
      mish
  },
  nezikin : {},
  kodashim : {},
  taharot : {}
}


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
