<template>
    <div>
        <h2 class="text-light mt-2 text-shadow-1">{{ lang('sharing.login-info') }}</h2>
        <h4 class="text-light text-shadow-1">{{ lang('sharing.login-info-redirect') }}
        </h4>
        <a class="btn btn-info mt-2" href="" type="button"><i class="fab fa-facebook-square"></i>
            {{ lang('sharing.buttons.log-in') }}</a>
    </div>
</template>

<script>
export default {
    name: "LogIn",
    inject: ['lang'],
}
</script>