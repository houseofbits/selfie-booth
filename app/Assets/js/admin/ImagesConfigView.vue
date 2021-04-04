<template>
    <div>
        <div class="container-fluid p-3">
            <alert-box v-if="message.isActive" :content="message.content" :type="message.type"
                       @close="setMessage"></alert-box>
            <div class="row text-center">
                <div class="col-sm-3 mb-2 p-2" v-for="(image, index) in images" :key="image.id">
                    <div class="card">
                        <img :alt="image.id" :src="'/api/image/'+image.id" class="card-img-top">
                        <div class="card-body p-1">
                            <div class="id-text">{{ image.id }}</div>
                            <div class="date-text">
                                {{ image.dateCreated }}
                            </div>
                        </div>
                        <div class="delete-button" @click="deleteImage(image.id)"><i class="fas fa-trash-alt"></i></div>
                    </div>
                </div>
            </div>
            <div v-if="loading" class="overlay w-100 h-100"></div>
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
            images: [],
            message: {
                isActive: false,
                type: '',
                content: ''
            },
            loading: false
        };
    },
    methods: {
        setMessage(type, message) {
            this.message.type = type || '';
            this.message.content = message || '';
            this.message.isActive = !!(type && message);
        },
        async deleteImage(id) {
            this.loading = true;
            const formData = new FormData();
            formData.append('id', id);
            const response = await axios.post('conf/image-delete', formData);
            this.images = response.data;
            this.loading = false;
        }
    },
    mounted() {
        axios.get('conf/images').then(response => {
            this.images = response.data;
        });
    },
    created() {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
}
</script>

<style lang="scss" scoped>

.overlay {
    position: absolute;
    left: 0;
    top:0;
    background: rgba(255, 255, 255, 0.8);
}

.card-columns {
    column-count: 5 !important;
}

.card-body {
    line-height: 14px;

    .id-text {
        display: inline-block;
        font-size: 14px;
        line-height: 16px;
        font-weight: bold;
        margin: 0;
    }

    .date-text {
        display: inline-block;
        font-size: 12px;
        line-height: 14px;
        margin: 0;
    }
}

.delete-button {
    position: absolute;
    top: 50px;
    left: 50%;
    margin-left: -25px;
    width: 50px;
    height: 50px;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 50%;
    background-color: red;
    font-size: 26px;
    visibility: hidden;
    opacity: 0;
    transition: all 200ms linear;
}

.card:hover .delete-button {
    visibility: visible;
    transition: all 200ms linear;
    opacity: 1;
}

</style>