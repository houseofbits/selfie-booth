<template>
    <div class="container h-100 p-0">
        <div class="row p-1 text-light bg-dark d-flex">
            <div class="justify-content-center align-self-center ml-3">
                <h5><i class="fas fa-camera"></i> <strong>Selfie Photo Booth</strong></h5>
            </div>
        </div>
        <div class="row h-100 border-left border-dark border-right border-bottom">
            <div class="col-md-3 bg-secondary p-1">
                <div class="btn-group-vertical btn-block">
                    <router-link class="btn btn-secondary btn-sm" exact-active-class="active" to="/">Home</router-link>
                    <router-link class="btn btn-secondary btn-sm" exact-active-class="active" to="/images">
                        Captured images
                    </router-link>
                    <router-link class="btn btn-secondary btn-sm" exact-active-class="active" to="/email">
                        Email settings
                    </router-link>
                    <router-link class="btn btn-secondary btn-sm" exact-active-class="active" to="/facebook">
                        Facebook settings
                    </router-link>
                </div>
            </div>
            <div class="col-md-9 bg-light p-0">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminApp",
}
</script>
