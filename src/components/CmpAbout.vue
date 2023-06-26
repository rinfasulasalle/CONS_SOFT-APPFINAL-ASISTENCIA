<template>
  <h1>CmpAbout</h1>
  <div>
    <Button label="Abrir diálogo" @click="openDialog" />
    <Dialog
      v-model:visible="visible"
      modal
      header="Hola mundo"
      :style="{ width: '20vw' }"
    >
      <p>Hola mundo</p>
    </Dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    openDialog() {
      this.visible = true;
      console.log("xd");
    },
  },
};
</script>
