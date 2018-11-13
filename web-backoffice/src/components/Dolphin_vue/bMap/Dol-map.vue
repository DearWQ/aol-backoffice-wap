<template>
  <div :id="`dolMap_${id}`" class="dol-map" :style="{height:height}"></div>
</template>

<style lang="scss">
  .dol-map {
    height: 100%;
    min-height: 500px;
    width: 100%;
  }
</style>

<script>
  import BMap from 'BMap';
  export default {
    name: 'dol-map',
    props: {
      type: {type: String, default: 'point'},               //地图类型，point | pick | trace
      defaultPoint: {default: '上海'},         //初始位置
      defaultSize: {type: Number, default: 13},            //初始比例

      points: {type: Array, default: () => []},             //初始比例
      height: {type: String},             //初始比例
    },
    data(){
      return {
        id: Math.round(Math.random() * Math.pow(10, 6)),
        search: '',
        map: null,
      };
    },
    watch: {
      points(){
        this.overlay();
      },
      defaultPoint(){
        this.moveCenter();
      },
    },
    computed: {},
    methods: {
      init(){
        this.map = new BMap.Map(`dolMap_${this.id}`);
        let defaultPoint;
        if (typeof this.defaultPoint === 'string') {
          defaultPoint = this.defaultPoint;
        } else {
          defaultPoint = this.getBMapPoint(this.defaultPoint);
        }
        this.map.centerAndZoom(defaultPoint, this.defaultSize);
        this.map.addControl(new BMap.NavigationControl());
        this.map.enableScrollWheelZoom(true);
        this.map.addControl(new BMap.ScaleControl());
      },
      show(){
        this.showFlag = true;
      },
      hide(){
        this.showFlag = false;
      },

      overlay(){
        this.map.clearOverlays();
        switch (this.type) {
          case 'point':
            this.markPoint();
            break;
          case 'trace':
            this.trace();
            break;
        }
      },
      pick(point){
        this.$emit('pick', point)
      },

      markPoint(){
        this.points.forEach(p => {
          this.markSinglePoint(p);
        });
      },
      markSinglePoint(data){
        let point = this.getBMapPoint(data);
        let marker = new BMap.Marker(point);        // 创建标注
        marker.addEventListener("click", () => {
          this.$emit('marker', data);
        });
        this.map.addOverlay(marker);                     // 将标注添加到地图中
      },
      trace(){
        if(this.points.length > 0){
          let pointList = [];
          this.points.forEach(p => {
            pointList.push(this.getBMapPoint(p));
          });
          let polyLine = new BMap.Polyline(pointList,
            {strokeColor: "red", strokeWeight: 6, strokeOpacity: 0.5}
          );
          this.map.addOverlay(polyLine);

          this.markSinglePoint(this.points[0]);
          this.markSinglePoint(this.points[this.points.length - 1]);
        }
      },
      moveCenter(){
        if (typeof this.defaultPoint === 'string') {
          this.map.panTo(this.defaultPoint);
        } else {
          this.map.panTo(this.getBMapPoint(this.defaultPoint));
        }
      },
      getBMapPoint(point){
        return new BMap.Point(point.location[0], point.location[1])
      }
    },
    created(){
    },
    mounted(){
      this.init();
      this.overlay();
    },
  }
</script>
