<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a
        class="navbar-brand me-auto"
        href="/"
      >
        <img
          src="../assets/logo_crud.png"
          alt=""
          style="height: 50px;"
        >
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarNav"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li
            v-for="menu in menus"
            :key="menu.key"
            :class="{ 'navbar-nav': true, 'dropdown': menu.dropdown }"
          >
            <div v-if="menu.dropdown === false">
              <router-link
                :to="menu.url"
                class="nav-link"
              >
                {{ menu.value }}
              </router-link>
            </div>
            <div v-else>
              <a
                id="navbarDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ menu.value }}
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdown"
              >
                <li
                  v-for="dropdown_item in menu.dropdown_items"
                  :key="dropdown_item.key"
                >
                  <router-link
                    :to="dropdown_item.url"
                    class="dropdown-item"
                  >
                    {{ dropdown_item.value }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li
            v-if="isLoggedIn"
            class="navbar-nav dropdown"
          >
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profile
            </a>
            <ul
              class="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <router-link
                  :to="{ name: 'profile' }"
                  class="dropdown-item"
                >
                  Admin Info
                </router-link>
              </li>
              <button
                class="dropdown-item"
                @click="handleSignOut"
              >
                Logout
              </button>
            </ul>
          </li>
          <li
            v-else
            class="navbar-nav"
          >
            <router-link
              :to="{ name: 'login'}"
              class="nav-link"
            >
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
export default {
  name: 'NavBar',
  setup() {
    const menus = [
      { key: 'list', value: 'Client Data', url: '/user_list', dropdown: false },
      {
        key: 'create',
        value: 'Add',
        dropdown: true,
        dropdown_items: [
          { key: 'single', value: 'Single', url: '/create_user' },
          { key: 'bulk', value: 'Bulk', url: '/bulk_upload' },
        ]
      },
    ];

    const isLoggedIn = ref(false);
    let auth;
    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });


    const router = useRouter();
    const handleSignOut = () => {
      signOut(auth).then(() => {
        alert('Signed out.');
        router.push('/');
      });
    };

    return {
      isLoggedIn,
      menus,
      handleSignOut,
    };
  },
};
</script>

<style scoped>
.container-fluid {
  padding:  0;
  height: inherit;
  margin-left: 5px;
  margin-right: 10px;
  display: inline-block;
}
.bg-light {
  background-color: #d6ffeb !important;
}
.navbar {
  height: 60px;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}

.navbar-brand {
  margin-left: 15px;
}
</style>
