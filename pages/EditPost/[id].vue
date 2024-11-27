<template>
    <div>
        <Navbar />
        <MainPageEdit :postId="postId" class="mb-20"/>
        <Footer class="fixed bottom-0 w-full"/>
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


