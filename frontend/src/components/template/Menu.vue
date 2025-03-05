<template>
  <aside class="menu" v-show="isMenuVisible">
    <Tree
      :value="treeData"
      class="w-full md:w-[30rem]"
      :filter="treeFilter"
      selectionMode="single"
      @node-select="onNodeSelect"
      ref="tree"
    />
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "primevue/tree";
import { baseApiUrl } from "@/global";
import axios from "axios";
export default {
  name: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible"]),
  data: function () {
    return {
      treeFilter: "",
      treeData: [],
      props: {
        key: "id",
        label: "name",
        children: "children",
        filter: {
          emptyText: "Categoria não encontrada",
        },
      },
    };
  },
  methods: {
    async getTreeData() {
      const url = `${baseApiUrl}/categories/tree`;
      const res = await axios.get(url);
      this.treeData = res.data.map((item) => this.formatTreeNode(item));
      console.log(this.treeData);
    },
    formatTreeNode(item) {
      return {
        key: item.id,
        label: item.name,
        to: `/categories/${item.id}/articles`,
        children:
          item.children && item.children.length > 0
            ? item.children.map((child) => this.formatTreeNode(child))
            : [],
      };
    },
    onNodeSelect(node) {
      if (node.to) {
        this.$router.push(node.to);
      }
    },
  },
  mounted() {
    this.getTreeData();
  },
};
</script>

<style>
.menu {
  grid-area: menu;
  background: var(--p-tree-background);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
