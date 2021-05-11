'use strict';

export class Tree {
    
  
    constructor(){
        this.root = null;
    }
   
    /**helper method which creates a new node to 
     be inserted and calls insertNode */

    insert(parentNode,data){
        // Creating a node and initailising 
        // with data
        var newNode =   new Node(data);
         // root is null then node will
        // be added to the tree and made root.
        if(this.root === null && parentNode===null){
        // set the root node to zero
        newNode.nodeID = 1;
        this.root = newNode;
        }
        else {

            newNode.parentId = parentNode.nodeId;
            // check if Node has availspace

            if(this.nodeHasSpace(parentNode)){
                // place node in appropraite place
                this.placeNodeinAppropraitePos(parentNode,newNode)
            }
            else {
                // throw error
                throw (RangeError);
            }

           
           
        }
    }

    placeNodeinAppropraitePos(parentNode,node){

        if(parentNode.childNodes.right === null && parentNode.childNodes.left ===null){
            parentNode.childNodes.left = node;
            
        }
        else if(parentNode.childNodes.right === null && parentNode.childNodes.left !=null ){
            // compare and swap Nodes
            this.positionNode(parentNode,node)
        }

        else if(parentNode.childNodes.right != null && parentNode.childNodes.left ===null){
            // compare and swap Nodes
            this.positionNode(parentNode,node)
        }


    }


    positionNode (parentNode, node){
        
        var parentLeftNode = parentNode.childNodes.left;
      
        
        
        if(parentLeftNode.nodeId > node.nodeId){
            // add node to right
            parentNode.childNodes.right = parentLeftNode;
            parentNode.childNodes.left = node
        }
        else {
            parentNode.childNodes.right = node;
        }
 
    }

    nodeHasChildren(node){
        if(node.childNodes.left || node.childNodes.right){
            return true;
        }

        return false;
    }

    nodeHasSpace(node){
        if(node.childNodes.left && node.childNodes.right){
            return false;
        }

        return true;
    }

    //  remove node 
    remove(node){
        
        node.childNodes.right = null
        node.childNodes.left = null
        
    }


    swap(nodeX,nodeY){
        if(nodeX.nodeId != this.root.nodeId){
            var tempLabel = nodeX.nodeLabel
            nodeX.nodeLabel = nodeY.nodeLabel
            nodeY.nodeLabel = tempLabel
        }
    }
  




    // returns root of the tree
    getRootNode()
    {
        return this.root;
    }


    inorder(node)
        {
            if(node !== null)
            {
                this.inorder(node.childNodes.left);
                console.log(node.nodeId);
                this.inorder(node.childNodes.right);
            }
        }
}


export  class Node{
   

    constructor(data){
            this.nodeId = data.nodeId;
            this.parentId = data.parentId
            this.nodeLabel = data.nodeLabel
           this.childNodes = data.childNodes
    }

   
}

export  class ChildNodes{
   
    constructor(){
            
            this.left = null;
            this.right = null;

    }
}



