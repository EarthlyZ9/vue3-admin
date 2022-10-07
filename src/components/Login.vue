<template>
  <div
    id="flex-box"
    class="d-flex align-items-center"
  >
    <div
      class="container"
      style="width: 35%; text-align: center;"
    >
      <div class="logo mb-3">
        <img
          src="../assets/logo_crud.png"
          style="height:100px;"
        >
      </div>
      <div class="login-container container">
        <div class="input-container">
          <h2>Sign In</h2>
          <div
            v-if="errMsg"
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <p>{{ errMsg }}</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
          <form class="post-form">
            <div class="form-floating mb-1">
              <input
                id="floatingEmail"
                v-model="email"
                requried
                type="text"
                class="form-control"
                placeholder="User Email"
                name="email"
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
                name="password"
              >
              <label for="floatingPassword">Password</label>
            </div>
            <div class="buttons d-flex flex-column justify-content-center">
              <button
                id="login-btn"
                type="button"
                class="btn btn-primary mb-2"
                @click="login"
              >
                LOGIN
              </button>
              <button
                id="login-btn"
                type="button"
                class="btn btn-primary mb-2"
                @click="signInWithGoogle"
              >
                Sign In With Google
              </button>
            </div>
          </form>
        </div>
      </div>
      <br>
      <router-link :to="{ name: 'sign-up'}">
        <a>Sign Up</a>
      </router-link>
      <br>
      <router-link :to="{ name: 'home'}">
        <a>Back To Main</a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router';
export default {
  setup(){
    const email = ref("");
    const password = ref("");
    const errMsg = ref();
    const router = useRouter();

    const auth = getAuth();

    const login = () => {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
          alert('Login');
          console.log(auth.currentUser);
          router.push('/');
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              errMsg.value = "Invaid Email";
              break;
            case "auth/user-not-found":
              errMsg.value = "User Not Found";
              break;
            case "auth/wrong-password":
              errMsg.value = "Wrong Password";
              break;
            default:
              errMsg.value = "Email or password was incoreect";
              break;
          }
        });
    };

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    };


    return {
      login,
      email,
      password,
      errMsg,
      signInWithGoogle,
    };
  }
};
</script>

<style scoped>
h2 {
  text-align: left;
}

.btn-primary {
  display: block;
}

.buttons {
  width: 100%;
  text-align: center;
}

</style>
