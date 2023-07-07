<template>
  <h1 class="titulo">CmpEstudiante</h1>
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
      :disabled="!selectedEstudiante || !selectedEstudiante.length"
    />
  </Toolbar>
  <!-- Tabla que muestra los estudiantes -->
  <DataTable
    :value="estudiantes"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    tableStyle="min-width: 50rem"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
  >
    <Column field="estudiante_dni" header="DNI"></Column>
    <Column field="estudiante_nombre" header="Nombre"></Column>
    <!-- Columna con botones para editar y eliminar un estudiante -->
    <Column header="">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          severity="warning"
          @click="editEstudiante(slotProps.data)"
          disabled
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteEstudiante(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
  <!-- Diálogo para agregar un nuevo estudiante -->
  <Dialog
    v-model:visible="displayDialogNew"
    header="Nuevo Estudiante"
    :modal="true"
  >
    <form>
      <div class="p-field">
        <label for="usuario_dni">DNI</label>
        <InputText id="usuario_dni" v-model="newEstudiante.usuario_dni" />
      </div>
      <div class="p-field">
        <label for="usuario_nombre">Nombre</label>
        <InputText id="usuario_nombre" v-model="newEstudiante.usuario_nombre" />
      </div>
      <div class="p-field">
        <label for="usuario_apellido">Apellido</label>
        <InputText
          id="usuario_apellido"
          v-model="newEstudiante.usuario_apellido"
        />
      </div>
      <div class="p-field">
        <label for="usuario_telefono">Teléfono</label>
        <InputText
          id="usuario_telefono"
          v-model="newEstudiante.usuario_telefono"
        />
      </div>
      <div class="p-field">
        <label for="usuario_correo">Correo</label>
        <InputText id="usuario_correo" v-model="newEstudiante.usuario_correo" />
      </div>
      <div class="p-field">
        <label for="usuario_contraseña">Contraseña</label>
        <InputText
          id="usuario_contraseña"
          v-model="newEstudiante.usuario_contraseña"
        />
      </div>
      <div class="p-field">
        <label for="usuario_ruta">Ruta de la foto</label>
        <InputText id="usuario_ruta" v-model="newEstudiante.usuario_ruta" />
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

  <!-- Diálogo de confirmación para eliminar un estudiante -->
  <Dialog
    v-model:visible="displayConfirmDialog"
    header="Confirmar eliminación"
    :modal="true"
  >
    <p>
      ¿Estás seguro de que deseas eliminar al estudiante "{{
        selectedEstudiante.estudiante_nombre
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
        @click="deleteEstudiante"
      />
    </div>
  </Dialog>
  <!-- Diálogo para editar un estudiante -->
  <Dialog
    v-model:visible="displayEditDialog"
    header="Editar Estudiante"
    :modal="true"
  >
    <form>
      <div class="p-field">
        <label for="edit_estudiante_dni">DNI</label>
        <InputText id="edit_estudiante_dni" v-model="editData.estudiante_dni" />
      </div>
      <div class="p-field">
        <label for="edit_estudiante_nombre">Nombre</label>
        <InputText
          id="edit_estudiante_nombre"
          v-model="editData.estudiante_nombre"
        />
      </div>
      <br />
      <div class="p-dialog-footer">
        <Button
          label="Guardar"
          icon="pi pi-check"
          class="p-button-success"
          @click="updateEstudiante"
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
      estudiantes: [], // Array de estudiantes
      displayDialogNew: false, // Indica si el diálogo para agregar un nuevo estudiante está visible
      newEstudiante: {
        // Objeto para almacenar los datos del nuevo estudiante
        estudiante_dni: "",
        estudiante_nombre: "",
      },
      displayConfirmDialog: false, // Indica si el diálogo de confirmación está visible
      selectedEstudiante: null, // Estudiante seleccionado para eliminar
      displayEditDialog: false, // Indica si el diálogo de edición está visible
      editData: {
        // Datos del estudiante seleccionado para editar
        estudiante_dni: null,
        estudiante_nombre: "",
      },
    };
  },
  methods: {
    // Método para obtener los estudiantes desde el servidor
    fetchEstudiantes() {
      axios
        .post("http://127.0.0.1:5000/estudiantes")
        .then((response) => {
          this.estudiantes = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Método para editar un estudiante
    editEstudiante(estudiante) {
      this.editData.estudiante_dni = estudiante.estudiante_dni;
      this.editData.estudiante_nombre = estudiante.estudiante_nombre;
      this.displayEditDialog = true;
    },
    // Método para confirmar la eliminación de un estudiante
    confirmDeleteEstudiante(estudiante) {
      this.selectedEstudiante = estudiante;
      this.displayConfirmDialog = true;
    },
    // Método para cancelar la eliminación de un estudiante
    cancelDelete() {
      this.selectedEstudiante = null;
      this.displayConfirmDialog = false;
    },
    // Método para eliminar un estudiante
    deleteEstudiante() {
      if (this.selectedEstudiante) {
        const dniEstudiante = this.selectedEstudiante.estudiante_dni;
        axios
          .delete("http://127.0.0.1:5000/estudiante", {
            data: { dni: dniEstudiante },
          })
          .then((response) => {
            // Eliminar el estudiante de la lista actual de estudiantes
            const index = this.estudiantes.findIndex(
              (estudiante) => estudiante.estudiante_dni === dniEstudiante
            );
            if (index !== -1) {
              this.estudiantes.splice(index, 1);
            }
            this.selectedEstudiante = null;
            this.displayConfirmDialog = false; // Cerrar el diálogo de confirmación
            //console.log("Estudiante eliminado:", response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // Método para abrir el diálogo para agregar un nuevo estudiante
    openNew() {
      this.displayDialogNew = true;
      this.newEstudiante = {
        usuario_dni: "",
        usuario_nombre: "",
        usuario_apellido: "",
        usuario_telefono: "",
        usuario_correo: "",
        usuario_contraseña: "",
        usuario_ruta: "",
      };
    },

    // Método para enviar el nuevo estudiante al servidor
    submitNew() {
      axios
        .post("http://127.0.0.1:5000/estudiantes", this.newEstudiante)
        .then((response) => {
          // Agregar el nuevo estudiante a la lista actual de estudiantes
          this.estudiantes.push(response.data);
          this.displayDialogNew = false; // Cerrar el diálogo
          //console.log("Nuevo estudiante enviado:");
          //console.table(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Método para cancelar la creación de un nuevo estudiante
    cancelNew() {
      this.displayDialogNew = false;
      this.newEstudiante.estudiante_dni = "";
      this.newEstudiante.estudiante_nombre = "";
    },
    // Método para actualizar un estudiante
    updateEstudiante() {
      if (this.editData.estudiante_dni) {
        const data = {
          estudiante_dni: this.editData.estudiante_dni,
          estudiante_nombre: this.editData.estudiante_nombre,
        };

        axios
          .put(
            "http://127.0.0.1:5000/estudiantes/" + this.editData.estudiante_dni,
            data
          )
          .then((response) => {
            // Actualizar el estudiante en la lista actual de estudiantes
            const index = this.estudiantes.findIndex(
              (estudiante) =>
                estudiante.estudiante_dni === this.editData.estudiante_dni
            );
            if (index !== -1) {
              // Copiar los valores actualizados en el objeto correspondiente
              Object.assign(this.estudiantes[index], this.editData);
            }
            this.editData.estudiante_dni = null;
            this.editData.estudiante_nombre = "";
            this.displayEditDialog = false; // Cerrar el diálogo de edición
            //console.log("Estudiante actualizado:", response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // Método para cancelar la edición de un estudiante
    cancelEdit() {
      this.editData.estudiante_dni = null;
      this.editData.estudiante_nombre = "";
      this.displayEditDialog = false;
    },
  },
  mounted() {
    this.fetchEstudiantes();
  },
};
</script>
