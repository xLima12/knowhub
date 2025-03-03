<template>
  <div class="category-admin">
    <BForm>
      <input id="category-id" type="hidden" v-model="category.id" />
      <BFormGroup label="Nome:" label-for="category-name">
        <BFormInput
          id="category-name"
          type="text"
          v-model="category.name"
          required
          placeholder="Informe o Nome da Categoria..."
          :readonly="mode === 'remove'"
        />
      </BFormGroup>
      <BFormGroup
        label="Categoria Pai:"
        labe-for="category-parent"
        v-show="mode === 'save'"
      >
        <BFormSelect
          id="category-parent"
          v-model="category.parentId"
          :options="categories"
          v-show="mode === 'save'"
        />
      </BFormGroup>
      <BButton variant="primary" v-if="mode === 'save'" @click="save"
        >Salvar</BButton
      >
      <BButton variant="danger" v-if="mode === 'remove'" @click="remove"
        >Excluir</BButton
      >
      <BButton class="m-2" @click="reset">Cancelar</BButton>
    </BForm>
    <BTable hover striped :items="categories" :fields="fields">
      <template #cell(actions)="data">
        <BButton
          variant="warning"
          @click="loadCategory(data.item)"
          class="me-2"
        >
          <i class="fa fa-pencil"></i>
        </BButton>
        <BButton variant="danger" @click="loadCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </BButton>
      </template>
    </BTable>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "CategoryAdmin",
  inject: ["showToast"],
  data: function () {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map((category) => {
          return { ...category, value: category.id, text: category.path };
        });
      });
    },
    reset() {
      (this.mode = "save"), (this.category = {}), this.loadCategories();
    },
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.showToast(null, "success");
          this.reset();
        })
        .catch((error) => {
          this.showToast(showError(error), "danger", "Erro");
        });
    },
    remove() {
      const id = this.category.id;
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.showToast(null, "success");
          this.reset();
        })
        .catch((error) => {
          this.showToast(showError(error), "danger", "Erro");
        });
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = { ...category };
    },
  },
  mounted() {
    this.loadCategories();
  },
};
</script>

<style></style>
