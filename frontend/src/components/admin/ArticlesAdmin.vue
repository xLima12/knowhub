<template>
  <div class="article-admin">
    <BForm>
      <input id="article-id" type="hidden" v-model="article.id" />
      <BFormGroup label="Nome:" label-for="article-name">
        <BFormInput
          id="article-name"
          type="text"
          v-model="article.name"
          required
          placeholder="Informe o Nome da Artigo..."
          :readonly="mode === 'remove'"
        />
      </BFormGroup>
      <BFormGroup label="Descrição:" label-for="article-description">
        <BFormInput
          id="article-description"
          type="text"
          v-model="article.description"
          required
          placeholder="Informe a Descrição do Artigo..."
          :readonly="mode === 'remove'"
        />
      </BFormGroup>
      <BFormGroup
        label="Imagem (URL):"
        label-for="article-imageUrl"
        v-show="mode === 'save'"
      >
        <BFormInput
          id="article-imageUrl"
          type="text"
          v-model="article.imageUrl"
          required
          placeholder="Informe o URL da Imagem..."
          v-show="mode === 'save'"
        />
      </BFormGroup>
      <BFormGroup
        label="Categoria:"
        labe-for="article-categoryId"
        v-show="mode === 'save'"
      >
        <BFormSelect
          id="article-parent"
          v-model="article.categoryId"
          :options="categories"
          v-show="mode === 'save'"
        />
      </BFormGroup>
      <BFormGroup
        label="Autor:"
        labe-for="article-userId"
        v-show="mode === 'save'"
      >
        <BFormSelect
          id="article-parent"
          v-model="article.userId"
          :options="users"
          v-show="mode === 'save'"
        />
      </BFormGroup>
      <BFormGroup
        label="Conteúdo:"
        labe-for="category-content"
        v-show="mode === 'save'"
      >
        <quill-editor
          ref="quillEditor"
          v-model="article.content"
          theme="snow"
          toolbar="essential"
          @text-change="onContentChange"
          v-show="mode === 'save'"
        ></quill-editor>
      </BFormGroup>
      <BButton variant="primary" v-if="mode === 'save'" @click="save"
        >Salvar</BButton
      >
      <BButton variant="danger" v-if="mode === 'remove'" @click="remove"
        >Excluir</BButton
      >
      <BButton class="m-2" @click="reset">Cancelar</BButton>
    </BForm>
    <BTable hover striped :items="articles" :fields="fields">
      <template #cell(actions)="data">
        <BButton variant="warning" @click="loadArticle(data.item)" class="me-2">
          <i class="fa fa-pencil"></i>
        </BButton>
        <BButton variant="danger" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </BButton>
      </template>
    </BTable>
    <BPagination
      v-model="page"
      :total-rows="count"
      :per-page="limit"
      size="sm"
      pills
      align="center"
    />
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "ArticleAdmin",
  inject: ["showToast"],
  components: { QuillEditor },
  data: function () {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    onContentChange() {
      if (this.$refs.quillEditor) {
        this.article.content = this.$refs.quillEditor.getHTML();
      }
    },
    loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then((res) => {
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      (this.mode = "save"),
        (this.article = {}),
        this.$refs.quillEditor.setHTML(""),
        this.loadArticles();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.showToast(null, "success");
          this.reset();
        })
        .catch((error) => {
          this.showToast(showError(error), "danger", "Erro");
        });
    },
    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.showToast(null, "success");
          this.reset();
        })
        .catch((error) => {
          this.showToast(showError(error), "danger", "Erro");
        });
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      axios.get(`${baseApiUrl}/articles/${article.id}`).then((res) => {
        this.article = res.data;
        this.$nextTick(() => {
          if (this.$refs.quillEditor) {
            this.$refs.quillEditor.setHTML(this.article.content || "");
          }
        });
      });
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map((category) => {
          return { value: category.id, text: category.path };
        });
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },
  },
  watch: {
    page() {
      this.loadArticles();
    },
  },
  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUsers();
  },
};
</script>

<style></style>
