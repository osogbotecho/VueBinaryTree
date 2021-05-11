<template>
  <li v-if="node">
    <div class="node" >{{ node.nodeLabel }}</div>
    <p
      v-if="node.childNodes.left || node.childNodes.right"
      @click="removeSubNode(node)"
      class="removeSubNode"
    >-</p>
    <ul>
      <NodeView v-if="node.childNodes.left" :node="node.childNodes.left" class="left"></NodeView>
      <li v-else class="left" @click="addSubNode(node)">
        <div class="node is-null">{{ 'null' }}</div>
      </li>
      <NodeView v-if="node.childNodes.right" :node="node.childNodes.right" class="right"></NodeView>
      <li v-else class="right" @click="addSubNode(node)">
        <div class="node is-null">{{ 'null' }}</div>
      </li>
    </ul>
  </li>
</template>

<script>
import { EventBus } from "@/EventBus.js";
export default {
  name: "NodeView",

  data() {
    return {};
  },
  props: ["node"],

  methods: {
    addSubNode(data) {
      EventBus.$emit("onAddNode", data);
    },

    removeSubNode(data) {
      EventBus.$emit("onRemoveSubNode", data);
    },
  },
};
</script>

<style scoped>
    .removeSubNode{
          width: 20px;
    height: 20px;
    border: 1px solid rgb(119, 119, 119);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:auto
}
    
</style>
