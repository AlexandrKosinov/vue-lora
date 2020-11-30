<template>
    <div name="NetMap">
        <h1>Lora network map</h1>
        <div v-if="map_ok">
            <TwoGisMap v-bind:getaways="listGetaway"/>
        </div>
    </div>
</template>

<script>
    import Node from "../components/Node"
    import TwoGisMap from "../components/TwoGisMap"
    export default {
        name: "NetMap",
        props: ['id'],
        components: {Node,TwoGisMap},
        data() {
            return {
                listGetaway: [],
                token: '',
                net_map: false,
            }
        },
        computed: {
            map_ok() {
                return this.net_map
            }
        },
        created() {
            this.loadListGetaway()
        },
        methods: {
            async loadListGetaway() {
                if(sessionStorage.getItem("auth_token")) {
                    this.token = 'Token ' + sessionStorage.getItem("auth_token");
                    this.listGetaway = await fetch(`${this.$store.getters.getServerUrl}/network/${this.$store.getters.getNetworkId}/`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `${this.token}`,
                        }
                    }).then(response => response.json());
                    this.net_map = true;
                }
            }
        }
    }
</script>

<style scoped>
    /*.table {*/
    /*background-color: #35a8e4;*/
    /*}*/
</style>