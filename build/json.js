(window.webpackJsonp = window.webpackJsonp || []).push([
  ["chunk-router"],
  {
    "./src sync recursive views\\/(foo|bar)\\/router\\.js$": function(r, e, o) {
      var s = {
        "./views/bar/router.js": "./src/views/bar/router.js",
        "./views/foo/router.js": "./src/views/foo/router.js"
      };
      function n(r) {
        var e = t(r);
        return o(e);
      }
      function t(r) {
        if (!o.o(s, r)) {
          var e = new Error("Cannot find module '" + r + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        }
        return s[r];
      }
      (n.keys = function() {
        return Object.keys(s);
      }),
        (n.resolve = t),
        (r.exports = n),
        (n.id = "./src sync recursive views\\/(foo|bar)\\/router\\.js$");
    },
    "./src/router/chunk.js": function(r, e, o) {
      "use strict";
      o.r(e);
      const s = o("./src sync recursive views\\/(foo|bar)\\/router\\.js$"),
        n = s.keys().reduce((r, e) => r.concat(s(e).default), []);
      e.default = n;
    },
    "./src/views/bar/router.js": function(r, e, o) {
      "use strict";
      o.r(e);
      e.default = [
        {
          path: "/bar",
          component: () =>
            o.e("bar").then(o.bind(null, "./src/views/bar/index.vue"))
        }
      ];
    },
    "./src/views/foo/router.js": function(r, e, o) {
      "use strict";
      o.r(e);
      e.default = [
        {
          path: "/foo",
          component: () =>
            o.e("foo").then(o.bind(null, "./src/views/foo/index.vue"))
        }
      ];
    }
  }
]);