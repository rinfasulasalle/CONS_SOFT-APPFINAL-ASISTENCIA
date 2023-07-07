<template>
  <h1 class="titulo">CmpHorarios</h1>
  <!-- Barra de herramientas con botones para agregar y eliminar horarios -->
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
      :disabled="!selectedHorario || !selectedHorario.length"
    />
  </Toolbar>
  <!-- Tabla que muestra los horarios -->
  <DataTable :value="horarios" :paginator="true" :rows="10">
    <Column field="id_horario" header="ID Horario"></Column>
    <Column field="id_seccion" header="ID Sección"></Column>
    <Column field="dia_semana" header="Día Semana"></Column>
    <Column field="hora_inicio" header="Hora Inicio"></Column>
    <Column field="hora_fin" header="Hora Fin"></Column>
    <Column field="seccion" header="Sección"></Column>
    <!-- Columna con botones para editar y eliminar un horario -->
    <Column header="">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          severity="warning"
          @click="editHorario(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteHorario(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
  <!-- Diálogo para agregar un nuevo horario -->
  <Dialog
    v-model:visible="displayDialogNew"
    header="Nuevo Horario"
    :modal="true"
  >
    <form>
      <div class="p-field">
        <label for="new_dia_semana">Día Semana </label>
        <Dropdown
          id="new_dia_semana"
          v-model="newHorario.dia_semana"
          :options="diasSemana"
          placeholder="Seleccione un día"
          optionLabel="label"
          optionValue="value"
        ></Dropdown>
      </div>
      <div class="p-field">
        <label for="new_hora_inicio">Hora Inicio </label>
        <Calendar
          id="calendar-timeonly"
          v-model="newHorario.hora_inicio"
          timeOnly
        />
      </div>
      <div class="p-field">
        <label for="new_hora_fin">Hora Fin </label>
        <Calendar
          id="calendar-timeonly"
          v-model="newHorario.hora_fin"
          timeOnly
        />
      </div>
      <div class="p-field">
        <label for="new_id_seccion">ID Sección </label>
        <Dropdown
          :options="secciones"
          optionLabel="id_seccion"
          optionValue="id_seccion"
          v-model="newHorario.id_seccion"
          placeholder="Seleccione una sección"
        ></Dropdown>
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
  <!-- Diálogo de confirmación para eliminar un horario -->
  <Dialog
    v-model:visible="displayConfirmDialog"
    header="Confirmar eliminación"
    :modal="true"
  >
    <p>
      ¿Estás seguro de que deseas eliminar el horario con ID "{{
        selectedHorario.id_horario
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
        @click="deleteHorario"
      />
    </div>
  </Dialog>
  <!-- Diálogo para editar un horario -->
  <Dialog
    v-model:visible="displayEditDialog"
    header="Editar Horario"
    :modal="true"
  >
    <form>
      <div class="p-field">
        <label for="edit_id_horario">ID Horario </label>
        <InputText
          disabled
          id="edit_id_horario"
          v-model="editData.id_horario"
        />
      </div>
      <div class="p-field">
        <label for="edit_id_seccion">ID Sección </label>
        <InputText id="edit_id_seccion" v-model="editData.id_seccion" />
      </div>
      <div class="p-field">
        <label for="edit_dia_semana">Día Semana </label>
        <Dropdown
          id="edit_dia_semana"
          v-model="editData.dia_semana"
          :options="diasSemana"
          placeholder="Seleccione un día"
          optionLabel="label"
          optionValue="value"
        ></Dropdown>
      </div>
      <div class="p-field">
        <label for="edit_hora_inicio">Hora Inicio </label>
        <Calendar
          id="calendar-timeonly"
          v-model="editData.hora_inicio"
          timeOnly
        />
      </div>
      <div class="p-field">
        <label for="edit_hora_fin">Hora Fin </label>
        <Calendar id="calendar-timeonly" v-model="editData.hora_fin" timeOnly />
      </div>
      <br />
      <div class="p-dialog-footer">
        <Button
          label="Guardar"
          icon="pi pi-check"
          class="p-button-success"
          @click="updateHorario"
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
  <!-- Horario generado -->
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      horarios: [], // Array de horarios
      secciones: [], // Array de secciones
      diasSemana: [
        { label: "Lunes", value: "Lunes" },
        { label: "Martes", value: "Martes" },
        { label: "Miércoles", value: "Miércoles" },
        { label: "Jueves", value: "Jueves" },
        { label: "Viernes", value: "Viernes" },
      ],
      displayDialogNew: false, // Indica si el diálogo para agregar un nuevo horario está visible
      newHorario: {
        // Objeto para almacenar los datos del nuevo horario
        dia_semana: "",
        hora_inicio: "",
        hora_fin: "",
        id_seccion: null,
      },
      displayConfirmDialog: false, // Indica si el diálogo de confirmación está visible
      selectedHorario: null, // Horario seleccionado para eliminar
      displayEditDialog: false, // Indica si el diálogo de edición está visible
      editData: {
        // Datos del horario seleccionado para editar
        id_horario: null,
        id_seccion: null,
        dia_semana: "",
        hora_inicio: "",
        hora_fin: "",
        seccion: "",
      },
    };
  },
  methods: {
    // Método para obtener los horarios desde el servidor
    fetchHorarios() {
      axios
        .post("http://127.0.0.1:5000/horarios")
        .then((response) => {
          this.horarios = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Método para obtener las secciones desde el servidor
    fetchSecciones() {
      axios
        .post("http://127.0.0.1:5000/seccions")
        .then((response) => {
          this.secciones = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Método para editar un horario
    editHorario(horario) {
      this.editData.id_horario = horario.id_horario;
      this.editData.id_seccion = horario.id_seccion;
      this.editData.dia_semana = horario.dia_semana;
      this.editData.hora_inicio = horario.hora_inicio;
      this.editData.hora_fin = horario.hora_fin;
      this.displayEditDialog = true;
    },
    // Método para confirmar la eliminación de un horario
    confirmDeleteHorario(horario) {
      this.selectedHorario = horario;
      this.displayConfirmDialog = true;
    },
    // Método para cancelar la eliminación de un horario
    cancelDelete() {
      this.selectedHorario = null;
      this.displayConfirmDialog = false;
    },
    // Método para eliminar un horario
    deleteHorario() {
      if (this.selectedHorario) {
        const idHorario = this.selectedHorario.id_horario;
        const data = { idHorario };
        console.log(data);
        axios
          .delete("http://127.0.0.1:5000/horario", { data })
          .then((response) => {
            // Eliminar el horario de la lista actual de horarios
            const index = this.horarios.findIndex(
              (horario) => horario.id_horario === idHorario
            );
            if (index !== -1) {
              this.horarios.splice(index, 1);
            }
            this.selectedHorario = null;
            this.displayConfirmDialog = false; // Cerrar el diálogo de confirmación
            //console.log("Horario eliminado:");
            //console.table(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // Método para abrir el diálogo para agregar un nuevo horario
    openNew() {
      this.displayDialogNew = true;
      this.fetchSecciones();
    },
    // Método para enviar el nuevo horario al servidor
    submitNew() {
      const data = {
        dia_semana: this.newHorario.dia_semana,
        hora_inicio: this.newHorario.hora_inicio,
        hora_fin: this.newHorario.hora_fin,
        id_seccion: this.newHorario.id_seccion,
      };

      axios
        .put("http://127.0.0.1:5000/horario", data)
        .then((response) => {
          // Agregar el nuevo horario a la lista actual de horarios
          this.horarios.push(response.data);
          this.displayDialogNew = false; // Cerrar el diálogo
          //console.log("Nuevo horario enviado:");
          //console.table(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Método para cancelar la creación de un nuevo horario
    cancelNew() {
      this.displayDialogNew = false;
      this.newHorario.dia_semana = "";
      this.newHorario.hora_inicio = "";
      this.newHorario.hora_fin = "";
      this.newHorario.id_seccion = null;
    },
    // Método para actualizar un horario
    updateHorario() {
      if (this.editData.id_horario) {
        const data = {
          id_horario: this.editData.id_horario,
          id_seccion: this.editData.id_seccion,
          dia_semana: this.editData.dia_semana,
          hora_inicio: this.editData.hora_inicio,
          hora_fin: this.editData.hora_fin,
          seccion: this.editData.seccion,
        };

        axios
          .patch("http://127.0.0.1:5000/horario", data)
          .then((response) => {
            // Actualizar el horario en la lista actual de horarios
            const index = this.horarios.findIndex(
              (horario) => horario.id_horario === data.id_horario
            );
            if (index !== -1) {
              // Copiar los valores actualizados en el objeto correspondiente
              Object.assign(this.horarios[index], this.editData);
            }
            this.editData.id_horario = null;
            this.editData.id_seccion = null;
            this.editData.dia_semana = "";
            this.editData.hora_inicio = "";
            this.editData.hora_fin = "";
            this.editData.seccion = "";
            this.displayEditDialog = false; // Cerrar el diálogo de edición
            //console.log("Horario actualizado:");
            //console.table(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // Método para cancelar la edición de un horario
    cancelEdit() {
      this.editData.id_horario = null;
      this.editData.id_seccion = null;
      this.editData.dia_semana = "";
      this.editData.hora_inicio = "";
      this.editData.hora_fin = "";
      this.editData.seccion = "";
      this.displayEditDialog = false;
    },
  },
  mounted() {
    this.fetchHorarios();
    this.fetchSecciones();
  },
};
</script>
