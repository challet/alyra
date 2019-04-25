const Node = require('./node.js');

class Tree {
  
  constructor() {
    this.root = null;
  }
  
  add(data) {
    let node = new Node(data);
    if (this.root == null) {
      this.root = node;
    } else {
      this.root.add(node);
    }
  }
  
  addList(list) {
    if (list.length == 0) {
      return;
    }
    
    list.sort( (a, b) => a.cmp(b) );
    
    // add the cenral data to the tree
    const middle = Math.floor(list.length / 2);
    this.add(list[middle]);
    
    // add each side sub list in the same manner
    this.addList(list.slice(0, middle));
    this.addList(list.slice(middle + 1, list.length));
  }
  
  find(data) {
    return this.root.find(data);
  }
  
  findAll(mode) {
    return this.root.findAll(mode);
  }
  
  remove(data) {
    var node = this.find(data);
    if (node) {
      let replacement = node.remove();
      if (node == this.root) {
        this.root = replacement;
      }
      return true;
    } else {
      return false;
    }
  }
  
  displayNodes(nodes) {
    console.log(nodes.map( (n) => n.toString() ));
  }
  
}


// add "constant like" class properties (copy them from Node)
Object.defineProperty(Node, 'SIDE_LEFT',    { value: Node.SIDE_LEFT,    writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'SIDE_RIGHT',   { value: Node.SIDE_RIGHT,   writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'SIDE_BOTH',    { value: Node.SIDE_BOTH,    writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'SIDE_ANY',     { value: Node.SIDE_ANY,     writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'MODE_INFIX',   { value: Node.MODE_INFIX,   writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'MODE_PREFIX',  { value: Node.MODE_PREFIX,  writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'MODE_POSTFIX', { value: Node.MODE_POSTFIX, writable : false, enumerable : true, configurable : false });

module.exports = Tree;