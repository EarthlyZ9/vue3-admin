<template>
  <div
    id="flex-box"
    class="d-flex align-items-center"
  >
    <div
      class="container"
      style="width: 40%; text-align: center;"
    >
      <h1>Create Admin Account</h1>
      <div class="form-floating mb-1">
        <input
          id="floatingEmail"
          v-model="email"
          required
          type="text"
          class="form-control"
          placeholder="User Email"
        >
        <label for="floatingEmail">User Email</label>
      </div>
      <div class="form-floating mb-3">
        <input
          id="floatingPassword"
          v-model="password"
          required
          type="password"
          class="form-control"
          placeholder="Password"
        >
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating mb-3">
        <input
          id="floatingConfirmPassword"
          v-model="confirmPassword"
          required
          type="password"
          class="form-control"
          placeholder="Confirm Password"
        >
        <label for="floatingConfirmPassword">Confirm Password</label>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="register"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
export default {
  setup(){
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const router = useRouter();
    //validation 추가
    const register = () => {
      console.log(password, confirmPassword.value);
      if (password.value === confirmPassword.value) {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value, confirmPassword.value)
        .then((data) => {
          alert('Successfully registered!');
          router.push('/');
        })
        .catch((error) => {
          switch(error.code) {
            case 'auth/email-already-in-use':
              alert('Email already in use!');
              break;
            case 'auth/invalid-email':
              alert('Invalid email.');
              break;
            case 'auth/operation-not-allowed':
              alert('Operation not allowed.');
              break;
            default:
              alert('Something went wrong.');
              break;
          }
        });
      } else {
        alert('Please confirm your password.');
      }

    };

    return {
      register,
      email,
      password,
      confirmPassword,
    };


  }
};

</script>

<style scoped>
</style>


