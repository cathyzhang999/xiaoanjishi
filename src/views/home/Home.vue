<template>
  <div class="wrapper">
    <StaticPart />
    <NearBy /> 
 </div>
 <Docker :currentIndex="0" />
</template>

<script>
import StaticPart from './StaticPart'
import NearBy from './NearBy'
import Docker from '../../components/Docker'

export default {
  name: 'Home',
  components: {
    StaticPart,NearBy,Docker
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow-y: auto;
    // width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0.5rem;
    margin-left: 0.18rem;
    margin-right: 0.18rem;
}
</style>
