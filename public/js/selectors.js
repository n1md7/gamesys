String.prototype.find = function (selector) {
  var parent = document.querySelector(this);

  if (selector) {
    return parent.querySelector(selector);
  }

  return parent;
};

String.prototype.findAll = function (selectors) {
  var parents = Array.from(document.querySelectorAll(this));

  if (selectors) {
    return parents.map(function (parent) {
      return Array.from(parent.querySelectorAll(selectors));
    });
  }

  return parents;
};
