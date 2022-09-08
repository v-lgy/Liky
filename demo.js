function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function getDeep(root) {
    if (!root) return 0;
    const left = getDeep(root.left);
    const right = getDeep(root.right);
    return Math.max(left, right) + 1;
}

function isBalance(root) {
    if (!root) return true;
    const leftDeep = getDeep(root.left);
    const rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) > 1) {    // 不平衡
        return false;
    } else {
        return isBalance(root.left) && isBalance(root.right)
    }
}

function leftRotate(root) {
    const newRoot = root.right;
    root.right = newRoot.left;
    newRoot.left = root;
    return newRoot;
}

function rightRotate(root) {
    const newRoot = root.left;
    root.left = newRoot.right;
    newRoot.right = root;
    return newRoot;
}

function change(root) {
    if (!root) return;
    if (isBalance(root)) return root;
    root.left = change(root.left);
    root.right = change(root.right);
    const leftDeep = getDeep(root.left);
    const rightDeep = getDeep(root.right);
    if (leftDeep - rightDeep > 1) {
        const changeTreeDeep = getDeep(root.left.right);
        const noChangeTreeDeep = getDeep(root.left.left);
        if (changeTreeDeep > noChangeTreeDeep) {
            root.left = leftRotate(root.left);
        }
        return rightRotate(root);
    } else if (leftDeep - rightDeep < -1) {
        const changeTreeDeep = getDeep(root.right.left);
        const noChangeTreeDeep = getDeep(root.right.right);
        if (changeTreeDeep > noChangeTreeDeep) {
            root.right = rightRotate(root.right);
        }
        return leftRotate(root);
    }
    return root;
}

const number = [];
for (let i = 0; i < 1000000; i++) {
    number.push(Math.floor(Math.random() * 100000));
}

function addNode(root, n) {
    
    if(n < root.value) {
        if(root.left) {
            addNode(root.left, n);
        }else {
            root.left = new Node(n);
        }
    }else {
        if(root.right) {
            addNode(root.right, n);
        }else {
            root.right = new Node(n);
        }
    }
}

function buildSearchTree(number) {
    if (!number || number.length === 0) return;
    const root = new Node(number[0]);
    for (let i = 1; i < number.length; i++) {
        addNode(root, number[i]);
    }
    return root;
}

const root = buildSearchTree(number);

