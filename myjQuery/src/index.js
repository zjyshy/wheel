window.$ = window.jQuery = function (selectorOrArray) {
  let elements;
  let array;

  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
    array = Array.from(elements);
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
    array = selectorOrArray;
  }
  const api = {
    addClass(className) {
      array.forEach((element) => {
        element.classList.add(className);
      });

      return this;
      //这里的this是api
      //因为addClass的运行环境就是在api里面
    },
    find(selector) {
      let arr = [];
      array.forEach((element) => {
        arr = arr.concat(Array.from(element.querySelectorAll(selector)));
      });
      arr.oldApi = this; //这一步的作用是为end可以返回上一步操作的对象
      let NApi = $(arr);
      return NApi;
    },
    each(fn) {
      array.forEach(fn);
      return this;
    },
    parent() {
      let arr = [];
      this.each((element) => {
        console.log(a);
        if (arr.indexOf(element.parentNode) === -1) {
          arr.push(element.parentNode);
        } else {
          console.log("重复了");
        }
      });
      arr.oldApi = this;
      return $(arr);
    },
    prints() {
      this.each((element) => {
        console.log(element);
      });
      return this;
    },
    children() {
      let arr = [];
      this.each((element) => {
        let child = Array.from(element.children);
        arr.push(...child);
      });

      arr.oldApi = this;
      return $(arr);
    },
    oldApi: selectorOrArray.oldApi,
    end() {
      //返回上一步操作的对象
      return this.oldApi;
    },
  };
  return api;
  //这里的this是window
  //因为第一次执行jQuery时，是在全局对象之中、
  //这里绝对不能使用this！！
  //这里的api其实可以不命名直接返回
};
