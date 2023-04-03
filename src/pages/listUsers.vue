<template>
  <q-page class="q-ma-xl">
    <q-table title="Users" :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            icon="edit"
            color="primary"
            size="sm"
            @click="editUser(props.row.id)"
          />
          <q-btn
            icon="delete"
            size="sm"
            color="negative"
            @click="deleteUser(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <add-user @form-submitted="handleFormSubmitted" />
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import AddUser from "src/pages/AddUser.vue";

export default {
  name: "list-user",
  components: {},
  setup() {
    const router = useRouter();

    const rows = ref([]);
    let columns = [
      {
        name: "id",
        label: "ID",
        align: "left",
        field: "id",
        sortable: true,
      },
      {
        name: "name",
        label: "NAME",
        align: "left",
        field: "name",
      },
      {
        name: "username",
        label: "USERNAME",
        align: "left",
        field: "username",
      },
      {
        name: "email",
        label: "EMAIL",
        align: "left",
        field: "email",
      },
      {
        name: "phone",
        label: "PHONE",
        align: "left",
        field: "phone",
      },
      {
        name: "website",
        label: "WEBSITE",
        align: "left",
        field: "website",
      },
      {
        name: "action",
        label: "ACTION",
        align: "left",
        field: "action",
      },
    ];

    const editUser = (id) => {
      router.push({
        name: "add-user",
        params: { id },
      });
    };

    const deleteUser = (row) => {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${row.id}`)
        .then((response) => {
          if (response.status === 200) {
            rows.value = rows.value.filter((r) => r.id !== row.id);
          }
        });
    };

    const getUsers = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(response.data); // add this line
      rows.value = response.data;
    };

    const handleFormSubmitted = (addedOrUpdatedUser) => {
      getUsers();
      if (addedOrUpdatedUser) {
        const index = rows.value.findIndex(
          (user) => user.id === addedOrUpdatedUser.id
        );
        if (index > -1) {
          rows.value.splice(index, 1, addedOrUpdatedUser);
        } else {
          rows.value.push(addedOrUpdatedUser);
        }
      }
    };

    onMounted(getUsers);

    return {
      rows,
      columns,
      editUser,
      deleteUser,
      getUsers,
      handleFormSubmitted,
    };
  },
};
</script>
