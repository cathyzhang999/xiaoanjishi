<template>
    <div class="toast">{{message}}</div>
</template>

<script>
import {reactive} from "vue"
export default {
    props:['message']
}
export const useToastEffect=()=>{
    const toastData=reactive({
        isShowToast:false,
        toastMessage:"",
    });
    const showToast=(info)=>{
              toastData.toastMessage=info;              
              toastData.isShowToast=true;
              setTimeout(() => {
                 toastData.isShowToast=false;
                 toastData.toastMessage="";
               }, 3000);  
        } 
    return{toastData,showToast}
}
</script>

<style lang='scss' scoped>
.toast{
    position: fixed;
    top:50%;
    left:50%;
    padding: .1rem;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.3%);
    border-radius:.2rem;
    font-size:.2rem

}
</style>