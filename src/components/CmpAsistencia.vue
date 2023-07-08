<template>
  <div class="componente">
    <h2 class="difuminado">Registros de Asistencia</h2>
    <div>
      <video ref="videoElement" width="640" height="480"></video>
    </div>
    <div>
      <Button @click="takePhoto">
        <i class="pi pi-camera"></i> Tomar foto
      </Button>
    </div>
    <div v-if="photoTaken">
      <img :src="photoUrl" alt="Foto de asistencia" />
    </div>
    <InputText v-model.trim="dni" placeholder="Ingrese su DNI" />
    <p>Hora actual: {{ getCurrentTime() }}</p>
    <Button @click="submitForm" label="Enviar" />
    <Dialog v-if="showDialog" header="Asistencia Registrada" visible>
      ¡La asistencia se tomó correctamente!
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { Dialog, Button, InputText } from "primevue/dialog";

export default {
  components: {
    Dialog,
    Button,
    InputText,
  },
  data() {
    return {
      videoElement: null,
      photoTaken: false,
      photoUrl: "",
      dni: "",
      showDialog: false,
    };
  },
  mounted() {
    this.videoElement = this.$refs.videoElement;
    this.initializeCamera();
  },
  methods: {
    initializeCamera() {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      });
    },
    takePhoto() {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = this.videoElement.videoWidth;
      canvas.height = this.videoElement.videoHeight;
      context.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
      this.photoUrl = canvas.toDataURL("image/png");
      this.photoTaken = true;
    },
    getCurrentTime() {
      const currentTime = new Date();
      return currentTime.toLocaleTimeString();
    },
    submitForm() {
      if (this.dni.length > 0 && this.dni.length <= 8) {
        this.showDialog = true;
      } else {
        alert("Ingrese un DNI válido (máximo 8 cifras)");
      }
    },
  },
};
</script>

<style>
.componente {
  background-image: url("https://fondosmil.com/fondo/29366.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.difuminado {
  display: inline-block;
  background: rgba(192, 23, 214, 0.3);
  padding: 10px 10px;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(8px);
  margin: 20px;
}
</style>
