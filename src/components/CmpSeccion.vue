<template>
  <div>
    <h1 class="titulo">CmpSeccion</h1>
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
    <DataTable :value="grupos" :paginator="true" :rows="10">
      <Column field="curso" header="Curso"></Column>
      <Column field="id_seccion" header="ID Sección"></Column>
      <Column field="nombre_seccion" header="Nombre de Sección"></Column>
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
            @click="confirmDeleteGrupo(slotProps.data.id_seccion)"
          />
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="displayDialogNew"
      header="Nuevo Grupo"
      :modal="true"
    >
      <form>
        <div class="p-field">
          <label for="nombre_seccion">Nombre de Sección </label>
          <InputText id="nombre_seccion" v-model="newGrupo.nombre_seccion" />
        </div>
        <div class="p-field">
          <label for="curso">Curso </label>
          <Dropdown
            id="curso"
            v-model="newGrupo.id_curso"
            :options="cursos"
            optionLabel="curso_nombre"
            optionValue="id_curso"
          />
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
    <Dialog
      v-model:visible="displayConfirmDialog"
      header="Confirmar eliminación"
      :modal="true"
    >
      <p>
        ¿Estás seguro de que deseas la seccion el grupo "{{
          selectedGrupo.nombre_seccion
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
    <Dialog
      v-model:visible="displayEditDialog"
      header="Editar Grupo"
      :modal="true"
    >
      <form>
        <div class="p-field">
          <label for="edit_id_seccion">ID Sección </label>
          <InputText
            disabled
            id="edit_id_seccion"
            v-model="editData.id_seccion"
          />
        </div>
        <div class="p-field">
          <label for="edit_nombre_seccion">Nombre de Sección </label>
          <InputText
            id="edit_nombre_seccion"
            v-model="editData.nombre_seccion"
          />
        </div>
        <div class="p-field">
          <label for="edit_curso">Curso </label>
          <Dropdown
            id="edit_curso"
            v-model="editData.id_curso"
            :options="cursos"
            optionLabel="curso_nombre"
            optionValue="id_curso"
          />
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      grupos: [],
      displayDialogNew: false,
      newGrupo: {
        nombre_seccion: "",
        id_curso: null,
      },
      displayConfirmDialog: false,
      selectedGrupo: null,
      displayEditDialog: false,
      editData: {
        id_seccion: null,
        nombre_seccion: "",
        id_curso: null,
      },
      cursos: [],
    };
  },
  methods: {
    fetchGrupos() {
      axios
        .post("http://127.0.0.1:5000/seccions")
        .then((response) => {
          this.grupos = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchCursos() {
      axios
        .post("http://127.0.0.1:5000/cursos")
        .then((response) => {
          this.cursos = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editGrupo(grupo) {
      this.editData.id_seccion = grupo.id_seccion;
      this.editData.nombre_seccion = grupo.nombre_seccion;
      this.editData.id_curso = grupo.id_curso;
      this.displayEditDialog = true;
    },
    confirmDeleteGrupo(idSeccion) {
      this.selectedGrupo = this.grupos.find(
        (grupo) => grupo.id_seccion === idSeccion
      );
      this.displayConfirmDialog = true;
    },
    cancelDelete() {
      this.selectedGrupo = null;
      this.displayConfirmDialog = false;
    },
    deleteGrupo() {
      if (this.selectedGrupo) {
        const idSeccion = this.selectedGrupo.id_seccion;
        axios
          .delete("http://127.0.0.1:5000/seccion", {
            data: { id_seccion: idSeccion },
          })
          .then((response) => {
            const index = this.grupos.findIndex(
              (grupo) => grupo.id_seccion === idSeccion
            );
            if (index !== -1) {
              this.grupos.splice(index, 1);
            }
            this.selectedGrupo = null;
            this.displayConfirmDialog = false;
            //console.log("Grupo eliminado:", response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    openNew() {
      this.displayDialogNew = true;
    },
    submitNew() {
      axios
        .put("http://127.0.0.1:5000/seccion", this.newGrupo)
        .then((response) => {
          this.grupos.push(response.data);
          this.displayDialogNew = false;
          //console.log("Nuevo grupo enviado:", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancelNew() {
      this.displayDialogNew = false;
      this.newGrupo.nombre_seccion = "";
      this.newGrupo.id_curso = null;
    },
    updateGrupo() {
      if (this.editData.id_seccion) {
        const data = {
          id_seccion: this.editData.id_seccion,
          nombre_seccion: this.editData.nombre_seccion,
          id_curso: this.editData.id_curso,
        };

        axios
          .patch("http://127.0.0.1:5000/seccion", data)
          .then((response) => {
            const index = this.grupos.findIndex(
              (grupo) => grupo.id_seccion === this.editData.id_seccion
            );
            if (index !== -1) {
              Object.assign(this.grupos[index], this.editData);
            }
            this.editData.id_seccion = null;
            this.editData.nombre_seccion = "";
            this.editData.id_curso = null;
            this.displayEditDialog = false;
            //console.log("Grupo actualizado:", response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    cancelEdit() {
      this.editData.id_seccion = null;
      this.editData.nombre_seccion = "";
      this.editData.id_curso = null;
      this.displayEditDialog = false;
    },
  },
  mounted() {
    this.fetchGrupos();
    this.fetchCursos();
  },
};
</script>
