import { createApp } from 'vue'
import App from './App.vue'

// import
import PrimeVue from 'primevue/config';
//import "primevue/resources/themes/md-dark-indigo/theme.css"; 
//import "primevue/resources/themes/md-light-indigo/theme.css"; 
//import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/themes/viva-dark/theme.css";
//import "primevue/resources/themes/viva-light/theme.css";
//core
import "primevue/resources/primevue.min.css";
//icons
import 'primeicons/primeicons.css';

// cada componente se importa de forma separada +++++++++++++++++++++++++
import Button from "primevue/button"


const app = createApp(App);
app.use(PrimeVue);

// aqui agregamos el componente ******************************************
app.component('Button', Button);




app.mount("#app")