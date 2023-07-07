<template>
  <div class="classroom-container">
    <h1 class="classroom-title">CmpCurso</h1>

    <form @submit.prevent="crearCurso" class="p-mb-3 classroom-form">
      <h3 class="classroom-subtitle">Crear Nuevo Curso</h3>
      <div class="p-field classroom-input-container">
        <label for="curso_nombre" class="classroom-label"
          >Nombre del Curso</label
        >
        <InputText
          id="curso_nombre"
          v-model="nombreCurso"
          class="classroom-input"
          required
        />
        <button
          type="submit"
          class="p-button p-button-success classroom-button"
        >
          Crear Curso
        </button>
      </div>
    </form>

    <div class="classroom-course-container p-d-flex p-flex-stretch">
      <div
        v-for="curso in cursos"
        :key="curso.id_curso"
        class="curso-item classroom-course"
        @click="seleccionarCurso(curso)"
      >
        <h3>{{ curso.curso_nombre }}</h3>
        <p>Id del curso: {{ curso.id_curso }}</p>
        <Button
          class="p-button-danger classroom-button"
          icon="pi pi-trash"
          @dblclick="eliminarCurso(curso.id_curso)"
        >
        </Button>
        <p v-if="cursoSeleccionado === curso">
          Un clic para editar,doble para eliminar.
        </p>
      </div>
    </div>

    <form
      @submit.prevent="editarCurso"
      class="p-mb-3 classroom-form"
      v-if="cursoSeleccionado"
    >
      <h3 class="classroom-subtitle">Editar Curso</h3>
      <div class="p-field classroom-input-container">
        <label for="curso_nombre" class="classroom-label"
          >Nombre del Curso</label
        >
        <InputText
          id="curso_nombre"
          v-model="cursoSeleccionado.curso_nombre"
          class="classroom-input"
          required
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { InputText } from "primevue/inputtext";

export default {
  components: {
    InputText,
  },
  data() {
    return {
      cursos: [],
      nombreCurso: "",
      cursoSeleccionado: null,
    };
  },
  mounted() {
    this.obtenerCursos();
  },
  methods: {
    obtenerCursos() {
      axios
        .post("http://127.0.0.1:5000/cursos")
        .then((response) => {
          this.cursos = response.data;
          console.table(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los cursos:", error);
        });
    },
    crearCurso() {
      axios
        .put("http://127.0.0.1:5000/curso", { nombre_curso: this.nombreCurso })
        .then((response) => {
          console.log("Curso creado:", response.data);
          this.nombreCurso = ""; // Reiniciar el campo del nombre del curso después de crearlo
          this.obtenerCursos(); // Volver a obtener la lista de cursos para refrescarla
        })
        .catch((error) => {
          console.error("Error al crear el curso:", error);
        });
    },
    eliminarCurso(idCurso) {
      axios
        .delete("http://127.0.0.1:5000/curso", { data: { id_curso: idCurso } })
        .then((response) => {
          console.log("Curso eliminado:", response.data);
          this.obtenerCursos(); // Refresh the course list
        })
        .catch((error) => {
          console.error("Error al eliminar el curso:", error);
        });
    },
    seleccionarCurso(curso) {
      if (this.cursoSeleccionado === curso) {
        this.eliminarCurso(curso.id_curso);
      } else {
        this.cursoSeleccionado = curso;
      }
    },
    editarCurso() {
      axios
        .post("http://127.0.0.1:5000/editar-curso", {
          curso: this.cursoSeleccionado,
        })
        .then((response) => {
          console.log("Curso editado:", response.data);
          this.cursoSeleccionado = null; // Limpiar el curso seleccionado después de editar
          this.obtenerCursos(); // Volver a obtener la lista de cursos para refrescarla
        })
        .catch((error) => {
          console.error("Error al editar el curso:", error);
        });
    },
  },
};
</script>

<style scoped>
.classroom-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0px;
}

.classroom-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.classroom-subtitle {
  font-size: 18px;
  margin-bottom: 10px;
}

.classroom-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.classroom-input-container {
  display: flex;
  align-items: center;
}

.classroom-label {
  margin-right: 10px;
}

.classroom-input {
  flex: 1;
}

.classroom-button {
  margin-left: 10px;
}

.classroom-course-container {
  margin-top: 20px;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 20px;
}

.classroom-course {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
</style>
