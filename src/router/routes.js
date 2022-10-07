import UserList from '/@components/UserList.vue';
import CreateUser from '/@components/CreateUser.vue';
import BulkUpload from '/@components/BulkUpload.vue';
import EditUser from '/@components/EditUser.vue';
import Profile from '/@components/Profile.vue';
import UpdateProfile from '/@components/UpdateProfile.vue';
import Home from '/@components/Home.vue';
import Login from '/@components/Login.vue';
import SignUp from '/@components/SignUp.vue';
import { defineComponent } from 'vue';

const NotFound = defineComponent({
    template: '<div>Not Found</div>',
});

const routes = [
    { path: '/', name: 'home', component: Home, alias: '/home' },
    { path: '/login', name: 'login', component: Login },
    { path: '/signup', name: 'sign-up', component: SignUp },
    {
        path: '/user_list',
        name: 'user-list',
        component: UserList,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/create_user',
        name: 'create-user',
        component: CreateUser,
        meta: { requiresAuth: true },
    },
    {
        path: '/bulk_upload',
        name: 'bulk-upload',
        component: BulkUpload,
        meta: { requiresAuth: true },
    },
    {
        path: '/edit/:id',
        name: 'edit-user',
        component: EditUser,
        props: true,
        meta: { requiresAuth: true },
    },
    { path: '/profile', name: 'profile', component: Profile },
    {
        path: '/update_profile',
        name: 'update-profile',
        component: UpdateProfile,
    },
    { path: '/:catchAll(.*)+', component: NotFound },
];

export default routes;
