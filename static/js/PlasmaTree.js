(function () {
    var g = void 0,
        h = true,
        i = null,
        j = false,
        ba = encodeURIComponent,
        ca = Infinity,
        da = setTimeout,
        ea = decodeURIComponent,
        k = Math;

    function fa(a, b) {
        return a.onload = b
    }
    function ga(a, b) {
        return a.name = b
    }
    var m = "push",
        ha = "slice",
        ia = "replace",
        ja = "load",
        ka = "floor",
        n = "charAt",
        la = "value",
        p = "indexOf",
        ma = "match",
        r = "name",
        oa = "host",
        t = "toString",
        u = "length",
        v = "prototype",
        w = "split",
        pa = "stopPropagation",
        qa = "scope",
        x = "location",
        y = "getString",
        z = "substring",
        ra = "navigator",
        A = "join",
        C = "toLowerCase",
        D;

    function sa(a, b) {
        switch (b) {
        case 0:
            return "" + a;
        case 1:
            return a * 1;
        case 2:
            return !!a;
        case 3:
            return a * 1E3
        }
        return a
    }
    function E(a, b) {
        return g == a || "-" == a && !b || "" == a
    }
    function ta(a) {
        if (!a || "" == a) return "";
        for (; a && " \n\r\t" [p](a[n](0)) > -1;) a = a[z](1);
        for (; a && " \n\r\t" [p](a[n](a[u] - 1)) > -1;) a = a[z](0, a[u] - 1);
        return a
    }
    function ua(a) {
        var b = 1,
            c = 0,
            d;
        if (!E(a)) {
            b = 0;
            for (d = a[u] - 1; d >= 0; d--) c = a.charCodeAt(d), b = (b << 6 & 268435455) + c + (c << 14), c = b & 266338304, b = c != 0 ? b ^ c >> 21 : b
        }
        return b
    }

    function va() {
        return k.round(k.random() * 2147483647)
    }
    function wa() {}
    function F(a, b) {
        return ba instanceof Function ? b ? encodeURI(a) : ba(a) : (G(68), escape(a))
    }
    function H(a) {
        a = a[w]("+")[A](" ");
        if (ea instanceof Function) try {
            return ea(a)
        } catch (b) {
            G(17)
        } else G(68);
        return unescape(a)
    }
    var xa = function (a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, !! d) : a.attachEvent && a.attachEvent("on" + b, c)
        },
        ya = function (a, b, c, d) {
            a.removeEventListener ? a.removeEventListener(b, c, !! d) : a.detachEvent && a.detachEvent("on" + b, c)
        };

    function I(a) {
        return a && a[u] > 0 ? a[0] : ""
    }
    function za(a) {
        var b = a ? a[u] : 0;
        return b > 0 ? a[b - 1] : ""
    }
    var Aa = function () {
            this.prefix = "ga.";
            this.I = {}
        };
    Aa[v].set = function (a, b) {
        this.I[this.prefix + a] = b
    };
    Aa[v].get = function (a) {
        return this.I[this.prefix + a]
    };
    Aa[v].contains = function (a) {
        return this.get(a) !== g
    };

    function Ba(a) {
        a[p]("www.") == 0 && (a = a[z](4));
        return a[C]()
    }
    function Ca(a, b) {
        var c, d = {
            url: a,
            protocol: "http",
            host: "",
            path: "",
            c: new Aa,
            anchor: ""
        };
        if (!a) return d;
        c = a[p]("://");
        if (c >= 0) d.protocol = a[z](0, c), a = a[z](c + 3);
        c = a.search("/|\\?|#");
        if (c >= 0) d.host = a[z](0, c)[C](), a = a[z](c);
        else return d.host = a[C](), d;
        c = a[p]("#");
        if (c >= 0) d.anchor = a[z](c + 1), a = a[z](0, c);
        c = a[p]("?");
        c >= 0 && (Da(d.c, a[z](c + 1)), a = a[z](0, c));
        d.anchor && b && Da(d.c, d.anchor);
        a && a[n](0) == "/" && (a = a[z](1));
        d.path = a;
        return d
    }

    function Da(a, b) {
        function c(b, c) {
            a.contains(b) || a.set(b, []);
            a.get(b)[m](c)
        }
        for (var d = ta(b)[w]("&"), e = 0; e < d[u]; e++) if (d[e]) {
            var f = d[e][p]("=");
            f < 0 ? c(d[e], "1") : c(d[e][z](0, f), d[e][z](f + 1))
        }
    }
    function Ea(a, b) {
        if (E(a)) return "-";
        if ("[" == a[n](0) && "]" == a[n](a[u] - 1)) return "-";
        var c = J.domain;
        c += b && b != "/" ? b : "";
        return a[p](c) == (a[p]("http://") == 0 ? 7 : a[p]("https://") == 0 ? 8 : 0) ? "0" : a
    };

    function Fa(a, b, c) {
        k.random() * 100 >= 1 || (a = ["utmt=error", "utmerr=" + a, "utmwv=5.2.2", "utmn=" + va(), "utmsp=1"], b && a[m]("api=" + b), c && a[m]("msg=" + F(c[z](0, 100))), K.q && a[m]("aip=1"), Ga(a[A]("&")))
    };
    var Ha = 0;

    function L(a) {
        return (a ? "_" : "") + Ha++
    }
    var Ia = L(),
        Ja = L(),
        Ka = L(),
        La = L(),
        Ma = L(),
        M = L(),
        N = L(),
        Na = L(),
        Oa = L(),
        Pa = L(),
        Qa = L(),
        Ra = L(),
        Sa = L(),
        Ta = L(),
        Ua = L(),
        Va = L(),
        Wa = L(),
        Xa = L(),
        Ya = L(),
        Za = L(),
        $a = L(),
        ab = L(),
        bb = L(),
        cb = L(),
        db = L(),
        eb = L(),
        fb = L(),
        gb = L(),
        hb = L(),
        ib = L(),
        jb = L(),
        kb = L(),
        lb = L(),
        mb = L(),
        nb = L(),
        O = L(h),
        ob = L(),
        pb = L(),
        qb = L(),
        rb = L(),
        sb = L(),
        tb = L(),
        ub = L(),
        vb = L(),
        wb = L(),
        xb = L(),
        P = L(h),
        yb = L(h),
        zb = L(h),
        Bb = L(h),
        Cb = L(h),
        Db = L(h),
        Eb = L(h),
        Fb = L(h),
        Gb = L(h),
        Hb = L(h),
        Ib = L(h),
        Q = L(h),
        Jb = L(h),
        Kb = L(h),
        Lb = L(h),
        Mb = L(h),
        Nb = L(h),
        Ob = L(h),
        Pb = L(h),
        Qb = L(h),
        Rb = L(h),
        Sb = L(h),
        Tb = L(h),
        Ub = L(h),
        Vb = L(h),
        Wb = L(),
        Xb = L(),
        Yb = L();
    L();
    var Zb = L(),
        $b = L(),
        ac = L(),
        bc = L(),
        cc = L(),
        dc = L(),
        ec = L(),
        hc = L(),
        ic = L(),
        jc = L();
    L();
    var kc = L(),
        lc = L();
    var mc = function () {
            function a(a, c, d) {
                R(S[v], a, c, d)
            }
            T("_getName", Ka, 58);
            T("_getAccount", Ia, 64);
            T("_visitCode", P, 54);
            T("_getClientInfo", Ta, 53, 1);
            T("_getDetectTitle", Wa, 56, 1);
            T("_getDetectFlash", Ua, 65, 1);
            T("_getLocalGifPath", fb, 57);
            T("_getServiceMode", gb, 59);
            U("_setClientInfo", Ta, 66, 2);
            U("_setAccount", Ia, 3);
            U("_setNamespace", Ja, 48);
            U("_setAllowLinker", Qa, 11, 2);
            U("_setDetectFlash", Ua, 61, 2);
            U("_setDetectTitle", Wa, 62, 2);
            U("_setLocalGifPath", fb, 46, 0);
            U("_setLocalServerMode", gb, 92, g, 0);
            U("_setRemoteServerMode", gb, 63, g, 1);
            U("_setLocalRemoteServerMode", gb, 47, g, 2);
            U("_setSampleRate", eb, 45, 1);
            U("_setCampaignTrack", Va, 36, 2);
            U("_setAllowAnchor", Ra, 7, 2);
            U("_setCampNameKey", Ya, 41);
            U("_setCampContentKey", cb, 38);
            U("_setCampIdKey", Xa, 39);
            U("_setCampMediumKey", ab, 40);
            U("_setCampNOKey", db, 42);
            U("_setCampSourceKey", $a, 43);
            U("_setCampTermKey", bb, 44);
            U("_setCampCIdKey", Za, 37);
            U("_setCookiePath", N, 9, 0);
            U("_setMaxCustomVariables", hb, 0, 1);
            U("_setVisitorCookieTimeout", Na, 28, 1);
            U("_setSessionCookieTimeout", Oa, 26, 1);
            U("_setCampaignCookieTimeout", Pa, 29, 1);
            U("_setReferrerOverride", qb, 49);
            U("_setSiteSpeedSampleRate", ic, 132);
            a("_trackPageview", S[v].na, 1);
            a("_trackEvent", S[v].v, 4);
            a("_trackPageLoadTime", S[v].ma, 100);
            a("_trackSocial", S[v].oa, 104);
            a("_trackTrans", S[v].pa, 18);
            a("_sendXEvent", S[v].u, 78);
            a("_createEventTracker", S[v].V, 74);
            a("_getVersion", S[v].$, 60);
            a("_setDomainName", S[v].t, 6);
            a("_setAllowHash", S[v].ea, 8);
            a("_getLinkerUrl", S[v].Z, 52);
            a("_link", S[v].link, 101);
            a("_linkByPost", S[v].da, 102);
            a("_setTrans", S[v].ha, 20);
            a("_addTrans", S[v].O, 21);
            a("_addItem", S[v].M, 19);
            a("_setTransactionDelim", S[v].ia, 82);
            a("_setCustomVar", S[v].fa, 10);
            a("_deleteCustomVar", S[v].X, 35);
            a("_getVisitorCustomVar", S[v].aa, 50);
            a("_setXKey", S[v].ka, 83);
            a("_setXValue", S[v].la, 84);
            a("_getXKey", S[v].ba, 76);
            a("_getXValue", S[v].ca, 77);
            a("_clearXKey", S[v].S, 72);
            a("_clearXValue", S[v].T, 73);
            a("_createXObj", S[v].W, 75);
            a("_addIgnoredOrganic", S[v].K, 15);
            a("_clearIgnoredOrganic", S[v].P, 97);
            a("_addIgnoredRef", S[v].L, 31);
            a("_clearIgnoredRef", S[v].Q, 32);
            a("_addOrganic", S[v].N, 14);
            a("_clearOrganic", S[v].R, 70);
            a("_cookiePathCopy", S[v].U, 30);
            a("_get", S[v].Y, 106);
            a("_set", S[v].ga, 107);
            a("_addEventListener", S[v].addEventListener, 108);
            a("_removeEventListener", S[v].removeEventListener, 109);
            a("_initData", S[v].m, 2);
            a("_setVar", S[v].ja, 22);
            U("_setSessionTimeout", Oa, 27, 3);
            U("_setCookieTimeout", Pa, 25, 3);
            U("_setCookiePersistence", Na, 24, 1);
            a("_setAutoTrackOutbound", wa, 79);
            a("_setTrackOutboundSubdomains", wa, 81);
            a("_setHrefExamineLimit", wa, 80)
        },
        R = function (a, b, c, d) {
            a[b] = function () {
                try {
                    return G(d), c.apply(this, arguments)
                } catch (a) {
                    throw Fa("exc", b, a && a[r]), a;
                }
            }
        },
        T = function (a, b, c, d) {
            S[v][a] = function () {
                try {
                    return G(c), sa(this.a.get(b), d)
                } catch (e) {
                    throw Fa("exc", a, e && e[r]), e;
                }
            }
        },
        U = function (a, b, c, d, e) {
            S[v][a] = function (f) {
                try {
                    G(c), e == g ? this.a.set(b, sa(f, d)) : this.a.set(b, e)
                } catch (l) {
                    throw Fa("exc", a, l && l[r]), l;
                }
            }
        },
        nc = function (a, b) {
            return {
                type: b,
                target: a,
                stopPropagation: function () {
                    throw "aborted";
                }
            }
        };
    var oc = function (a, b) {
            return b !== "/" ? j : (a[p]("www.google.") == 0 || a[p](".google.") == 0 || a[p]("google.") == 0) && !(a[p]("google.org") > -1) ? h : j
        },
        pc = function (a) {
            var b = a.get(Ma),
                c = a[y](N, "/");
            oc(b, c) && a[pa]()
        };
    var uc = function () {
            var a = {},
                b = {},
                c = new qc;
            this.g = function (a, b) {
                c.add(a, b)
            };
            var d = new qc;
            this.d = function (a, b) {
                d.add(a, b)
            };
            var e = j,
                f = j,
                l = h;
            this.J = function () {
                e = h
            };
            this.f = function (a) {
                this[ja]();
                this.set(Wb, a, h);
                a = new rc(this);
                e = j;
                d.execute(this);
                e = h;
                b = {};
                this.i();
                a.qa()
            };
            this.load = function () {
                e && (e = j, this.sa(), sc(this), f || (f = h, c.execute(this), tc(this), sc(this)), e = h)
            };
            this.i = function () {
                if (e) if (f) e = j, tc(this), e = h;
                else this[ja]()
            };
            this.get = function (c) {
                c && c[n](0) == "_" && this[ja]();
                return b[c] !== g ? b[c] : a[c]
            };
            this.set = function (c, d, e) {
                c && c[n](0) == "_" && this[ja]();
                e ? b[c] = d : a[c] = d;
                c && c[n](0) == "_" && this.i()
            };
            this.n = function (b) {
                a[b] = this.b(b, 0) + 1
            };
            this.b = function (a, b) {
                var c = this.get(a);
                return c == g || c === "" ? b : c * 1
            };
            this.getString = function (a, b) {
                var c = this.get(a);
                return c == g ? b : c + ""
            };
            this.sa = function () {
                if (l) {
                    var b = this[y](Ma, ""),
                        c = this[y](N, "/");
                    oc(b, c) || (a[M] = a[Sa] && b != "" ? ua(b) : 1, l = j)
                }
            }
        };
    uc[v].stopPropagation = function () {
        throw "aborted";
    };
    var rc = function (a) {
            var b = this;
            this.j = 0;
            var c = a.get(Xb);
            this.Aa = function () {
                b.j > 0 && c && (b.j--, b.j || c())
            };
            this.qa = function () {
                !b.j && c && da(c, 0)
            };
            a.set(Yb, b, h)
        };

    function vc(a, b) {
        for (var b = b || [], c = 0; c < b[u]; c++) {
            var d = b[c];
            if ("" + a == d || d[p](a + ".") == 0) return d
        }
        return "-"
    }
    var xc = function (a, b, c) {
            c = c ? "" : a[y](M, "1");
            b = b[w](".");
            if (b[u] !== 6 || wc(b[0], c)) return j;
            var c = b[1] * 1,
                d = b[2] * 1,
                e = b[3] * 1,
                f = b[4] * 1,
                b = b[5] * 1;
            if (!(c >= 0 && d > 0 && e > 0 && f > 0 && b >= 0)) return G(110), j;
            a.set(P, c);
            a.set(Cb, d);
            a.set(Db, e);
            a.set(Eb, f);
            a.set(Fb, b);
            return h
        },
        yc = function (a) {
            var b = a.get(P),
                c = a.get(Cb),
                d = a.get(Db),
                e = a.get(Eb),
                f = a.b(Fb, 1);
            b == g ? G(113) : b == NaN && G(114);
            b >= 0 && c > 0 && d > 0 && e > 0 && f >= 0 || G(115);
            return [a.b(M, 1), b != g ? b : "-", c || "-", d || "-", e || "-", f][A](".")
        },
        zc = function (a) {
            return [a.b(M, 1), a.b(Ib, 0), a.b(Q, 1), a.b(Jb, 0)][A](".")
        },
        Ac = function (a, b, c) {
            var c = c ? "" : a[y](M, "1"),
                d = b[w](".");
            if (d[u] !== 4 || wc(d[0], c)) d = i;
            a.set(Ib, d ? d[1] * 1 : 0);
            a.set(Q, d ? d[2] * 1 : 10);
            a.set(Jb, d ? d[3] * 1 : a.get(La));
            return d != i || !wc(b, c)
        },
        Bc = function (a, b) {
            var c = F(a[y](zb, "")),
                d = [],
                e = a.get(O);
            if (!b && e) {
                for (var f = 0; f < e[u]; f++) {
                    var l = e[f];
                    l && l[qa] == 1 && d[m](f + "=" + F(l[r]) + "=" + F(l[la]) + "=1")
                }
                d[u] > 0 && (c += "|" + d[A](","))
            }
            return c ? a.b(M, 1) + "." + c : i
        },
        Cc = function (a, b, c) {
            c = c ? "" : a[y](M, "1");
            b = b[w](".");
            if (b[u] < 2 || wc(b[0], c)) return j;
            b = b[ha](1)[A](".")[w]("|");
            b[u] > 0 && a.set(zb, H(b[0]));
            if (b[u] <= 1) return h;
            for (var c = b[1][w](b[1][p](",") == -1 ? "^" : ","), d = 0; d < c[u]; d++) {
                var e = c[d][w]("=");
                if (e[u] == 4) {
                    var f = {};
                    ga(f, H(e[1]));
                    f.value = H(e[2]);
                    f.scope = 1;
                    a.get(O)[e[0]] = f
                }
            }
            b[1][p]("^") >= 0 && G(125);
            return h
        },
        Ec = function (a, b) {
            var c = Dc(a, b);
            return c ? [a.b(M, 1), a.b(Kb, 0), a.b(Lb, 1), a.b(Mb, 1), c][A](".") : ""
        },
        Dc = function (a) {
            function b(b, e) {
                if (!E(a.get(b))) {
                    var f = a[y](b, ""),
                        f = f[w](" ")[A]("%20"),
                        f = f[w]("+")[A]("%20");
                    c[m](e + "=" + f)
                }
            }
            var c = [];
            b(Ob, "utmcid");
            b(Sb, "utmcsr");
            b(Qb, "utmgclid");
            b(Rb, "utmdclid");
            b(Pb, "utmccn");
            b(Tb, "utmcmd");
            b(Ub, "utmctr");
            b(Vb, "utmcct");
            return c[A]("|")
        },
        Gc = function (a, b, c) {
            c = c ? "" : a[y](M, "1");
            b = b[w](".");
            if (b[u] < 5 || wc(b[0], c)) return a.set(Kb, g), a.set(Lb, g), a.set(Mb, g), a.set(Ob, g), a.set(Pb, g), a.set(Sb, g), a.set(Tb, g), a.set(Ub, g), a.set(Vb, g), a.set(Qb, g), a.set(Rb, g), j;
            a.set(Kb, b[1] * 1);
            a.set(Lb, b[2] * 1);
            a.set(Mb, b[3] * 1);
            Fc(a, b[ha](4)[A]("."));
            return h
        },
        Fc = function (a, b) {
            function c(a) {
                return (a = b[ma](a + "=(.*?)(?:\\|utm|$)")) && a[u] == 2 ? a[1] : g
            }
            function d(b, c) {
                c && (c = e ? H(c) : c[w]("%20")[A](" "), a.set(b, c))
            }
            b[p]("=") == -1 && (b = H(b));
            var e = c("utmcvr") == "2";
            d(Ob, c("utmcid"));
            d(Pb, c("utmccn"));
            d(Sb, c("utmcsr"));
            d(Tb, c("utmcmd"));
            d(Ub, c("utmctr"));
            d(Vb, c("utmcct"));
            d(Qb, c("utmgclid"));
            d(Rb, c("utmdclid"))
        },
        wc = function (a, b) {
            return b ? a != b : !/^\d+$/.test(a)
        };
    var qc = function () {
            this.s = []
        };
    qc[v].add = function (a, b) {
        this.s[m]({
            name: a,
            Da: b
        })
    };
    qc[v].execute = function (a) {
        try {
            for (var b = 0; b < this.s[u]; b++) this.s[b].Da.call(V, a)
        } catch (c) {}
    };

    function Hc(a) {
        a.get(eb) != 100 && a.get(P) % 1E4 >= a.get(eb) * 100 && a[pa]()
    }
    function Ic(a) {
        Jc() && a[pa]()
    }
    function Kc(a) {
        J[x].protocol == "file:" && a[pa]()
    }
    function Lc(a) {
        a.get(pb) || a.set(pb, J.title, h);
        a.get(ob) || a.set(ob, J[x].pathname + J[x].search, h)
    };
    var Mc = new function () {
            var a = [];
            this.set = function (b) {
                a[b] = h
            };
            this.Ea = function () {
                for (var b = [], c = 0; c < a[u]; c++) a[c] && (b[k[ka](c / 6)] ^= 1 << c % 6);
                for (c = 0; c < b[u]; c++) b[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" [n](b[c] || 0);
                return b[A]("") + "~"
            }
        };

    function G(a) {
        Mc.set(a)
    };
    var V = window,
        J = document,
        Jc = function () {
            var a = V._gaUserPrefs;
            return a && a.ioo && a.ioo()
        },
        Nc = function (a, b) {
            da(a, b)
        },
        W = function (a) {
            for (var b = [], c = J.cookie[w](";"), a = RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$"), d = 0; d < c[u]; d++) {
                var e = c[d][ma](a);
                e && b[m](e[1])
            }
            return b
        },
        X = function (a, b, c, d, e) {
            var f;
            f = Jc() ? j : oc(d, c) ? j : h;
            if (f) {
                if (b && V[ra].userAgent[p]("Firefox") >= 0) {
                    b = b[ia](/\n|\r/g, " ");
                    f = 0;
                    for (var l = b[u]; f < l; ++f) {
                        var o = b.charCodeAt(f) & 255;
                        if (o == 10 || o == 13) b = b[z](0, f) + "?" + b[z](f + 1)
                    }
                }
                b && b[u] > 2E3 && (b = b[z](0, 2E3), G(69));
                a = a + "=" + b + "; path=" + c + "; ";
                e && (a += "expires=" + (new Date((new Date).getTime() + e)).toGMTString() + "; ");
                d && (a += "domain=" + d + ";");
                J.cookie = a
            }
        };
    var Oc, Pc, Qc = function () {
            if (!Oc) {
                var a = {},
                    b = V[ra],
                    c = V.screen;
                a.H = c ? c.width + "x" + c.height : "-";
                a.G = c ? c.colorDepth + "-bit" : "-";
                a.language = (b && (b.language || b.browserLanguage) || "-")[C]();
                a.javaEnabled = b && b.javaEnabled() ? 1 : 0;
                a.characterSet = J.characterSet || J.charset || "-";
                Oc = a
            }
        },
        Rc = function () {
            Qc();
            for (var a = Oc, b = V[ra], a = b.appName + b.version + a.language + b.platform + b.userAgent + a.javaEnabled + a.H + a.G + (J.cookie ? J.cookie : "") + (J.referrer ? J.referrer : ""), b = a[u], c = V.history[u]; c > 0;) a += c-- ^ b++;
            return ua(a)
        },
        Sc = function (a) {
            Qc();
            var b = Oc;
            a.set(sb, b.H);
            a.set(tb, b.G);
            a.set(wb, b.language);
            a.set(xb, b.characterSet);
            a.set(ub, b.javaEnabled);
            if (a.get(Ta) && a.get(Ua)) {
                if (!(b = Pc)) {
                    var c, d, e;
                    d = "ShockwaveFlash";
                    if ((b = (b = V[ra]) ? b.plugins : g) && b[u] > 0) for (c = 0; c < b[u] && !e; c++) d = b[c], d[r][p]("Shockwave Flash") > -1 && (e = d.description[w]("Shockwave Flash ")[1]);
                    else {
                        d = d + "." + d;
                        try {
                            c = new ActiveXObject(d + ".7"), e = c.GetVariable("$version")
                        } catch (f) {}
                        if (!e) try {
                            c = new ActiveXObject(d + ".6"), e = "WIN 6,0,21,0", c.AllowScriptAccess = "always", e = c.GetVariable("$version")
                        } catch (l) {}
                        if (!e) try {
                            c = new ActiveXObject(d), e = c.GetVariable("$version")
                        } catch (o) {}
                        e && (e = e[w](" ")[1][w](","), e = e[0] + "." + e[1] + " r" + e[2])
                    }
                    b = e ? e : "-"
                }
                Pc = b;
                a.set(vb, Pc)
            } else a.set(vb, "-")
        };
    var Y = function () {
            R(Y[v], "push", Y[v][m], 5);
            R(Y[v], "_createAsyncTracker", Y[v].Ba, 33);
            R(Y[v], "_getAsyncTracker", Y[v].Ca, 34);
            this.r = 0
        };
    Y[v].Ba = function (a, b) {
        return K.l(a, b || "")
    };
    Y[v].Ca = function (a) {
        return K.p(a)
    };
    Y[v].push = function (a) {
        this.r > 0 && G(105);
        this.r++;
        for (var b = arguments, c = 0, d = 0; d < b[u]; d++) try {
            if (typeof b[d] === "function") b[d]();
            else {
                var e = "",
                    f = b[d][0],
                    l = f.lastIndexOf(".");
                l > 0 && (e = f[z](0, l), f = f[z](l + 1));
                var o = e == "_gat" ? K : e == "_gaq" ? Tc : K.p(e);
                o[f].apply(o, b[d][ha](1))
            }
        } catch (q) {
            c++
        }
        this.r--;
        return c
    };
    var Yc = function () {
            function a(a, b, c, d) {
                g == f[a] && (f[a] = {});
                g == f[a][b] && (f[a][b] = []);
                f[a][b][c] = d
            }
            function b(a, b, c) {
                if (g != f[a] && g != f[a][b]) return f[a][b][c]
            }
            function c(a, b) {
                if (g != f[a] && g != f[a][b]) {
                    f[a][b] = g;
                    var c = h,
                        d;
                    for (d = 0; d < l[u]; d++) if (g != f[a][l[d]]) {
                        c = j;
                        break
                    }
                    c && (f[a] = g)
                }
            }
            function d(a) {
                var b = "",
                    c = j,
                    d, e;
                for (d = 0; d < l[u]; d++) if (e = a[l[d]], g != e) {
                    c && (b += l[d]);
                    for (var c = [], f = g, $ = g, $ = 0; $ < e[u]; $++) if (g != e[$]) {
                        f = "";
                        $ != aa && g == e[$ - 1] && (f += $[t]() + na);
                        for (var Wc = e[$], Xc = "", Ab = g, fc = g, gc = g, Ab = 0; Ab < Wc[u]; Ab++) fc = Wc[n](Ab), gc = B[fc], Xc += g != gc ? gc : fc;
                        f += Xc;
                        c[m](f)
                    }
                    b += o + c[A](s) + q;
                    c = j
                } else c = h;
                return b
            }
            var e = this,
                f = [],
                l = ["k", "v"],
                o = "(",
                q = ")",
                s = "*",
                na = "!",
                B = {
                    "'": "'0"
                };
            B[q] = "'1";
            B[s] = "'2";
            B[na] = "'3";
            var aa = 1;
            e.va = function (a) {
                return g != f[a]
            };
            e.o = function () {
                for (var a = "", b = 0; b < f[u]; b++) g != f[b] && (a += b[t]() + d(f[b]));
                return a
            };
            e.ua = function (a) {
                if (a == g) return e.o();
                for (var b = a.o(), c = 0; c < f[u]; c++) g != f[c] && !a.va(c) && (b += c[t]() + d(f[c]));
                return b
            };
            e.e = function (b, c, d) {
                if (!Uc(d)) return j;
                a(b, "k", c, d);
                return h
            };
            e.k = function (b, c, d) {
                if (!Vc(d)) return j;
                a(b, "v", c, d[t]());
                return h
            };
            e.getKey = function (a, c) {
                return b(a, "k", c)
            };
            e.C = function (a, c) {
                return b(a, "v", c)
            };
            e.A = function (a) {
                c(a, "k")
            };
            e.B = function (a) {
                c(a, "v")
            };
            R(e, "_setKey", e.e, 89);
            R(e, "_setValue", e.k, 90);
            R(e, "_getKey", e.getKey, 87);
            R(e, "_getValue", e.C, 88);
            R(e, "_clearKey", e.A, 85);
            R(e, "_clearValue", e.B, 86)
        };

    function Uc(a) {
        return typeof a == "string"
    }
    function Vc(a) {
        return typeof a != "number" && (g == Number || !(a instanceof Number)) || k.round(a) != a || a == NaN || a == ca ? j : h
    };
    var Zc = function (a) {
            var b = V.gaGlobal;
            a && !b && (V.gaGlobal = b = {});
            return b
        },
        $c = function () {
            var a = Zc(h).hid;
            if (a == i) a = va(), Zc(h).hid = a;
            return a
        },
        ad = function (a) {
            a.set(rb, $c());
            var b = Zc();
            if (b && b.dh == a.get(M)) {
                var c = b.sid;
                c && (c == "0" && G(112), a.set(Eb, c), a.get(yb) && a.set(Db, c));
                b = b.vid;
                a.get(yb) && b && (b = b[w]("."), b[1] * 1 || G(112), a.set(P, b[0] * 1), a.set(Cb, b[1] * 1))
            }
        };
    var bd, cd = function (a, b, c) {
            var d = a[y](Ma, ""),
                e = a[y](N, "/"),
                a = a.b(Na, 0);
            X(b, c, e, d, a)
        },
        tc = function (a) {
            var b = a[y](Ma, "");
            a.b(M, 1);
            var c = a[y](N, "/");
            X("__utma", yc(a), c, b, a.get(Na));
            X("__utmb", zc(a), c, b, a.get(Oa));
            X("__utmc", "" + a.b(M, 1), c, b);
            var d = Ec(a, h);
            d ? X("__utmz", d, c, b, a.get(Pa)) : X("__utmz", "", c, b, -1);
            (d = Bc(a, j)) ? X("__utmv", d, c, b, a.get(Na)) : X("__utmv", "", c, b, -1)
        },
        sc = function (a) {
            var b = a.b(M, 1);
            if (!xc(a, vc(b, W("__utma")))) return a.set(Bb, h), j;
            var c = !Ac(a, vc(b, W("__utmb")));
            a.set(Hb, c);
            Gc(a, vc(b, W("__utmz")));
            Cc(a, vc(b, W("__utmv")));
            bd = !c;
            return h
        },
        dd = function (a) {
            !bd && !(W("__utmb")[u] > 0) && (X("__utmd", "1", a[y](N, "/"), a[y](Ma, ""), 1E4), W("__utmd")[u] == 0 && a[pa]())
        };
    var gd = function (a) {
            a.get(P) == g ? ed(a) : a.get(Bb) && !a.get(kc) ? ed(a) : a.get(Hb) && fd(a)
        },
        hd = function (a) {
            a.get(Nb) && !a.get(Gb) && (fd(a), a.set(Lb, a.get(Fb)))
        },
        ed = function (a) {
            var b = a.get(La);
            a.set(yb, h);
            a.set(P, va() ^ Rc(a) & 2147483647);
            a.set(zb, "");
            a.set(Cb, b);
            a.set(Db, b);
            a.set(Eb, b);
            a.set(Fb, 1);
            a.set(Gb, h);
            a.set(Ib, 0);
            a.set(Q, 10);
            a.set(Jb, b);
            a.set(O, []);
            a.set(Bb, j);
            a.set(Hb, j)
        },
        fd = function (a) {
            a.set(Db, a.get(Eb));
            a.set(Eb, a.get(La));
            a.n(Fb);
            a.set(Gb, h);
            a.set(Ib, 0);
            a.set(Q, 10);
            a.set(Jb, a.get(La));
            a.set(Hb, j)
        };
    var id = "daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,google:q,yahoo:p,yahoo:q,msn:q,bing:q,aol:query,aol:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,live:q,baidu:wd,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","),
        od = function (a) {
            if (a.get(Va) && !a.get(kc)) {
                for (var b = !E(a.get(Ob)) || !E(a.get(Sb)) || !E(a.get(Qb)) || !E(a.get(Rb)), c = {}, d = 0; d < jd[u]; d++) {
                    var e = jd[d];
                    c[e] = a.get(e)
                }
                d = Ca(J[x].href, a.get(Ra));
                if (!(za(d.c.get(a.get(db))) == "1" && b) && (d = kd(a, d) || ld(a), !d && !b && a.get(Gb) && (md(a, g, "(direct)", g, g, "(direct)", "(none)", g, g), d = h), d && (a.set(Nb, nd(a, c)), b = a.get(Sb) == "(direct)" && a.get(Pb) == "(direct)" && a.get(Tb) == "(none)", a.get(Nb) || a.get(Gb) && !b))) a.set(Kb, a.get(La)), a.set(Lb, a.get(Fb)), a.n(Mb)
            }
        },
        kd = function (a, b) {
            function c(c, d) {
                var d = d || "-",
                    e = za(b.c.get(a.get(c)));
                return e && e != "-" ? H(e) : d
            }
            var d = za(b.c.get(a.get(Xa))) || "-",
                e = za(b.c.get(a.get($a))) || "-",
                f = za(b.c.get(a.get(Za))) || "-",
                l = za(b.c.get("dclid")) || "-",
                o = c(Ya, "(not set)"),
                q = c(ab, "(not set)"),
                s = c(bb),
                na = c(cb);
            if (E(d) && E(f) && E(l) && E(e)) return j;
            if (E(s)) {
                var B = Ea(a.get(qb), a.get(N)),
                    B = Ca(B, h);
                (B = pd(a, B)) && !E(B[1] && !B[2]) && (s = B[1])
            }
            md(a, d, e, f, l, o, q, s, na);
            return h
        },
        ld = function (a) {
            var b = Ea(a.get(qb), a.get(N)),
                c = Ca(b, h);
            if (!(b != g && b != i && b != "" && b != "0" && b != "-" && b[p]("://") >= 0) || c && c[oa][p]("google") > -1 && c.c.contains("q") && c.path == "cse") return j;
            if ((b = pd(a, c)) && !b[2]) return md(a, g, b[0], g, g, "(organic)", "organic", b[1], g), h;
            else if (b) return j;
            if (a.get(Gb)) a: {
                for (var b = a.get(kb), d = Ba(c[oa]), e = 0; e < b[u]; ++e) if (d[p](b[e]) > -1) {
                    a = j;
                    break a
                }
                md(a, g, d, g, g, "(referral)", "referral", g, "/" + c.path);
                a = h
            } else a = j;
            return a
        },
        pd = function (a, b) {
            for (var c = a.get(ib), d = 0; d < c[u]; ++d) {
                var e = c[d][w](":");
                if (b[oa][p](e[0][C]()) > -1) {
                    var f = b.c.get(e[1]);
                    if (f && (f = I(f), !f && b[oa][p]("google.") > -1 && (f = "(not provided)"), !e[3] || b.url[p](e[3]) > -1)) {
                        a: {
                            for (var c = f, d = a.get(jb), c = H(c)[C](), l = 0; l < d[u]; ++l) if (c == d[l]) {
                                c = h;
                                break a
                            }
                            c = j
                        }
                        return [e[2] || e[0], f, c]
                    }
                }
            }
            return i
        },
        md = function (a, b, c, d, e, f, l, o, q) {
            a.set(Ob, b);
            a.set(Sb, c);
            a.set(Qb, d);
            a.set(Rb, e);
            a.set(Pb, f);
            a.set(Tb, l);
            a.set(Ub, o);
            a.set(Vb, q)
        },
        jd = [Pb, Ob, Qb, Rb, Sb, Tb, Ub, Vb],
        nd = function (a, b) {
            function c(a) {
                a = ("" + a)[w]("+")[A]("%20");
                return a = a[w](" ")[A]("%20")
            }
            function d(c) {
                var d = "" + (a.get(c) || ""),
                    c = "" + (b[c] || "");
                return d[u] > 0 && d == c
            }
            if (d(Qb) || d(Rb)) return G(131), j;
            for (var e = 0; e < jd[u]; e++) {
                var f = jd[e],
                    l = b[f] || "-",
                    f = a.get(f) || "-";
                if (c(l) != c(f)) return h
            }
            return j
        };
    var rd = function (a) {
            qd(a, J[x].href) ? (a.set(kc, h), G(12)) : a.set(kc, j)
        },
        qd = function (a, b) {
            if (!a.get(Qa)) return j;
            var c = Ca(b, a.get(Ra)),
                d = I(c.c.get("__utma")),
                e = I(c.c.get("__utmb")),
                f = I(c.c.get("__utmc")),
                l = I(c.c.get("__utmx")),
                o = I(c.c.get("__utmz")),
                q = I(c.c.get("__utmv")),
                c = I(c.c.get("__utmk"));
            if (ua("" + d + e + f + l + o + q) != c) {
                d = H(d);
                e = H(e);
                f = H(f);
                l = H(l);
                a: {
                    for (var f = d + e + f + l, s = 0; s < 3; s++) {
                        for (var na = 0; na < 3; na++) {
                            if (c == ua(f + o + q)) {
                                G(127);
                                c = [o, q];
                                break a
                            }
                            var B = o[ia](/ /g, "%20"),
                                aa = q[ia](/ /g, "%20");
                            if (c == ua(f + B + aa)) {
                                G(128);
                                c = [B, aa];
                                break a
                            }
                            B = B[ia](/\+/g, "%20");
                            aa = aa[ia](/\+/g, "%20");
                            if (c == ua(f + B + aa)) {
                                G(129);
                                c = [B, aa];
                                break a
                            }
                            o = H(o)
                        }
                        q = H(q)
                    }
                    c = g
                }
                if (!c) return j;
                o = c[0];
                q = c[1]
            }
            if (!xc(a, d, h)) return j;
            Ac(a, e, h);
            Gc(a, o, h);
            Cc(a, q, h);
            sd(a, l, h);
            return h
        },
        ud = function (a, b, c) {
            var d;
            d = yc(a) || "-";
            var e = zc(a) || "-",
                f = "" + a.b(M, 1) || "-",
                l = td(a) || "-",
                o = Ec(a, j) || "-",
                a = Bc(a, j) || "-",
                q = ua("" + d + e + f + l + o + a),
                s = [];
            s[m]("__utma=" + d);
            s[m]("__utmb=" + e);
            s[m]("__utmc=" + f);
            s[m]("__utmx=" + l);
            s[m]("__utmz=" + o);
            s[m]("__utmv=" + a);
            s[m]("__utmk=" + q);
            d = s[A]("&");
            if (!d) return b;
            e = b[p]("#");
            return c ? e < 0 ? b + "#" + d : b + "&" + d : (c = "", f = b[p]("?"), e > 0 && (c = b[z](e), b = b[z](0, e)), f < 0 ? b + "?" + d + c : b + "&" + d + c)
        };
    var vd = "|",
        xd = function (a, b, c, d, e, f, l, o, q) {
            var s = wd(a, b);
            s || (s = {}, a.get(lb)[m](s));
            s.id_ = b;
            s.affiliation_ = c;
            s.total_ = d;
            s.tax_ = e;
            s.shipping_ = f;
            s.city_ = l;
            s.state_ = o;
            s.country_ = q;
            s.items_ = s.items_ || [];
            return s
        },
        yd = function (a, b, c, d, e, f, l) {
            var a = wd(a, b) || xd(a, b, "", 0, 0, 0, "", "", ""),
                o;
            a: {
                if (a && a.items_) {
                    o = a.items_;
                    for (var q = 0; q < o[u]; q++) if (o[q].sku_ == c) {
                        o = o[q];
                        break a
                    }
                }
                o = i
            }
            q = o || {};
            q.transId_ = b;
            q.sku_ = c;
            q.name_ = d;
            q.category_ = e;
            q.price_ = f;
            q.quantity_ = l;
            o || a.items_[m](q);
            return q
        },
        wd = function (a, b) {
            for (var c = a.get(lb), d = 0; d < c[u]; d++) if (c[d].id_ == b) return c[d];
            return i
        };
    var zd, Ad = function (a) {
            var f;
            var e;
            if (!zd) {
                var b;
                b = J[x].hash;
                var c = V[r],
                    d = /^#?gaso=([^&]*)/;
                if (f = (e = (b = b && b[ma](d) || c && c[ma](d)) ? b[1] : I(W("GASO")), b = e) && b[ma](/^(?:\|([-0-9a-z.]{1,40})\|)?([-.\w]{10,1200})$/i), c = f) if (cd(a, "GASO", "" + b), K._gasoDomain = a.get(Ma), K._gasoCPath = a.get(N), b = "https://" + ((c[1] || "www") + ".google.com") + "/analytics/reporting/overlay_js?gaso=" + c[2] + "&" + va()) a = J.createElement("script"), a.type = "text/javascript", a.async = h, a.src = b, a.id = "_gasojs", fa(a, g), b = J.getElementsByTagName("script")[0], b.parentNode.insertBefore(a, b);
                zd = h
            }
        };
    var sd = function (a, b, c) {
            c && (b = H(b));
            c = a.b(M, 1);
            b = b[w](".");
            !(b[u] < 2) && /^\d+$/.test(b[0]) && (b[0] = "" + c, cd(a, "__utmx", b[A](".")))
        },
        td = function (a, b) {
            var c = vc(a.get(M), W("__utmx"));
            c == "-" && (c = "");
            return b ? F(c) : c
        };
    var Fd = function (a, b) {
            var c = k.min(a.b(ic, 0), 10);
            if (a.b(P, 0) % 100 >= c) return j;
            c = Bd() || Cd();
            if (c == g) return j;
            var d = c[0];
            if (d == g || d == ca || isNaN(d)) return j;
            d > 0 ? Dd(c) ? b(Ed(c)) : b(Ed(c[ha](0, 1))) : xa(V, "load", function () {
                Fd(a, b)
            }, j);
            return h
        },
        Dd = function (a) {
            for (var b = 1; b < a[u]; b++) if (isNaN(a[b]) || a[b] == ca || a[b] < 0) return j;
            return h
        },
        Ed = function (a) {
            for (var b = new Yc, c = 0; c < a[u]; c++) b.e(14, c + 1, (isNaN(a[c]) || a[c] < 0 ? 0 : a[c] < 5E3 ? k[ka](a[c] / 10) * 10 : a[c] < 45E4 ? k[ka](a[c] / 100) * 100 : 45E4) + ""), b.k(14, c + 1, a[c]);
            return b
        },
        Bd = function () {
            var a = V.performance || V.webkitPerformance;
            if (a = a && a.timing) {
                var b = a.navigationStart;
                if (b == 0) G(133);
                else return [a.loadEventStart - b, a.domainLookupEnd - a.domainLookupStart, a.connectEnd - a.connectStart, a.responseStart - a.requestStart, a.responseEnd - a.responseStart, a.fetchStart - b]
            }
        },
        Cd = function () {
            if (V.top == V) {
                var a = V.external,
                    b = a && a.onloadT;
                a && !a.isValidLoadTime && (b = g);
                b > 2147483648 && (b = g);
                b > 0 && a.setPageReadyTime();
                return b == g ? g : [b]
            }
        };
    var S = function (a, b, c) {
            function d(a) {
                return function (b) {
                    if ((b = b.get(lc)[a]) && b[u]) for (var c = nc(e, a), d = 0; d < b[u]; d++) b[d].call(e, c)
                }
            }
            var e = this;
            this.a = new uc;
            this.get = function (a) {
                return this.a.get(a)
            };
            this.set = function (a, b, c) {
                this.a.set(a, b, c)
            };
            this.set(Ia, b || "UA-XXXXX-X");
            this.set(Ka, a || "");
            this.set(Ja, c || "");
            this.set(La, k.round((new Date).getTime() / 1E3));
            this.set(N, "/");
            this.set(Na, 63072E6);
            this.set(Pa, 15768E6);
            this.set(Oa, 18E5);
            this.set(Qa, j);
            this.set(hb, 50);
            this.set(Ra, j);
            this.set(Sa, h);
            this.set(Ta, h);
            this.set(Ua, h);
            this.set(Va, h);
            this.set(Wa, h);
            this.set(Ya, "utm_campaign");
            this.set(Xa, "utm_id");
            this.set(Za, "gclid");
            this.set($a, "utm_source");
            this.set(ab, "utm_medium");
            this.set(bb, "utm_term");
            this.set(cb, "utm_content");
            this.set(db, "utm_nooverride");
            this.set(eb, 100);
            this.set(ic, 1);
            this.set(jc, j);
            this.set(fb, "/__utm.gif");
            this.set(gb, 1);
            this.set(lb, []);
            this.set(O, []);
            this.set(ib, id[ha](0));
            this.set(jb, []);
            this.set(kb, []);
            this.t("auto");
            this.set(qb, this.ra());
            this.set(lc, {
                hit: [],
                load: []
            });
            this.a.g("0", rd);
            this.a.g("1", gd);
            this.a.g("2", od);
            this.a.g("3", hd);
            this.a.g("4", d("load"));
            this.a.g("5", Ad);
            this.a.d("A", Ic);
            this.a.d("B", Kc);
            this.a.d("C", gd);
            this.a.d("D", Hc);
            this.a.d("E", pc);
            this.a.d("F", Gd);
            this.a.d("G", dd);
            this.a.d("H", Lc);
            this.a.d("I", Sc);
            this.a.d("J", ad);
            this.a.d("K", d("hit"));
            this.a.d("L", Hd);
            this.a.d("M", Id);
            this.get(La) === 0 && G(111);
            this.a.J();
            this.w = g
        };
    D = S[v];
    D.h = function () {
        var a = this.get(mb);
        a || (a = new Yc, this.set(mb, a));
        return a
    };
    D.ta = function (a) {
        for (var b in a) {
            var c = a[b];
            a.hasOwnProperty(b) && typeof c != "function" && this.set(b, c, h)
        }
    };
    D.z = function (a) {
        if (this.get(jc)) return j;
        var b = this,
            c = Fd(this.a, function (c) {
                b.set(ob, a, h);
                b.u(c)
            });
        this.set(jc, c);
        return c
    };
    D.na = function (a) {
        a && a != g && (a.constructor + "")[p]("String") > -1 ? (G(13), this.set(ob, a, h)) : typeof a === "object" && a !== i && this.ta(a);
        this.w = a = this.get(ob);
        this.a.f("page");
        this.z(a)
    };
    D.v = function (a, b, c, d, e) {
        if (a == "" || !Uc(a) || b == "" || !Uc(b)) return j;
        if (c != g && !Uc(c)) return j;
        if (d != g && !Vc(d)) return j;
        this.set($b, a, h);
        this.set(ac, b, h);
        this.set(bc, c, h);
        this.set(cc, d, h);
        this.set(Zb, !! e, h);
        this.a.f("event");
        return h
    };
    D.oa = function (a, b, c, d) {
        if (!a || !b) return j;
        this.set(dc, a, h);
        this.set(ec, b, h);
        this.set(hc, c || J[x].href, h);
        d && this.set(ob, d, h);
        this.a.f("social");
        return h
    };
    D.ma = function () {
        this.set(ic, 10);
        this.z(this.w)
    };
    D.pa = function () {
        this.a.f("trans")
    };
    D.u = function (a) {
        this.set(nb, a, h);
        this.a.f("event")
    };
    D.V = function (a) {
        this.m();
        var b = this;
        return {
            _trackEvent: function (c, d, e) {
                G(91);
                b.v(a, c, d, e)
            }
        }
    };
    D.Y = function (a) {
        return this.get(a)
    };
    D.ga = function (a, b) {
        if (a) if (a != g && (a.constructor + "")[p]("String") > -1) this.set(a, b);
        else if (typeof a == "object") for (var c in a) a.hasOwnProperty(c) && this.set(c, a[c])
    };
    D.addEventListener = function (a, b) {
        var c = this.get(lc)[a];
        c && c[m](b)
    };
    D.removeEventListener = function (a, b) {
        for (var c = this.get(lc)[a], d = 0; c && d < c[u]; d++) if (c[d] == b) {
            c.splice(d, 1);
            break
        }
    };
    D.$ = function () {
        return "5.2.2"
    };
    D.t = function (a) {
        this.get(Sa);
        a = a == "auto" ? Ba(J.domain) : !a || a == "-" || a == "none" ? "" : a[C]();
        this.set(Ma, a)
    };
    D.ea = function (a) {
        this.set(Sa, !! a)
    };
    D.Z = function (a, b) {
        return ud(this.a, a, b)
    };
    D.link = function (a, b) {
        if (this.a.get(Qa) && a) {
            var c = ud(this.a, a, b);
            J[x].href = c
        }
    };
    D.da = function (a, b) {
        this.a.get(Qa) && a && a.action && (a.action = ud(this.a, a.action, b))
    };
    D.ha = function () {
        this.m();
        var a = this.a,
            b = J.getElementById ? J.getElementById("utmtrans") : J.utmform && J.utmform.utmtrans ? J.utmform.utmtrans : i;
        if (b && b[la]) {
            a.set(lb, []);
            for (var b = b[la][w]("UTM:"), c = 0; c < b[u]; c++) {
                b[c] = ta(b[c]);
                for (var d = b[c][w](vd), e = 0; e < d[u]; e++) d[e] = ta(d[e]);
                "T" == d[0] ? xd(a, d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]) : "I" == d[0] && yd(a, d[1], d[2], d[3], d[4], d[5], d[6])
            }
        }
    };
    D.O = function (a, b, c, d, e, f, l, o) {
        return xd(this.a, a, b, c, d, e, f, l, o)
    };
    D.M = function (a, b, c, d, e, f) {
        return yd(this.a, a, b, c, d, e, f)
    };
    D.ia = function (a) {
        vd = a || "|"
    };
    D.fa = function (a, b, c, d) {
        var e = this.a;
        if (a <= 0 || a > e.get(hb)) a = j;
        else if (!b || !c || F(b)[u] + F(c)[u] > 64) a = j;
        else {
            d != 1 && d != 2 && (d = 3);
            var f = {};
            ga(f, b);
            f.value = c;
            f.scope = d;
            e.get(O)[a] = f;
            a = h
        }
        a && this.a.i();
        return a
    };
    D.X = function (a) {
        this.a.get(O)[a] = g;
        this.a.i()
    };
    D.aa = function (a) {
        return (a = this.a.get(O)[a]) && a[qa] == 1 ? a[la] : g
    };
    D.ka = function (a, b, c) {
        this.h().e(a, b, c)
    };
    D.la = function (a, b, c) {
        this.h().k(a, b, c)
    };
    D.ba = function (a, b) {
        return this.h().getKey(a, b)
    };
    D.ca = function (a, b) {
        return this.h().C(a, b)
    };
    D.S = function (a) {
        this.h().A(a)
    };
    D.T = function (a) {
        this.h().B(a)
    };
    D.W = function () {
        return new Yc
    };
    D.K = function (a) {
        a && this.get(jb)[m](a[C]())
    };
    D.P = function () {
        this.set(jb, [])
    };
    D.L = function (a) {
        a && this.get(kb)[m](a[C]())
    };
    D.Q = function () {
        this.set(kb, [])
    };
    D.N = function (a, b, c, d, e) {
        if (a && b) {
            a = [a, b[C]()][A](":");
            if (d || e) a = [a, d, e][A](":");
            d = this.get(ib);
            d.splice(c ? 0 : d[u], 0, a)
        }
    };
    D.R = function () {
        this.set(ib, [])
    };
    D.U = function (a) {
        this.a[ja]();
        var b = this.get(N),
            c = td(this.a);
        this.set(N, a);
        this.a.i();
        sd(this.a, c);
        this.set(N, b)
    };
    D.ra = function () {
        return J.referrer
    };
    D.m = function () {
        this.a[ja]()
    };
    D.ja = function (a) {
        a && a != "" && (this.set(zb, a), this.a.f("var"))
    };
    var Gd = function (a) {
            a.get(Wb) !== "trans" && a.b(Ib, 0) >= 500 && a[pa]();
            if (a.get(Wb) === "event") {
                var b = (new Date).getTime(),
                    c = a.b(Jb, 0),
                    d = a.b(Eb, 0),
                    c = k[ka](0.2 * ((b - (c != d ? c : c * 1E3)) / 1E3));
                c > 0 && (a.set(Jb, b), a.set(Q, k.min(10, a.b(Q, 0) + c)));
                a.b(Q, 0) <= 0 && a[pa]()
            }
        },
        Id = function (a) {
            a.get(Wb) === "event" && a.set(Q, k.max(0, a.b(Q, 10) - 1))
        };
    var Jd = function () {
            var a = [];
            this.add = function (b, c, d) {
                d && (c = F("" + c));
                a[m](b + "=" + c)
            };
            this.toString = function () {
                return a[A]("&")
            }
        },
        Kd = function (a, b) {
            (b || a.get(gb) != 2) && a.n(Ib)
        },
        Ld = function (a, b) {
            b.add("utmwv", "5.2.2");
            b.add("utms", a.get(Ib));
            b.add("utmn", va());
            var c = J[x].hostname;
            E(c) || b.add("utmhn", c, h);
            c = a.get(eb);
            c != 100 && b.add("utmsp", c, h)
        },
        Nd = function (a, b) {
            b.add("utmac", a.get(Ia));
            a.get(Zb) && b.add("utmni", 1);
            Md(a, b);
            K.q && b.add("aip", 1);
            b.add("utmu", Mc.Ea())
        },
        Md = function (a, b) {
            function c(a, b) {
                b && d[m](a + "=" + b + ";")
            }
            var d = [];
            c("__utma", yc(a));
            c("__utmz", Ec(a, j));
            c("__utmv", Bc(a, h));
            c("__utmx", td(a));
            b.add("utmcc", d[A]("+"), h)
        },
        Od = function (a, b) {
            a.get(Ta) && (b.add("utmcs", a.get(xb), h), b.add("utmsr", a.get(sb)), b.add("utmsc", a.get(tb)), b.add("utmul", a.get(wb)), b.add("utmje", a.get(ub)), b.add("utmfl", a.get(vb), h))
        },
        Pd = function (a, b) {
            a.get(Wa) && a.get(pb) && b.add("utmdt", a.get(pb), h);
            b.add("utmhid", a.get(rb));
            b.add("utmr", Ea(a.get(qb), a.get(N)), h);
            b.add("utmp", F(a.get(ob), h), h)
        },
        Qd = function (a, b) {
            for (var c = a.get(mb), d = a.get(nb), e = a.get(O) || [], f = 0; f < e[u]; f++) {
                var l = e[f];
                l && (c || (c = new Yc), c.e(8, f, l[r]), c.e(9, f, l[la]), l[qa] != 3 && c.e(11, f, "" + l[qa]))
            }!E(a.get($b)) && !E(a.get(ac), h) && (c || (c = new Yc), c.e(5, 1, a.get($b)), c.e(5, 2, a.get(ac)), e = a.get(bc), e != g && c.e(5, 3, e), e = a.get(cc), e != g && c.k(5, 1, e));
            c ? b.add("utme", c.ua(d), h) : d && b.add("utme", d.o(), h)
        },
        Rd = function (a, b, c) {
            var d = new Jd;
            Kd(a, c);
            Ld(a, d);
            d.add("utmt", "tran");
            d.add("utmtid", b.id_, h);
            d.add("utmtst", b.affiliation_, h);
            d.add("utmtto", b.total_, h);
            d.add("utmttx", b.tax_, h);
            d.add("utmtsp", b.shipping_, h);
            d.add("utmtci", b.city_, h);
            d.add("utmtrg", b.state_, h);
            d.add("utmtco", b.country_, h);
            !c && Nd(a, d);
            return d[t]()
        },
        Sd = function (a, b, c) {
            var d = new Jd;
            Kd(a, c);
            Ld(a, d);
            d.add("utmt", "item");
            d.add("utmtid", b.transId_, h);
            d.add("utmipc", b.sku_, h);
            d.add("utmipn", b.name_, h);
            d.add("utmiva", b.category_, h);
            d.add("utmipr", b.price_, h);
            d.add("utmiqt", b.quantity_, h);
            !c && Nd(a, d);
            return d[t]()
        },
        Td = function (a, b) {
            var c = a.get(Wb);
            if (c == "page") c = new Jd, Kd(a, b), Ld(a, c), Qd(a, c), Od(a, c), Pd(a, c), b || Nd(a, c), c = [c[t]()];
            else if (c == "event") c = new Jd, Kd(a, b), Ld(a, c), c.add("utmt", "event"), Qd(a, c), Od(a, c), Pd(a, c), !b && Nd(a, c), c = [c[t]()];
            else if (c == "var") c = new Jd, Kd(a, b), Ld(a, c), c.add("utmt", "var"), !b && Nd(a, c), c = [c[t]()];
            else if (c == "trans") for (var c = [], d = a.get(lb), e = 0; e < d[u]; ++e) {
                c[m](Rd(a, d[e], b));
                for (var f = d[e].items_, l = 0; l < f[u]; ++l) c[m](Sd(a, f[l], b))
            } else c == "social" ? b ? c = [] : (c = new Jd, Kd(a, b), Ld(a, c), c.add("utmt", "social"), c.add("utmsn", a.get(dc), h), c.add("utmsa", a.get(ec), h), c.add("utmsid", a.get(hc), h), Qd(a, c), Od(a, c), Pd(a, c), Nd(a, c), c = [c[t]()]) : c = [];
            return c
        },
        Hd = function (a) {
            var b, c = a.get(gb),
                d = a.get(Yb),
                e = d && d.Aa,
                f = 0;
            if (c == 0 || c == 2) {
                var l = a.get(fb) + "?";
                b = Td(a, h);
                for (var o = 0, q = b[u]; o < q; o++) Ga(b[o], e, l, h), f++
            }
            if (c == 1 || c == 2) {
                b = Td(a);
                o = 0;
                for (q = b[u]; o < q; o++) try {
                    Ga(b[o], e), f++
                } catch (s) {
                    s && Fa(s[r], g, s.message)
                }
            }
            if (d) d.j = f
        };
    var Ud = "https:" == J[x].protocol ? "https://ssl.google-analytics.com" : "http://www.google-analytics.com",
        Vd = function (a) {
            ga(this, "len");
            this.message = a + "-8192"
        },
        Wd = function (a) {
            ga(this, "ff2post");
            this.message = a + "-2036"
        },
        Ga = function (a, b, c, d) {
            b = b || wa;
            if (d || a[u] <= 2036) Xd(a, b, c);
            else if (a[u] <= 8192) {
                if (V[ra].userAgent[p]("Firefox") >= 0 && ![].reduce) throw new Wd(a[u]);
                Yd(a, b) || Zd(a, b)
            } else throw new Vd(a[u]);
        },
        Xd = function (a, b, c) {
            var c = c || Ud + "/__utm.gif?",
                d = new Image(1, 1);
            d.src = c + a;
            fa(d, function () {
                fa(d, i);
                d.onerror = i;
                b()
            });
            d.onerror = function () {
                fa(d, i);
                d.onerror = i;
                b()
            }
        },
        Yd = function (a, b) {
            var c, d = Ud + "/p/__utm.gif",
                e = V.XDomainRequest;
            if (e) c = new e, c.open("POST", d);
            else if (e = V.XMLHttpRequest) e = new e, "withCredentials" in e && (c = e, c.open("POST", d, h), c.setRequestHeader("Content-Type", "text/plain"));
            if (c) return c.onreadystatechange = function () {
                c.readyState == 4 && (b(), c = i)
            }, c.send(a), h
        },
        Zd = function (a, b) {
            if (J.body) {
                a = ba(a);
                try {
                    var c = J.createElement('<iframe name="' + a + '"></iframe>')
                } catch (d) {
                    c = J.createElement("iframe"), ga(c, a)
                }
                c.height = "0";
                c.width = "0";
                c.style.display = "none";
                c.style.visibility = "hidden";
                var e = J[x],
                    e = Ud + "/u/post_iframe.html#" + ba(e.protocol + "//" + e[oa] + "/favicon.ico"),
                    f = function () {
                        c.src = "";
                        c.parentNode && c.parentNode.removeChild(c)
                    };
                xa(V, "beforeunload", f);
                var l = j,
                    o = 0,
                    q = function () {
                        if (!l) {
                            try {
                                if (o > 9 || c.contentWindow[x][oa] == J[x][oa]) {
                                    l = h;
                                    f();
                                    ya(V, "beforeunload", f);
                                    b();
                                    return
                                }
                            } catch (a) {}
                            o++;
                            da(q, 200)
                        }
                    };
                xa(c, "load", q);
                J.body.appendChild(c);
                c.src = e
            } else Nc(function () {
                Zd(a, b)
            }, 100)
        };
    var Z = function () {
            this.q = j;
            this.D = {};
            this.F = [];
            this.wa = 0;
            this._gasoCPath = this._gasoDomain = g;
            R(Z[v], "_createTracker", Z[v].l, 55);
            R(Z[v], "_getTracker", Z[v].ya, 0);
            R(Z[v], "_getTrackerByName", Z[v].p, 51);
            R(Z[v], "_getTrackers", Z[v].za, 130);
            R(Z[v], "_anonymizeIp", Z[v].xa, 16);
            mc()
        };
    D = Z[v];
    D.ya = function (a, b) {
        return this.l(a, g, b)
    };
    D.l = function (a, b, c) {
        b && G(23);
        c && G(67);
        b == g && (b = "~" + K.wa++);
        a = new S(b, a, c);
        K.D[b] = a;
        K.F[m](a);
        return a
    };
    D.p = function (a) {
        a = a || "";
        return K.D[a] || K.l(g, a)
    };
    D.za = function () {
        return K.F[ha](0)
    };
    D.xa = function () {
        this.q = h
    };
    var $d = function (a) {
            if (J.webkitVisibilityState == "prerender") return j;
            a();
            return h
        };
    var K = new Z;
    var ae = V._gat;
    ae && typeof ae._getTracker == "function" ? K = ae : V._gat = K;
    var Tc = new Y;
    (function (a) {
        if (!$d(a)) {
            G(123);
            var b = j,
                c = function () {
                    !b && $d(a) && (G(124), b = h, ya(J, "webkitvisibilitychange", c))
                };
            xa(J, "webkitvisibilitychange", c)
        }
    })(function () {
        var a = V._gaq,
            b = j;
        if (a && typeof a[m] == "function" && (b = Object[v][t].call(Object(a)) == "[object Array]", !b)) {
            Tc = a;
            return
        }
        V._gaq = Tc;
        b && Tc[m].apply(Tc, a)
    });
})();