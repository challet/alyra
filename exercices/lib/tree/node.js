const SIDE_LEFT = 'left';
const SIDE_RIGHT = 'right';
const SIDE_BOTH = 'both';
const SIDE_ANY = 'any';
const MODE_INFIX = 'infix';
const MODE_PREFIX = 'prefix';
const MODE_POSTFIX = 'postfix';

class Node {
  
  constructor(data) {
    this.data = data;
    this.children = {
      left: null,
      right: null
    };
    this.parent = null;
    this.parent_side = null;
  }
  
  addSide(node, side) {
    if (this.hasChild(side)) {
      this.children[side].add(node);
    } else {
      this.children[side] = node;
      node.parent = this;
      node.parent_side = side;
    }
  }
  
  add(node) {
    let cmp = this.data.cmp(node.data);
    
    if (cmp == 0) {
      throw `${node.data} already exists in the tree`;
    } else if (cmp > 0) {
      // to left
      this.addSide(node, SIDE_LEFT);
    } else if (cmp < 0) {
      // to right
      this.addSide(node, SIDE_RIGHT);
    }
  }
  
  remove() {
    // actually remove 'this' node from its parent
    let former_parent = this.parent;
    if (this.parent != null) {
      this.parent.children[this.parent_side] = null;
      this.parent = null;
    }
    
    if (!this.hasChild(SIDE_ANY)) {
      // This node doesn't have children to be moved
      var replacement = null;
    } else if (this.hasChild(SIDE_BOTH)) {
      // The closest node is the replacement
      var replacement = this.findClosest();
    } else {
      // The single child is the replacement
      var replacement = [this.children[SIDE_LEFT], this.children[SIDE_RIGHT]].find( (c) => c != null );
    }
    
    if (replacement != null) {
      // remove it from its own subtree
      replacement.remove();
      // attach 'this' subtrees to the replacement
      if (this.hasChild(SIDE_LEFT)) {
        replacement.addSide(this.children[SIDE_LEFT], SIDE_LEFT);
      }
      if (this.hasChild(SIDE_RIGHT)) {
        replacement.addSide(this.children[SIDE_RIGHT], SIDE_RIGHT);
      }
      // attach it to the former 'this' parent
      if (former_parent != null) {
        former_parent.addSide(replacement, this.parent_side);
      }
    }
    
    return replacement;
  }
  
  find(data) {
    let cmp = this.data.cmp(data);
    if (this.data.cmp(data) == 0) {
      // it is found
      return this;
    } else if (!this.hasChild()) {
      // it is a dead-end
      return false;
    }
    
    if (cmp > 0) {
      // try to find on left
      return this.hasChild(SIDE_LEFT) ? this.children[SIDE_LEFT].find(data) : false;
    } else {
      // try to find on right
      return this.hasChild(SIDE_RIGHT) ? this.children[SIDE_RIGHT].find(data) : false;
    }
  }
  
  findGreatest() {
    // it is the further on right
    return this.hasChild(SIDE_RIGHT) ? this.children[SIDE_RIGHT] : this;
  }
  
  findLowest() {
    // it is the further on left
    return this.hasChild(SIDE_LEFT) ? this.children[SIDE_LEFT] : this;
  }
  
  findClosest() {
    if (!this.hasChild()) {
      return false;
    }
    
    // greatest on left
    let left = this.children[SIDE_LEFT].findGreatest();
    // lowest on right
    let right = this.children[SIDE_RIGHT].findLowest();
    
    // compare them
    if (this.data.cmp(left.data) + this.data.cmp(right.data) > 0) {
      return right;
    } else {
      return left;
    }
  }
  
  hasChild(side) {
    if (![SIDE_LEFT, SIDE_RIGHT, SIDE_BOTH, SIDE_ANY].includes(side)) {
      side = SIDE_ANY;
    }
    
    if (side == SIDE_BOTH) {
      return this.hasChild(SIDE_LEFT) && this.hasChild(SIDE_RIGHT);
    } else if (side == SIDE_ANY) { 
      return this.hasChild(SIDE_LEFT) || this.hasChild(SIDE_RIGHT);
    } else {
      return this.children[side] != null;
    }
  }
  
  findAll(mode) {
    // prepare parts to be assembled
    let left = this.hasChild(SIDE_LEFT) ? this.children[SIDE_LEFT].findAll(mode) : [];
    let right = this.hasChild(SIDE_RIGHT) ? this.children[SIDE_RIGHT].findAll(mode) : [];
    let self = [this];
    
    // asesmble them function of the traversal mode
    switch (mode) {
      case MODE_INFIX: default:
        return left.concat(self, right);
        break;
      case MODE_POSTFIX:
        return left.concat(right, self);
        break;
      case MODE_PREFIX:
        return self.concat(left, right);
        break;
    }
  }
  
  toString() {
    return this.data.toString();
  }
  
}

// add "constant like" class properties
Object.defineProperty(Node, 'SIDE_LEFT',    { value: SIDE_LEFT,     writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'SIDE_RIGHT',   { value: SIDE_RIGHT,    writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'SIDE_BOTH',    { value: SIDE_BOTH,     writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'SIDE_ANY',     { value: SIDE_ANY,      writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'MODE_INFIX',   { value: MODE_INFIX,    writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'MODE_PREFIX',  { value: MODE_PREFIX,   writable : false, enumerable : true, configurable : false });
Object.defineProperty(Node, 'MODE_POSTFIX', { value: MODE_POSTFIX,  writable : false, enumerable : true, configurable : false });

module.exports = Node;
