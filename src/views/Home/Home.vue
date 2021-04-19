<template>
    <div class="home">
        <pageHeader />
        <subNavs />
    </div>
</template>

<script>
    import pageHeader from "./cpns/pageHeader";
    import subNavs from "./cpns/subNavs";
    export default {
        name: "Home",
        components:{
            pageHeader,
            subNavs
        }
    }
</script>

<style scoped lang="scss">
    .home{

    }

</style>