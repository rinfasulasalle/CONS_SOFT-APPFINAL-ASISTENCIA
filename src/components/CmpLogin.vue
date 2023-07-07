<template>
  <div id="app">
    <template v-if="!isLoggedIn && intentos < 3">
      <div class="login-container">
        <div class="login-card">
          <h1>Iniciar sesión</h1>
          <div class="p-field">
            <label for="correo">Correo electrónico:</label>
            <input type="email" id="correo" v-model="correo" class="p-input" />
          </div>
          <div class="p-field">
            <label for="contraseña">Contraseña:</label>
            <input
              type="password"
              id="contraseña"
              v-model="contraseña"
              class="p-input"
            />
          </div>
          <button class="p-button p-button-primary" @click="login">
            Iniciar sesión
          </button>
          <div v-if="intentos > 0" class="intentos-restantes">
            Intentos restantes: {{ 3 - intentos }}
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="isLoggedIn">
      <CmpRouter />
      <CmpFootPage />
    </template>
    <template v-else>
      <div class="login-container">
        <div class="login-card">
          <h1>LO SENTIMOS</h1>
          <p>Máximo de intentos alcanzado.</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import CmpRouter from "./components/CmpRouter.vue";
import CmpFootPage from "./components/CmpFootPage.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    CmpRouter,
    CmpFootPage,
  },
  data() {
    return {
      correo: "",
      contraseña: "",
      isLoggedIn: false,
      intentos: 0,
      usuarios: [],
    };
  },
  methods: {
    login() {
      axios
        .post("http://127.0.0.1:5000/usuarios")
        .then((response) => {
          this.usuarios = response.data;
          const encontrado = this.usuarios.find(
            (usuario) =>
              usuario.usuario_correo === this.correo &&
              usuario.usuario_contraseña === this.contraseña
          );

          if (encontrado) {
            this.isLoggedIn = true;
            this.intentos = 0;
          } else {
            this.intentos++;
            if (this.intentos >= 3) {
              this.isLoggedIn = false;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 10px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 0 auto;
}

.p-field {
  margin-bottom: 10px;
}

.p-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.p-button {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}

.p-button-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.p-button-primary:hover {
  background-color: #0069d9;
}

.intentos-restantes {
  margin-top: 10px;
  font-size: 12px;
  color: red;
}
</style>
