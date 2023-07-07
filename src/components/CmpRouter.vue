<template>
  <div class="card relative z-2">
    <Menubar :model="items">
      <template #start>
        <img
          src="https://siberia.ulasalle.edu.pe/logo_ulasalle.gif"
          height="60"
        />
      </template>
      <template #end>
        <InputText placeholder="Search" type="text" />
      </template>
    </Menubar>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          items: [
            {
              label: "Home",
              icon: "pi pi-fw pi-align-justify",
              to: "/",
            },
            {
              label: "Base de datos",
              icon: "pi pi-fw pi-database",
              to: "/about",
            },
          ],
        },
        {
          label: "Gestión usuarios",
          icon: "pi pi-fw pi-user-edit",
          items: [
            {
              label: "GrupoUsuario",
              icon: "pi pi-fw pi-users",
              to: "/GrupoUsuario",
            },
            {
              label: "Usuario",
              icon: "pi pi-fw pi-user-plus",
              to: "/Usuario",
            },
            {
              label: "Estudiante",
              icon: "pi pi-fw pi-user-plus",
              to: "/CmpEstudiante",
            },
            {
              label: "Profesor",
              icon: "pi pi-fw pi-user-plus",
              to: "/Profesor",
            },
          ],
        },
        {
          label: "Gestion clases",
          icon: "pi pi-fw pi-database",
          items: [
            {
              label: "Curso",
              icon: "pi pi-fw pi-book",
              to: "/CmpCurso",
            },
            {
              label: "Seccion",
              icon: "pi pi-fw pi-folder",
              to: "/CmpSeccion",
            },
            {
              label: "Asistencia",
              icon: "pi pi-fw pi-check-square",
              to: "/",
            },
            {
              label: "Participacion",
              icon: "pi pi-fw pi-start",
              to: "/",
            },
          ],
        },
        {
          label: "Clasroom",
          icon: "pi pi-fw pi-calendar-plus",
          items: [
            {
              label: "Curso",
              icon: "pi pi-fw pi-book",
              to: "/CmpCurso",
            },
            {
              label: "Horario",
              icon: "pi pi-fw pi-calendar-plus",
              to: "/CmpHorario",
            },
          ],
        },

        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off",
        },
      ],
    };
  },
};
</script>
