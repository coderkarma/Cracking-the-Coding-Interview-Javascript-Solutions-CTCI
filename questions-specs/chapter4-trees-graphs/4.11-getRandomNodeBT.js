'use strict';

import { TreeNode } from './helpers';

/*
  BALANCED TREE: TIME - O(log N) for insert, delete, find, and randomNode
  WORST CASE: O(N) TIME
*/

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

export class RandomTreeNode1 {
  constructor() {
    this.root = null;
    this.values = new Set();
  }

  insert(value) {
    this.values.add(value);

    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
    }
    else {
      let node = this.root, branch;

      while (node) {
        branch = this._branch(node.value, value);
        if (!node[branch]) break;
        node = node[branch];
      }
      newNode.parent = node;
      node[branch] = newNode;
    }
  }

  randomNode() {
    const values = [...this.values],
          randomIndex = Math.floor(Math.random() * values.length);

    return this.findNode(values[randomIndex]);
  }

  findNode(value) {
    let node = this.root;

    while (node) {
      if (node.value === value) return node;
      node = node[this._branch(node.value, value)];
    }

    return node;
  }

  delete(value) {
    this.values.delete(value);
    this._deleteNode(this.root, 'root', value);
  }

  _deleteNode(node, parentBranch, value) {
    if (node) {
      if (node.value === value) {
        if (!node.left && !node.right) {
          if (node.parent) node.parent[parentBranch] = null;
          else this.root = null;
        }
        else if ((node.left && !node.right) || (!node.left && node.right)) {
          const branch = node.left ? 'left' : 'right';
          if (node.parent) node.parent[parentBranch] = node[branch];
          else this.root = this.root[branch]; this.root.parent = null;
        }
        else {
          let minNode = node.right;
          while (minNode.left) minNode = minNode.left;
          node.value = minNode.value;

          // minNode.parent.left = minNode.right;
          this._deleteNode(node.right, 'right', minNode.value);
        }
      }
      else {
        const branch = this._branch(node.value, value);
        this._deleteNode(node[branch], branch, value);
      }
    }
  }

  _branch(nodeValue, value) {
    return value <= nodeValue ? 'left' : 'right';
  }

}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

class Node extends TreeNode {
  constructor(value) {
    super(value);
    this.size = 1;
  }
}

export class RandomTreeNode2 {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
    }
    else {
      let node = this.root, branch;

      while (node) {
        branch = this._branch(node.value, value);
        node.size++;
        if (!node[branch]) break;
        node = node[branch];
      }
      newNode.parent = node;
      node[branch] = newNode;
    }
  }

  findNode(value) {
    let node = this.root;

    while (node) {
      if (node.value === value) return node;
      node = node[this._branch(node.value, value)];
    }

    return node;
  }

  randomNode(node = this.root) {
    const leftSize = node.left ? node.left.size : 0,
    randomIndex = Math.floor(Math.random() * node.size);

    if (randomIndex < leftSize) return this.randomNode(node.left);
    else if (randomIndex === leftSize) return node;
    else return this.randomNode(node.right);
  }

  delete(value) {
    this._deleteNode(this.root, 'root', value);
  }

  _deleteNode(node, parentBranch, value) {
    if (node) {
      if (node.value === value) {
        if (!node.left && !node.right) {
          if (node.parent) node.parent[parentBranch] = null;
          else this.root = null;
        }
        else if ((node.left && !node.right) || (!node.left && node.right)) {
          const branch = node.left ? 'left' : 'right';
          if (node.parent) node.parent[parentBranch] = node[branch];
          else this.root = this.root[branch]; this.root.parent = null;
        }
        else {
          let minNode = node.right;
          while (minNode.left) minNode = minNode.left;
          node.value = minNode.value;
          node.size--;

          this._deleteNode(node.right, 'right', minNode.value);
        }
      }
      else {
        const branch = this._branch(node.value, value);
        node.size--;
        this._deleteNode(node[branch], branch, value);
      }
    }
  }

  _branch(nodeValue, value) {
    return value <= nodeValue ? 'left' : 'right';
  }

}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|
