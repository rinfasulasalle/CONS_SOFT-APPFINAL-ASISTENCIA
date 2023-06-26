<template>
  <div class="card">
    <FileUpload
      name="demo[]"
      url="./upload.php"
      @upload="onAdvancedUpload($event)"
      :multiple="true"
      accept="image/*"
      :maxFileSize="1000000"
    >
      <template #empty>
        <p>Drag and drop files here to upload.</p>
      </template>
    </FileUpload>
  </div>
</template>

<script>
export default {
  methods: {
    onAdvancedUpload() {
      // Código personalizado para manejar la carga avanzada
    },
  },
};
</script>
