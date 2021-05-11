<template>
  <div id="app">
   <div class="binary-tree-container">
    <ul class="binary-tree">
      <NodeView class="root" :node="root_Node"/> 
    </ul>
  </div>



    <b-button id="show-btn" @click="showRootModal">Add Root</b-button>

    <b-modal ref="createRootModal" hide-footer title="Create Root Node">
      <div class="d-block">
        <b-form-group id="input-group-2" label="Root label" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="rootLabel"
          placeholder="Enter root label"
          required
        ></b-form-input>
      </b-form-group>


      </div>
      <b-button class="mt-3" variant="success"
      block @click="addRoot">Add Root</b-button>
      <!-- <b-button class="mt-2" variant="outline-warning" 
      block @click="toggleModal">Toggle Me</b-button> -->
    </b-modal>

    <b-modal ref="addNodeModal" hide-footer title="Add Node">
      <div class="d-block">

            <b-form-group id="input-group-2" label="Node Id" label-for="input-2">
            <p>
              <small class="text-danger">Node id determines node position on the tree, the smallest Node id is always to the left of tree.
              </small>
            </p>
            <b-form-input
              id="input-2"
              v-model="node.nodeId"
              placeholder="Enter node id"
              type="number"
              required
            ></b-form-input>
        </b-form-group>
       
        <b-form-group id="input-group-2" label="Node label" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="node.nodeLabel"
            placeholder="Enter node label"
            required
          ></b-form-input>
      </b-form-group>

   


      </div>
      <b-button class="mt-3" variant="success"
      block @click="addNode">Add Node</b-button>
      <!-- <b-button class="mt-2" variant="outline-warning" 
      block @click="toggleModal">Toggle Me</b-button> -->
    </b-modal>

   <!-- <HorizontalTree/> -->
    <button @click="viewTree"> Run Bts </button>
   

  </div>
</template>

<script>


import {Tree,Node, ChildNodes} from './DataStructure/Tree.js'
// import HorizontalTree from './components/HorizontalTreeStructure.vue'
import NodeView from './components/NodeView.vue'
import {EventBus} from '@/EventBus.js'
export default {
  name: 'App',
  components: {
  //  HorizontalTree,
   NodeView
  },

   data() {
    return {
      root_Node:null,
      BST: null,
      rootLabel:'',
      node:{
        nodeLabel:'',
        nodeId:''
      },
      parentNode:null,
    }
    
  },

  created(){
    this.BST = new Tree();

     EventBus.$on('onAddNode',(data)=>{
        console.log('selected node', data);
        this.parentNode = data
        // clear node data
        this.node.nodeLabel = ''
        this.node.nodeId = ''
    
         this.showNodeModal()

        // console.log('selected node', data);
     })

     EventBus.$on('onRemoveSubNode',(data)=>{
       this.BST.remove(data);
     })
    
  },

 
  methods:{
    addRoot(){
       this.BST = new Tree();
       console.log(this.BST,'bst');
       var rootNode = new Node({nodeId:1,parentId:0,nodeLabel:this.rootLabel,childNodes:new ChildNodes()});
       this.BST.insert(null,rootNode);
       this.root_Node = this.BST.getRootNode(); 
       console.log(this.root_Node,"rootNode");
       this.hideRootModal()
    },

    addNode(){
     
       var _Node = new Node({nodeId:this.node.nodeId,parentId:this.parentNode.nodeId,nodeLabel:this.node.nodeLabel,childNodes:new ChildNodes()});
       this.BST.insert(this.parentNode,_Node);
       this.root_Node = this.BST.getRootNode(); 
      
       this.hideNodeModal()
    },
    viewTree(){
        // var BST = new Tree();
          
        // // Inserting nodes to the BinarySearchTree
        // var rootNode = new Node({nodeId:1,parentId:0,nodeLabel:"root",childNodes:new ChildNodes()});
        // var node2 = new Node({nodeId:2,parentId:0,nodeLabel:"Node 2",childNodes:new ChildNodes()});
        // var node3 = new Node({nodeId:3,parentId:0,nodeLabel:"Node 3",childNodes:new ChildNodes()});
        // var node5 = new Node({nodeId:5,parentId:0,nodeLabel:"Node 5" ,childNodes:new ChildNodes()});
        // var node4 = new Node({nodeId:4,parentId:0,nodeLabel:"Node 4", childNodes:new ChildNodes()});
        // var node9 = new Node({nodeId:9,parentId:0,nodeLabel:"Node 9",childNodes:new ChildNodes()});
        // var node12 = new Node({nodeId:12,parentId:0,nodeLabel:"Node 12",childNodes:new ChildNodes()});
        // var node22 = new Node({nodeId:22,parentId:0,nodeLabel:"Node 13" , childNodes:new ChildNodes()});
        // BST.insert(null,rootNode);
        // BST.insert(rootNode,node2);
        // BST.insert(rootNode,node5);
        // BST.insert(node2,node3);
        // BST.insert(node2,node9);
        // BST.insert(node5,node4);
        // BST.insert(node5,node12);
        // BST.insert(node4,node22);
        
         this.BST.inorder( this.root_Node);
        
      },

      showRootModal() {
        this.$refs['createRootModal'].show()
      },
      hideRootModal() {
        this.$refs['createRootModal'].hide()
      },

       showNodeModal() {
        this.$refs['addNodeModal'].show()
      },
      hideNodeModal() {
        this.$refs['addNodeModal'].hide()
      },

      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
  },
  computed:{

  },

  watch:{
    BST:function(bst){

        this.root_Node = bst.getRootNode(); 
         bst.inorder( this.root_Node);
        console.log("watching for changes")
    }
  }
}


</script>

<style lang="scss" >
    @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');

  $bd-color: #73A1C3;
  $node-bg: #e5e5e5;
  $node-color: #0c2539;
  $node-shadow: #BABECC;
  $bd-size: 2px;

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background: $node-bg;
    font-family: 'Mukta', sans-serif;
  }

  .binary-tree {
    position: relative;
    padding: 8px;
    
    li {
      display: inline-block;
      position: relative;
      padding: 12px 8px;
      &.left::before,
      &.right::before {
        content: '';
        position: absolute;
        top: 0px;
        width: 50%;
        height: 12px;
        border-top: $bd-size solid $bd-color;
      }
      &.left::before {
        left: 50%;
        border-left: $bd-size solid $bd-color;
        border-radius: 8px 0 0 0;
      }
      &.right::before {
        right: 50%;
        border-right: $bd-size solid $bd-color;
        border-radius: 0 8px 0 0;
      }
      &.root {
        text-align: center;
      }
      .node {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 56px;
        // border-radius: 50%;
        font-size: 1rem;
        color: $node-color;
        background: $node-bg;
        box-shadow: 
          inset  2px  2px 2px $node-shadow,
          inset -2px -2px 2px white;
      }
      .is-null {
        opacity: 0.4;
      }
    }
    
    ul {
      position: relative;
      display: flex;
      margin-top: 12px;
      &::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        width: $bd-size;
        height: 12px;
        background-color: rgba($bd-color, 1);
      }

     
    }
  }

  .binary-tree-container {
    display: flex;
    justify-content: center;
  }

  h1 {
    position: absolute;
    right: 0;
    padding: 15px;
    font-size: 1.5rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px;

    input {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      padding: 5px;
      font-size: 1.2rem;
    }
    button {
      width: 100px;
      padding: 5px;
      margin-top: 5px;
      border: none;
      outline: none;
      border-radius: 40px;
      color: $node-color;
      background: $node-bg;
      box-shadow: 
        -2px -2px 5px white,
        2px  2px 5px $node-shadow;
      font-size: 1rem;
      cursor: pointer;
      transition: 0.5s;
      font-family: 'Noto Sans TC', sans-serif;
      &:hover {
        box-shadow: 
          inset  1px  1px 2px $node-shadow,
          inset -1px -1px 2px white;
      }
    }
  }

  .traversal {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 10px;
  }

  .radios {
    position: relative;
    display: flex;
    margin-bottom: 10px;
  }

  .radio {
    position: absolute;
    left: -9999px;
    /* 隱藏框框 */
    + label {
      padding: 5px 15px;
      margin-right: 5px;
      border: none;
      outline: none;
      border-radius: 40px;
      color: $node-color;
      background: $node-bg;
      box-shadow: 
        -2px -2px 10px white,
        2px  2px 5px $node-shadow;
      font-size: 1rem;
      cursor: pointer;
      transition: 0.5s;
      font-family: 'Noto Sans TC', sans-serif;
    }  
    &:focus + label, &:checked + label, + label:hover {
      box-shadow: 
        inset  2px  2px 2px $node-shadow,
        inset -1px -1px 2px white;
    }
  }


</style>
