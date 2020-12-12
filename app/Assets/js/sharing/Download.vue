<template>
    <div>
        <a href="/download" type="button" class="btn btn-success"><i class="fas fa-cloud-download-alt"></i> {{ lang('sharing.buttons.download') }}</a>
    </div>
</template>

<script>
export default {
    name: "Download",
    inject: ['lang'],
}
</script>