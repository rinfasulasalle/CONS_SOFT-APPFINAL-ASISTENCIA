import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import
import PrimeVue from "primevue/config";
//import "primevue/resources/themes/md-dark-indigo/theme.css";
//import "primevue/resources/themes/md-light-indigo/theme.css";
//import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
//import "primevue/resources/themes/viva-dark/theme.css";
import "primevue/resources/themes/mdc-dark-deeppurple/theme.css";
//import "primevue/resources/themes/viva-light/theme.css";
//core
import "primevue/resources/primevue.min.css";
//icons
import "primeicons/primeicons.css";

// cada componente se importa de forma separada +++++++++++++++++++++++++
import Button from "primevue/button";
import Dialog from "primevue/dialog";
// Router
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
//datatable
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional

import Dropdown from "primevue/dropdown";
import InputMask from "primevue/inputmask";
import Password from "primevue/password";
import FileUpload from "primevue/fileupload";
import InputNumber from "primevue/inputnumber";
const app = createApp(App);
app.use(PrimeVue);
app.use(router);
// aqui agregamos el componente ******************************************
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("Menubar", Menubar);
app.component("InputText", InputText);

app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);

app.component("Dropdown", Dropdown);
app.component("InputMask", InputMask);
app.component("Password", Password);
app.component("FileUpload", FileUpload);
app.component("InputNumber", InputNumber);
app.mount("#app");
