// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/dom.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.dom = {
  CE: function CE(content) {
    //createElement/createElements
    //dom.CE("<div><div>123</div></div>")
    //支持嵌套
    //如果一次创建多个元素，返回一个数组，一个就返回一个元素
    var container = document.createElement("template");
    container.innerHTML = content.trim(); //string.trim()去掉字符串两边的空格

    var con = container.content.children;

    if (con.length === 1) {
      return container.content.firstChild;
    } else {
      var arr = [];
      arr = Array.from(con);
      console.log(arr);
      return arr;
    } //因为template会创建一个特殊的Document（没有父对象的最小文档对象）
    //template.content所返回的内容就是这个对象里面的元素（Element）

  },
  after: function after(target, sibling) {
    target.parentElement.insertBefore(sibling, target.nextElementSibling); //node.nextElementSibling和node.nextSibling第一个是只遍历元素，第二个是所有的节点
  },
  before: function before(target, sibling) {
    target.parentElement.insertBefore(sibling, target);
  },
  appendA: function appendA(target, child) {
    console.log(target);
    target.appendChild(child);
  },
  appendB: function appendB(target, child) {
    dom.before(target.firstChild, child);
  },
  wrap: function wrap(target, parent, model) {
    //两种模式，第一种是将元素放在新爸爸最后面，第二种是放最前面
    dom.before(target, parent);

    if (arguments.length === 3) {
      console.log(parent);
      dom.appendA(parent, target);
    } else {
      dom.appendB(parent, target);
    }
  },
  remove: function remove(target) {
    //有一个比较新的方法其实已经可以实现remove了，只是浏览器的支持度不高
    //node.remove();
    target.parentElement.removeChild(target);
    return target; //返回被删的内容
  },
  empty: function empty(target, model) {
    var arr = [];
    var r = null;
    console.log(model);

    if (model) {
      //只删除element
      var length = target.children.length;

      for (var i = 0; i < length; i++) {
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
  attr: function attr(target, name, value) {
    if (arguments.length === 3) {
      target.setAttribute(name, value);
    } else {
      return target.getAttribute(name);
    }
  },
  content: function content(target, str, model) {
    //HTML+text
    if (str === undefined) {
      console.log(target.innerContent);
      return target.innerHTML;
    } else {
      //为了预防目标元素中有其他内容
      //第一种是将内容放在原内容的后面
      if (model) target.innerHTML += str; //第二种是将内容放在原内容的前面
      else target.innerHTML = str + target.innerHTML;
    }
  },
  style: function style(target, content, value) {
    if (arguments.length === 3) {
      target.style[content] = value;
    } else {
      if (typeof content === "string") {
        return target[content];
      } else {
        for (var key in content) {
          target.style[key] = content[key];
        }
      }
    }
  },
  AC: function AC(target, value) {
    var _target$classList;

    //value 支持直接输入一个数组
    //...xxx叫展开语法
    if (Array.isArray(value)) (_target$classList = target.classList).add.apply(_target$classList, _toConsumableArray(value));else target.classList.add(value);
  },
  RC: function RC(target, value) {
    var _target$classList2;

    //也支持数组
    if (Array.isArray(value)) (_target$classList2 = target.classList).remove.apply(_target$classList2, _toConsumableArray(value));else target.classList.remove(value);
  },
  CC: function CC(target, targetClass, value) {
    target.classList.replace(targetClass, value);
  },
  on: function on(target, type, fn) {
    console.log("hehe");
    target.addEventListener(type, fn);
  },
  off: function off(target, type, fn) {
    target.removeEventListener(type, fn);
  },
  find: function find(str, target) {
    if (arguments.length === 2) {
      return target.querySelectorAll(str);
    } else {
      return document.querySelectorAll(str);
    }
  },
  parent: function parent(target) {
    //parentNode和parentElement没啥区别，
    //ParentNode是W3C的标准
    //parentElement是IE的标准
    return target.parentNode;
  },
  children: function children(target, childN) {
    //argument.length为2时，获取的是子节点
    //为1时获取的是子元素
    if (arguments.length === 2) {
      return target.childNodes;
    } else {
      return target.children;
    }
  },
  siblings: function siblings(target) {
    var brother = dom.parent(target).children;
    var arr = [];

    for (var i = 0; i < brother.length; i++) {
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
  next: function next(target) {
    return target.nextElementSibling;
  },
  previous: function previous(target) {
    return target.previousElementSibling;
  },
  each: function each(nodeList, fn) {
    for (var i = 0; nodeList.length; i++) {
      fn.call(null, nodeList[i], i);
    }
  },
  index: function index(target) {
    var brother = dom.parent(target).children;

    for (var i = 0; i < brother.length; i++) {
      if (brother[i] === target) {
        return i;
      }
    }
  }
};
},{}],"C:/Users/cswr/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51006" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/cswr/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/dom.js"], null)
//# sourceMappingURL=/dom.b63646c9.js.map