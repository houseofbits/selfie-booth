<template>
    <div>
        <div class="container p-3">

            <alert-box v-if="message.isActive" :content="message.content" :type="message.type"
                       @close="setMessage"></alert-box>

            <div class="card-columns">
                <div v-for="image in images" class="card">
                    <img :src="'/api/image/'+image.id" class="card-img-top">
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
        };
    },
    methods: {
        setMessage(type, message) {
            this.message.type = type || '';
            this.message.content = message || '';
            this.message.isActive = !!(type && message);
        },
        deleteImage(id){
            const formData = new FormData();
            formData.append('id', id);
            axios.post('conf/image-delete', formData).then(response => {
                this.images = response.data;
            });
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

.delete-button{
    position:absolute;
    top:50px;
    left:50%;
    margin-left: -25px;
    width:50px;
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

.card:hover .delete-button{
    visibility: visible;
    transition: all 200ms linear;
    opacity: 1;
}

</style>