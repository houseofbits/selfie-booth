<template>
    <div>
        <!--        <div class="container p-3">-->


        <!--            <div class="form-group form-check mb-0 d-flex">-->
        <!--                <button :disabled="saveButtonDisabled" class="btn btn-primary ml-auto" @click="save">Save</button>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="card-header p-2 font-weight-bolder">Translations</div>
        <div class="container p-3">

            <alert-box v-if="message.isActive" :content="message.content" :type="message.type"
                       @close="setMessage"></alert-box>

            <table class="table table-sm">
                <thead class="thead-light">
                <tr>
                    <th scope="col">Key</th>
                    <th scope="col">Default text (Eng)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(obj, index) in translationsList" :key="index">
                    <td><a data-target="#exampleModal" data-toggle="modal" href=""
                           @click="loadTranslation(obj.key)">{{ obj.key }}</a></td>
                    <td>{{ obj.defaultText }}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <div id="exampleModal" aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="exampleModalLabel" class="modal-title">Translate "{{ formData.key }}"</h5>
                        <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="formTranslate" @submit.prevent="()=>{}">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#home">LV</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#menu1">EN</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#menu2">RU</a>
                                </li>
                            </ul>
                            <div class="tab-content mt-3">
                                <div id="home" class="tab-pane container active p-0">
                                    <div class="form-group m-0">
                                        <textarea v-model="formData.textLV" name="textLV" class="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                                <div id="menu1" class="tab-pane container fade p-0">
                                    <div class="form-group m-0">
                                        <textarea v-model="formData.textEN" name="textEN" class="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                                <div id="menu2" class="tab-pane container fade p-0">
                                    <div class="form-group m-0">
                                        <textarea v-model="formData.textRU" name="textRU" class="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button>
                        <button class="btn btn-primary" data-dismiss="modal" type="button" @click="save">Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import AlertBox from './Components/AlertBox.vue';
import axios from 'axios';

export default {
    name: "TranslationsView",
    props: {},
    components: {
        AlertBox
    },
    data() {
        return {
            translationsList: [],
            formData: {
                textLV: '',
                textEN: '',
                textRU: '',
                key: '',
            },
            message: {
                isActive: false,
                type: '',
                content: ''
            },
            saveButtonDisabled: true,
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
            const form = document.getElementById('formTranslate');
            const formData = new FormData(form);
            formData.append('key', this.formData.key);
            axios.post('conf/translation-save', formData).then(response => {
                if (response.status === 200) {
                    this.setMessage('success', 'Translation ' + this.formData.key + ' settings');
                    this.formData.key = null;
                    this.loadList();
                }
            })
                .catch(error => this.setMessage('error', error.response.data));
        },
        setMessage(type, message) {
            this.message.type = type || '';
            this.message.content = message || '';
            this.message.isActive = !!(type && message);
        },
        loadTranslation(key) {
            this.setMessage();
            axios.get('conf/translation/' + key).then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.formData.key = key;
                    this.formData.textLV = response.data.translations[0];
                    this.formData.textEN = response.data.translations[1];
                    this.formData.textRU = response.data.translations[2];
                }
            });
        },
        loadList() {
            axios.get('conf/translations').then(response => {
                if (response.status === 200) {
                    this.translationsList = response.data;
                }
            });
        }
    },
    mounted() {
        this.loadList();
    },
    created() {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
}
</script>

<style scoped>

</style>