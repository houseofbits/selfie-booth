<template>
    <div>
        <form id="form" @submit.prevent="()=>{}">
            <div class="container p-3">

                <alert-box v-if="message.isActive" :content="message.content" :type="message.type"
                           @close="setMessage"></alert-box>

                <div class="form-group form-check mb-0 d-flex">
                    <div class="justify-content-center align-self-center">
                        <input id="enabledCheckbox" v-model="formData.enabled" class="form-check-input" name="enabled"
                               type="checkbox">
                        <label class="form-check-label" for="enabledCheckbox">Feature enabled</label>
                    </div>
                    <button :disabled="saveButtonDisabled" class="btn btn-primary ml-auto" @click="save(false)">Save
                    </button>
                </div>
            </div>
            <div class="card-header p-2 font-weight-bolder">SMTP Server connection settings</div>
            <div class="container p-3">
                <div class="row">
                    <div class="form-group col-12 col-md-8">
                        <label for="hostName">Host:</label>
                        <input id="hostName" v-model="formData.host" class="form-control" name="host"
                               placeholder="Host">
                    </div>
                    <div class="form-group col-12 col-md-4">
                        <label for="port">Port:</label>
                        <input id="port" v-model="formData.port" class="form-control" name="port"
                               placeholder="Enter port">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-12 col-md-6">
                        <label for="uname">Username:</label>
                        <input id="uname" v-model="formData.username" class="form-control" name="username"
                               placeholder="Username">
                    </div>
                    <div class="form-group col-12 col-md-6">
                        <label for="pwd">Password:</label>
                        <input id="pwd" v-model="formData.password" class="form-control" name="password"
                               placeholder="Enter password">
                    </div>
                </div>
                <div class="form-group">
                    <label for="senderAddress">Sender address (FROM):</label>
                    <input id="senderAddress" v-model="formData.senderAddress" class="form-control" name="senderAddress"
                           placeholder="Email address">
                </div>

                <button class="btn btn-success" @click="save(true)">Test connection</button>
            </div>
        </form>
        <form id="formTestMessage" @submit.prevent="()=>{}">
            <div class="card-header p-2 font-weight-bolder">Send</div>
            <div class="container p-3">

                <alert-box v-if="mailTestMessage.isActive" :content="mailTestMessage.content" :type="mailTestMessage.type"
                           @close="setMailTestMessage"></alert-box>

                <div class="mb-2">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="language" id="inlineRadio1" value="lat">
                        <label class="form-check-label" for="inlineRadio1">Lat</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="language" id="inlineRadio2" value="eng">
                        <label class="form-check-label" for="inlineRadio2">Eng</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="language" id="inlineRadio3" value="rus">
                        <label class="form-check-label" for="inlineRadio3">Rus</label>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="form-group col-12 col-md-6">
                        <label for="imagename">Attacment image name (located in uploads folder)</label>
                        <input id="imagename" class="form-control" name="imageName"
                               placeholder="Image file name">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-12 col-md-10">
                        <input class="form-control" name="receivingEmailAddress"
                               placeholder="Email address">
                    </div>
                    <div class="form-group col-12 col-md-2">
                        <button class="btn btn-success" @click="sendEmail">Send</button>
                    </div>
                </div>

            </div>
        </form>
    </div>
</template>

<script>

import AlertBox from './Components/AlertBox.vue';
import axios from 'axios';

export default {
    name: "EmailConfigView",
    props: {},
    components: {
        AlertBox
    },
    data() {
        return {
            formData: {
                enabled: false,
                host: '',
                username: '',
                password: '',
                port: '',
                senderAddress: ''
            },
            message: {
                isActive: false,
                type: '',
                content: ''
            },
            mailTestMessage: {
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
        save(testConnection) {
            const form = document.getElementById('form');
            const formData = new FormData(form);
            formData.append('testConnection', testConnection || false);
            axios.post('conf/email', formData).then(response => {
                if (response.status === 200) {
                    if (testConnection) {
                        this.setMessage('success', 'Connection to email server OK!');
                    } else {
                        this.setMessage('success', 'Email settings saved');
                    }
                    this.saveButtonDisabled = true;
                }
            })
                .catch(error => this.setMessage('error', error.response.data));
        },
        sendEmail(){
            const form = document.getElementById('formTestMessage');
            const formData = new FormData(form);
            axios.post('conf/email-test', formData).then(response => {
                if (response.status === 200) {
                    this.setMailTestMessage('success', 'Email settings saved');
                }
            })
                .catch(error => this.setMailTestMessage('error', error.response.data));
        },
        setMessage(type, message) {
            this.message.type = type || '';
            this.message.content = message || '';
            this.message.isActive = !!(type && message);
        },
        setMailTestMessage(type, message) {
            this.mailTestMessage.type = type || '';
            this.mailTestMessage.content = message || '';
            this.mailTestMessage.isActive = !!(type && message);
        }
    },
    mounted() {
        axios.get('conf/email').then(response => {
            if (response.status === 200) {
                this.formData.enabled = response.data.enabled;
                this.formData.host = response.data.host;
                this.formData.username = response.data.username;
                this.formData.password = response.data.password;
                this.formData.port = response.data.port;
                this.formData.senderAddress = response.data.senderAddress;
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