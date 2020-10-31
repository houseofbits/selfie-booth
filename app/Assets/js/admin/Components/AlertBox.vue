<template>
    <div :class="alertClass" class="alert alert-dismissible fade show">
        <button class="close" type="button" @click="close">&times;</button>
        <strong>
            {{ title }}!
        </strong>
        <ul v-if="isContentList">
            <li v-for="(message, index) in content">
                {{message}}
            </li>
        </ul>
        <span v-else>
            {{ content }}
        </span>
    </div>
</template>

<script>

const MESSAGE_TYPE = {
    success: {
        title: 'Success',
        class: 'alert-success'
    },
    warning: {
        title: 'Warning',
        class: 'alert-warning'
    },
    error: {
        title: 'Error',
        class: 'alert-danger'
    }
};

export default {
    name: "AlertBox",
    props: {
        content: {
            type: String | Array,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: 'success'
        }
    },
    computed: {
        isContentList() {
            return  this.content instanceof Array;
        },
        alertClass() {
            return MESSAGE_TYPE[this.type] ? MESSAGE_TYPE[this.type].class : '';
        },
        title() {
            return MESSAGE_TYPE[this.type] ? MESSAGE_TYPE[this.type].title : '';
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>

</style>