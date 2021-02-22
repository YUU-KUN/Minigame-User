<template>
<div>
    <form @submit="joinGame">
        <input type="text" class="form-control" placeholder="Input Game Code" v-model="code">
        <button type="submit" class="btn btn-primary">
            <b-icon icon="play-fill" font-scale="2" aria-hidden="true"></b-icon>
            Play Game
        </button>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            code: ''
        }
    },
    methods: {
        joinGame() {
            this.axios.post('join/game', {
                code: this.code
            })
        }
    }

}
</script>

<style>

</style>