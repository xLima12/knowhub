<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img">
        <img :src="gravatarUrl" alt="User Avatar" class="avatar" />
      </div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
      <router-link to="/admin" v-if="user.admin"
        ><i class="fa fa-cogs"></i> Administração</router-link
      >
      <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import md5 from "blueimp-md5";
import { userKey } from "@/global";

export default {
  name: "UserDropdown",
  computed: {
    ...mapState(["user"]),
    gravatarUrl() {
      const emailHash = md5(this.user.email.trim().toLowerCase());
      return `https://www.gravatar.com/avatar/${emailHash}?s=200&d=identicon`;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 400;
  height: 100%;
  padding: 0px 20px;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #000;
  padding: 10px;
}

.user-dropdown-content a:hover {
  text-decoration: none;
  color: #000;
  background-color: #ededed;
}
</style>
