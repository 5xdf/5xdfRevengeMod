"use strict";
(() => {
  var ra = Object.defineProperty;
  var c = (e, t) => () => (e && (t = e((e = 0))), t);
  var I = (e, t) => {
    for (var n in t) ra(e, n, { get: t[n], enumerable: !0 });
  };
  var ue,
    fe,
    b,
    ze,
    ne,
    re,
    me = c(() => {
      "use strict";
      (ue = window.nativeModuleProxy), (fe = ue.MMKVManager);
      b = ue.DCDFileManager ?? ue.RTNFileManager;
      ze = ue.InfoDictionaryManager ?? ue.RTNClientInfoManager;
      (ne = ue.DCDDeviceManager ?? ue.RTNDeviceManager),
        (re = ue.BundleUpdaterManager);
    });
  var Nt,
    Q,
    ft = c(() => {
      (Nt = ["a", "b", "i"]), (Q = new Map());
    });
  function rr(e, t, n, r, o) {
    let a = Q.get(t)?.[e];
    if (!a) return o ? Reflect.construct(t[e], n, r) : t[e].apply(r, n);
    for (let s of a.b.values()) {
      let m = s.call(r, n);
      Array.isArray(m) && (n = m);
    }
    let i = [...a.i.values()].reduce(
      function (s, m) {
        return function () {
          for (var d = arguments.length, _ = new Array(d), P = 0; P < d; P++)
            _[P] = arguments[P];
          return m.call(r, _, s);
        };
      },
      function () {
        for (var s = arguments.length, m = new Array(s), d = 0; d < s; d++)
          m[d] = arguments[d];
        return o ? Reflect.construct(a.o, m, r) : a.o.apply(r, m);
      }
    )(...n);
    for (let s of a.a.values()) i = s.call(r, n, i) ?? i;
    return i;
  }
  var or = c(() => {
    ft();
  });
  function Dt(e, t, n, r) {
    let o = Q.get(e),
      a = o?.[t];
    return a?.[r].has(n)
      ? (a[r].delete(n),
        Nt.every(function (i) {
          return a[i].size === 0;
        }) &&
          (Reflect.defineProperty(e, t, {
            value: a.o,
            writable: !0,
            configurable: !0,
          }) || (e[t] = a.o),
          delete o[t]),
        Object.keys(o).length == 0 && Q.delete(e),
        !0)
      : !1;
  }
  function ar() {
    for (let [e, t] of Q.entries())
      for (let n in t)
        for (let r of Nt) for (let o of t[n]?.[r].keys() ?? []) Dt(e, n, o, r);
  }
  var Pt = c(() => {
    ft();
  });
  function mt(e) {
    return function (t, n, r) {
      let o =
        arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
      if (typeof n[t] != "function")
        throw new Error(`${t} is not a function in ${n.constructor.name}`);
      Q.has(n) || Q.set(n, Object.create(null));
      let a = Q.get(n);
      if (!a[t]) {
        let m = n[t];
        a[t] = { o: m, b: new Map(), i: new Map(), a: new Map() };
        let d = function (C, O, U) {
            let be = rr(t, n, O, C, U);
            return o && s(), be;
          },
          _ = new Proxy(m, {
            apply: function (C, O, U) {
              return d(O, U, !1);
            },
            construct: function (C, O) {
              return d(m, O, !0);
            },
            get: function (C, O, U) {
              return O == "toString"
                ? m.toString.bind(m)
                : Reflect.get(C, O, U);
            },
          });
        Reflect.defineProperty(n, t, {
          value: _,
          configurable: !0,
          writable: !0,
        }) || (n[t] = _);
      }
      let i = Symbol(),
        s = function () {
          return Dt(n, t, i, e);
        };
      return a[t][e].set(i, r), s;
    };
  }
  var ir = c(() => {
    or();
    ft();
    Pt();
  });
  var Bt = {};
  I(Bt, {
    after: () => R,
    before: () => Mt,
    instead: () => we,
    unpatchAll: () => ar,
  });
  var Mt,
    we,
    R,
    Lt = c(() => {
      ir();
      Pt();
      (Mt = mt("b")), (we = mt("i")), (R = mt("a"));
    });
  var sr,
    $ = c(() => {
      "use strict";
      Lt();
      Lt();
      sr = { ...Bt };
    });
  function Ft() {
    return {
      listeners: Object.values(Ot).reduce(function (e, t) {
        return (e[t] = new Set()), e;
      }, {}),
      on(e, t) {
        this.listeners[e].has(t) || this.listeners[e].add(t);
      },
      off(e, t) {
        this.listeners[e].delete(t);
      },
      once(e, t) {
        var n = this;
        let r = function (o, a) {
          n.off(o, r), t(o, a);
        };
        this.on(e, r);
      },
      emit(e, t) {
        for (let n of this.listeners[e]) n(e, t);
      },
    };
  }
  var Ot,
    cr = c(() => {
      "use strict";
      (function (e) {
        (e.GET = "GET"), (e.SET = "SET"), (e.DEL = "DEL");
      })(Ot || (Ot = {}));
    });
  var lr,
    dt,
    kt,
    Gt,
    de,
    pt,
    Le,
    ur = c(() => {
      "use strict";
      me();
      h();
      (lr = /[<>:"/\\|?*]/g),
        (dt = function (e) {
          return l.Platform.select({
            default: e,
            ios: b.saveFileToGallery ? e : `Documents/${e}`,
          });
        }),
        (kt = function (e) {
          return (
            lr.test(e) && (e = e.replace(lr, "-").replace(/-+/g, "-")),
            `vd_mmkv/${e}`
          );
        }),
        (Gt = async function (e) {
          (await fe.getItem(e)) && fe.removeItem(e);
          let t = kt(e);
          (await b.fileExists(`${b.getConstants().DocumentsDirPath}/${t}`)) &&
            (await b.removeFile?.("documents", t));
        }),
        (de = function (e) {
          let t = kt(e);
          return Le(
            t,
            (async function () {
              try {
                let n = `${b.getConstants().DocumentsDirPath}/${t}`;
                if (await b.fileExists(n)) return;
                let r = (await fe.getItem(e)) ?? "{}";
                if (r === "!!LARGE_VALUE!!") {
                  let o = `${b.getConstants().CacheDirPath}/mmkv/${e}`;
                  (await b.fileExists(o))
                    ? (r = await b.readFile(o, "utf8"))
                    : (console.log(`${e}: Experienced data loss :(`),
                      (r = "{}"));
                }
                await b.writeFile("documents", dt(t), r, "utf8"),
                  (await fe.getItem(e)) !== null &&
                    (fe.removeItem(e),
                    console.log(
                      `Successfully migrated ${e} store from MMKV storage to fs`
                    ));
              } catch (n) {
                console.error("Failed to migrate to fs from MMKVManager ", n);
              }
            })()
          );
        }),
        (pt = function (e) {
          let t = kt(e);
          return b.removeFile("documents", dt(t));
        }),
        (Le = function (e, t) {
          let n;
          return {
            get: async function () {
              await t;
              let r = `${b.getConstants().DocumentsDirPath}/${e}`;
              return !n && !(await b.fileExists(r))
                ? ((n = !0), b.writeFile("documents", dt(e), "{}", "utf8"))
                : JSON.parse(await b.readFile(r, "utf8"));
            },
            set: async function (r) {
              await t,
                await b.writeFile(
                  "documents",
                  dt(e),
                  JSON.stringify(r),
                  "utf8"
                );
            },
          };
        });
    });
  var Vt = {};
  I(Vt, {
    awaitSyncWrapper: () => Oe,
    createFileBackend: () => Le,
    createMMKVBackend: () => de,
    createProxy: () => dr,
    createStorage: () => oe,
    purgeStorage: () => Gt,
    removeMMKVBackend: () => pt,
    useProxy: () => w,
    wrapSync: () => pe,
  });
  function dr() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = Ft();
    function n(r, o) {
      return new Proxy(r, {
        get(a, i) {
          if (i === fr) return t;
          let s = [...o, i],
            m = a[i];
          return m != null
            ? (t.emit("GET", { path: s, value: m }),
              typeof m == "object" ? n(m, s) : m)
            : m;
        },
        set(a, i, s) {
          return (a[i] = s), t.emit("SET", { path: [...o, i], value: s }), !0;
        },
        deleteProperty(a, i) {
          let s = delete a[i];
          return s && t.emit("DEL", { path: [...o, i] }), s;
        },
      });
    }
    return { proxy: n(e, []), emitter: t };
  }
  function w(e) {
    if (e[Ut]) throw e[Ut];
    let t = e[fr];
    if (!t)
      throw new Error(
        `InvalidArgumentExcpetion - storage[emitterSymbol] is ${typeof t}`
      );
    let [, n] = React.useReducer(function (r) {
      return ~r;
    }, 0);
    return (
      React.useEffect(
        function () {
          let r = function () {
            return n();
          };
          return (
            t.on("SET", r),
            t.on("DEL", r),
            function () {
              t.off("SET", r), t.off("DEL", r);
            }
          );
        },
        [t]
      ),
      e
    );
  }
  async function oe(e) {
    let t = await e.get(),
      { proxy: n, emitter: r } = dr(t),
      o = function () {
        return e.set(n);
      };
    return r.on("SET", o), r.on("DEL", o), n;
  }
  function pe(e) {
    let t,
      n,
      r = [],
      o = function (a) {
        return t ? a() : r.push(a);
      };
    return (
      e
        .then(function (a) {
          (t = a),
            r.forEach(function (i) {
              return i();
            });
        })
        .catch(function (a) {
          n = a;
        }),
      new Proxy(
        {},
        {
          ...Object.fromEntries(
            Object.getOwnPropertyNames(Reflect).map(function (a) {
              return [
                a,
                function (i) {
                  for (
                    var s = arguments.length,
                      m = new Array(s > 1 ? s - 1 : 0),
                      d = 1;
                    d < s;
                    d++
                  )
                    m[d - 1] = arguments[d];
                  return Reflect[a](t ?? i, ...m);
                },
              ];
            })
          ),
          get(a, i, s) {
            return i === Ut ? n : i === mr ? o : Reflect.get(t ?? a, i, s);
          },
        }
      )
    );
  }
  var fr,
    mr,
    Ut,
    Oe,
    j = c(() => {
      "use strict";
      cr();
      ur();
      (fr = Symbol.for("vendetta.storage.emitter")),
        (mr = Symbol.for("vendetta.storage.accessor")),
        (Ut = Symbol.for("vendetta.storage.error"));
      Oe = function (e) {
        return new Promise(function (t) {
          return e[mr](t);
        });
      };
    });
  function ae(e, t) {
    return gt(e, t, { walkable: ["props", "children", "child", "sibling"] });
  }
  var pr = c(() => {
    "use strict";
    ge();
  });
  function Ht(e, t, n, r) {
    if (!(r > n.maxDepth) && e) {
      try {
        if (t(e)) return e;
      } catch {}
      if (Array.isArray(e)) {
        for (let o of e)
          if (!(typeof o != "object" || o === null))
            try {
              let a = Ht(o, t, n, r + 1);
              if (a) return a;
            } catch {}
      } else if (typeof e == "object") {
        for (let o of Object.keys(e))
          if (
            !(typeof e[o] != "object" || e[o] === null) &&
            !(n.walkable.length && !n.walkable.includes(o)) &&
            !n.ignore.includes(o)
          )
            try {
              let a = Ht(e[o], t, n, r + 1);
              if (a) return a;
            } catch {}
      }
    }
  }
  function gt(e, t) {
    let {
      walkable: n = [],
      ignore: r = [],
      maxDepth: o = 100,
    } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return Ht(e, t, { walkable: n, ignore: r, maxDepth: o }, 0);
  }
  var gr = c(() => {
    "use strict";
  });
  async function he(e, t) {
    let n =
        arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e4,
      r = await fetch(e, { signal: oa(n), ...t });
    if (!r.ok) throw new Error("Request returned non-ok");
    return r;
  }
  function oa(e) {
    let t = new AbortController();
    return (
      setTimeout(function () {
        return t.abort(`Timed out after ${e}ms`);
      }, e),
      t.signal
    );
  }
  var hr = c(() => {
    "use strict";
  });
  function $t(e) {
    return Object.isFrozen(e) ? Object.assign({}, e) : e;
  }
  var Rr = c(() => {
    "use strict";
  });
  function K(e) {
    for (
      var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
      r < t;
      r++
    )
      n[r - 1] = arguments[r];
    let o = { ...e };
    return (
      n.forEach(function (a) {
        return delete o[a];
      }),
      o
    );
  }
  var yr = c(() => {
    "use strict";
  });
  var jt = {};
  I(jt, {
    findInReactTree: () => ae,
    findInTree: () => gt,
    safeFetch: () => he,
    unfreeze: () => $t,
    without: () => K,
  });
  var ge = c(() => {
    "use strict";
    pr();
    gr();
    hr();
    Rr();
    yr();
  });
  var Yt = {};
  I(Yt, {
    find: () => W,
    findAll: () => Xe,
    findByDisplayName: () => Wt,
    findByDisplayNameAll: () => la,
    findByName: () => F,
    findByNameAll: () => ca,
    findByProps: () => u,
    findByPropsAll: () => sa,
    findByStoreName: () => Fe,
    findByTypeName: () => ua,
    findByTypeNameAll: () => fa,
    modules: () => Kt,
  });
  var aa,
    Er,
    _r,
    Kt,
    W,
    Xe,
    xr,
    Sr,
    br,
    wr,
    ia,
    u,
    sa,
    F,
    ca,
    Wt,
    la,
    ua,
    fa,
    Fe,
    S = c(() => {
      "use strict";
      (aa = window.ErrorUtils.getGlobalHandler()),
        (Er = function (e) {
          return Object.defineProperty(window.modules, e, {
            value: window.modules[e],
            enumerable: !1,
            configurable: !0,
            writable: !0,
          });
        });
      for (let e in window.modules) {
        let t = Number(e),
          n = window.modules[t]?.publicModule?.exports;
        (!n || n === window || n.proxygone === null) && Er(t);
      }
      (_r = function (e) {
        let t =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
        return function (n) {
          let r = [];
          for (let o in e) {
            let a = Number(o),
              i = e[a]?.publicModule?.exports;
            if (!e[a].isInitialized)
              try {
                let s = Function.prototype.toString;
                Object.defineProperty(Function.prototype, "toString", {
                  value: s,
                  configurable: !0,
                  writable: !1,
                }),
                  window.ErrorUtils.setGlobalHandler(null),
                  __r(a),
                  window.ErrorUtils.setGlobalHandler(aa),
                  Object.defineProperty(Function.prototype, "toString", {
                    value: s,
                    configurable: !0,
                    writable: !0,
                  });
              } catch {}
            if (!i) {
              Er(a);
              continue;
            }
            if (i.default && i.__esModule && n(i.default)) {
              if (t) return i.default;
              r.push(i.default);
            }
            if (n(i)) {
              if (t) return i;
              r.push(i);
            }
          }
          if (!t) return r;
        };
      }),
        (Kt = window.modules),
        (W = _r(Kt, !0)),
        (Xe = _r(Kt)),
        (xr = function (e) {
          return function (t) {
            return e.every(function (n) {
              return t[n] !== void 0;
            });
          };
        }),
        (Sr = function (e, t) {
          return t
            ? function (n) {
                return n?.name === e;
              }
            : function (n) {
                return n?.default?.name === e;
              };
        }),
        (br = function (e, t) {
          return t
            ? function (n) {
                return n?.displayName === e;
              }
            : function (n) {
                return n?.default?.displayName === e;
              };
        }),
        (wr = function (e, t) {
          return t
            ? function (n) {
                return n?.type?.name === e;
              }
            : function (n) {
                return n?.default?.type?.name === e;
              };
        }),
        (ia = function (e) {
          return function (t) {
            return t.getName && t.getName.length === 0 && t.getName() === e;
          };
        }),
        (u = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return W(xr(t));
        }),
        (sa = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return Xe(xr(t));
        }),
        (F = function (e) {
          let t =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
          return W(Sr(e, t));
        }),
        (ca = function (e) {
          let t =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
          return Xe(Sr(e, t));
        }),
        (Wt = function (e) {
          let t =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
          return W(br(e, t));
        }),
        (la = function (e) {
          let t =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
          return Xe(br(e, t));
        }),
        (ua = function (e) {
          let t =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
          return W(wr(e, t));
        }),
        (fa = function (e) {
          let t =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
          return Xe(wr(e, t));
        }),
        (Fe = function (e) {
          return W(ia(e));
        });
    });
  var zt,
    ma,
    A,
    Te = c(() => {
      "use strict";
      S();
      (zt = u("setLogFn").default), (ma = new zt("Revenge")), (A = ma);
    });
  var Qt = {};
  I(Qt, {
    color: () => ie,
    fetchTheme: () => qe,
    getCurrentTheme: () => Ie,
    initThemes: () => Zt,
    installTheme: () => ve,
    patchChatBackground: () => qt,
    removeTheme: () => Jt,
    selectTheme: () => Ce,
    themes: () => k,
    updateThemes: () => vr,
  });
  async function Xt(e) {
    if (typeof e != "object") throw new Error("Theme must be an object");
    await Le("vendetta_theme.json").set(e);
  }
  function qt() {
    let e = Ie()?.data?.background;
    if (!e) return;
    let t = F("MessagesWrapperConnected", !1);
    if (!t) return;
    let { MessagesWrapper: n } = u("MessagesWrapper");
    if (!n) return;
    let r = [
      R("default", t, function (o, a) {
        return React.createElement(l.ImageBackground, {
          style: { flex: 1, height: "100%" },
          source: { uri: e.url },
          blurRadius: typeof e.blur == "number" ? e.blur : 0,
          children: a,
        });
      }),
      R("render", n.prototype, function (o, a) {
        let i = ae(a, function (s) {
          return (
            s?.props && "HACK_fixModalInteraction" in s.props && s?.props?.style
          );
        });
        i
          ? (i.props.style = Object.assign(
              l.StyleSheet.flatten(i.props.style ?? {}),
              { backgroundColor: "#0000" }
            ))
          : A.error("Didn't find Messages when patching MessagesWrapper!");
      }),
    ];
    return function () {
      return r.forEach(function (o) {
        return o();
      });
    };
  }
  function Tr(e) {
    if (se.valid(e)) return se(e).hex();
    let t = Number(l.processColor(e));
    return se
      .rgb((t >> 16) & 255, (t >> 8) & 255, t & 255, (t >> 24) & 255)
      .hex();
  }
  function pa(e) {
    if (e.semanticColors) {
      let t = e.semanticColors;
      for (let n in t) for (let r in t[n]) t[n][r] &&= Tr(t[n][r]);
    }
    if (e.rawColors) {
      let t = e.rawColors;
      for (let n in t) e.rawColors[n] = Tr(t[n]);
      l.Platform.OS === "android" && ga(t);
    }
    return e;
  }
  function ga(e) {
    let t = {
      BLACK_ALPHA_60: ["BLACK", 0.6],
      BRAND_NEW_360_ALPHA_20: ["BRAND_360", 0.2],
      BRAND_NEW_360_ALPHA_25: ["BRAND_360", 0.25],
      BRAND_NEW_500_ALPHA_20: ["BRAND_500", 0.2],
      PRIMARY_DARK_500_ALPHA_20: ["PRIMARY_500", 0.2],
      PRIMARY_DARK_700_ALPHA_60: ["PRIMARY_700", 0.6],
      STATUS_GREEN_500_ALPHA_20: ["GREEN_500", 0.2],
      STATUS_RED_500_ALPHA_20: ["RED_500", 0.2],
    };
    for (let n in t) {
      let [r, o] = t[n];
      e[r] && (e[n] = se(e[r]).alpha(o).hex());
    }
  }
  async function qe(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
      n;
    try {
      n = await (await he(e, { cache: "no-store" })).json();
    } catch {
      throw new Error(`Failed to fetch theme at ${e}`);
    }
    (k[e] = { id: e, selected: t, data: pa(n) }), t && Xt(k[e]);
  }
  async function ve(e) {
    if (typeof e != "string" || e in k)
      throw new Error("Theme already installed");
    await qe(e);
  }
  async function Ce(e) {
    if (e === "default") return await Xt({});
    let t = Object.values(k).find(function (n) {
      return n.selected;
    })?.id;
    t && (k[t].selected = !1), (k[e].selected = !0), await Xt(k[e]);
  }
  async function Jt(e) {
    let t = k[e];
    return t.selected && (await Ce("default")), delete k[e], t.selected;
  }
  function Ie() {
    let e = window.__vendetta_loader?.features?.themes?.prop;
    return (e && window[e]) || null;
  }
  async function vr() {
    await Oe(k);
    let e = Ie();
    await Promise.allSettled(
      Object.keys(k).map(function (t) {
        return qe(t, e?.id === t);
      })
    );
  }
  async function Zt() {
    let e = Ie();
    if (!e) return;
    let t = ie.default.unsafe_rawColors;
    (ie.default.unsafe_rawColors = new Proxy(t, {
      get: function (n, r) {
        return e
          ? e.data?.rawColors?.[r] ?? Reflect.get(t, r)
          : Reflect.get(t, r);
      },
    })),
      we(
        "resolveSemanticColor",
        ie.default.meta ?? ie.default.internal,
        function (n, r) {
          if (!e) return r(...n);
          let [o, a] = n,
            [i, s] = Cr(o, a),
            m = o === "amoled" ? 2 : o === "light" ? 1 : 0;
          let d = da[i] ?? i,
            _ = (e.data?.semanticColors?.[i] ?? e.data?.semanticColors?.[d])?.[
              m
            ];
          if (
            i === "CHAT_BACKGROUND" &&
            typeof e.data?.background?.alpha == "number"
          )
            return se(_ || "black")
              .alpha(1 - e.data.background.alpha)
              .hex();
          if (_) return _;
          let P = e.data?.rawColors?.[s.raw];
          return P
            ? s.opacity === 1
              ? P
              : se(P).alpha(s.opacity).hex()
            : r(...n);
        }
      ),
      await vr();
  }
  function Cr(e, t) {
    let n = t[(Cr._sym ??= Object.getOwnPropertySymbols(t)[0])],
      r = ie.SemanticColor[n];
    return [n, r[e.toLowerCase()]];
  }
  var ie,
    k,
    da,
    Y = c(() => {
      "use strict";
      $();
      j();
      ge();
      h();
      S();
      Te();
      (ie = u("SemanticColor")),
        (k = pe(oe(de("VENDETTA_THEMES")))),
        (da = {
          BG_BACKDROP: "BACKGROUND_FLOATING",
          BG_BASE_PRIMARY: "BACKGROUND_PRIMARY",
          BG_BASE_SECONDARY: "BACKGROUND_SECONDARY",
          BG_BASE_TERTIARY: "BACKGROUND_SECONDARY_ALT",
          BG_MOD_FAINT: "BACKGROUND_MODIFIER_ACCENT",
          BG_MOD_STRONG: "BACKGROUND_MODIFIER_ACCENT",
          BG_MOD_SUBTLE: "BACKGROUND_MODIFIER_ACCENT",
          BG_SURFACE_OVERLAY: "BACKGROUND_FLOATING",
          BG_SURFACE_OVERLAY_TMP: "BACKGROUND_FLOATING",
          BG_SURFACE_RAISED: "BACKGROUND_MOBILE_PRIMARY",
        });
    });
  var ht,
    Ir,
    l,
    se,
    Rt = c(() => {
      "use strict";
      $();
      Y();
      (ht = function (e) {
        for (let t in window.modules) {
          let n = window.modules[t]?.publicModule.exports;
          if (n && e(n)) return n;
        }
      }),
        (Ir = ht(function (e) {
          return e?.default?.name === "requireNativeComponent";
        }));
      Ir &&
        we("default", Ir, function (e, t) {
          try {
            return t(...e);
          } catch {
            return e[0];
          }
        });
      window.React = ht(function (e) {
        return e.createElement;
      });
      (l = ht(function (e) {
        return e.AppRegistry;
      })),
        (se = ht(function (e) {
          return e.brewer;
        }));
      if (window.__vendetta_loader?.features.themes)
        try {
          Zt();
        } catch (e) {
          console.error("[Revenge] Failed to initialize themes...", e);
        }
    });
  var on = {};
  I(on, {
    Flux: () => xa,
    FluxDispatcher: () => Et,
    NavigationNative: () => ce,
    React: () => Ne,
    ReactNative: () => l,
    assets: () => Je,
    channels: () => tn,
    chroma: () => se,
    clipboard: () => z,
    commands: () => yt,
    constants: () => ke,
    i18n: () => Ae,
    invites: () => ya,
    lodash: () => _t,
    moment: () => rn,
    navigation: () => Ea,
    navigationStack: () => _a,
    stylesheet: () => M,
    toasts: () => nn,
    url: () => Ge,
    util: () => Sa,
  });
  function Ra(e) {
    if (en) {
      for (let t in e)
        e[t] = new Proxy(l.StyleSheet.flatten(e[t]), {
          get(n, r, o) {
            let a = Reflect.get(n, r, o);
            return Ar.isSemanticColor(a)
              ? Ar.resolveSemanticColor(ha.theme, a)
              : a;
          },
        });
      return e;
    }
  }
  var ha,
    en,
    Ar,
    ke,
    tn,
    Ae,
    Ge,
    nn,
    M,
    z,
    Je,
    ya,
    yt,
    Ea,
    _a,
    ce,
    xa,
    Et,
    Ne,
    rn,
    _t,
    Sa,
    h = c(() => {
      "use strict";
      Rt();
      S();
      Rt();
      Rt();
      (ha = Fe("ThemeStore")),
        (en = u("colors", "unsafe_rawColors")),
        (Ar = en?.internal ?? en?.meta);
      (ke = u("Fonts", "Permissions")),
        (tn = u("getVoiceChannelId")),
        (Ae = u("Messages")),
        (Ge = u("openURL", "openDeeplink")),
        (nn = W(function (e) {
          return (
            e.open &&
            e.close &&
            !e.startDrag &&
            !e.init &&
            !e.openReplay &&
            !e.setAlwaysOnTop &&
            !e.setAccountFlag
          );
        })),
        (M = {
          ...W(function (e) {
            return e.createStyles && !e.ActionSheet;
          }),
          createThemedStyleSheet: Ra,
          ...u("createThemedStyleSheet"),
        }),
        (z = u("setString", "getString", "hasString")),
        (Je = u("registerAsset")),
        (ya = u("acceptInviteAndTransitionToInviteChannel")),
        (yt = u("getBuiltInCommands")),
        (Ea = u("pushLazy")),
        (_a = u("createStackNavigator")),
        (ce = u("NavigationContainer")),
        (xa = u("connectStores")),
        (Et = u("_currentDispatchActionType")),
        (Ne = window.React),
        (rn = u("isMoment")),
        (_t = u("forEachRight")),
        (Sa = u("inspect", "isNullOrUndefined"));
    });
  var N,
    Nr,
    Dr,
    Ze,
    De = c(() => {
      (function (e) {
        (e.BRAND = "brand"),
          (e.RED = "red"),
          (e.GREEN = "green"),
          (e.PRIMARY = "primary"),
          (e.TRANSPARENT = "transparent"),
          (e.GREY = "grey"),
          (e.LIGHTGREY = "lightgrey"),
          (e.WHITE = "white"),
          (e.LINK = "link");
      })(N || (N = {}));
      (function (e) {
        (e[(e.BUILT_IN = 0)] = "BUILT_IN"),
          (e[(e.BUILT_IN_TEXT = 1)] = "BUILT_IN_TEXT"),
          (e[(e.BUILT_IN_INTEGRATION = 2)] = "BUILT_IN_INTEGRATION"),
          (e[(e.BOT = 3)] = "BOT"),
          (e[(e.PLACEHOLDER = 4)] = "PLACEHOLDER");
      })(Nr || (Nr = {}));
      (function (e) {
        (e[(e.SUB_COMMAND = 1)] = "SUB_COMMAND"),
          (e[(e.SUB_COMMAND_GROUP = 2)] = "SUB_COMMAND_GROUP"),
          (e[(e.STRING = 3)] = "STRING"),
          (e[(e.INTEGER = 4)] = "INTEGER"),
          (e[(e.BOOLEAN = 5)] = "BOOLEAN"),
          (e[(e.USER = 6)] = "USER"),
          (e[(e.CHANNEL = 7)] = "CHANNEL"),
          (e[(e.ROLE = 8)] = "ROLE"),
          (e[(e.MENTIONABLE = 9)] = "MENTIONABLE"),
          (e[(e.NUMBER = 10)] = "NUMBER"),
          (e[(e.ATTACHMENT = 11)] = "ATTACHMENT");
      })(Dr || (Dr = {}));
      (function (e) {
        (e[(e.CHAT = 1)] = "CHAT"),
          (e[(e.USER = 2)] = "USER"),
          (e[(e.MESSAGE = 3)] = "MESSAGE");
      })(Ze || (Ze = {}));
    });
  var sn = {};
  I(sn, { patchCommands: () => an, registerCommand: () => ba });
  function an() {
    let e = R("getBuiltInCommands", yt, function (t, n) {
      let [r] = t;
      if (r === Ze.CHAT) return n.concat(Qe);
    });
    return function () {
      (Qe = []), e();
    };
  }
  function ba(e) {
    let t = yt.getBuiltInCommands(Ze.CHAT, !0, !1);
    t.sort(function (r, o) {
      return Number.parseInt(o.id) - Number.parseInt(r.id);
    });
    let n = t[t.length - 1];
    return (
      (e.id = (Number.parseInt(n.id, 10) - 1).toString()),
      Qe.push(e),
      function () {
        return (Qe = Qe.filter(function (r) {
          let { id: o } = r;
          return o !== e.id;
        }));
      }
    );
  }
  var Qe,
    cn = c(() => {
      "use strict";
      $();
      h();
      De();
      Qe = [];
    });
  var p,
    X,
    V = c(() => {
      "use strict";
      j();
      (p = pe(oe(de("VENDETTA_SETTINGS")))),
        (X = pe(oe(Le("vendetta_loader.json"))));
    });
  var un = {};
  I(un, {
    all: () => le,
    find: () => wa,
    getAssetByID: () => va,
    getAssetByName: () => Ta,
    getAssetIDByName: () => f,
    patchAssets: () => ln,
  });
  function ln() {
    let e = R("registerAsset", Je, function (t, n) {
      let r = t[0];
      le[r.name] = { ...r, id: n };
    });
    for (let t = 1; ; t++) {
      let n = Je.getAssetByID(t);
      if (!n) break;
      le[n.name] || (le[n.name] = { ...n, id: t });
    }
    return e;
  }
  var le,
    wa,
    Ta,
    va,
    f,
    x = c(() => {
      "use strict";
      $();
      h();
      le = {};
      (wa = function (e) {
        return Object.values(le).find(e);
      }),
        (Ta = function (e) {
          return le[e];
        }),
        (va = function (e) {
          return Je.getAssetByID(e);
        }),
        (f = function (e) {
          return le[e]?.id;
        });
    });
  var fn = {};
  I(fn, { showToast: () => g });
  var Ca,
    g,
    ee = c(() => {
      "use strict";
      h();
      S();
      ({ uuid4: Ca } = u("uuid4")),
        (g = function (e, t) {
          return nn.open({
            key: `vd-toast-${Ca()}`,
            content: e,
            source: t,
            icon: t,
          });
        });
    });
  var pn = {};
  I(pn, {
    connectToDebugger: () => mn,
    getDebugInfo: () => tt,
    patchLogHook: () => dn,
    socket: () => q,
    toggleSafeMode: () => et,
    versionHash: () => xt,
  });
  async function et() {
    (p.safeMode = { ...p.safeMode, enabled: !p.safeMode?.enabled }),
      window.__vendetta_loader?.features.themes &&
        (Ie()?.id && (p.safeMode.currentThemeId = Ie()?.id),
        p.safeMode?.enabled
          ? await Ce("default")
          : p.safeMode?.currentThemeId &&
            (await Ce(p.safeMode?.currentThemeId))),
      setTimeout(re.reload, 400);
  }
  function mn(e) {
    if ((q !== void 0 && q.readyState !== WebSocket.CLOSED && q.close(), !e)) {
      g("Invalid debugger URL!", f("Small"));
      return;
    }
    (q = new WebSocket(`ws://${e}`)),
      q.addEventListener("open", function () {
        return g("Connected to debugger.", f("Check"));
      }),
      q.addEventListener("message", function (t) {
        try {
          (0, eval)(t.data);
        } catch (n) {
          console.error(n);
        }
      }),
      q.addEventListener("error", function (t) {
        console.log(`Debugger error: ${t.message}`),
          g("An error occurred with the debugger connection!", f("Small"));
      });
  }
  function dn() {
    let e = R("nativeLoggingHook", globalThis, function (t) {
      q?.readyState === WebSocket.OPEN &&
        q.send(JSON.stringify({ message: t[0], level: t[1] })),
        A.log(t[0]);
    });
    return function () {
      q?.close(), e();
    };
  }
  function tt() {
    let e = window.HermesInternal.getRuntimeProperties(),
      t = e["OSS Release Version"],
      n = "for RN ",
      r = l.Platform.constants,
      o = r.reactNativeVersion;
    return {
      vendetta: {
        version: xt,
        loader: window.__vendetta_loader?.name ?? "Unknown",
      },
      discord: { version: ze.Version, build: ze.Build },
      react: {
        version: React.version,
        nativeVersion: t.startsWith(n)
          ? t.substring(n.length)
          : `${o.major}.${o.minor}.${o.patch}`,
      },
      hermes: {
        version: t,
        buildType: e.Build,
        bytecodeVersion: e["Bytecode Version"],
      },
      ...l.Platform.select({
        android: {
          os: { name: "Android", version: r.Release, sdk: r.Version },
        },
        ios: { os: { name: r.systemName, version: r.osVersion } },
      }),
      ...l.Platform.select({
        android: {
          device: {
            manufacturer: r.Manufacturer,
            brand: r.Brand,
            model: r.Model,
            codename: ne.device,
          },
        },
        ios: {
          device: {
            manufacturer: ne.deviceManufacturer,
            brand: ne.deviceBrand,
            model: ne.deviceModel,
            codename: ne.device,
          },
        },
      }),
    };
  }
  var q,
    xt,
    Ue = c(() => {
      "use strict";
      Te();
      me();
      $();
      V();
      Y();
      h();
      x();
      ee();
      xt = "c89c521";
    });
  function Br(e) {
    let { locale: t } = e;
    try {
      Pr &&
        (Pr.overrideTheme(Ia?.theme ?? "dark"),
        Mr && Aa.useAMOLEDTheme === 2 && Mr.setAMOLEDThemeEnabled(!0));
    } catch (n) {
      A.error("Failed to fix theme...", n);
    }
    try {
      rn.locale(t.toLowerCase());
    } catch (n) {
      A.error("Failed to fix timestamps...", n);
    }
    Et.unsubscribe("I18N_LOAD_SUCCESS", Br);
  }
  function Lr() {
    return Et.subscribe("I18N_LOAD_SUCCESS", Br);
  }
  var Pr,
    Mr,
    Ia,
    Aa,
    Or = c(() => {
      "use strict";
      Te();
      h();
      S();
      (Pr = u("updateTheme", "overrideTheme")),
        (Mr = u("setAMOLEDThemeEnabled")),
        (Ia = Fe("ThemeStore")),
        (Aa = Fe("UnsyncedUserSettingsStore"));
    });
  var Na,
    Da,
    Pa,
    Fr,
    kr = c(() => {
      "use strict";
      (Na = function (e) {
        return { status: "fulfilled", value: e };
      }),
        (Da = function (e) {
          return { status: "rejected", reason: e };
        }),
        (Pa = function (e) {
          return Promise.resolve(e).then(Na, Da);
        }),
        (Fr = function (e) {
          return Promise.all(Array.from(e).map(Pa));
        });
    });
  var yn = {};
  I(yn, {
    evalPlugin: () => Gr,
    fetchPlugin: () => Ve,
    getSettings: () => Rn,
    initPlugins: () => hn,
    installPlugin: () => Re,
    plugins: () => D,
    removePlugin: () => gn,
    startPlugin: () => He,
    stopPlugin: () => $e,
  });
  async function Ve(e) {
    e.endsWith("/") || (e += "/");
    let t = D[e],
      n;
    try {
      n = await (await he(`${e}manifest.json`, { cache: "no-store" })).json();
    } catch {
      throw new Error(`Failed to fetch manifest for ${e}`);
    }
    let r;
    if (t?.manifest.hash !== n.hash)
      try {
        r = await (
          await he(e + (n.main || "index.js"), { cache: "no-store" })
        ).text();
      } catch {}
    if (!r && !t) throw new Error(`Failed to fetch JS for ${e}`);
    D[e] = {
      id: e,
      manifest: n,
      enabled: t?.enabled ?? !1,
      update: t?.update ?? !0,
      js: r ?? t.js,
    };
  }
  async function Re(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    if ((e.endsWith("/") || (e += "/"), typeof e != "string" || e in D))
      throw new Error("Plugin already installed");
    await Ve(e), t && (await He(e));
  }
  async function Gr(e) {
    let t = {
        ...window.vendetta,
        plugin: { id: e.id, manifest: e.manifest, storage: await oe(de(e.id)) },
        logger: new zt(`Vendetta \xBB ${e.manifest.name}`),
      },
      n = `vendetta=>{return ${e.js}}
//# sourceURL=${e.id}`,
      r = (0, eval)(n)(t),
      o = typeof r == "function" ? r() : r;
    return o?.default ?? o ?? {};
  }
  async function He(e) {
    e.endsWith("/") || (e += "/");
    let t = D[e];
    if (!t) throw new Error("Attempted to start non-existent plugin");
    try {
      if (!p.safeMode?.enabled) {
        let n = await Gr(t);
        (Pe[e] = n), n.onLoad?.();
      }
      t.enabled = !0;
    } catch (n) {
      A.error(`Plugin ${t.id} errored whilst loading, and will be unloaded`, n);
      try {
        Pe[t.id]?.onUnload?.();
      } catch (r) {
        A.error(`Plugin ${t.id} errored whilst unloading`, r);
      }
      delete Pe[e], (t.enabled = !1);
    }
  }
  function $e(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    e.endsWith("/") || (e += "/");
    let n = D[e],
      r = Pe[e];
    if (!n) throw new Error("Attempted to stop non-existent plugin");
    if (!p.safeMode?.enabled) {
      try {
        r?.onUnload?.();
      } catch (o) {
        A.error(`Plugin ${n.id} errored whilst unloading`, o);
      }
      delete Pe[e];
    }
    t && (n.enabled = !1);
  }
  async function gn(e) {
    e.endsWith("/") || (e += "/"),
      D[e].enabled && $e(e),
      delete D[e],
      await Gt(e);
  }
  async function hn() {
    await Oe(p), await Oe(D);
    let e = Object.keys(D);
    return (
      p.safeMode?.enabled ||
        (await Fr(
          e
            .filter(function (t) {
              return D[t].enabled;
            })
            .map(async function (t) {
              return (
                D[t].update &&
                  (await Ve(t).catch(function (n) {
                    return A.error(n.message);
                  })),
                await He(t)
              );
            })
        ),
        e
          .filter(function (t) {
            return !D[t].enabled && D[t].update;
          })
          .forEach(function (t) {
            return Ve(t);
          })),
      Ma
    );
  }
  var D,
    Pe,
    Ma,
    Rn,
    ye = c(() => {
      "use strict";
      Te();
      kr();
      V();
      j();
      ge();
      (D = pe(oe(de("VENDETTA_PLUGINS")))), (Pe = {});
      (Ma = function () {
        return Object.keys(Pe).forEach(function (e) {
          return $e(e, !1);
        });
      }),
        (Rn = function (e) {
          return Pe[e]?.settings;
        });
    });
  var wn = {};
  I(wn, {
    DISCORD_SERVER: () => En,
    DISCORD_SERVER_ID: () => _n,
    ESCAPE_REGEX: () => bn,
    GITHUB: () => Sn,
    HTTP_REGEX: () => La,
    HTTP_REGEX_MULTI: () => rt,
    PLUGINS_CHANNEL_ID: () => xn,
    PROXY_PREFIX: () => Ba,
    PROXY_PREFIXES: () => Me,
    THEMES_CHANNEL_ID: () => nt,
  });
  var En,
    _n,
    xn,
    nt,
    Sn,
    Ba,
    Me,
    La,
    rt,
    bn,
    Ee = c(() => {
      "use strict";
      (En = "https://discord.com/invite/ddcQf3s2Uq"),
        (_n = "1015931589865246730"),
        (xn = "1091880384561684561"),
        (nt = "1091880434939482202"),
        (Sn = "https://github.com/revenge-mod"),
        (Ba = "https://vd-plugins.github.io/proxy"),
        (Me = ["https://vd-plugins.github.io/proxy"]),
        (La =
          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
        (rt =
          /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)/g),
        (bn = /[.*+?^${}()|[\]\\]/g);
    });
  var vn = {};
  I(vn, { rawColors: () => Tn, semanticColors: () => y });
  var y,
    Tn,
    _e = c(() => {
      "use strict";
      Y();
      h();
      (y = ie?.default?.colors ?? ke?.ThemeColorMap),
        (Tn = ie?.default?.unsafe_rawColors ?? ke?.Colors);
    });
  function xe(e) {
    let { selectable: t, style: n, children: r } = e;
    return t
      ? l.Platform.select({
          ios: React.createElement(Oa, { style: n, children: r }),
          default: React.createElement(Ur, {
            style: n,
            children: r,
            selectable: !0,
          }),
        })
      : React.createElement(Ur, { style: n, children: r });
  }
  var Vr,
    Oa,
    Ur,
    Hr = c(() => {
      "use strict";
      h();
      _e();
      (Vr = M.createThemedStyleSheet({
        codeBlock: {
          fontFamily: ke.Fonts.CODE_SEMIBOLD,
          fontSize: 12,
          textAlignVertical: "center",
          backgroundColor: y.BACKGROUND_SECONDARY,
          color: y.TEXT_NORMAL,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: y.BACKGROUND_TERTIARY,
          padding: 10,
        },
      })),
        (Oa = function (e) {
          let { style: t, children: n } = e;
          return React.createElement(l.TextInput, {
            editable: !1,
            multiline: !0,
            style: [Vr.codeBlock, t && t],
            value: n,
          });
        }),
        (Ur = function (e) {
          let { selectable: t, style: n, children: r } = e;
          return React.createElement(
            l.Text,
            { selectable: t, style: [Vr.codeBlock, n && n] },
            r
          );
        });
    });
  function $r(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  var jr = c(() => {});
  function Kr(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r);
    }
  }
  function Wr(e, t, n) {
    return t && Kr(e.prototype, t), n && Kr(e, n), e;
  }
  var Yr = c(() => {});
  function zr(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  var Xr = c(() => {});
  function St(e, t) {
    return (
      (St =
        Object.setPrototypeOf ||
        function (r, o) {
          return (r.__proto__ = o), r;
        }),
      St(e, t)
    );
  }
  var qr = c(() => {});
  function Jr(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })),
      t && St(e, t);
  }
  var Zr = c(() => {
    qr();
  });
  function ot(e) {
    return (
      (ot = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (n) {
            return n.__proto__ || Object.getPrototypeOf(n);
          }),
      ot(e)
    );
  }
  var Qr = c(() => {});
  function eo() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      );
    } catch {
      return !1;
    }
  }
  var to = c(() => {});
  function no(e) {
    if (e === void 0)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return e;
  }
  var ro = c(() => {});
  function oo(e) {
    "@swc/helpers - typeof";
    return e && typeof Symbol < "u" && e.constructor === Symbol
      ? "symbol"
      : typeof e;
  }
  var ao = c(() => {});
  function io(e, t) {
    return t && (oo(t) === "object" || typeof t == "function") ? t : no(e);
  }
  var so = c(() => {
    ro();
    ao();
  });
  function co(e) {
    var t = eo();
    return function () {
      var r = ot(e),
        o;
      if (t) {
        var a = ot(this).constructor;
        o = Reflect.construct(r, arguments, a);
      } else o = r.apply(this, arguments);
      return io(this, o);
    };
  }
  var lo = c(() => {
    Qr();
    to();
    so();
  });
  var uo,
    Fa,
    T,
    Cn = c(() => {
      "use strict";
      jr();
      Yr();
      Xr();
      Zr();
      lo();
      h();
      v();
      (uo = M.createThemedStyleSheet({
        view: { flex: 1, flexDirection: "column", margin: 10 },
        title: { fontSize: 20, textAlign: "center", marginBottom: 5 },
      })),
        (T = (function (e) {
          "use strict";
          Jr(n, e);
          var t = co(n);
          function n(r) {
            $r(this, n);
            var o;
            return (o = t.call(this, r)), (o.state = { hasErr: !1 }), o;
          }
          return (
            Wr(n, [
              {
                key: "render",
                value: function () {
                  var o = this;
                  return this.state.hasErr
                    ? Ne.createElement(
                        l.ScrollView,
                        { style: uo.view },
                        Ne.createElement(
                          E.FormText,
                          { style: uo.title },
                          "Uh oh."
                        ),
                        Ne.createElement(
                          xe,
                          { selectable: !0, style: { marginBottom: 5 } },
                          this.state.errText
                        ),
                        Ne.createElement(te, {
                          color: te.Colors.RED,
                          size: te.Sizes.MEDIUM,
                          look: te.Looks.FILLED,
                          onPress: function () {
                            return o.setState({ hasErr: !1, errText: void 0 });
                          },
                          text: "Retry",
                        })
                      )
                    : this.props.children;
                },
              },
            ]),
            n
          );
        })((Fa = Ne.Component)));
      zr(T, "getDerivedStateFromError", function (e) {
        return { hasErr: !0, errText: e.message };
      });
    });
  function je(e) {
    let { onChangeText: t, placeholder: n, style: r } = e;
    return bt.TextInput
      ? React.createElement(bt.TextInput, {
          style: [In.redesignSearch, r],
          size: "sm",
          placeholder: n,
          onChange: t,
          isClearable: !0,
          leadingIcon: function () {
            return React.createElement(l.Image, {
              source: f("MagnifyingGlassIcon"),
              style: In.icon,
            });
          },
          returnKeyType: "search",
        })
      : React.createElement(ka, {
          style: [In.search, r],
          placeholder: n,
          onChangeText: t,
        });
  }
  var ka,
    In,
    fo = c(() => {
      "use strict";
      h();
      S();
      v();
      x();
      _e();
      (ka = F("StaticSearchBarContainer")),
        (In = M.createThemedStyleSheet({
          search: {
            margin: 0,
            padding: 0,
            borderBottomWidth: 0,
            backgroundColor: "none",
          },
          redesignSearch: { paddingHorizontal: 8, marginBottom: 4 },
          icon: { width: 16, height: 16, tintColor: y.INTERACTIVE_NORMAL },
        }));
    });
  function Ke(e) {
    let {
        label: t,
        icon: n,
        noPadding: r = !1,
        noAnimation: o = !1,
        children: a,
      } = e,
      { FormRow: i, FormDivider: s } = E,
      [m, d] = React.useState(!0);
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(i, {
        label: t,
        leading: n && React.createElement(i.Icon, { source: f(n) }),
        trailing: React.createElement(i.Arrow, {
          style: { transform: [{ rotate: `${m ? 180 : 90}deg` }] },
        }),
        onPress: function () {
          d(!m),
            o ||
              l.LayoutAnimation.configureNext(
                l.LayoutAnimation.Presets.easeInEaseOut
              );
        },
      }),
      !m &&
        React.createElement(
          React.Fragment,
          null,
          React.createElement(s, null),
          React.createElement(
            l.View,
            { style: !r && { paddingHorizontal: 15 } },
            a
          )
        )
    );
  }
  var mo = c(() => {
    "use strict";
    h();
    x();
    v();
  });
  var Pn = {};
  I(Pn, {
    Alert: () => An,
    Button: () => te,
    Codeblock: () => xe,
    ErrorBoundary: () => T,
    Forms: () => E,
    General: () => Ga,
    HelpMessage: () => Nn,
    Redesign: () => bt,
    SafeAreaView: () => Dn,
    Search: () => je,
    Summary: () => Ke,
  });
  var E,
    Ga,
    An,
    te,
    Nn,
    Dn,
    bt,
    v = c(() => {
      "use strict";
      S();
      Hr();
      Cn();
      fo();
      mo();
      (E = u("Form", "FormSection")),
        (Ga = u("Button", "Text", "View")),
        (An = Wt("FluxContainer(Alert)")),
        (te = u("Looks", "Colors", "Sizes")),
        (Nn = F("HelpMessage")),
        (Dn = u("useSafeAreaInsets").SafeAreaView),
        (bt = u("Button", "ContextMenu", "TextInput") ?? {});
    });
  function Mn(e) {
    let {
        title: t,
        confirmText: n,
        confirmColor: r,
        onConfirm: o,
        cancelText: a,
        placeholder: i,
        initialValue: s = "",
        secureTextEntry: m,
      } = e,
      [d, _] = React.useState(s),
      [P, C] = React.useState("");
    function O() {
      Promise.resolve(o(d))
        .then(function () {
          po.close();
        })
        .catch(function (be) {
          C(be.message);
        });
    }
    return React.createElement(
      An,
      {
        title: t,
        confirmText: n,
        confirmColor: r,
        isConfirmButtonDisabled: P.length !== 0,
        onConfirm: O,
        cancelText: a,
        onCancel: function () {
          return po.close();
        },
      },
      React.createElement(Ua, {
        placeholder: i,
        value: d,
        onChange: function (U) {
          _(typeof U == "string" ? U : U.text), P && C("");
        },
        returnKeyType: "done",
        onSubmitEditing: O,
        error: P || void 0,
        secureTextEntry: m,
        autoFocus: !0,
        showBorder: !0,
        style: {
          paddingVertical: 5,
          alignSelf: "stretch",
          paddingHorizontal: 0,
        },
      })
    );
  }
  var Ua,
    po,
    go = c(() => {
      "use strict";
      S();
      v();
      ({ FormInput: Ua } = E), (po = u("openLazy", "close"));
    });
  var Ln = {};
  I(Ln, {
    showConfirmationAlert: () => G,
    showCustomAlert: () => Ro,
    showInputAlert: () => Bn,
  });
  function G(e) {
    let t = e;
    return (
      (t.body = e.content),
      (t.content = void 0),
      (t.isDismissable ??= !0),
      ho.show(t)
    );
  }
  var ho,
    Ro,
    Bn,
    Se = c(() => {
      "use strict";
      S();
      go();
      ho = u("openLazy", "close");
      (Ro = function (e, t) {
        return ho.openLazy({
          importer: async function () {
            return function () {
              return React.createElement(e, t);
            };
          },
        });
      }),
        (Bn = function (e) {
          return Ro(Mn, e);
        });
    });
  async function yo(e) {
    return {
      patcher: K(sr, "unpatchAll"),
      metro: { ...Yt, common: { ...on } },
      constants: wn,
      utils: jt,
      debug: K(pn, "versionHash", "patchLogHook", "toggleSafeMode"),
      ui: { components: Pn, toasts: fn, alerts: Ln, assets: un, ...vn },
      plugins: K(yn, "initPlugins", "evalPlugin"),
      themes: K(Qt, "initThemes"),
      commands: K(sn, "patchCommands"),
      storage: Vt,
      settings: p,
      loader: { identity: window.__vendetta_loader, config: X },
      logger: A,
      version: xt,
      unload: function () {
        e
          .filter(function (t) {
            return typeof t == "function";
          })
          .forEach(function (t) {
            return t();
          }),
          (window.vendetta = void 0);
      },
    };
  }
  var Eo = c(() => {
    "use strict";
    cn();
    Ee();
    Ue();
    Te();
    $();
    ye();
    V();
    j();
    Y();
    ge();
    h();
    S();
    Se();
    x();
    _e();
    v();
    ee();
  });
  function _o() {
    return R("default", Va, function (e, t) {
      let [{ thread: n }] = e;
      if (n.guild_id !== _n) return;
      let r;
      if (n.parent_id === xn) r = "Plugin";
      else if (n.parent_id === nt && window.__vendetta_loader?.features.themes)
        r = "Theme";
      else return;
      let { firstMessage: o } = ja(n),
        a = o?.content?.match(rt);
      if (!a) return;
      r === "Plugin"
        ? (a = a.filter(function (d) {
            return Me.some(function (_) {
              return d.startsWith(_);
            });
          }))
        : (a = a.filter(function (d) {
            return d.endsWith(".json");
          }));
      let i = a[0];
      if (!i) return;
      let s = ae(t, function (d) {
          return d?.[0]?.key;
        }),
        m = s[0].type;
      s.unshift(
        React.createElement(
          m,
          { key: "install" },
          React.createElement(Ha, {
            leading: React.createElement($a, {
              style: { opacity: 1 },
              source: f("ic_download_24px"),
            }),
            label: `Install ${r}`,
            onPress: function () {
              return (r === "Plugin" ? Re : ve)(i)
                .then(function () {
                  g(`Successfully installed ${n.name}`, f("Check"));
                })
                .catch(function (d) {
                  g(d.message, f("Small"));
                })
                .finally(function () {
                  return Ka();
                });
            },
          })
        )
      );
    });
  }
  var Va,
    Ha,
    $a,
    ja,
    Ka,
    xo = c(() => {
      "use strict";
      Ee();
      $();
      ye();
      Y();
      ge();
      S();
      x();
      v();
      ee();
      (Va = F("ForumPostLongPressActionSheet", !1)),
        ({ FormRow: Ha, FormIcon: $a } = E),
        ({ useFirstForumPostMessage: ja } = u("useFirstForumPostMessage")),
        ({ hideActionSheet: Ka } = u("openLazy", "hideActionSheet"));
    });
  function So(e) {
    if (
      Me.filter(function (t) {
        return e.startsWith(t);
      }).length > 0
    )
      return "Plugin";
    if (e.endsWith(".json") && window.__vendetta_loader?.features.themes)
      return "Theme";
  }
  function bo(e, t) {
    (e === "Plugin" ? Re : ve)(t)
      .then(function () {
        g("Successfully installed", f("Check"));
      })
      .catch(function (n) {
        g(n.message, f("Small"));
      });
  }
  function wo() {
    let e = new Array();
    return (
      e.push(
        R("showSimpleActionSheet", Wa, function (t) {
          if (t[0].key !== "LongPressUrl") return;
          let {
              header: { title: n },
              options: r,
            } = t[0],
            o = So(n);
          o &&
            r.push({
              label: `Install ${o}`,
              onPress: function () {
                return bo(o, n);
              },
            });
        })
      ),
      e.push(
        we("handleClick", Ya, async function (t, n) {
          let { href: r } = t[0],
            o = So(r);
          if (!o) return n.apply(this, t);
          if (o === "Theme" && qa(Xa())?.parent_id !== nt)
            return n.apply(this, t);
          G({
            title: "Hold Up",
            content: [
              "This link is a ",
              React.createElement(l.Text, { style: Ja["text-md/semibold"] }, o),
              ", would you like to install it?",
            ],
            onConfirm: function () {
              return bo(o, r);
            },
            confirmText: "Install",
            cancelText: "Cancel",
            secondaryConfirmText: "Open in Browser",
            onConfirmSecondary: function () {
              return za(r);
            },
          });
        })
      ),
      function () {
        return e.forEach(function (t) {
          return t();
        });
      }
    );
  }
  var Wa,
    Ya,
    za,
    Xa,
    qa,
    Ja,
    To = c(() => {
      "use strict";
      Ee();
      $();
      ye();
      Y();
      h();
      S();
      Se();
      x();
      ee();
      (Wa = W(function (e) {
        return (
          e?.showSimpleActionSheet &&
          !Object.getOwnPropertyDescriptor(e, "showSimpleActionSheet")?.get
        );
      })),
        (Ya = u("handleClick")),
        ({ openURL: za } = Ge),
        ({ getChannelId: Xa } = tn),
        ({ getChannel: qa } = u("getChannel")),
        ({ TextStyleSheet: Ja } = u("TextStyleSheet"));
    });
  function On() {
    let e = new Array();
    return (
      e.push(_o()),
      e.push(wo()),
      function () {
        return e.forEach(function (t) {
          return t();
        });
      }
    );
  }
  var vo = c(() => {
    "use strict";
    xo();
    To();
  });
  function Ao() {
    return R("render", Za.prototype, function (e, t) {
      var n = this;
      if (!this.state.error) return;
      let r = tt();
      this.state.activeTab ??= "message";
      let o = Io.find(function (s) {
          return s.id === n.state.activeTab;
        }),
        a = this.state.error[this.state.activeTab],
        i = [
          { text: "Restart Discord", onPress: this.handleReload },
          ...(p.safeMode?.enabled
            ? []
            : [{ text: "Restart in Safe Mode", onPress: et }]),
          {
            text: "Retry Render",
            color: N.RED,
            onPress: function () {
              return n.setState({ info: null, error: null });
            },
          },
        ];
      return React.createElement(
        T,
        null,
        React.createElement(
          Dn,
          { style: at.container },
          React.createElement(
            l.View,
            { style: at.header },
            t.props.Illustration &&
              React.createElement(t.props.Illustration, {
                style: {
                  flex: 1,
                  resizeMode: "contain",
                  maxHeight: 96,
                  paddingRight: 4,
                },
              }),
            React.createElement(
              l.View,
              { style: { flex: 2, paddingLeft: 4 } },
              React.createElement(
                l.Text,
                { style: at.headerTitle },
                t.props.title
              ),
              React.createElement(
                l.Text,
                { style: at.headerDescription },
                t.props.body
              )
            )
          ),
          React.createElement(
            l.View,
            { style: { flex: 6 } },
            React.createElement(
              l.View,
              { style: { paddingBottom: 8 } },
              React.createElement(Qa, {
                tabs: Io,
                activeTab: this.state.activeTab,
                onTabSelected: function (s) {
                  n.setState({ activeTab: s });
                },
              })
            ),
            React.createElement(
              xe,
              { selectable: !0, style: { flexBasis: "auto", marginBottom: 8 } },
              [
                `Discord: ${r.discord.build} (${r.os.name})`,
                `Vendetta: ${r.vendetta.version}`,
              ].join(`
`)
            ),
            React.createElement(
              xe,
              { selectable: !0, style: { flex: 1, textAlignVertical: "top" } },
              o?.trimWhitespace
                ? a
                    .split(
                      `
`
                    )
                    .filter(function (s) {
                      return s.length !== 0;
                    })
                    .map(function (s) {
                      return s.trim();
                    }).join(`
`)
                : a
            )
          ),
          React.createElement(
            l.View,
            { style: at.footer },
            i.map(function (s) {
              let m = i.indexOf(s) !== 0 ? 8 : 0;
              return React.createElement(te, {
                text: s.text,
                color: s.color ?? N.BRAND,
                size: s.size ?? "small",
                onPress: s.onPress,
                style: ne.isTablet
                  ? { flex: `0.${i.length}`, marginLeft: m }
                  : { marginTop: m },
              });
            })
          )
        )
      );
    });
  }
  var Za,
    Qa,
    Co,
    at,
    Io,
    No = c(() => {
      "use strict";
      Ue();
      me();
      $();
      V();
      h();
      S();
      De();
      _e();
      v();
      (Za = F("ErrorBoundary")),
        ({ BadgableTabBar: Qa } = u("BadgableTabBar")),
        ({ TextStyleSheet: Co } = u("TextStyleSheet")),
        (at = M.createThemedStyleSheet({
          container: {
            flex: 1,
            backgroundColor: y.BACKGROUND_PRIMARY,
            paddingHorizontal: 16,
          },
          header: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 8,
          },
          headerTitle: {
            ...Co["heading-md/semibold"],
            textAlign: "center",
            textTransform: "uppercase",
            color: y.HEADER_PRIMARY,
          },
          headerDescription: {
            ...Co["text-sm/medium"],
            textAlign: "center",
            color: y.TEXT_MUTED,
          },
          footer: {
            flexDirection: ne.isTablet ? "row" : "column",
            justifyContent: "flex-end",
            marginVertical: 8,
          },
        })),
        (Io = [
          { id: "message", title: "Message" },
          { id: "stack", title: "Stack Trace" },
          { id: "componentStack", title: "Component", trimWhitespace: !0 },
        ]);
    });
  function wt(e) {
    let { alertTitle: t, installFunction: n } = e;
    return React.createElement(
      l.TouchableOpacity,
      {
        onPress: function () {
          return z.getString().then(function (r) {
            return Bn({
              title: t,
              initialValue: r.match(rt)?.[0] ?? "",
              placeholder: "https://example.com/",
              onConfirm: function (o) {
                return n(o);
              },
              confirmText: "Install",
              cancelText: "Cancel",
            });
          });
        },
      },
      React.createElement(l.Image, { style: ei.icon, source: f("ic_add_24px") })
    );
  }
  var ei,
    Do = c(() => {
      "use strict";
      Ee();
      h();
      Se();
      x();
      _e();
      ei = M.createThemedStyleSheet({
        icon: { marginRight: 10, tintColor: y.HEADER_PRIMARY },
      });
    });
  function Fn(e) {
    let { asset: t } = e;
    return React.createElement(ti, {
      label: `${t.name} - ${t.id}`,
      trailing: React.createElement(l.Image, {
        source: t.id,
        style: { width: 32, height: 32 },
      }),
      onPress: function () {
        z.setString(t.name),
          g("Copied asset name to clipboard.", f("toast_copy_link"));
      },
    });
  }
  var ti,
    Po = c(() => {
      "use strict";
      h();
      x();
      v();
      ee();
      ({ FormRow: ti } = E);
    });
  function kn() {
    let [e, t] = React.useState("");
    return React.createElement(
      T,
      null,
      React.createElement(
        l.View,
        { style: { flex: 1 } },
        React.createElement(je, {
          style: { margin: 10 },
          onChangeText: function (n) {
            return t(n);
          },
          placeholder: "Search",
        }),
        React.createElement(l.FlatList, {
          data: Object.values(le).filter(function (n) {
            return n.name.includes(e) || n.id.toString() === e;
          }),
          renderItem: function (n) {
            let { item: r } = n;
            return React.createElement(Fn, { asset: r });
          },
          ItemSeparatorComponent: ni,
          keyExtractor: function (n) {
            return n.name;
          },
        })
      )
    );
  }
  var ni,
    Mo = c(() => {
      "use strict";
      h();
      x();
      v();
      Po();
      ({ FormDivider: ni } = E);
    });
  function Un() {
    let e = ce.useNavigation();
    return (
      w(p),
      w(X),
      React.createElement(
        T,
        null,
        React.createElement(
          l.ScrollView,
          { style: { flex: 1 }, contentContainerStyle: { paddingBottom: 38 } },
          React.createElement(
            Gn,
            { title: "Debug", titleStyleType: "no_border" },
            React.createElement(Lo, {
              value: p.debuggerUrl,
              onChange: function (t) {
                return (p.debuggerUrl = t);
              },
              placeholder: "127.0.0.1:9090",
              title: "DEBUGGER URL",
            }),
            React.createElement(it, null),
            React.createElement(H, {
              label: "Connect to debug websocket",
              leading: React.createElement(H.Icon, { source: f("copy") }),
              onPress: function () {
                return mn(p.debuggerUrl);
              },
            }),
            window.__vendetta_rdc &&
              React.createElement(
                React.Fragment,
                null,
                React.createElement(it, null),
                React.createElement(H, {
                  label: "Connect to React DevTools",
                  leading: React.createElement(H.Icon, {
                    source: f("ic_badge_staff"),
                  }),
                  onPress: function () {
                    return window.__vendetta_rdc?.connectToDevTools({
                      host: p.debuggerUrl.split(":")?.[0],
                      resolveRNStyle: l.StyleSheet.flatten,
                    });
                  },
                })
              )
          ),
          window.__vendetta_loader?.features.loaderConfig &&
            React.createElement(
              Gn,
              { title: "Loader config" },
              React.createElement(Bo, {
                label: "Load from custom url",
                subLabel: "Load Revenge from a custom endpoint.",
                leading: React.createElement(H.Icon, { source: f("copy") }),
                value: X.customLoadUrl.enabled,
                onValueChange: function (t) {
                  X.customLoadUrl.enabled = t;
                },
              }),
              React.createElement(it, null),
              X.customLoadUrl.enabled &&
                React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(Lo, {
                    value: X.customLoadUrl.url,
                    onChange: function (t) {
                      return (X.customLoadUrl.url = t);
                    },
                    placeholder: "http://localhost:4040/revenge.js",
                    title: "REVENGE URL",
                  }),
                  React.createElement(it, null)
                ),
              window.__vendetta_loader.features.devtools &&
                React.createElement(Bo, {
                  label: "Load React DevTools",
                  subLabel: `Version: ${window.__vendetta_loader.features.devtools.version}`,
                  leading: React.createElement(H.Icon, {
                    source: f("ic_badge_staff"),
                  }),
                  value: X.loadReactDevTools,
                  onValueChange: function (t) {
                    X.loadReactDevTools = t;
                  },
                })
            ),
          React.createElement(
            Gn,
            { title: "Other" },
            React.createElement(H, {
              label: "Asset Browser",
              leading: React.createElement(H.Icon, { source: f("ic_image") }),
              trailing: H.Arrow,
              onPress: function () {
                return e.push("VendettaCustomPage", {
                  title: "Asset Browser",
                  render: kn,
                });
              },
            }),
            React.createElement(it, null),
            React.createElement(H, {
              label: "ErrorBoundary Tools",
              leading: React.createElement(H.Icon, {
                source: f("ic_warning_24px"),
              }),
              trailing: H.Arrow,
              onPress: function () {
                return oi({
                  key: "ErrorBoundaryTools",
                  header: {
                    title: "Which ErrorBoundary do you want to trip?",
                    icon: React.createElement(H.Icon, {
                      style: { marginRight: 8 },
                      source: f("ic_warning_24px"),
                    }),
                    onClose: function () {
                      return ri();
                    },
                  },
                  options: [
                    {
                      label: "Revenge",
                      onPress: function () {
                        return e.push("VendettaCustomPage", {
                          render: function () {
                            return React.createElement("undefined", null);
                          },
                        });
                      },
                    },
                    {
                      label: "Discord",
                      isDestructive: !0,
                      onPress: function () {
                        return e.push("VendettaCustomPage", {
                          noErrorBoundary: !0,
                        });
                      },
                    },
                  ],
                });
              },
            })
          )
        )
      )
    );
  }
  var Gn,
    H,
    Bo,
    Lo,
    it,
    ri,
    oi,
    Oo = c(() => {
      "use strict";
      Ue();
      V();
      j();
      h();
      S();
      x();
      v();
      Mo();
      ({
        FormSection: Gn,
        FormRow: H,
        FormSwitchRow: Bo,
        FormInput: Lo,
        FormDivider: it,
      } = E),
        ({ hideActionSheet: ri } = u("openLazy", "hideActionSheet")),
        ({ showSimpleActionSheet: oi } = u("showSimpleActionSheet"));
    });
  function Tt(e) {
    let { label: t, version: n, icon: r } = e;
    return React.createElement(Fo, {
      label: t,
      leading: React.createElement(Fo.Icon, { source: f(r) }),
      trailing: React.createElement(ai, null, n),
      onPress: function () {
        z.setString(`${t} - ${n}`),
          g("Copied version to clipboard.", f("toast_copy_link"));
      },
    });
  }
  var Fo,
    ai,
    ko = c(() => {
      "use strict";
      h();
      x();
      v();
      ee();
      ({ FormRow: Fo, FormText: ai } = E);
    });
  function Vn() {
    w(p);
    let e = [
        {
          label: "Revenge",
          version: L.vendetta.version,
          icon: "ic_progress_wrench_24px",
        },
        {
          label: "Discord",
          version: `${L.discord.version} (${L.discord.build})`,
          icon: "Discord",
        },
        { label: "React", version: L.react.version, icon: "ic_category_16px" },
        {
          label: "React Native",
          version: L.react.nativeVersion,
          icon: "mobile",
        },
        {
          label: "Bytecode",
          version: L.hermes.bytecodeVersion,
          icon: "ic_server_security_24px",
        },
      ],
      t = [
        {
          label: "Loader",
          version: L.vendetta.loader,
          icon: "ic_download_24px",
        },
        {
          label: "Operating System",
          version: `${L.os.name} ${L.os.version}`,
          icon: "ic_cog_24px",
        },
        ...(L.os.sdk
          ? [
              {
                label: "SDK",
                version: L.os.sdk,
                icon: "ic_profile_badge_verified_developer_color",
              },
            ]
          : []),
        {
          label: "Manufacturer",
          version: L.device.manufacturer,
          icon: "ic_badge_staff",
        },
        {
          label: "Brand",
          version: L.device.brand,
          icon: "ic_settings_boost_24px",
        },
        { label: "Model", version: L.device.model, icon: "ic_phonelink_24px" },
        {
          label: l.Platform.select({ android: "Codename", ios: "Machine ID" }),
          version: L.device.codename,
          icon: "ic_compose_24px",
        },
      ];
    return React.createElement(
      T,
      null,
      React.createElement(
        l.ScrollView,
        { style: { flex: 1 }, contentContainerStyle: { paddingBottom: 38 } },
        React.createElement(
          vt,
          { title: "Links", titleStyleType: "no_border" },
          React.createElement(B, {
            label: "Discord Server",
            leading: React.createElement(B.Icon, { source: f("Discord") }),
            trailing: B.Arrow,
            onPress: function () {
              return Ge.openDeeplink(En);
            },
          }),
          React.createElement(Be, null),
          React.createElement(B, {
            label: "GitHub",
            leading: React.createElement(B.Icon, {
              source: f("img_account_sync_github_white"),
            }),
            trailing: B.Arrow,
            onPress: function () {
              return Ge.openURL(Sn);
            },
          })
        ),
        React.createElement(
          vt,
          { title: "Actions" },
          React.createElement(B, {
            label: "Reload Discord",
            leading: React.createElement(B.Icon, {
              source: f("ic_message_retry"),
            }),
            onPress: function () {
              return re.reload();
            },
          }),
          React.createElement(Be, null),
          React.createElement(B, {
            label: p.safeMode?.enabled
              ? "Return to Normal Mode"
              : "Reload in Safe Mode",
            subLabel: `This will reload Discord ${
              p.safeMode?.enabled ? "normally." : "without loading plugins."
            }`,
            leading: React.createElement(B.Icon, {
              source: f("ic_privacy_24px"),
            }),
            onPress: et,
          }),
          React.createElement(Be, null),
          React.createElement(ii, {
            label: "Developer Settings",
            leading: React.createElement(B.Icon, {
              source: f("ic_progress_wrench_24px"),
            }),
            value: p.developerSettings,
            onValueChange: function (n) {
              p.developerSettings = n;
            },
          })
        ),
        React.createElement(
          vt,
          { title: "Info" },
          React.createElement(
            Ke,
            { label: "Versions", icon: "ic_information_filled_24px" },
            e.map(function (n, r) {
              return React.createElement(
                React.Fragment,
                null,
                React.createElement(Tt, {
                  label: n.label,
                  version: n.version,
                  icon: n.icon,
                }),
                r !== e.length - 1 && React.createElement(Be, null)
              );
            })
          ),
          React.createElement(Be, null),
          React.createElement(
            Ke,
            { label: "Platform", icon: "ic_mobile_device" },
            t.map(function (n, r) {
              return React.createElement(
                React.Fragment,
                null,
                React.createElement(Tt, {
                  label: n.label,
                  version: n.version,
                  icon: n.icon,
                }),
                r !== t.length - 1 && React.createElement(Be, null)
              );
            })
          )
        ),
        React.createElement(
          vt,
          { title: "Advanced" },
          React.createElement(B, {
            label: "Clear plugin storage",
            leading: React.createElement(B.Icon, {
              source: f("ic_message_delete"),
            }),
            onPress: function () {
              return G({
                title: "Clear plugin storage?",
                content:
                  "All installed plugins will be removed and the app will be reloaded. Plugin settings will still be retained. This is only neccessary if you have a corrupted storage.",
                confirmText: "Yes, I have a corrupted storage",
                cancelText: "Cancel",
                confirmColor: N.RED,
                onConfirm: function () {
                  pt("VENDETTA_PLUGINS"), re.reload();
                },
              });
            },
          }),
          React.createElement(Be, null),
          React.createElement(B, {
            label: "Clear theme storage",
            leading: React.createElement(B.Icon, {
              source: f("ic_message_delete"),
            }),
            onPress: function () {
              return G({
                title: "Clear theme storage?",
                content:
                  "All installed themes will be removed and the app will be reloaded. This is only neccessary if you have a corrupted storage.",
                confirmText: "Yes, I have a corrupted storage",
                cancelText: "Cancel",
                confirmColor: N.RED,
                onConfirm: function () {
                  pt("VENDETTA_THEMES"), re.reload();
                },
              });
            },
          })
        )
      )
    );
  }
  var B,
    ii,
    vt,
    Be,
    L,
    Go = c(() => {
      "use strict";
      Ee();
      Ue();
      me();
      V();
      j();
      h();
      De();
      Se();
      x();
      v();
      ko();
      ({ FormRow: B, FormSwitchRow: ii, FormSection: vt, FormDivider: Be } = E),
        (L = tt());
    });
  function st(e) {
    let {
      items: t,
      safeModeMessage: n,
      safeModeExtras: r,
      card: o,
      keyGetter: a,
    } = e;
    w(p), w(t);
    let [i, s] = React.useState("");
    return React.createElement(
      T,
      null,
      React.createElement(l.FlatList, {
        ListHeaderComponent: React.createElement(
          React.Fragment,
          null,
          p.safeMode?.enabled &&
            React.createElement(
              l.View,
              { style: { marginBottom: 10 } },
              React.createElement(Nn, { messageType: 0 }, n),
              r
            ),
          React.createElement(je, {
            style: { marginBottom: 10 },
            onChangeText: function (m) {
              return s(m.toLowerCase());
            },
            placeholder: "Search",
          })
        ),
        ListFooterComponent: React.createElement(l.View, {
          style: { height: 48 },
        }),
        style: { paddingHorizontal: 10, paddingTop: 10 },
        contentContainerStyle: { paddingBottom: 20 },
        data: Object.values(t).filter(function (m) {
          return a(m).some(function (d) {
            return d?.toLowerCase().includes(i);
          });
        }),
        renderItem: function (m) {
          let { item: d, index: _ } = m;
          return React.createElement(o, { item: d, index: _, highlight: i });
        },
      })
    );
  }
  var Hn = c(() => {
    "use strict";
    V();
    j();
    h();
    v();
  });
  function ct(e) {
    let t = e.toggleValue ?? !1;
    return React.createElement(
      l.View,
      { style: [J.card, { marginTop: e.index !== 0 ? 10 : 0 }] },
      React.createElement($n, {
        style: J.header,
        label: React.createElement(
          l.View,
          { style: J.headerChildren },
          React.createElement(
            l.Text,
            { style: J.headerLabel },
            jn(e.headerLabel, e.highlight)
          ),
          e.headerSublabel &&
            React.createElement(
              l.Text,
              { style: J.headerSubtitle },
              jn(e.headerSublabel, e.highlight)
            )
        ),
        leading:
          e.headerIcon &&
          React.createElement(
            l.View,
            { style: J.iconContainer },
            React.createElement(l.Image, {
              source: f(e.headerIcon),
              style: J.smallerIcon,
            })
          ),
        trailing:
          e.toggleType &&
          (e.toggleType === "switch"
            ? React.createElement(si, {
                style: l.Platform.OS === "android" && { marginVertical: -15 },
                value: e.toggleValue,
                onValueChange: e.onToggleChange,
              })
            : React.createElement(
                l.Pressable,
                {
                  onPress: function () {
                    (t = !t), e.onToggleChange?.(t);
                  },
                },
                React.createElement(ci, { selected: e.toggleValue })
              )),
      }),
      React.createElement($n, {
        label: e.descriptionLabel && jn(e.descriptionLabel, e.highlight),
        trailing: React.createElement(
          l.View,
          { style: J.actions },
          e.overflowActions &&
            React.createElement(
              l.TouchableOpacity,
              {
                onPress: function () {
                  return ui({
                    key: "CardOverflow",
                    header: {
                      title: e.overflowTitle,
                      icon:
                        e.headerIcon &&
                        React.createElement($n.Icon, {
                          style: { marginRight: 8 },
                          source: f(e.headerIcon),
                        }),
                      onClose: function () {
                        return li();
                      },
                    },
                    options: e.overflowActions?.map(function (n) {
                      return { ...n, icon: f(n.icon) };
                    }),
                  });
                },
              },
              React.createElement(l.Image, {
                style: J.icon,
                source: f("ic_more_24px"),
              })
            ),
          e.actions?.map(function (n) {
            let { icon: r, onPress: o } = n;
            return React.createElement(
              l.TouchableOpacity,
              { onPress: o },
              React.createElement(l.Image, { style: J.icon, source: f(r) })
            );
          })
        ),
      })
    );
  }
  var $n,
    si,
    ci,
    li,
    ui,
    Uo,
    J,
    jn,
    Kn = c(() => {
      "use strict";
      Ee();
      h();
      S();
      x();
      _e();
      v();
      ({ FormRow: $n, FormSwitch: si, FormRadio: ci } = E),
        ({ hideActionSheet: li } = u("openLazy", "hideActionSheet")),
        ({ showSimpleActionSheet: ui } = u("showSimpleActionSheet")),
        ({ TextStyleSheet: Uo } = u("TextStyleSheet")),
        (J = M.createThemedStyleSheet({
          card: { backgroundColor: y?.BACKGROUND_SECONDARY, borderRadius: 12 },
          header: {
            padding: 0,
            backgroundColor: y?.BACKGROUND_TERTIARY,
            borderRadius: 12,
          },
          headerChildren: { flexDirection: "column", justifyContent: "center" },
          headerLabel: { color: y?.TEXT_NORMAL, ...Uo["text-md/semibold"] },
          headerSubtitle: { color: y?.TEXT_MUTED, ...Uo["text-sm/semibold"] },
          actions: { flexDirection: "row-reverse", alignItems: "center" },
          icon: {
            width: 22,
            height: 22,
            marginLeft: 5,
            tintColor: y?.INTERACTIVE_NORMAL,
          },
          iconContainer: {
            width: 33,
            height: 33,
            borderRadius: 17,
            backgroundColor: y?.BACKGROUND_ACCENT,
            justifyContent: "center",
            alignItems: "center",
          },
          smallerIcon: {
            width: 22,
            height: 22,
            tintColor: y?.INTERACTIVE_NORMAL,
          },
          highlight: { backgroundColor: `#F0${Tn.YELLOW_300.slice(1)}` },
        })),
        (jn = function (e, t) {
          return t
            ? e
                .split(new RegExp(`(${t.replace(bn, "\\$&")})`, "gi"))
                .map(function (n, r) {
                  return r % 2 === 1
                    ? React.createElement(l.Text, { style: J.highlight }, n)
                    : n;
                })
            : e;
        });
    });
  async function Vo(e, t) {
    e.enabled && $e(e.id, !1), t(), e.enabled && (await He(e.id));
  }
  function Wn(e) {
    let { item: t, index: n, highlight: r } = e,
      o = Rn(t.id),
      a = ce.useNavigation(),
      [i, s] = React.useState(!1);
    if (i) return null;
    let m = t.manifest.authors;
    return React.createElement(ct, {
      index: n,
      headerLabel: t.manifest.name,
      headerSublabel:
        m?.[0] &&
        `by ${t.manifest.authors
          .map(function (d) {
            return d.name;
          })
          .join(", ")}`,
      headerIcon: t.manifest.vendetta?.icon || "ic_application_command_24px",
      toggleType: "switch",
      toggleValue: t.enabled,
      onToggleChange: function (d) {
        try {
          d ? He(t.id) : $e(t.id);
        } catch (_) {
          g(_.message, f("Small"));
        }
      },
      descriptionLabel: t.manifest.description,
      overflowTitle: t.manifest.name,
      overflowActions: [
        {
          icon: "ic_sync_24px",
          label: "Refetch",
          onPress: async function () {
            Vo(t, function () {
              Ve(t.id)
                .then(async function () {
                  g("Successfully refetched plugin.", f("toast_image_saved"));
                })
                .catch(function () {
                  g("Failed to refetch plugin!", f("Small"));
                });
            });
          },
        },
        {
          icon: "copy",
          label: "Copy URL",
          onPress: function () {
            z.setString(t.id),
              g("Copied plugin URL to clipboard.", f("toast_copy_link"));
          },
        },
        {
          icon: "ic_download_24px",
          label: t.update ? "Disable updates" : "Enable updates",
          onPress: function () {
            (t.update = !t.update),
              g(
                `${t.update ? "Enabled" : "Disabled"} updates for ${
                  t.manifest.name
                }.`,
                f("toast_image_saved")
              );
          },
        },
        {
          icon: "ic_duplicate",
          label: "Clear data",
          isDestructive: !0,
          onPress: function () {
            return G({
              title: "Wait!",
              content: `Are you sure you wish to clear the data of ${t.manifest.name}?`,
              confirmText: "Clear",
              cancelText: "Cancel",
              confirmColor: N.RED,
              onConfirm: function () {
                Vo(t, function () {
                  try {
                    fe.removeItem(t.id),
                      g(`Cleared data for ${t.manifest.name}.`, f("trash"));
                  } catch {
                    g(
                      `Failed to clear data for ${t.manifest.name}!`,
                      f("Small")
                    );
                  }
                });
              },
            });
          },
        },
        {
          icon: "ic_message_delete",
          label: "Delete",
          isDestructive: !0,
          onPress: function () {
            return G({
              title: "Wait!",
              content: `Are you sure you wish to delete ${t.manifest.name}? This will clear all of the plugin's data.`,
              confirmText: "Delete",
              cancelText: "Cancel",
              confirmColor: N.RED,
              onConfirm: function () {
                try {
                  gn(t.id), s(!0);
                } catch (d) {
                  g(d.message, f("Small"));
                }
              },
            });
          },
        },
      ],
      actions: [
        ...(o
          ? [
              {
                icon: "settings",
                onPress: function () {
                  return a.push("VendettaCustomPage", {
                    title: t.manifest.name,
                    render: o,
                  });
                },
              },
            ]
          : []),
      ],
      highlight: r,
    });
  }
  var Ho = c(() => {
    "use strict";
    me();
    ye();
    h();
    De();
    Se();
    x();
    Kn();
    ee();
  });
  function Yn() {
    return (
      w(p),
      React.createElement(st, {
        items: D,
        safeModeMessage:
          "You are in Safe Mode, so plugins cannot be loaded. Disable any misbehaving plugins, then return to Normal Mode from the General settings page.",
        card: Wn,
        keyGetter: function (e) {
          return [
            e.id,
            e.manifest.name,
            e.manifest.description,
            e.manifest.authors?.map(function (t) {
              return t.name;
            }),
          ].flat();
        },
      })
    );
  }
  var $o = c(() => {
    "use strict";
    ye();
    V();
    j();
    Hn();
    Ho();
  });
  async function jo(e, t) {
    await Ce(e ? t : "default"), re.reload();
  }
  function zn(e) {
    let { item: t, index: n, highlight: r } = e;
    w(p);
    let [o, a] = React.useState(!1);
    if (o) return null;
    let i = t.data.authors;
    return React.createElement(ct, {
      index: n,
      headerLabel: t.data.name,
      headerSublabel:
        i?.[0] &&
        `by ${i
          .map(function (s) {
            return s.name;
          })
          .join(", ")}`,
      descriptionLabel: t.data.description ?? "No description.",
      toggleType: p.safeMode?.enabled ? void 0 : "radio",
      toggleValue: t.selected,
      onToggleChange: function (s) {
        jo(s, t.id);
      },
      overflowTitle: t.data.name,
      overflowActions: [
        {
          icon: "ic_sync_24px",
          label: "Refetch",
          onPress: function () {
            qe(t.id, t.selected)
              .then(function () {
                t.selected
                  ? G({
                      title: "Theme refetched",
                      content:
                        "A reload is required to see the changes. Do you want to reload now?",
                      confirmText: "Reload",
                      cancelText: "Cancel",
                      confirmColor: N.RED,
                      onConfirm: function () {
                        return re.reload();
                      },
                    })
                  : g("Successfully refetched theme.", f("toast_image_saved"));
              })
              .catch(function () {
                g("Failed to refetch theme!", f("Small"));
              });
          },
        },
        {
          icon: "copy",
          label: "Copy URL",
          onPress: function () {
            z.setString(t.id),
              g("Copied theme URL to clipboard.", f("toast_copy_link"));
          },
        },
        {
          icon: "ic_message_delete",
          label: "Delete",
          isDestructive: !0,
          onPress: function () {
            return G({
              title: "Wait!",
              content: `Are you sure you wish to delete ${t.data.name}?`,
              confirmText: "Delete",
              cancelText: "Cancel",
              confirmColor: N.RED,
              onConfirm: function () {
                Jt(t.id)
                  .then(function (s) {
                    a(!0), s && jo(!1, t.id);
                  })
                  .catch(function (s) {
                    g(s.message, f("Small"));
                  });
              },
            });
          },
        },
      ],
      highlight: r,
    });
  }
  var Ko = c(() => {
    "use strict";
    me();
    V();
    j();
    Y();
    h();
    De();
    Se();
    x();
    Kn();
    ee();
  });
  function Xn() {
    return (
      w(p),
      React.createElement(st, {
        items: k,
        safeModeMessage: `You are in Safe Mode, meaning themes have been temporarily disabled.${
          p.safeMode?.currentThemeId
            ? " If a theme appears to be causing the issue, you can press below to disable it persistently."
            : ""
        }`,
        safeModeExtras: p.safeMode?.currentThemeId
          ? React.createElement(te, {
              text: "Disable Theme",
              color: N.BRAND,
              size: "small",
              onPress: function () {
                delete p.safeMode?.currentThemeId;
              },
              style: { marginTop: 8 },
            })
          : void 0,
        card: zn,
        keyGetter: function (e) {
          return [
            e.id,
            e.data.name,
            e.data.description,
            e.data.authors?.map(function (t) {
              return t.name;
            }),
          ].flat();
        },
      })
    );
  }
  var Wo = c(() => {
    "use strict";
    V();
    j();
    Y();
    De();
    v();
    Hn();
    Ko();
  });
  var fi,
    lt,
    Ct,
    We,
    ut,
    Yo,
    qn,
    It = c(() => {
      "use strict";
      Ee();
      ye();
      V();
      Y();
      ge();
      h();
      Se();
      x();
      _e();
      Cn();
      Do();
      Oo();
      Go();
      $o();
      Wo();
      ee();
      (fi = M.createThemedStyleSheet({
        container: { flex: 1, backgroundColor: y.BACKGROUND_MOBILE_PRIMARY },
      })),
        (lt = function (e, t) {
          return t ? _t.snakeCase(e).toUpperCase() : e;
        }),
        (Ct = function (e, t) {
          return Object.fromEntries(
            e.map(function (n) {
              return [
                n.key,
                typeof t == "function" ? t(n) : typeof t == "string" ? n[t] : t,
              ];
            })
          );
        }),
        (We = function () {
          let e =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          return [
            {
              key: lt("RevengeSettings", e),
              title: "General",
              icon: "settings",
              render: Vn,
            },
            {
              key: lt("RevengePlugins", e),
              title: "Plugins",
              icon: "debug",
              options: {
                headerRight: function () {
                  return React.createElement(wt, {
                    alertTitle: "Install Plugin",
                    installFunction: async function (t) {
                      if (
                        !(
                          Me.filter(function (n) {
                            return t.startsWith(n);
                          }).length > 0
                        ) &&
                        !p.developerSettings
                      )
                        setImmediate(function () {
                          return G({
                            title: "Unproxied Plugin",
                            content:
                              "The plugin you are trying to install has not been verified by Revenge staff. Are you sure you want to continue?",
                            confirmText: "Install",
                            onConfirm: function () {
                              return Re(t)
                                .then(function () {
                                  return g("Installed plugin", f("Check"));
                                })
                                .catch(function (n) {
                                  return g(n?.message ?? `${n}`, f("Small"));
                                });
                            },
                            cancelText: "Cancel",
                          });
                        });
                      else return await Re(t);
                    },
                  });
                },
              },
              render: Yn,
            },
            {
              key: lt("RevengeThemes", e),
              title: "Themes",
              icon: "ic_theme_24px",
              shouldRender: function () {
                return (
                  Object.prototype.hasOwnProperty.call(
                    window.__vendetta_loader?.features,
                    "themes"
                  ) ?? !1
                );
              },
              options: {
                headerRight: function () {
                  return (
                    !p.safeMode?.enabled &&
                    React.createElement(wt, {
                      alertTitle: "Install Theme",
                      installFunction: ve,
                    })
                  );
                },
              },
              render: Xn,
            },
            {
              key: lt("RevengeDeveloper", e),
              title: "Developer",
              icon: "ic_progress_wrench_24px",
              shouldRender: function () {
                return p.developerSettings ?? !1;
              },
              render: Un,
            },
            {
              key: lt("VendettaCustomPage", e),
              title: "Revenge Page",
              shouldRender: function () {
                return !1;
              },
              render: function (t) {
                let { render: n, noErrorBoundary: r, ...o } = t,
                  a = ce.useNavigation();
                return (
                  a.addListener("focus", function () {
                    return a.setOptions(K(o, "render", "noErrorBoundary"));
                  }),
                  r
                    ? React.createElement(n, null)
                    : React.createElement(T, null, React.createElement(n, null))
                );
              },
            },
          ];
        }),
        (ut = function () {
          let e =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          return We(e).filter(function (t) {
            return t.shouldRender?.() ?? !0;
          });
        }),
        (Yo = function () {
          return Ct(We(), function (e) {
            return { title: e.title, render: e.render, ...e.options };
          });
        }),
        (qn = function () {
          let e = We(!0);
          return {
            getLayout: function () {
              return {
                title: "Revenge",
                label: "Revenge",
                settings: ut(!0).map(function (t) {
                  return t.key;
                }),
              };
            },
            titleConfig: Ct(e, "title"),
            relationships: Ct(e, null),
            rendererConfigs: Ct(e, function (t) {
              let n = React.memo(function (r) {
                let { navigation: o, route: a } = r;
                return (
                  o.addListener("focus", function () {
                    return o.setOptions(t.options);
                  }),
                  React.createElement(
                    l.View,
                    { style: fi.container },
                    React.createElement(t.render, a.params)
                  )
                );
              });
              return {
                type: "route",
                title: function () {
                  return t.title;
                },
                icon: t.icon ? f(t.icon) : null,
                screen: {
                  route: _t.chain(t.key).camelCase().upperFirst().value(),
                  getComponent: function () {
                    return n;
                  },
                },
              };
            }),
          };
        });
    });
  function Zn() {
    let e = ce.useNavigation();
    w(p);
    let t = ut();
    return React.createElement(
      T,
      null,
      React.createElement(
        mi,
        {
          key: "Revenge",
          title: `Revenge${p.safeMode?.enabled ? " (Safe Mode)" : ""}`,
        },
        t.map(function (n, r) {
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(Jn, {
              label: n.title,
              leading: React.createElement(Jn.Icon, { source: f(n.icon) }),
              trailing: Jn.Arrow,
              onPress: function () {
                return e.push(n.key);
              },
            }),
            r !== t.length - 1 && React.createElement(di, null)
          );
        })
      )
    );
  }
  var Jn,
    mi,
    di,
    zo = c(() => {
      "use strict";
      V();
      j();
      h();
      x();
      v();
      It();
      ({ FormRow: Jn, FormSection: mi, FormDivider: di } = E);
    });
  function Qn() {
    let e = new Array();
    return (
      e.push(
        R("default", pi, function (t, n) {
          return { ...n, ...Yo() };
        })
      ),
      R(
        "default",
        gi,
        function (t, n) {
          let r = ae(n.props.children, function (o) {
            return o.type && o.type.name === "UserSettingsOverview";
          });
          e.push(
            R(
              "renderSupportAndAcknowledgements",
              r.type.prototype,
              function (o, a) {
                let {
                    props: { children: i },
                  } = a,
                  s = i.findIndex(function (m) {
                    return m?.type?.name === "UploadLogsButton";
                  });
                s !== -1 && i.splice(s, 1);
              }
            )
          ),
            e.push(
              R("render", r.type.prototype, function (o, a) {
                let {
                    props: { children: i },
                  } = a,
                  s = [
                    Ae.Messages.BILLING_SETTINGS,
                    Ae.Messages.PREMIUM_SETTINGS,
                  ];
                i = ae(i, function (d) {
                  return d.children?.[1].type?.name === "FormSection";
                }).children;
                let m = i.findIndex(function (d) {
                  return s.includes(d?.props.label);
                });
                i.splice(m === -1 ? 4 : m, 0, React.createElement(Zn, null));
              })
            );
        },
        !0
      ),
      function () {
        return e.forEach(function (t) {
          return t();
        });
      }
    );
  }
  var pi,
    gi,
    Xo = c(() => {
      "use strict";
      $();
      ge();
      h();
      S();
      zo();
      It();
      (pi = F("getScreens", !1)), (gi = F("UserSettingsOverviewWrapper", !1));
    });
  function tr() {
    let e = new Array();
    return (
      Ri(e) || hi(e),
      function () {
        return e.forEach(function (t) {
          return t?.();
        });
      }
    );
  }
  function hi(e) {
    let t = u("useOverviewSettings"),
      n = u("getSettingTitleConfig"),
      r = u("SETTING_RELATIONSHIPS", "SETTING_RENDERER_CONFIGS"),
      o = "getSettingSearchListItems",
      a = "getSettingListItems",
      i = u(o),
      s = !i,
      m = s ? a : o,
      d = i ?? u(a);
    if (!d || !t) return;
    let _ = We(!0),
      P = ut(!0),
      C = qn();
    e.push(
      R("useOverviewSettings", t, function (be, Ye) {
        return qo(Ye, C.getLayout());
      })
    ),
      e.push(
        R("getSettingTitleConfig", n, function (be, Ye) {
          return { ...Ye, ...C.titleConfig };
        })
      ),
      e.push(
        R(m, d, function (be, Ye) {
          let [ta] = be;
          return [
            ...P.filter(function (Z) {
              return ta.includes(Z.key);
            }).map(function (Z) {
              return {
                type: "setting_search_result",
                ancestorRendererData: C.rendererConfigs[Z.key],
                setting: Z.key,
                title: C.titleConfig[Z.key],
                breadcrumbs: ["Revenge"],
                icon: C.rendererConfigs[Z.key].icon,
              };
            }),
            ...Ye.filter(function (Z) {
              return (
                s ||
                !_.map(function (At) {
                  return At.key;
                }).includes(Z.setting)
              );
            }),
          ].map(function (Z, At, na) {
            return { ...Z, index: At, total: na.length };
          });
        })
      );
    let O = r.SETTING_RELATIONSHIPS,
      U = r.SETTING_RENDERER_CONFIGS;
    return (
      (r.SETTING_RELATIONSHIPS = { ...O, ...C.relationships }),
      (r.SETTING_RENDERER_CONFIGS = { ...U, ...C.rendererConfigs }),
      e.push(function () {
        (r.SETTING_RELATIONSHIPS = O), (r.SETTING_RENDERER_CONFIGS = U);
      }),
      !0
    );
  }
  function Ri(e) {
    let t = u("SearchableSettingsList"),
      n = u("SETTING_RENDERER_CONFIG"),
      r = u("getSettingListItems");
    if (!r || !t || !n) return !1;
    let o = We(!0),
      a = qn();
    e.push(
      Mt("type", t.SearchableSettingsList, function (s) {
        let [{ sections: m }] = s;
        return qo(m, a.getLayout());
      })
    ),
      e.push(
        R("getSettingListSearchResultItems", r, function (s, m) {
          m.forEach(function (d) {
            return (
              o.some(function (_) {
                return _.key === d.setting;
              }) && (d.breadcrumbs = ["Revenge"])
            );
          });
        })
      );
    let i = n.SETTING_RENDERER_CONFIG;
    return (
      (n.SETTING_RENDERER_CONFIG = { ...i, ...a.rendererConfigs }),
      e.push(function () {
        n.SETTING_RENDERER_CONFIG = i;
      }),
      !0
    );
  }
  function qo(e, t) {
    if (
      !Array.isArray(e) ||
      e.find(function (o) {
        return er(o, "Revenge");
      })
    )
      return;
    let n = e.findIndex(function (o) {
      return er(o, Ae.Messages.ACCOUNT_SETTINGS);
    });
    e.splice(n + 1, 0, t);
    let r = e.find(function (o) {
      return er(o, Ae.Messages.SUPPORT);
    });
    r &&
      (r.settings = r.settings.filter(function (o) {
        return o !== "UPLOAD_DEBUG_LOGS";
      }));
  }
  var er,
    Jo = c(() => {
      "use strict";
      h();
      $();
      S();
      It();
      er = function (e, t) {
        return e?.label === t || e?.title === t;
      };
    });
  function nr() {
    let e = [Qn(), tr()];
    return function () {
      return e.forEach(function (t) {
        return t?.();
      });
    };
  }
  var Zo = c(() => {
    "use strict";
    Xo();
    Jo();
  });
  var Qo = {};
  I(Qo, { default: () => yi });
  async function yi() {
    let e = await Promise.all([dn(), ln(), an(), qt(), Lr(), Ao(), nr(), On()]);
    (window.vendetta = await yo(e)),
      e.push(await hn()),
      A.log("Revenge (MODDED - 5xdf) is ready!");
  }
  var ea = c(() => {
    "use strict";
    cn();
    Ue();
    Or();
    Te();
    ye();
    Y();
    Eo();
    x();
    vo();
    No();
    Zo();
  });
  me();
  console.log("Hello from Revenge!");
  Object.freeze = Object;
  Object.seal = Object;
  Promise.resolve()
    .then(() => (ea(), Qo))
    .then(function (e) {
      return e.default();
    })
    .catch(function (e) {
      console.log(e?.stack ?? e.toString()),
        alert(
          [
            `Failed to load Revenge!
`,
            `Build Number: ${ze.Build}`,
            "Revenge: c89c521",
            e?.stack || e.toString(),
          ].join(`
`)
        );
    });
})();
//# sourceURL=Revenge
