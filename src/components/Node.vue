<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th scope="col">Node name</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Active</th>
            <th scope="col">Charge</th>
            <th scope="col">Devices</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="node in nodes" :key="node.id">
            <td>{{node.name}}</td>
            <td>{{node.latitude}}</td>
            <td>{{node.longitude}}</td>
            <td>{{node.active}}</td>
            <td>{{node.charge}}</td>
            <td><a href="#" @click="goToDevices(node.id, node.name)" >devices</a></td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "Node",
        props: ["nodes"],
        methods: {
            goToDevices(id, name) {
                this.$router.push({name:'Devices', params:{id:id, name: name}})
            }
        }
    }
</script>

<style scoped>

</style>