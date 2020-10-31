<template>
    <div>

        <div class="container p-3">
            <div class="form-group form-check mb-0 d-flex">
                <div class="justify-content-center align-self-center ml-3">
                    <input id="enabledCheckbox" v-model="formData.enabled" class="form-check-input" type="checkbox">
                    <label class="form-check-label" for="enabledCheckbox">Feature enabled</label>
                </div>
                <button :disabled="saveButtonDisabled" @click="save" class="btn btn-primary ml-auto">Save</button>
            </div>
        </div>

        <!--        <div class="card-header p-2 font-weight-bolder">Email content</div>-->
        <!--        <div class="container p-3">-->
        <!--            <ul class="nav nav-tabs">-->
        <!--                <li class="nav-item">-->
        <!--                    <a class="nav-link active" data-toggle="tab" href="#home">LV</a>-->
        <!--                </li>-->
        <!--                <li class="nav-item">-->
        <!--                    <a class="nav-link" data-toggle="tab" href="#menu1">EN</a>-->
        <!--                </li>-->
        <!--                <li class="nav-item">-->
        <!--                    <a class="nav-link" data-toggle="tab" href="#menu2">RU</a>-->
        <!--                </li>-->
        <!--            </ul>-->
        <!--            <div class="tab-content mt-3">-->
        <!--                <div id="home" class="tab-pane container active">-->
        <!--                    <div class="form-group">-->
        <!--                        <textarea id="comment" class="form-control" rows="5"></textarea>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--                <div id="menu1" class="tab-pane container fade">-->
        <!--                    <div class="form-group">-->
        <!--                        <textarea id="comment" class="form-control" rows="5"></textarea>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--                <div id="menu2" class="tab-pane container fade">-->
        <!--                    <div class="form-group">-->
        <!--                        <textarea id="comment" class="form-control" rows="5"></textarea>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="card-header p-2 font-weight-bolder">SMTP Server connection settings</div>
        <div class="container p-3">
            <div class="form-group">
                <label for="hostName">Host:</label>
                <input id="hostName" v-model="formData.host" class="form-control" name="uname" placeholder="Host">
            </div>
            <div class="form-group">
                <label for="uname">Username:</label>
                <input id="uname" v-model="formData.username" class="form-control" name="uname" placeholder="Username">
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input id="pwd" v-model="formData.password" class="form-control" name="pswd"
                       placeholder="Enter password">
            </div>
        </div>

        <!--        <div class="card-header p-2 font-weight-bolder">Test connection</div>-->
        <!--        <div class="container p-3">-->
        <!--            <button class="btn btn-success" type="submit">Connect</button>-->
        <!--            <div class="alert alert-success mt-2">Connection sucessful!</div>-->
        <!--            <div class="alert alert-danger mt-2">Connection failed!</div>-->
        <!--        </div>-->

    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: "FacebookConfigView",
    props: {},
    data() {
        return {
            formData: {
                enabled: false,
                host: '',
                username: '',
                password: '',
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
                console.log(response);
            });
        }
    },
    mounted() {
        axios.get('admin/email').then(response => {
            console.log(response);
        });
    },
    created() {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
}
</script>

<style scoped>

</style>