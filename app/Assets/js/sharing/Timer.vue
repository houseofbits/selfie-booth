<template>
    <h5 class="text-light mt-2 text-shadow-1">
        {{ lang('sharing.page-available') }} {{ timeLeft }}
    </h5>
</template>

<script>
export default {
    name: "Timer",
    inject: ['lang'],
    props: {
        timeLeft: {
            type: String,
        },
    },
}
</script>