<template>
  <div
    class="signup-page flex items-center justify-center min-h-screen bg-gray-100"
  >
    <div
      class="signup-container bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </p>
      <p class="mt-4 text-center text-sm">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import authService from "@/services/authService";

export default {
  name: "SignupPage",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await authService.signUp(
          this.username,
          this.email,
          this.password
        );

        console.log("Signup successful:", response);
        // Optionally, redirect to login page or handle success message
        this.$router.push("/login");
      } catch (error) {
        console.error("Signup failed:", error);
        this.errorMessage =
          error.response.data.message || "Signup failed. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.signup-page {
  background-color: #f7fafc;
}

.signup-container {
  width: 100%;
  max-width: 400px; /* Adjusted max-width for larger screens */
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto; /* Center the container horizontally */
}

h1 {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  margin-bottom: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4299e1;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3182ce;
}

p {
  margin-top: 16px;
  text-align: center;
}

a {
  color: #4299e1;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 425px) {
  .signup-container {
    padding: 16px;
  }
}
</style>
