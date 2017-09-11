const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        var newNode = new Node(data);
        if(this.isEmpty()) {
            this._head = this._tail = newNode;
        } else {
            newNode.prev = this._tail;
            newNode.next = null;

            this._tail.next = newNode;
            this._tail = newNode;
            
        }
        this.length++;
        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        var node = this.atNode(index)
        return node ? node.data : null;
    }

    atNode(index) {
        var result = this._head;
        for(var i = 0; i < index; i++) {
            result = result.next;
        }
        return result;
    }

    insertAt(index, data) {
        var newNode = new Node(data);
        if(this.isEmpty()) {
            this._head = this._tail = newNode;
        } else {     
            var node = this.atNode(index);

            newNode.next = node;
            if (node.prev === null) {
                newNode.prev  = null;
                this._head  = newNode;
            } else {
                newNode.prev  = node.prev;
                node.prev.next  = newNode;
            }
            node.prev = newNode;
        }
        this.length ++;       
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        var node = this.atNode(index);
        if(node.prev === null && node.next === null) {
            this._head = this._tail = null;
        } else if(node.prev === null) {
            node.next.prev = null;
            this._head = node.next;           
        } else if (node.next === null) {
            node.prev.next = null;
            this._tail = node.prev;
        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        this.length--;

        return this;
    }

    reverse() {
        var curr = this._head;
        for(var i = 0; i < this.length; i++) {
            var next = curr.next;
            curr.next = curr.prev;
            curr.prev = next;

            curr = curr.prev;
        }
        var head = this._head;
        this._head = this._tail;
        this._tail = head;

        return this;
    }

    indexOf(data) {
        var curr = this._head;
        for(var index = 0; index < this.length; index ++) {
            if(curr.data === data) {
                return index;
            } 
            curr = curr.next;
        }       
        return -1;        
    }
}

module.exports = LinkedList;
