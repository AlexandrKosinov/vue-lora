<template>
    <div>
        <div id="2GisMap" :style="styles"></div>
    </div>
</template>

<script>
    import gMap from '2gis-maps'
    export default {
        name: 'TwoGisMap',
        props: {
            getaways: {
                type: Array,
                default: []
            },
            center: {
                type: Array,
                default: [50.45466, 30.5238]
            },
            zoom: {
                type: Number,
                default: 13
            },
            styles: {
                type: Object,
                default: () => {
                    return {width: '100%', height: '800px'}
                }
            }
        },
        methods: {
            marker_click(node) {
                this.$router.push({name: 'Devices', params: {id: node.id, name: node.name}});
            },
            init() {
                // console.log(this.getaways);
                let map;
                gMap.then(() => {
                    map = DG.map('2GisMap', {
                        'center': this.center,
                        'zoom': this.zoom
                    });
                    this.getaways.forEach(getaway => {
                        DG.marker([getaway.latitude,getaway.longitude]).addTo(map).bindPopup(getaway.name);
                        getaway.nodes.forEach(node => {
                            DG.marker([node.latitude,node.longitude])
                                .addTo(map)
                                .bindLabel(node.name)
                                // .on('click', this.marker_click(node));
                        });
                    });
                })
            }
        },
        mounted() {
                this.init()
        }
    }
</script>