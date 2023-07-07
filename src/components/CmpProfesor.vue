<template>
  <h1 class="titulo">CmpProfesor</h1>
  <Toolbar class="mb-4">
    <Button
      label="New"
      icon="pi pi-plus"
      severity="success"
      class="mr-2"
      @click="openNew"
    />
    <Button
      label="Delete"
      icon="pi pi-trash"
      severity="danger"
      @click="confirmDeleteSelected"
      :disabled="!selectedProducts || !selectedProducts.length"
    />
  </Toolbar>
  <!-- TABLA-->
  <DataTable :value="profesores" :paginator="true" :rows="10">
    <Column field="id_profesor" header="ID"></Column>
    <Column field="profesor_dni" header="DNI"></Column>
    <Column field="nombre" header="Nombre"></Column>
    <Column field="apellidos" header="Apellidos"></Column>
    <Column field="correo" header="Correo"></Column>
    <Column field="telefono" header="Teléfono"></Column>
    <Column header="Acciones">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          severity="warning"
          @click="editProfesor(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteProfesor(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog v-model="dialogVisible" header="Nuevo profesor">
    <p>Hola mundo</p>
  </Dialog>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      profesores: [],
      dialogVisible: false, // Estado para controlar la visibilidad del diálogo
    };
  },
  methods: {
    fetchProfesores() {
      axios
        .post("http://127.0.0.1:5000/profesors")
        .then((response) => {
          this.profesores = response.data.map((profesor) => ({
            id_profesor: profesor.id_profesor,
            profesor_dni: profesor.profesor_dni,
            nombre: profesor.nombre,
            apellidos: profesor.apellidos,
            correo: profesor.correo,
            telefono: profesor.telefono,
          }));
          console.table(this.profesores);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openNew() {
      this.dialogVisible = true; // Mostrar el diálogo estableciendo el estado dialogVisible a true
    },
    // Resto de los métodos para crear, eliminar y editar profesores
  },
  mounted() {
    this.fetchProfesores();
  },
};
</script>
