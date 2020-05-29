window.dom = {
  CE(content) {
    //createElement/createElements
    //dom.CE("<div><div>123</div></div>")
    //支持嵌套
    //如果一次创建多个元素，返回一个数组，一个就返回一个元素

    let container = document.createElement("template");
    container.innerHTML = content.trim(); //string.trim()去掉字符串两边的空格

    let con = container.content.children;
    if (con.length === 1) {
      return container.content.firstChild;
    } else {
      let arr = [];
      arr = Array.from(con);
      console.log(arr);
      return arr;
    }

    //因为template会创建一个特殊的Document（没有父对象的最小文档对象）
    //template.content所返回的内容就是这个对象里面的元素（Element）
  },
  after(target, sibling) {
    target.parentElement.insertBefore(sibling, target.nextElementSibling);
    //node.nextElementSibling和node.nextSibling第一个是只遍历元素，第二个是所有的节点
  },
  before(target, sibling) {
    target.parentElement.insertBefore(sibling, target);
  },
  appendA(target, child) {
    console.log(target);
    target.appendChild(child);
  },
  appendB(target, child) {
    dom.before(target.firstChild, child);
  },
  wrap(target, parent, model) {
    //两种模式，第一种是将元素放在新爸爸最后面，第二种是放最前面
    dom.before(target, parent);
    if (arguments.length === 3) {
      console.log(parent);
      dom.appendA(parent, target);
    } else {
      dom.appendB(parent, target);
    }
  },
  remove(target) {
    //有一个比较新的方法其实已经可以实现remove了，只是浏览器的支持度不高
    //node.remove();
    target.parentElement.removeChild(target);
    return target; //返回被删的内容
  },
  empty(target, model) {
    let arr = [];
    let r = null;
    console.log(model);
    if (model) {
      //只删除element
      let length = target.children.length;
      for (let i = 0; i < length; i++) {
        console.log(target.firstElementChild);
        r = dom.remove(target.firstElementChild);

        arr.push(r);
      }
    } else {
      //这种会删除全部的Node
      //还有while的写法和上面的都可以推荐下面这一种
      while (target.firstChild) {
        r = dom.remove(target.firstChild);

        arr.push(r);
      }
    }

    return arr;
  },
  attr(target, name, value) {
    if (arguments.length === 3) {
      target.setAttribute(name, value);
    } else {
      return target.getAttribute(name);
    }
  },
  content(target, str, model) {
    //HTML+text
    if (str === undefined) {
      console.log(target.innerContent);
      return target.innerHTML;
    } else {
      //为了预防目标元素中有其他内容
      //第一种是将内容放在原内容的后面
      if (model) target.innerHTML += str;
      //第二种是将内容放在原内容的前面
      else target.innerHTML = str + target.innerHTML;
    }
  },
  style(target, content, value) {
    if (arguments.length === 3) {
      target.style[content] = value;
    } else {
      if (typeof content === "string") {
        return target[content];
      } else {
        for (let key in content) {
          target.style[key] = content[key];
        }
      }
    }
  },
  AC(target, value) {
    //value 支持直接输入一个数组
    //...xxx叫展开语法
    if (Array.isArray(value)) target.classList.add(...value);
    else target.classList.add(value);
  },
  RC(target, value) {
    //也支持数组
    if (Array.isArray(value)) target.classList.remove(...value);
    else target.classList.remove(value);
  },
  CC(target, targetClass, value) {
    target.classList.replace(targetClass, value);
  },
  on(target, type, fn) {
    console.log("hehe");
    target.addEventListener(type, fn);
  },
  off(target, type, fn) {
    target.removeEventListener(type, fn);
  },
  find(str, target) {
    if (arguments.length === 2) {
      return target.querySelectorAll(str);
    } else {
      return document.querySelectorAll(str);
    }
  },
  parent(target) {
    //parentNode和parentElement没啥区别，
    //ParentNode是W3C的标准
    //parentElement是IE的标准
    return target.parentNode;
  },
  children(target, childN) {
    //argument.length为2时，获取的是子节点
    //为1时获取的是子元素
    if (arguments.length === 2) {
      return target.childNodes;
    } else {
      return target.children;
    }
  },
  siblings(target) {
    let brother = dom.parent(target).children;
    let arr = [];
    for (let i = 0; i < brother.length; i++) {
      if (brother[i] !== target) {
        arr.push(brother[i]);
      }
    }
    if (arr.length === 0) {
      console.log("它没有兄弟");
    } else {
      return arr;
    }
  },
  next(target) {
    return target.nextElementSibling;
  },
  previous(target) {
    return target.previousElementSibling;
  },
  each(nodeList, fn) {
    for (let i = 0; nodeList.length; i++) {
      fn.call(null, nodeList[i], i);
    }
  },
  index(target) {
    let brother = dom.parent(target).children;

    for (let i = 0; i < brother.length; i++) {
      if (brother[i] === target) {
        return i;
      }
    }
  },
};
