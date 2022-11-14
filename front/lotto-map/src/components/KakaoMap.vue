<template>
    <div class="wrap">
        <div class="control-panels">
            <div class="left-div">
                <v-select
                    ref="roundSelect"
                    class="roundSelect"
                    solo
                    dense
                    outlined
                    v-model="selectedRound" 
                    :items="roundItems"
                    @input="itemChanged"
                ></v-select>
                <v-chip
                    :key="componentKey"
                    class="placeChips"
                    :outlined="!placeVisiblity[0]" 
                    color="primary"
                    @click="placeVisibilityClick(1)"
                    >
                    1등
                </v-chip>
                <v-chip
                    :key="componentKey"
                    class="placeChips"
                    color="green"
                    :outlined="!placeVisiblity[1]" 
                    @click="placeVisibilityClick(2)"
                    >
                    2등
                </v-chip>
            </div>
           <div class="right-div">
                <v-btn
                    class="crosshairs"
                    icon
                    outlined 
                    plain
                    @click="crosshairClick"
                >
                <v-icon >mdi-crosshairs</v-icon>
                </v-btn>
           </div>
        </div>
        <div id="map" ></div>
    </div>
</template>


<script>
import _ from 'lodash';
import  {lottoRounds}  from '../resources/temp/lotto';
export default {
    data(){
        return {
            map:null,
            lottoStore:null,
            roundItems:[1041,1040],
            selectedRound:1041,
            markers:[],
            placeVisiblity:[true,true],
            componentKey:1
        };
    },  
    mounted(){
        this.roundItems =  _(lottoRounds).map(r => r.round).value()
        this.selectedRound = _(this.roundItems).max();
        this.lottoStore = _(lottoRounds).filter(r => r.round === this.selectedRound).value()[0].store;
        if(!window.kakao || !window.kakao.maps){
            const kakaoScript = document.createElement('script');
            kakaoScript.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8f605e11f443f0ddaea51bfb12ec4d08&libraries=services,clusterer,drawing'
            /*global kakao*/
            kakaoScript.addEventListener("load",()=>{
                kakao.maps.load(this.initMap);
            });
            
            document.head.appendChild(kakaoScript);
        }
    },   
    methods:{
        itemChanged(params){
            this.lottoStore = _(lottoRounds).filter(r => r.round === params).value()[0].store;
            this.markMap(false);
        },  
        initMap(){
            try {
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new kakao.maps.LatLng(37.56682, 126.97865), 
                    level: 5, 
                    mapTypeId : kakao.maps.MapTypeId.ROADMAP 
                }; 

                this.map = new kakao.maps.Map(mapContainer, mapOption);
                this.markMap();
            } catch (error) {
                window.alert(error);
            }
           
        },
        crosshairClick(){
            this.markMap(true);
        },  
        placeVisibilityClick(place){
            this.placeVisiblity[place-1] = !this.placeVisiblity[place-1];
            this.componentKey += 1;
            this.markMap(false);
        },  
        markMap(bSetCenter = true){
            _(this.markers).forEach(m => m.setMap(null));
            this.markers = [];

            this.markLottoMap();

            if (navigator.geolocation) {
                console.log(navigator.geolocation)    
                navigator.geolocation.getCurrentPosition( position => {
                    const locPosition = new kakao.maps.LatLng(position.coords.latitude,  position.coords.longitude); 
                    const imageSrc= "https://best546.synology.me:8080/img/icons/mark-red.png"
                    const imageSize = new kakao.maps.Size(32, 32);
                    const imageOption = {offset: new kakao.maps.Point(16, 32)};
                    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                    
                    const marker = new kakao.maps.Marker({
                        map: this.map,
                        image: markerImage,
                        position:locPosition
                    });
                    this.markers.push(marker);
                    if(bSetCenter){
                        this.map.setCenter(locPosition);
                    }
                },error =>{
                    console.error(error);
                });
                
            } else { 
                window.alert('위치수신 불가');
                const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
                this.map.setCenter(locPosition);     
            }
        },
        markLottoMap(){
            _(this.lottoStore).forEach(store =>{
                

                let imageSrc ='';
                if(store.place == 1 ){
                    if(!this.placeVisiblity[0]){
                        return;
                    }
                    imageSrc= "https://best546.synology.me:8080/img/icons/1st-64x64.png"
                }else if(store.place==2){
                    if(!this.placeVisiblity[1]){
                        return;
                    }
                    imageSrc= "https://best546.synology.me:8080/img/icons/2nd-64x64.png"
                }
                const imageSize = new kakao.maps.Size(32, 32);
                const imageOption = {offset: new kakao.maps.Point(16, 32)};
                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

                const marker = new kakao.maps.Marker({
                    map: this.map,
                    image: markerImage,
                    position: new kakao.maps.LatLng(store.lat, store.lng)
                })
                this.markers.push(marker);
                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div class="infoWindow">
                            <div class="info-title">${store.storeName}</div>
                            <div class="info-addr">${store.storeAddress}</div>
                        </div>`,
                    removable: true
                })
                kakao.maps.event.addListener(marker, 'click', ()=> infowindow.open(this.map,marker));
                
            });
        },
    }
}
</script>


<style scoped>
.wrap{
    display: flex;
}
.roundSelect{
    width:120px;
    margin: 10px;
    flex-grow: 0;
}
.control-panels{
    position: absolute;
    z-index: 99999999;
    display: flex;
    
}
.right-div{
    align-items: flex-end;
    margin-left: auto;
}
.left-div{
    width: calc(100vW - 50px);
    display: flex;
    flex-flow: row;
}

#map {
    position: absolute;
    width: 100vw;
    height: 100vh;
}

::v-deep .infoWindow{
    padding-left: 5px;
    padding-right: 25px;
    height: 100%;
}

.crosshairs{
    margin-top : 12px
}
::v-deep .placeChips{
    margin-top : 15px;
    margin-right : 5px;
}
</style>
