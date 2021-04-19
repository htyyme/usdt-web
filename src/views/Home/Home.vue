<template>
    <div class="home">
        <pageHeader />
        <subNavs />
        <noticeBar />
    </div>
</template>

<script>
    import pageHeader from "./cpns/pageHeader";
    import subNavs from "./cpns/subNavs";
    import noticeBar from "./cpns/noticeBar";
    export default {
        name: "Home",
        components:{
            pageHeader,
            subNavs,
            noticeBar
        }
    }
</script>

<style scoped lang="scss">
    .home{

    }

</style>