<template>
    <div name="Nets">
        <h1>{{this.name}} lora networks</h1>
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Nodes</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="net in listNet" :key="net.id">
                <th scope="row">{{net.id}}</th>
                <td>{{net.name}}</td>
                <td><a href="#" @click="goToGetaways(net.id,net.name)" >nodes</a></td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        name: "Nets",
        props: ['id','name'],
        data() {
            return {
                listNet: [],
            }
        },
        created() {
            this.loadListNet()
        },
        methods: {
            async loadListNet() {
                this.listNet = await fetch(`${this.$store.getters.getServerUrl}/owner/${this.id}`)
                    .then(response => response.json())
                console.log(this.id)
                console.log(this.listNet)
            },
            goToGetaways(id, name) {
                this.$router.push({name: 'Getaways', params: {id: id, name: name}})
            }
        }
    }
</script>