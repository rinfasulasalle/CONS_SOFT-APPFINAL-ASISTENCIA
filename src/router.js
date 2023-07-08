import { createRouter, createWebHistory } from "vue-router";

// Importa tus componentes Vue
import CmpHome from "./components/CmpHome.vue";
import CmpAbout from "./components/CmpAbout.vue";

import CmpGrupoUsuario from "./components/CmpGrupoUsuario.vue";
import CmpUsuario from "./components/CmpUsuario.vue";
import CmpProfesor from "./components/CmpProfesor.vue";
import CmpEstudiante from "./components/CmpEstudiante";
import CmpCurso from "./components/CmpCurso.vue";
import CmpSeccion from "./components/CmpSeccion.vue";
import CmpHorario from "./components/CmpHorario.vue";
import CmpAsistencia from "./components/CmpAsistencia.vue";
const routes = [
  {
    path: "/",
    component: CmpHome,
  },
  {
    path: "/about",
    component: CmpAbout,
  },
  {
    path: "/GrupoUsuario",
    component: CmpGrupoUsuario,
  },
  {
    path: "/Usuario",
    component: CmpUsuario,
  },
  {
    path: "/CmpEstudiante",
    component: CmpEstudiante,
  },
  {
    path: "/Profesor",
    component: CmpProfesor,
  },
  {
    path: "/CmpCurso",
    component: CmpCurso,
  },
  {
    path: "/CmpSeccion",
    component: CmpSeccion,
  },
  {
    path: "/CmpHorario",
    component: CmpHorario,
  },
  {
    path: "/CmpAsistencia",
    component: CmpAsistencia,
  },
  {
    path: "/",
    component: CmpHome,
  },
  {
    path: "/",
    component: CmpHome,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
