<template>
  <div
    id="flex-box"
    class="d-flex align-items-center justify-content-center"
  >
    <form class="row g-3">
      <div
        id="userIdDiv"
        class="col-md-12"
      >
        <div style="float: right; width: 30%; text-align: right">
          <label
            for="inputUserID"
            class="form-label"
          >UserID</label>
          <input
            id="inputUserID"
            v-model="state.UserID"
            type="text"
            class="form-control"
            name="UserID"
            disabled
          >
        </div>
      </div>
      <div class="col-md-6">
        <label
          for="inputName"
          class="form-label"
        >Name</label>
        <input
          id="inputName"
          v-model="state.Name"
          type="text"
          class="form-control"
          name="Name"
          placeholder="이름"
        >
        <span
          v-if="v$.Name.$error"
          class="errorMessage"
        >{{
          v$.Name.$errors[0].$message
        }}</span>
      </div>
      <div class="col-md-6">
        <label
          for="inputEmail"
          class="form-label"
        >Email</label>
        <input
          id="inputEmail"
          v-model="state.Email"
          type="email"
          class="form-control"
          name="Email"
          placeholder="이메일"
        >
        <span
          v-if="v$.Email.$error"
          class="errorMessage"
        >{{
          v$.Email.$errors[0].$message
        }}</span>
      </div>
      <div class="col-md-6">
        <label
          for="inputBirth"
          class="form-label"
          style="display: block"
        >Resident Registration #</label>
        <div class="col-md-5">
          <input
            id="inputBirth"
            v-model="state.Birth"
            type="text"
            class="form-control"
            name="Birth"
            placeholder="주민번호 앞자리"
          >
        </div>
        <div class="col-md-2 hyph-for-RR">
          -
        </div>
        <div class="col-md-5">
          <input
            id="inputRR"
            v-model="state.RR"
            type="text"
            class="form-control"
            name="RR"
            placeholder="주민번호 뒷자리"
          >
        </div>
        <div
          class="row"
          style="width: 100%"
        >
          <span
            v-if="v$.Birth.$error"
            class="errorMessage col-md-5"
          >{{
            v$.Birth.$errors[0].$message
          }}</span>
          <span
            v-if="v$.RR.$error"
            class="errorMessage col-md-5 ms-auto"
          >{{
            v$.RR.$errors[0].$message
          }}</span>
        </div>
      </div>
      <div class="col-md-6">
        <label
          for="inputMobile"
          class="form-label"
        >Mobile</label>
        <input
          id="inputMobile"
          v-model="state.Mobile"
          type="text"
          class="form-control"
          name="Mobile"
          placeholder="휴대전화 번호"
        >
        <span
          v-if="v$.Mobile.$error"
          class="errorMessage"
        >{{
          v$.Mobile.$errors[0].$message
        }}</span>
      </div>
      <div class="col-12">
        <label
          for="inputAddress"
          class="form-label"
        >Address</label>
        <input
          id="inputAddress"
          v-model="state.Address"
          type="text"
          class="form-control"
          name="Address"
          placeholder="전체 주소를 입력해주세요."
        >
        <span
          v-if="v$.Address.$error"
          class="errorMessage"
        >{{
          v$.Address.$errors[0].$message
        }}</span>
      </div>
      <div class="col-md-2">
        <label
          for="inputZip"
          class="form-label"
        >Zipcode</label>
        <input
          id="inputZip"
          v-model="state.Zipcode"
          type="text"
          class="form-control"
          name="Zipcode"
          placeholder="우편번호"
        >
        <span
          v-if="v$.Zipcode.$error"
          class="errorMessage"
        >{{
          v$.Zipcode.$errors[0].$message
        }}</span>
      </div>
      <div
        class="col-12"
        style="text-align: right"
      >
        <button
          class="btn btn-primary"
          @click.prevent="updateUser(id, state)"
        >
          Save
        </button>
      </div>
    </form>
    <!--
    <span>{{docId}}</span>
    <span>{{state}}</span>-->
  </div>
</template>

<script>
import { updateUser, db } from "/@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { reactive, computed, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  email,
  numeric,
  maxLength,
  minLength,
} from "@vuelidate/validators";
export default {
  name: "EditUser",
  props: ["id"],
  setup(props) {
      // eslint-disable-next-line vue/no-setup-props-destructure
    const docId = props.id;
    const state = reactive({
      UserID: "",
      Name: "",
      Email: "",
      Birth: "",
      RR: "",
      Mobile: "",
      Address: "",
      Zipcode: "",
    });

    // get single doc
    const docRef = doc(db, "users", docId);
    getDoc(docRef).then((doc) => {
      const data = doc.data();
      state.UserID = data.UserID;
      state.Name = data.Name;
      state.Email = data.Email;
      state.Birth = data.Birth;
      state.RR = data.RR;
      state.Mobile = data.Mobile;
      state.Address = data.Address;
      state.Zipcode = data.Zipcode;
    });

    const mobileReg = (value) => {
      const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      return regPhone.test(value);
    };

    const rules = computed(() => {
      return {
        Name: { required: helpers.withMessage("Required field.", required) },
        Email: {
          required: helpers.withMessage("Required field.", required),
          email,
        },
        Birth: {
          required: helpers.withMessage("Required field.", required),
          numeric,
          maxLength: maxLength(6),
          minLength: minLength(6),
        },
        RR: {
          required: helpers.withMessage("Required field.", required),
          numeric,
          maxLength: maxLength(7),
          minLength: minLength(7),
        },
        Mobile: {
          required: helpers.withMessage("Required field.", required),
          mobileReg: helpers.withMessage("Wrong format.", mobileReg),
        },
        Address: { required: helpers.withMessage("Required field.", required) },
        Zipcode: {
          required: helpers.withMessage("Required field.", required),
          numeric,
          maxLength: maxLength(5),
          minLength: minLength(5),
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    console.log(state);
    return {
      state,
      docId,
      v$,
      updateUser,
    };
  },
};
</script>

<style scoped></style>
