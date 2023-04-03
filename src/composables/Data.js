import { ref } from "vue";
import axios from "axios";

import { rows } from "../pages/listUsers";
//import { newUser } from "../pages/addUser";

//global variables
let DataTable = ref([]);
let tableLength = DataTable.value.length;
//for getting the user data from api
const getUsers = () => {
  axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
    DataTable.value = response.data.map((user) => ({
      // map data from api
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      action: "action",
    }));

    // Set the id property for each row
    DataTable.value.forEach((row, index) => {
      row.id = index + 1;
    });

    rows.value = DataTable.value;
  });
};

getUsers();

export { DataTable, getUsers, tableLength };
