<template>
<div>
<h1>Scores</h1>

<div v-show="loading">...</div>
<pre v-if="cats.length">
    <ul class="cats">
        <li v-for="(cat, index) in cats" :key="index">
            <h2>{{cat.id}}</h2>
            <img :src="cat.catUrl" />
            <h2>{{cat.rating}}%</h2>
        </li>
    </ul>
</pre>
<div v-else>Pas de chat</div>
</div>
</template>
  
  <script>
  export default {
      name: 'Cat',
      data () {
          return {
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
        displayCat () {
            this.loading = true
            fetch('http://localhost:59486/cats', {
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
        this.displayCat()
  }
  }
  </script>
  

  <style lang="scss">
    .cats {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        padding: 0;
        margin: 0;

        li {
            text-align: center;
            list-style: none;
            flex: 1 1 300px;

            img {

                display: block;
                width: 100%;
            }
        }
    }
  </style>