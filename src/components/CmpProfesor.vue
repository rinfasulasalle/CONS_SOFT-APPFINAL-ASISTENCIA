<template>
    <h1 class="titulo">CmpProfesor</h1>
    <Toolbar class="mb-4">
        <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
        <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
    </Toolbar>
    <!-- TABLA-->
    <DataTable :value="grupos" :paginator="true" :rows="10">
        <Column field="id_grupo" header="ID Grupo"></Column>
        <Column field="nombre_grupo" header="Nombre Grupo"></Column>
        <Column header="Acciones">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" severity="warning" @click="editGrupo(slotProps.data)" />
                <Button icon="pi pi-trash" severity="danger" @click="confirmDeleteGrupo(slotProps.data)" />
            </template>
        </Column>
    </DataTable>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
        grupos: [],
        };
    },
    methods: {
        async fetchGrupos() {
        try {
            const response = await axios.post('http://127.0.0.1:5000/grupoUsuarios');
            this.grupos = response.data;
        } catch (error) {
            console.error(error);
        }
        },
        editGrupo(grupo) {
        // Lógica para editar un grupo
        },
        confirmDeleteGrupo(grupo) {
        // Lógica para confirmar la eliminación de un grupo
        },
    },
    mounted() {
        this.fetchGrupos();
    },
    };
</script>