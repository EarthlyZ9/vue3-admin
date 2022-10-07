<template>
  <div
    id="flex-box"
    class="d-flex align-items-center"
  >
    <div
      id="card-group"
      class="row row-cols-1 row-cols-md-3 g-4 justify-content-center align-items-center"
    >
      <div
        v-for="menu in menu_buttons"
        :key="menu.key"
        class="col"
      >
        <div class="card border-dark">
          <router-link :to="menu.url">
            <img
              alt="home-img"
              :src="menu.img_url"
              class="card-img-top"
            >
            <div class="card-body">
              <h5 class="card-title">
                {{ menu.value }}
              </h5>
              <p
                class="card-text"
                v-html="getContent(menu)"
              />
              <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  setup() {
    const menu_buttons = [
      { key: 'manage', value: 'Manage Clients', description: 'List of client data.\nRead, edit, delete client data here.', img_url: 'src/assets/manage.png', url: '/user_list' },
      { key: 'add', value: 'Add New Client', description: 'Add client data.\nSingle input only.', img_url: 'src/assets/add.png', url: '/create_user' },
      { key: 'bulk', value: 'Bulk Upload Client Data', description: 'Add multiple client data.\nUse CSV file only.', img_url: 'src/assets/clients.png', url: '/bulk_upload' },
    ];

    const getContent = (content) => {
      return content.description.split('\n').join('<br>');
    };


    return {
      menu_buttons,
      getContent,
    };
  },
};
</script>

<style scoped>

#card-group {
  margin: auto;
  width: 70%;
  height: 100%;
}

a {
  text-decoration: none;
  color: black;
  height: 100%;
}

.col {
  height: 50%;
  padding: 10px;
  margin-top: 0;
}

.card {
  height: 100%;
}

.card-img-top {
  height: 60%;
}

.card-body {
  height: 40%;
  padding: 8px;
}

</style>

<style>
#flex-box {
  height: calc(100% - 60px) !important;
}
</style>
