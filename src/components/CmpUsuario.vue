<template>
<h1 class="titulo">CmpUsuario</h1>
    <!-- Barra de herramientas con botones para agregar y eliminar grupos -->
    <Toolbar class="mb-4">
            <Button label="Nuevo" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
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
    paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column field="usuario_dni" header="DNI" sortable ></Column>
        <Column field="usuario" header="Tipo Usuario" sortable ></Column>
        <Column field="usuario_nombre" header="Nombres" sortable ></Column>
        <Column field="usuario_apellido" header="Apellidos" sortable ></Column>
        <Column field="usuario_correo" header="Correo electronico" ></Column>
        <Column field="usuario_telefono" header="Telefono" ></Column>
        <Column field="usuario_vector" header="Vector" sortable ></Column>
        <!-- <Column field="usuario_ruta" header="Ruta Usuario"></Column> -->
            <!-- Columna con botones para editar y eliminar un grupo -->
        <Column header="">
            <template #body="slotProps">
            <Button icon="pi pi-pencil" severity="warning" @click="editUsuario(slotProps.data)" />
            <Button icon="pi pi-trash" severity="danger" @click="confirmDeleteUsuario(slotProps.data)" />
            </template>
        </Column>
    </DataTable>
    <!-- Dialogo para crear usuario-->
    <Dialog v-model:visible="displayDialogNew" header="Nuevo Usuario" :modal="true">
    <form>
    </form>
    </Dialog>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
        usuarios: [],// Array de usuarios
        selectedUsuario: null, // Usuario seleccionado para eliminar
        displayDialogNew: false, // Indica si el diálogo para agregar un nuevo usuario está visible
        };
    },
    mounted() {
        this.fetchUsuarios();
    },
    methods: {
    fetchUsuarios() {
        axios.post('http://127.0.0.1:5000/usuarios')
            .then(response => {
            this.usuarios = response.data;
            })
            .catch(error => {
            console.log(error);
            });
    },
    // other methods for adding, editing, and deleting users
    // Método para abrir el diálogo para agregar un nuevo usuario
    openNew() {
        this.displayDialogNew = true;
    },
    },
};
</script>