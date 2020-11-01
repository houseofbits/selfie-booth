<template>
    <div>
        <div class="container p-3">

            <alert-box v-if="message.isActive" :content="message.content" :type="message.type"
                       @close="setMessage"></alert-box>

            <div class="mb-0 row">
                <div class="col-6">
                    <div class="form-check">
                        <input id="downloadEnabled" v-model="formData.downloadEnabled" class="form-check-input" type="checkbox" name="downloadEnabled">
                        <label class="form-check-label" for="downloadEnabled">
                            Download link enabled
                        </label>
                    </div>
                    <div class="form-check">
                        <input id="shareToFbEnabled" v-model="formData.shareToFbEnabled" class="form-check-input" type="checkbox" name="shareToFbEnabled">
                        <label class="form-check-label" for="shareToFbEnabled">
                            Share to Facebook enabled
                        </label>
                    </div>
                </div>
                <div class="col-6">
                    <button :disabled="saveButtonDisabled" class="btn btn-primary float-right" @click="save">Save</button>
                </div>
            </div>
        </div>
        <div class="card-header p-2 font-weight-bolder">Public application</div>
        <div class="container p-3">
            <div class="form-group">
                <label for="publicAppUrl">Url:</label>
                <input id="publicAppUrl" v-model="formData.publicAppUrl" class="form-control" name="publicAppUrl">
            </div>
        </div>
    </div>
</template>

<script>

import AlertBox from './Components/AlertBox.vue';
import axios from 'axios';

export default {
    name: "SharingConfigView",
    props: {},
    components: {
        AlertBox
    },
    data() {
        return {
            formData: {
                downloadEnabled: false,
                shareToFbEnabled: false,
                publicAppUrl: '',
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