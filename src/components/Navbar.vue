<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white font-bold text-xl">Weather App</div>
      <div class="relative">
        <img
          @click="toggleDropdown"
          src="../assets/avatar.png"
          alt="User Avatar"
          class="w-10 h-10 rounded-full cursor-pointer"
        />
        <div
          v-if="dropdownOpen"
          @click.stop="toggleDropdown"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
        >
          <a
            href="#"
            @click.stop="handleSignOut"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >Sign Out</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import authService from "../services/authService";

export default {
  name: "NavbarItem",
  data() {
    return {
      dropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    async handleSignOut() {
      try {
        await authService.signOut(); // Assuming authService.signOut() returns a promise
        console.log("User signed out");
        // Redirect to the login page after sign-out
        this.$router.push({ name: "LoginPage" }); // Navigate to LoginPage
      } catch (error) {
        console.error("Error signing out:", error);
        // Handle sign-out error, if needed
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
