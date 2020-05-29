let te = dom.CE("<div>hey<p>hehe</p></div>");
window.temp.append(te);

dom.after(window.EB, dom.CE("<div>I'm younger brother</div>"));
dom.before(window.YB, dom.CE("<div>I'm younger brother</div>"));
dom.appendB(window.fatherB, dom.CE("<div>I'm son</div>"));

dom.appendA(window.fatherA, dom.CE("<div>I'm son</div>"));

//如果父元素不是空的，第一个会把儿子放最后，第二个会把儿子放最前面
dom.wrap(window.son1, dom.CE("<div>I'm father one</div>"), 1);
dom.wrap(window.son2, dom.CE("<div>I'm father two</div>"));

dom.remove(window.son3);
let emp = dom.empty(window.fatherE, 1);
console.log(emp);

dom.attr(window.attr, "title", "hey");
let myTitle = dom.attr(window.attr, "title");
console.log(myTitle);

dom.content(window.addText, "<p>9999</p>");

dom.style(window.setS, "background", "red");
dom.style(window.setS, { color: "#fff" });

dom.AC(window.addClass, ["red", "a", "b"]);
dom.RC(window.removeClass, "red");
dom.CC(window.changeClass, "red", "green");

let changeColor = () => {
  let arr = [
    "#222",
    "#121212",
    "#ab3256",
    "#666",
    "#ddd",
    "#a00",
    "#399",
    "#488",
    "#69c28",
    "#47256c",
  ];
  dom.style(
    window.changeColor,
    "background",
    arr[Number.parseInt(Math.random() * 10)]
  );
};

let stop = () => {
  dom.off(window.changeColor, "click", changeColor);
};
dom.on(window.changeColor, "click", changeColor);

dom.on(window.preventIt, "click", stop);
