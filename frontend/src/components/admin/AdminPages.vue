<template>
  <div class="admin-pages">
    <PageTitle
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="Cadastro & Cia"
    />
    <div class="admin-pages-tabs">
      <BCard no-body>
        <BTabs card>
          <BTab title="Artigos" active>
            <ArticleAdmin />
          </BTab>
          <BTab title="Categorias">
            <CategoryAdmin />
          </BTab>
          <BTab title="Usuários">
            <UserAdmin />
          </BTab>
        </BTabs>
      </BCard>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import ArticleAdmin from "./ArticlesAdmin";
import CategoryAdmin from "./CategoryAdmin";
import UserAdmin from "./UserAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin },
};
</script>

<style></style>
