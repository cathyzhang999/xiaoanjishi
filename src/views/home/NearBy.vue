
<template>
    <div class="nearby">        
        <h3 class="nearby__title">附近店铺</h3>        
        <router-link 
            :to="`/shop/:${item._id}` "            
            v-for="item in NearbyList" :key="item._id" >
            <ShopInfo  :item="item"/>
        </router-link>
    </div>
</template>

<script>
import { ref } from 'vue';
import { get } from "../../utils/request.js";
import ShopInfo from '../../components/ShopInfo'

const handleNearbyEffect=()=>{
    const NearbyList=ref([]);
    const getNearbyList=async()=>{
        const result=await get('/api/shop/hot-list');
        // console.log(result)
        if(result?.errno===0&&result?.data?.length){
            NearbyList.value=result.data
        }        
    }
    return{NearbyList,getNearbyList}
}

export default {
    name:'NearBy',
    // components:{ShopInfo},
    components: { ShopInfo },
    setup(){
        const {NearbyList,getNearbyList}=handleNearbyEffect()
        getNearbyList()
        return{NearbyList}
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.nearby {
    // height: 2.3rem;
    overflow: hidden;
    margin-top: 0.16rem;
    &__title {
        font-size: .18rem;
        margin-bottom: 0.14rem;
    }
    a{
        text-decoration: none;
    }
    a:link{
       color: #333; 
    }
    a:visited{
     color: #333; 
}   
    
}

</style>
