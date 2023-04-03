<template>
  <q-page-container>
    <q-form ref="form" @submit.prevent="handleSubmit">
      <q-card>
        <q-card-section>
          <q-input v-model="user.name" label="Name" required />
          <q-input v-model="user.username" label="Username" required />
          <q-input v-model="user.email" label="Email" type="email" required />
          <q-input v-model="user.phone" label="Phone" type="tel" />
          <q-input v-model="user.website" label="Website" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            type="submit"
            color="primary"
            label="Submit"
            @click="handleSubmit()"
          />
          <q-btn to="/user-list" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",
  data() {
    return {
      user: {
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
      },
    };
  },

  async created() {
    const { id } = this.$route.params;

    if (id) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  methods: {
    async handleSubmit() {
      const { id } = this.$route.params;
      if (id) {
        try {
          await axios.put(
            `https://jsonplaceholder.typicode.com/users/${id}`,
            this.user
          );
          this.$emit("form-submitted", this.user);
          this.$router.push({ name: "user-list" });
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const response = await axios.post(
            `https://jsonplaceholder.typicode.com/users`,
            {
              ...this.user,
              id: "",
            }
          );
          const newUser = response.data;
          this.$emit("form-submitted", newUser);
          this.$router.push({ name: "user-list" });
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
