<template>
  <div
    id="flex-box"
    class="d-flex align-items-center justify-content-center"
  >
    <form class="row g-3">
      <!--create form-->
      <div
        id="userIdDiv"
        class="col-md-12"
      >
        <div style="float:right; width:30%; text-align:right;">
          <label
            for="inputUserID"
            class="form-label"
          >UserID는 자동으로 생성됩니다.</label>
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
        >{{ v$.Name.$errors[0].$message }}</span>
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
        >{{ v$.Email.$errors[0].$message }}</span>
      </div>
      <div class="col-md-6">
        <label
          for="inputBirth"
          class="form-label"
          style="display:block;"
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
          style="width:100%;"
        >
          <span
            v-if="v$.Birth.$error"
            class="errorMessage col-md-5"
          >{{ v$.Birth.$errors[0].$message }}</span>
          <span
            v-if="v$.RR.$error"
            class="errorMessage col-md-5 ms-auto"
          >{{ v$.RR.$errors[0].$message }}</span>
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
        >{{ v$.Mobile.$errors[0].$message }}</span>
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
        >{{ v$.Address.$errors[0].$message }}</span>
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
        >{{ v$.Zipcode.$errors[0].$message }}</span>
      </div>
      <div
        class="col-12"
        style="text-align: right;"
      >
        <button
          class="btn btn-primary"
          @click.prevent="addUser"
        >
          Add Client
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { addDoc, Timestamp } from 'firebase/firestore';
import { usersCol, getUserID, getUserList } from '/@/firebase';
import useVuelidate from '@vuelidate/core';
import { helpers, required, email, numeric, maxLength, minLength } from '@vuelidate/validators';
export default {
  name: 'CreateUser',
  setup() {
    const users = getUserList();
    const userIdObj = getUserID();

    const inputValues = [
      { key: 1 , value: 'Name' },
      { key: 2 , value: 'Email' },
      { key: 3 , value: 'Birth' },
      { key: 4 , value: 'RR' },
      { key: 5 , value: 'Mobile' },
      { key: 6 , value: 'Address' },
      { key: 7 , value: 'Zipcode' },
    ];

    //랜덤 UserID 생성하는 함수
    const randomId = (obj) => {
      while (true) {
        var string_id = "";
        for (var i = 0; i < 5; i++) {
        const digit = Math.floor(Math.random() * 10);
        string_id += digit;
        }
        if (!(string_id in obj)) {
          break;
        }
      }
      return string_id;
    };

    //현재날짜
    const nowDate = new Date();

    //Age 계산 함수
    const calAge = (Birth) => {
      const birthYear = Birth.split('/')[0];
      var age = nowDate.getFullYear() - birthYear + 1;
      return age;
    };

    //Sex 계산 함수
    const calSex = (RR) => {
      var sex = "";
      if (RR[0] == '1' || RR[0] == '3') {
        sex = 'M';
      } else if (RR[0] == '2' || RR[0] == '4') {
        sex = 'F';
      }
      return sex;
    };


    const state = reactive({
      UserID: '',
      Name: '',
      Email: '',
      Birth: '',
      RR: '',
      Mobile: '',
      Address: '',
      Zipcode: '',
      SignUp: '',
      Latest: '',
      Sex: '',
      Age: '',
    });

    state.UserID = randomId(userIdObj);

    const mobileReg = (value) => {
      var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      return regPhone.test(value);
    };


    const rules = computed(() => {
      return {
        Name: { required: helpers.withMessage("Required field.", required) },
        Email: { required: helpers.withMessage("Required field.", required), email },
        Birth: { required: helpers.withMessage("Required field.", required), numeric, maxLength: maxLength(6), minLength: minLength(6) },
        RR: { required: helpers.withMessage("Required field.", required), numeric, maxLength: maxLength(7), minLength: minLength(7) },
        Mobile: { required: helpers.withMessage("Required field.", required), mobileReg: helpers.withMessage('Wrong format.', mobileReg) },
        Address: { required: helpers.withMessage("Required field.", required) },
        Zipcode: { required: helpers.withMessage("Required field.", required), numeric, maxLength: maxLength(5), minLength: minLength(5) },
      };
    });

    const v$ = useVuelidate(rules, state);


    return {
      inputValues,
      state,
      v$,
      userIdObj,
      users,
    };
  },
  methods: {
    addUser() {
      this.v$.$validate();
      if (!this.v$.$error) {
        state.SignUp = Timestamp.fromDate(new Date()),
        state.Latest = state.SignUp;
        state.Sex = calSex(state.RR);
        state.Age = calAge(state.Birth);
        addDoc(usersCol, state);
        alert('Client data successfully added!');
      } else {
        alert('Failed validation :(');
      }
    }
  },
};
</script>

<style>
.col-md-5 {
  display: inline-block;
}

.hyph-for-RR {
  text-align: center;
  display: inline-block;
}

.row {
  width: 80%;
  margin-top: 20px;
}

#inputUserID {
  text-align: right;
}
.errorMessage {
  color: red;
  font-size: 10px;
}
</style>
