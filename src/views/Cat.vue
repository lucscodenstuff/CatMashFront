<template>
<div>
<h1>Welcome to Cat Mash !</h1>

<div v-show="loading">...</div>
<pre v-if="cats.length">
    <ul class="cats">
        <li v-for="(cat, index) in cats" :key="index" @click="choisiCeChat(cat)">
            <h2>{{cat.id}}</h2>
            <img :src="cat.catUrl" />
        </li>
    </ul>
</pre>
<div v-else>Pas de chat</div>

<button @click="$router.push('scores')">Scores Board</button>
</div>
</template>
  
  <script>
  export default {
      name: 'Cat',
      data () {
          return {
              catName: 'felix',
              loading: false,
              cats: []
          }
      },
      computed: {
          catId () {
              return this.$route.params.id
          }
      },
      methods: {
        choisiCeChat (cat) {
            let indexWinner = this.cats.findIndex(c => c.id === cat.id)
            let indexLoser = this.cats.findIndex(c => c.id !== cat.id)
            // fetch('http://localhost:59486/cats', {
            fetch('#{urlApi}#/cats', {
                mode: 'cors',
                headers: { 'Content-Type':'application/json' },
                method : 'PATCH',
                body : JSON.stringify({
                    winner : this.cats[indexWinner],
                    loser : this.cats[indexLoser]
                })
            })
            .then( () => this.changeCat() )
        },
        changeCat () {
            this.loading = true
            // fetch('http://localhost:59486/cats/random', {
            fetch('#{urlApi}#/cats/random', {
                        mode: 'cors',
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.cats = res
                    })
                    .catch(() => {
                         this.cats = []
                    })
                    .finally(() => {
                        this.loading = false
                    })
                }
        
      },
      mounted () {
        this.changeCat()
  }
  }
  </script>
  

  <style lang="scss">
    .cats {
        display: flex;
        justify-content: space-around;
        align-items: center;

        padding: 0;
        margin: 0;

        li {
            text-align: center;
            list-style: none;

            img {

                display: block;
                max-width:800px;
                max-height:800px;
                width: auto;
                height: auto;
            }
        }
    }
  </style>