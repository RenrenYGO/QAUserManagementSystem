const routes = [
  {
    path: "/",
    redirect: {
      name: "user-list",
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "user-list",
        name: "user-list",
        component: () => import("src/pages/listUsers.vue"),
      },
      {
        path: "add-user/:id?",
        name: "add-user",
        component: () => import("src/pages/AddUser.vue"),
      },
    ],
  },
];

export default routes;
