<template>
    <div id="app">
        <div class="text">Hello, World</div>
        <div class="text">{{counter}}</div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        mounted() {
            document.addEventListener('mousewheel', (e: WheelEvent) => {
                if (e.deltaY < 0) {
                    this.counter++;
                } else {
                    this.counter--;
                }
            })
        },
        data: () => ({
            counter: 0
        })
    })
</script>

<style>
    body {
        margin: 0;
    }

    #app {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #4b8bf5;
    }

    #app * {
        user-select: none;
    }

    .text {
        font-size: 40px;
        font-weight: bold;
        font-family: serif;
        color: white;
    }
</style>
