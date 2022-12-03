<template>
  <AuthForm :title="title" :password.sync="password">
    <template v-slot:action="slotProps">
        <button @click="test">Click me</button>
        {{slotProps.email}}
      
    </template>
  </AuthForm>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
export default {
  components: { AuthForm },
  data: () => ({
    title: "Login to your account",
    password:"",
  }),
  methods:{
    test: function(){
        console.log(this.password);
    }
  }
};
</script>
