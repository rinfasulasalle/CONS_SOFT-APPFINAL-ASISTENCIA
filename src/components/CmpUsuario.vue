<template>
  <h1 class="titulo">CmpUsuario</h1>
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
      :disabled="!selectedUsuario || !selectedUsuario.length"
    />
  </Toolbar>
  <!-- Tabla que muestra los usuarios -->
  <DataTable
    :value="usuarios"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    tableStyle="min-width: 50rem"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
  >
    <Column field="usuario_dni" header="DNI" sortable></Column>
    <Column field="usuario" header="Tipo Usuario" sortable></Column>
    <Column field="usuario_nombre" header="Nombres" sortable></Column>
    <Column field="usuario_apellido" header="Apellidos" sortable></Column>
    <Column field="usuario_correo" header="Correo electrónico"></Column>
    <Column field="usuario_telefono" header="Teléfono"></Column>
    <Column field="usuario_vector" header="Vector" sortable></Column>
    <!-- <Column field="usuario_ruta" header="Ruta Usuario"></Column> -->
    <!-- Columna con botones para editar y eliminar un grupo -->
    <Column header="">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          severity="warning"
          @click="editUsuario(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteUsuario(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
  <!-- Diálogo para crear usuario -->
  <Dialog
    v-model:visible="displayDialogNew"
    header="Nuevo Usuario"
    :modal="true"
  >
    <form @submit.prevent="submitUsuario">
      <div class="p-field">
        <label for="usuario_dni">DNI: </label>
        <InputNumber
          id="usuario_dni"
          v-model="nuevoUsuario.usuario_dni"
          inputId="withoutgrouping"
          :useGrouping="false"
        />
      </div>
      <br />
      <div class="p-field">
        <label for="usuario_nombre">Nombres: </label>
        <InputText
          id="usuario_nombre"
          v-model="nuevoUsuario.usuario_nombre"
          required
        />
      </div>
      <br />
      <div class="p-field">
        <label for="usuario_apellido">Apellidos: </label>
        <InputText
          id="usuario_apellido"
          v-model="nuevoUsuario.usuario_apellido"
          required
        />
      </div>
      <br />
      <div class="p-field">
        <label for="usuario_telefono">Teléfono: </label>
        <InputNumber
          id="usuario_telefono"
          v-model="nuevoUsuario.usuario_telefono"
          placeholder="999 999 999"
          required
          :mode="decimal"
          :useGrouping="false"
        />
      </div>
      <br />
      <br />
      <div class="p-field">
        <label for="usuario_correo">Correo electrónico: </label>
        <InputText
          id="usuario_correo"
          v-model="nuevoUsuario.usuario_correo"
          required
          title=" Ingresa un email valido"
          placeholder="example@example.com"
        />
      </div>
      <br />
      <div class="p-field">
        <label for="usuario_id_grupo_usuario">ID Grupo Usuario: </label>
        <Dropdown
          id="usuario_id_grupo_usuario"
          v-model="nuevoUsuario.usuario_id_grupo_usuario"
          :options="dropdownOptions"
          optionLabel="name"
          optionValue="code"
          placeholder="Seleccione un Grupo"
        />
      </div>
      <br />
      <div class="p-field">
        <label for="usuario_ruta">Ruta: </label>
        <input
          type="file"
          id="usuario_ruta"
          ref="fileInput"
          @change="handleFileUpload"
        />
      </div>
      <br />
      <div class="p-dialog-footer">
        <Button label="Cancelar" @click="cancelNew" />
        <Button
          type="submit"
          label="Guardar"
          icon="pi pi-check"
          class="p-button-success"
        />
      </div>
      <br />
    </form>
  </Dialog>

  <!-- Diálogo de confirmación para eliminar usuario -->
  <Dialog
    v-model:visible="displayConfirmDialog"
    header="Confirmar eliminación"
    :modal="true"
  >
    <p>
      ¿Estás seguro de que deseas eliminar el usuario con DNI "{{
        selectedUsuario.usuario_dni
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
        @click="deleteUsuario"
      />
    </div>
  </Dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: [], // Array de usuarios
      selectedUsuario: null, // Usuario seleccionado para eliminar
      displayDialogNew: false, // Indica si el diálogo para agregar un nuevo usuario está visible
      displayConfirmDialog: false, // Indica si el diálogo de confirmación de eliminación está visible
      nuevoUsuario: {
        usuario_dni: null,
        usuario_nombre: "",
        usuario_apellido: "",
        usuario_telefono: null,
        usuario_correo: "",
        usuario_contraseña: "",
        usuario_id_grupo_usuario: null,
        usuario_ruta: "",
      },
      dropdownOptions: [], // Array para almacenar los grupos de usuarios
    };
  },
  mounted() {
    this.fetchUsuarios();
    this.fetchGruposUsuarios(); //Para cargar los GruposUsuarios
  },
  methods: {
    // Método para obtener la lista de usuarios desde el servidor
    fetchUsuarios() {
      axios
        .post("http://127.0.0.1:5000/usuarios")
        .then((response) => {
          this.usuarios = response.data;
        })
        .catch((error) => {
          //console.log(error);
        });
    },

    // Método para abrir el diálogo para agregar un nuevo usuario
    openNew() {
      this.displayDialogNew = true;
    },

    // Método para obtener los grupos de usuarios desde el servidor
    fetchGruposUsuarios() {
      axios
        .post("http://127.0.0.1:5000/grupoUsuarios")
        .then((response) => {
          this.dropdownOptions = response.data.map((grupo) => ({
            name: grupo.nombre_grupo,
            code: grupo.id_grupo,
          }));
        })
        .catch((error) => {
          //console.log(error);
        });
    },

    // Método para cancelar la creación de un nuevo usuario
    cancelNew() {
      this.displayDialogNew = false;
      // Restablecer los campos del nuevo usuario
      this.nuevoUsuario = {
        usuario_dni: null,
        usuario_nombre: "",
        usuario_apellido: "",
        usuario_telefono: null,
        usuario_correo: "",
        usuario_contraseña: "",
        usuario_id_grupo_usuario: null,
        usuario_ruta: "",
      };
    },

    // Método para manejar la subida de archivos
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.uploadFile(file);
    },

    // Método para subir el archivo al servidor
    uploadFile(file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost:81/openfaceAPI", formData)
        .then((response) => {
          const usuario_vector = response.data.result;
          //console.log("xds");
          //console.log("a", formData.usuario_ruta);
          //console.log(usuario_vector);
          //this.nuevoUsuario.usuario_ruta = usuario_vector;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // Método para enviar los datos del nuevo usuario
    submitUsuario() {
      //console.log("Nuevo usuario:");
      //console.table(this.nuevoUsuario);

      axios
        .put("http://127.0.0.1:5000/usuario", this.nuevoUsuario)
        .then((response) => {
          //console.log("Usuario guardado:", response.data);
          this.fetchUsuarios(); // Actualizar la lista de usuarios después de guardar
          this.cancelNew();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // Método para abrir el diálogo de confirmación de eliminación de usuario
    confirmDeleteUsuario(usuario) {
      this.selectedUsuario = usuario;
      this.displayConfirmDialog = true;
    },

    // Método para cancelar la eliminación de usuario
    cancelDelete() {
      this.displayConfirmDialog = false;
    },

    // Método para eliminar el usuario seleccionado
    deleteUsuario() {
      axios
        .delete("http://127.0.0.1:5000/usuario", {
          data: {
            usuario_dni: this.selectedUsuario.usuario_dni,
          },
        })
        .then((response) => {
          //console.log("Usuario eliminado:", response.data);
          this.fetchUsuarios(); // Actualizar la lista de usuarios después de eliminar
          this.displayConfirmDialog = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
