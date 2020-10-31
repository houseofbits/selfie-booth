<template>
    <div>
        <div class="container p-3">

            <alert-box v-if="message.isActive" :content="message.content" :type="message.type"
                       @close="setMessage"></alert-box>

            <div class="form-group form-check mb-0 d-flex">
                <div class="justify-content-center align-self-center">
                    <input id="enabledCheckbox" v-model="formData.enabled" class="form-check-input" type="checkbox">
                    <label class="form-check-label" for="enabledCheckbox">Feature enabled</label>
                </div>
                <button :disabled="saveButtonDisabled" @click="save" class="btn btn-primary ml-auto">Save</button>
            </div>
        </div>

    </div>
</template>

<script>

import AlertBox from './Components/AlertBox.vue';
import axios from 'axios';

export default {
    name: "ImagesConfigView",
    props: {},
    components: {
        AlertBox
    },
    data() {
        return {
            formData: {
                enabled: false,
            },
            message: {
                isActive: false,
                type: '',
                content: ''
            },
            saveButtonDisabled: true
        };
    },
    watch: {
        formData: {
            deep: true,
            handler() {
                this.saveButtonDisabled = false;
            }
        }
    },
    methods: {
        save() {
            axios.post('admin/email', this.formData).then(response => {

            });
        },
        setMessage(type, message) {
            this.message.type = type || '';
            this.message.content = message || '';
            this.message.isActive = !!(type && message);
        },
    },
    mounted() {
        axios.get('admin/email').then(response => {

        });
    },
    created() {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
}
</script>

<style scoped>

</style>