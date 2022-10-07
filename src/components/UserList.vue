<template>
  <div
    id="flex-box"
    class="container align-items-center justify-content-center"
  >
    <div class="textbox">
      <h1>Client Database</h1>
      <p>Click to edit.</p>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th
            v-for="column in columns_names"
            :key="column.key"
            scope="col"
          >
            {{ column.value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="{ id, UserID, Name, Birth, Age, Sex, Mobile, Email, Latest, RR, SignUp, Address, Zipcode } in users"
          :key="id"
        >
          <tr
            class="accordion-toggle"
            data-bs-toggle="collapse"
            :data-bs-target="'#c_' + id"
            aria-expanded="false"
            :aria-controls="'c_' + id"
            role="button"
          >
            <td>{{ UserID }}</td>
            <td>{{ Name }}</td>
            <td>{{ Birth }}</td>
            <td>{{ Age }}</td>
            <td>{{ Sex }}</td>
            <td>{{ Mobile }}</td>
            <td>{{ Email }}</td>
            <td v-html="convertTimestampToDate(Latest)" />
            <td v-html="calDormant(Latest)" />
          </tr>
          <tr
            :id="'c_' + id"
            class="hiddenRow accordion-body collapse"
          >
            <td colspan="9">
              <div class="row g-3">
                <p class="col-md-12 info">
                  UserID: {{ UserID }}
                </p>
                <p class="col-md-6 info">
                  Name: {{ Name }}
                </p>
                <p class="col-md-6 info">
                  Email: {{ Email }}
                </p>
                <p class="col-md-6 info">
                  Mobile: {{ Mobile }}
                </p>
                <p class="col-md-6 info">
                  RR: {{ Birth }} - {{ RR }}
                </p>
                <p class="col-md-6 info">
                  Sex: {{ Sex }}
                </p>
                <p class="col-md-6 info">
                  Age: {{ Age }}
                </p>
                <p class="col-md-6 info">
                  Zipcode: {{ Zipcode }}
                </p>
                <p class="col-md-6 info">
                  Address: {{ Address }}
                </p>
                <p
                  class="col-md-6 info"
                  v-html="'Latest: ' + convertTimestampToDate(Latest)"
                />
                <p
                  class="col-md-6 info"
                  v-html="'SignUp: ' + convertTimestampToDate(SignUp)"
                />
              </div>
              <div class="buttons">
                <router-link :to="{ name: 'edit-user', params: { id: id } }">
                  <button
                    class="btn btn-primary me-2"
                    @click="editUser"
                  >
                    Edit
                  </button>
                </router-link>
                <button
                  class="btn btn-primary"
                  @clicks="deleteUser(id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getUserList, deleteUser } from '/@/firebase';
import { computed } from 'vue';

export default {
  name: 'UserList',
  setup() {
    const users = getUserList();
    const properties = [
      { key: 1 , value: 'UserID' },
      { key: 2 , value: 'Name' },
      { key: 3 , value: 'Birth' },
      { key: 4 , value: 'Age' },
      { key: 5 , value: 'Sex' },
      { key: 6 , value: 'Mobile' },
      { key: 7, value: 'Email' },
      { key: 8 , value: 'Latest' },
      { key: 9 , value: 'Dormant' },
    ];
    /*const columns = [
      { key: 1 , value: 'UserID' },
      { key: 2 , value: 'Name' },
      { key: 3 , value: 'Birth' },
      { key: 4 , value: 'Age' },
      { key: 5 , value: 'Sex' },
      { key: 6 , value: 'Mobile' },
      { key: 7 , value: 'Latest' },
      { key: 8 , value: 'Dormant' },
    ]*/
    const columns_names = computed(() => properties.filter((i) => i.key < 10));


     //Latest 문자열로 변환
    const convertTimestampToDate = (Latest) => {
      const latestDate = Latest.toDate();
      const year = latestDate.getFullYear();
      const month = latestDate.getMonth() + 1;
      const day = latestDate.getDate();
      return year + '/' + month + '/' + day;
    };

    var nowDate = new Date();
    //Dormant 계산 함수: 현재 연도 == 가입연도 + 1, 현재 월 > 가입월, 현재 일 > 가입일
    const calDormant = (Latest) => {
      var dormant = false;
      const latestDate = Latest.toDate();
      if (nowDate.getFullYear() - latestDate.getFullYear() > 1) {
        dormant = true;
      } else if (nowDate.getFullYear() - latestDate.getFullYear() == 1) {
        if (nowDate.getMonth() > latestDate.getMonth()) {
          dormant = true;
        } else if (nowDate.getMonth() == latestDate.getMonth()) {
          if (nowDate.getDate() > latestDate.getDate()) {
            dormant = true;
          }
        } else { //nowDate.getMonth < latestDate.getMonth
          dormant = false;
        }
      } else { //nowDate.getFullYear - latestDate.getFullYear < 1
        dormant = false;
      }
      return dormant;
    };


    return {
      properties,
      users,
      columns_names,
      calDormant,
      convertTimestampToDate,
      deleteUser,
    };
  }
};
</script>

<style scoped>
.textbox {
  text-align: center;
  margin-top: 15px;
}

th, td {
  text-align: center;
}

.accordion-toggle:hover {
  cursor: pointer;
}
.col-md-12 {
  text-align: right !important;
}

.info {
  text-align: left;
}
.buttons {
  float: right;
}
</style>
