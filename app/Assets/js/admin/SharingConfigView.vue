<template>
    <form id="form" @submit.prevent="()=>{}">
        <div class="container p-3">

            <alert-box v-if="message.isActive" :content="message.content" :type="message.type"
                       @close="setMessage"></alert-box>

            <div class="mb-0 row">
                <div class="col-6">
                    <div class="form-check">
                        <input id="downloadEnabled" v-model="formData.downloadEnabled" class="form-check-input"
                               name="downloadEnabled" type="checkbox">
                        <label class="form-check-label" for="downloadEnabled">
                            Download link enabled
                        </label>
                    </div>
                </div>
                <div class="col-6">
                    <button :disabled="saveButtonDisabled" class="btn btn-primary float-right" @click="save">Save
                    </button>
                </div>
            </div>
        </div>
        <div class="card-header p-2 font-weight-bolder">Public application</div>
        <div class="container p-3">

            <div class="form-group">
                <label for="publicAppUrl">Public Url of sharing service:</label>
                <input id="publicAppUrl" v-model="formData.publicAppUrl" class="form-control" name="publicAppUrl">
            </div>

            <div class="row">
                <div class="form-group col-12 col-md-6">
                    <label for="linkTTL">Shareable link TTL (minutes):</label>
                    <input id="linkTTL" v-model="formData.linkTTL" class="form-control" name="linkTTL">
                </div>
                <div class="form-group col-12 col-md-6">

                </div>
            </div>

        </div>
    </form>
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
                publicAppUrl: '',
                linkTTL: 0,
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
            const form = document.getElementById('form');
            const formData = new FormData(form);
            axios.post('conf/sharing', formData).then(response => {
                if (response.status === 200) {
                    this.setMessage('success', 'Sharing settings saved');
                    this.saveButtonDisabled = true;
                }
            })
                .catch(error => this.setMessage('error', error.response.data));
        },
        setMessage(type, message) {
            this.message.type = type || '';
            this.message.content = message || '';
            this.message.isActive = !!(type && message);
        },
    },
    mounted() {
        axios.get('conf/sharing').then(response => {
            if (response.status === 200) {
                this.formData.downloadEnabled = response.data.downloadEnabled;
                this.formData.publicAppUrl = response.data.publicAppUrl;
                this.formData.linkTTL = response.data.shareableLinkTTL;
            }
        });
    },
    created() {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
}
</script>

<style scoped>

</style>