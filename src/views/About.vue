<template>
  <div class="about">
    <h1>Owners</h1>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Passwd</th>
        <th scope="col">e-mail</th>
        <th scope="col">Nets</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="owner in listOwner" :key="owner.id">
        <th scope="row">{{owner.id}}</th>
        <td>{{owner.name}}</td>
        <td>{{owner.password}}</td>
        <td>{{owner.email}}</td>
        <td><a href="#" @click="goToNets(owner.id, owner.name)" >nets</a></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>


<script>
    export default {
        name: 'About',
        data() {
            return {
                listOwner: [],
            }
        },
        components: {},
        created() {
            this.loadListOwner()
        },
        methods: {
            async loadListOwner() {
                this.listOwner = await fetch(
                    `${this.$store.getters.getServerUrl}/`
                ).then(response => response.json())
                console.log(this.listOwner)
            },
            goToNets(id, name) {
              this.$router.push({name:'Nets', params:{id:id, name: name}})
            }
        }
    }
</script>