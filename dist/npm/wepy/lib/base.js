'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _event = require('./event.js');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREFIX = '$';
var JOIN = '$';

var prefixList = {};
var comCount = 0;

var $getPrefix = function $getPrefix(prefix) {
    return prefix;
};

var pageEvent = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage'];

var $bindEvt = function $bindEvt(config, com, prefix) {
    com.$prefix = $getPrefix(prefix);
    Object.getOwnPropertyNames(com.components || {}).forEach(function (name) {
        var cClass = com.components[name];
        var child = new cClass();
        child.initMixins();
        child.$name = name;
        var comPrefix = prefix ? prefix + child.$name + '$' : '$' + child.$name + '$';

        $getPrefix(comPrefix);

        com.$com[name] = child;

        $bindEvt(config, child, comPrefix);
    });
    Object.getOwnPropertyNames(com.constructor.prototype || []).forEach(function (prop) {
        if (prop !== 'constructor' && pageEvent.indexOf(prop) === -1) {
            config[prop] = function () {
                com.constructor.prototype[prop].apply(com, arguments);
                com.$apply();
            };
        }
    });

    var allMethods = Object.getOwnPropertyNames(com.methods || []);

    com.$mixins.forEach(function (mix) {
        allMethods = allMethods.concat(Object.getOwnPropertyNames(mix.methods || []));
    });

    allMethods.forEach(function (method, i) {
        config[com.$prefix + method] = function (e) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var evt = new _event2.default('system', this, e.type);
            evt.$transfor(e);
            var wepyParams = [],
                paramsLength = 0,
                tmp = void 0,
                p = void 0,
                comIndex = void 0;
            if (e.currentTarget && e.currentTarget.dataset) {
                tmp = e.currentTarget.dataset;
                while (tmp['wepyParams' + (p = String.fromCharCode(65 + paramsLength++))] !== undefined) {
                    wepyParams.push(tmp['wepyParams' + p]);
                }
                if (tmp.comIndex !== undefined) {
                    comIndex = tmp.comIndex;
                }
            }

            if (comIndex !== undefined) {
                comIndex = ('' + comIndex).split('-');
                var level = comIndex.length,
                    _tmp = level;
                while (level-- > 0) {
                    _tmp = level;
                    var tmpcom = com;
                    while (_tmp-- > 0) {
                        tmpcom = tmpcom.$parent;
                    }
                    tmpcom.$setIndex(comIndex.shift());
                }
            }

            args = args.concat(wepyParams);
            var rst = void 0,
                mixRst = void 0;
            var comfn = com.methods[method];
            if (comfn) {
                rst = comfn.apply(com, args.concat(evt));
            }
            com.$mixins.forEach(function (mix) {
                mix.methods[method] && (mixRst = mix.methods[method].apply(com, args.concat(evt)));
            });
            com.$apply();
            return comfn ? rst : mixRst;
        };
    });
    return config;
};

exports.default = {
    $createApp: function $createApp(appClass) {
        var config = {};
        var app = new appClass();

        if (!this.$instance) {
            app.init(this);
            this.$instance = app;
        }
        Object.getOwnPropertyNames(app.constructor.prototype).forEach(function (name) {
            if (name !== 'constructor') config[name] = app.constructor.prototype[name];
        });

        config.$app = app;
        app.$wxapp = getApp();
        return config;
    },
    $createPage: function $createPage(pageClass, pagePath) {
        var self = this;
        var config = {},
            k = void 0;
        var page = new pageClass();
        if (pagePath) this.$instance.$pages[pagePath] = page;
        page.initMixins();
        config.$page = page;

        config.onLoad = function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            page.$name = pageClass.name || 'unnamed';
            page.init(this, self.$instance, self.$instance);

            var prevPage = self.$instance.__prevPage__;
            var secParams = {};
            secParams.from = prevPage ? prevPage : undefined;

            if (prevPage && Object.keys(prevPage.$preloadData).length > 0) {
                secParams.preload = prevPage.$preloadData;
                prevPage.$preloadData = {};
            }
            if (page.$prefetchData && Object.keys(page.$prefetchData).length > 0) {
                secParams.prefetch = page.$prefetchData;
                page.$prefetchData = {};
            }
            args.push(secParams);
            page.onLoad && page.onLoad.apply(page, args);

            page.$mixins.forEach(function (mix) {
                mix['onLoad'] && mix['onLoad'].apply(page, args);
            });

            page.$apply();
        };

        config.onShow = function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            self.$instance.__prevPage__ = page;

            page.onShow && page.onShow.apply(page, args);

            page.$mixins.forEach(function (mix) {
                mix['onShow'] && mix['onShow'].apply(page, args);
            });

            var pages = getCurrentPages();
            var pageId = pages[pages.length - 1].__route__;

            if (self.$instance.__route__ !== pageId) {

                self.$instance.__route__ = pageId;

                page.onRoute && page.onRoute.apply(page, args);

                page.$mixins.forEach(function (mix) {
                    mix['onRoute'] && mix['onRoute'].apply(page, args);
                });
            }

            page.$apply();
        };

        pageEvent.forEach(function (v) {
            if (v !== 'onLoad' && v !== 'onShow') {
                config[v] = function () {
                    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                        args[_key4] = arguments[_key4];
                    }

                    var rst = void 0;
                    page[v] && (rst = page[v].apply(page, args));

                    if (v === 'onShareAppMessage') return rst;

                    page.$mixins.forEach(function (mix) {
                        mix[v] && mix[v].apply(page, args);
                    });

                    page.$apply();

                    return rst;
                };
            }
        });

        if (!page.onShareAppMessage) {
            delete config.onShareAppMessage;
        }

        return $bindEvt(config, page, '');
    }
};
//# sourceMappingURL=base.js.map