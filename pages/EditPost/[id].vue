<template>
    <div>
        <Navbar />
        <MainPageEdit :postId="postId"/>
    </div>
</template>

<script>
    export default {
       setup(){
        const route = useRoute();
        const postId = route.params.id; 

        return{
            postId
        }
       }
    }
</script>


