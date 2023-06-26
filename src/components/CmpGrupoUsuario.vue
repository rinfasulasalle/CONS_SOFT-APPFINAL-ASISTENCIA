<template>
  <h1 class="titulo">CmpGrupoUsuario</h1>
  <!-- Barra de herramientas con botones para agregar y eliminar grupos -->
  <Toolbar class="mb-4">
    <Button
      label="Nuevo"
      icon="pi pi-plus"
      severity="success"
      class="mr-2"
      @click="openNew"
    />
    <Button
      label="Eliminar"
      icon="pi pi-trash"
      severity="danger"
      @click="confirmDeleteSelected"
      :disabled="!selectedGrupo || !selectedGrupo.length"
    />
  </Toolbar>
  <!-- Tabla que muestra los grupos -->
  <DataTable :value="grupos" :paginator="true" :rows="10">
    <Column field="id_grupo" header="ID Grupo"></Column>
    <Column field="nombre_grupo" header="Nombre Grupo"></Column>
    <!-- Columna con botones para editar y eliminar un grupo -->
    <Column header="">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          severity="warning"
          @click="editGrupo(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteGrupo(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
  <!-- Diálogo para agregar un nuevo grupo -->
  <Dialog v-model:visible="displayDialogNew" header="Nuevo Grupo" :modal="true">
    <form>
      <div class="p-field">
        <label for="nombre_grupo">Nombre Grupo</label>
        <InputText id="nombre_grupo" v-model="newGrupo.nombre_grupo" />
      </div>
      <br />
      <div class="p-dialog-footer">
        <Button
          label="Enviar"
          icon="pi pi-check"
          class="p-button-success"
          @click="submitNew"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-secondary"
          @click="cancelNew"
        />
      </div>
    </form>
  </Dialog>
  <!-- Diálogo de confirmación para eliminar un grupo -->
  <Dialog
    v-model:visible="displayConfirmDialog"
    header="Confirmar eliminación"
    :modal="true"
  >
    <p>
      ¿Estás seguro de que deseas eliminar el grupo "{{
        selectedGrupo.nombre_grupo
      }}"?
    </p>
    <div class="p-dialog-footer">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button-secondary"
        @click="cancelDelete"
      />
      <Button
        label="Aceptar"
        icon="pi pi-check"
        class="p-button-danger"
        @click="deleteGrupo"
      />
    </div>
  </Dialog>
  <!-- Diálogo para editar un grupo -->
  <Dialog
    v-model:visible="displayEditDialog"
    header="Editar Grupo"
    :modal="true"
  >
    <form>
      <div class="p-field">
        <label for="edit_id_grupo">ID Grupo </label>
        <Dropdown
          disabled
          id="edit_id_grupo"
          v-model="editData.id_grupo"
          :options="grupoOptions"
          optionLabel="id_grupo"
          optionValue="id_grupo"
        />
        <br /><br />
      </div>
      <div class="p-field">
        <label for="edit_nombre_grupo">Nombre Grupo </label>
        <InputText id="edit_nombre_grupo" v-model="editData.nombre_grupo" />
      </div>
      <br />
      <div class="p-dialog-footer">
        <Button
          label="Guardar"
          icon="pi pi-check"
          class="p-button-success"
          @click="updateGrupo"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-secondary"
          @click="cancelEdit"
        />
      </div>
    </form>
  </Dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      grupos: [], // Array de grupos
      displayDialogNew: false, // Indica si el diálogo para agregar un nuevo grupo está visible
      newGrupo: {
        // Objeto para almacenar los datos del nuevo grupo
        nombre_grupo: "",
      },
      displayConfirmDialog: false, // Indica si el diálogo de confirmación está visible
      selectedGrupo: null, // Grupo seleccionado para eliminar
      displayEditDialog: false, // Indica si el diálogo de edición está visible
      editData: {
        // Datos del grupo seleccionado para editar
        id_grupo: null,
        nombre_grupo: "",
      },
      grupoOptions: [], // Opciones para el Dropdown de edición
    };
  },
  methods: {
    // Método para obtener los grupos desde el servidor
    fetchGrupos() {
      axios
        .post("http://127.0.0.1:5000/grupoUsuarios")
        .then((response) => {
          this.grupos = response.data;
          this.grupoOptions = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Método para editar un grupo
    editGrupo(grupo) {
      this.editData.id_grupo = grupo.id_grupo;
      this.editData.nombre_grupo = grupo.nombre_grupo;
      this.displayEditDialog = true;
    },
    // Método para confirmar la eliminación de un grupo
    confirmDeleteGrupo(grupo) {
      this.selectedGrupo = grupo;
      this.displayConfirmDialog = true;
    },
    // Método para cancelar la eliminación de un grupo
    cancelDelete() {
      this.selectedGrupo = null;
      this.displayConfirmDialog = false;
    },
    // Método para eliminar un grupo
    deleteGrupo() {
      if (this.selectedGrupo) {
        const idGrupo = this.selectedGrupo.id_grupo;
        axios
          .delete("http://127.0.0.1:5000/grupoUsuario", {
            data: { id_grupo_usuario: idGrupo },
          })
          .then((response) => {
            // Eliminar el grupo de la lista actual de grupos
            const index = this.grupos.findIndex(
              (grupo) => grupo.id_grupo === idGrupo
            );
            if (index !== -1) {
              this.grupos.splice(index, 1);
            }
            this.selectedGrupo = null;
            this.displayConfirmDialog = false; // Cerrar el diálogo de confirmación
            console.log("Grupo eliminado:", response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // Método para abrir el diálogo para agregar un nuevo grupo
    openNew() {
      this.displayDialogNew = true;
    },
    // Método para enviar el nuevo grupo al servidor
    submitNew() {
      axios
        .put("http://127.0.0.1:5000/grupoUsuario", this.newGrupo)
        .then((response) => {
          // Agregar el nuevo grupo a la lista actual de grupos
          this.grupos.push(response.data);
          this.displayDialogNew = false; // Cerrar el diálogo
          console.log("Nuevo grupo enviado:", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Método para cancelar la creación de un nuevo grupo
    cancelNew() {
      this.displayDialogNew = false;
      this.newGrupo.nombre_grupo = "";
    },
    // Método para actualizar un grupo
    updateGrupo() {
      if (this.editData.id_grupo) {
        const data = {
          id_grupo_usuario: this.editData.id_grupo,
          nombre_grupo: this.editData.nombre_grupo,
        };

        axios
          .patch("http://127.0.0.1:5000/grupoUsuario", data)
          .then((response) => {
            // Actualizar el grupo en la lista actual de grupos
            const index = this.grupos.findIndex(
              (grupo) => grupo.id_grupo === this.editData.id_grupo
            );
            if (index !== -1) {
              // Copiar los valores actualizados en el objeto correspondiente
              Object.assign(this.grupos[index], this.editData);
            }
            this.editData.id_grupo = null;
            this.editData.nombre_grupo = "";
            this.displayEditDialog = false; // Cerrar el diálogo de edición
            console.log("Grupo actualizado:", response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // Método para cancelar la edición de un grupo
    cancelEdit() {
      this.editData.id_grupo = null;
      this.editData.nombre_grupo = "";
      this.displayEditDialog = false;
    },
  },
  mounted() {
    this.fetchGrupos();
  },
};
</script>
