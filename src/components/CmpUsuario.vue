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
            <Button icon="pi pi-pencil" severity="warning" @click="editUsuario(slotProps.data)" />
            <Button icon="pi pi-trash" severity="danger" @click="confirmDeleteUsuario(slotProps.data)" />
            </template>
        </Column>
        </DataTable>
        <!-- Diálogo para crear usuario -->
        <Dialog v-model:visible="displayDialogNew" header="Nuevo Usuario" :modal="true">
        <form @submit.prevent="submitUsuario">
            <div class="p-field">
            <label for="usuario_dni">DNI: </label>
            <InputNumber id="usuario_dni" v-model="nuevoUsuario.usuario_dni" required :mode="decimal" />
            </div><br />
            <div class="p-field">
            <label for="usuario_nombre">Nombres: </label>
            <InputText id="usuario_nombre" v-model="nuevoUsuario.usuario_nombre" required />
            </div><br />
            <div class="p-field">
            <label for="usuario_apellido">Apellidos: </label>
            <InputText id="usuario_apellido" v-model="nuevoUsuario.usuario_apellido" required />
            </div><br />
            <div class="p-field">
            <label for="usuario_telefono">Teléfono: </label>
            <InputNumber id="usuario_telefono" v-model="nuevoUsuario.usuario_telefono" required :mode="decimal" />
            </div><br />
            <div class="p-field">
            <label for="usuario_correo">Correo electrónico: </label>
            <InputText id="usuario_correo" v-model="nuevoUsuario.usuario_correo" required />
            </div><br />
            <div class="p-field">
            <label for="usuario_contraseña">Contraseña: </label>
            <InputText id="usuario_contraseña" v-model="nuevoUsuario.usuario_contraseña" required />
            </div><br />
            <div class="p-field">
            <label for="usuario_id_grupo_usuario">ID Grupo Usuario: </label>
            <Dropdown
                id="usuario_id_grupo_usuario"
                v-model="nuevoUsuario.usuario_id_grupo_usuario"
                :options="dropdownOptions"
                optionLabel="name"
                placeholder="Seleccione un Grupo"
            />
            </div><br />
            <div class="p-field">
            <label for="usuario_ruta">Ruta: </label>
            <InputText id="usuario_ruta" v-model="nuevoUsuario.usuario_ruta" required />
            </div><br />
            <div class="p-dialog-footer">
            <Button label="Cancelar" @click="cancelNew" />
            <Button type="submit" label="Guardar" icon="pi pi-check" class="p-button-success" />
            </div><br />
        </form>
        </Dialog>
</template>
    
<script>
    import axios from 'axios';
    
    export default {
        data() {
        return {
            usuarios: [], // Array de usuarios
            selectedUsuario: null, // Usuario seleccionado para eliminar
            displayDialogNew: false, // Indica si el diálogo para agregar un nuevo usuario está visible
            nuevoUsuario: {
            usuario_dni: null,
            usuario_nombre: '',
            usuario_apellido: '',
            usuario_telefono: null,
            usuario_correo: '',
            usuario_contraseña: '',
            usuario_id_grupo_usuario: null,
            usuario_ruta: '',
            },
            dropdownOptions: [
            { name: 'Administrador', code: 1 },
            { name: 'Docente', code: 2 },
            { name: 'Alumno', code: 3 },
            { name: 'Secretaria', code: 4 },
            ],
        };
        },
        mounted() {
        this.fetchUsuarios();
        },
        methods: {
        fetchUsuarios() {
            axios
            .post('http://127.0.0.1:5000/usuarios')
            .then((response) => {
                this.usuarios = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        // other methods for adding, editing, and deleting users
    
        // Método para abrir el diálogo para agregar un nuevo usuario
        openNew() {
            this.displayDialogNew = true;
        },
    
        // Método para cancelar la creación de un nuevo usuario
        cancelNew() {
            this.displayDialogNew = false;
            // Restablecer los campos del nuevo usuario
            this.nuevoUsuario = {
            usuario_dni: null,
            usuario_nombre: '',
            usuario_apellido: '',
            usuario_telefono: null,
            usuario_correo: '',
            usuario_contraseña: '',
            usuario_id_grupo_usuario: null,
            usuario_ruta: '',
            };
        },
    
        // Método para enviar los datos del nuevo usuario
        submitUsuario() {
            console.log('Nuevo usuario:');
            console.table(this.nuevoUsuario);
            // Aquí puedes enviar los datos al servidor utilizando axios.post() u otra lógica necesaria
            // Por ahora, solo mostraremos los datos en la consola
            this.cancelNew();
        },
        },
    };
</script>
    