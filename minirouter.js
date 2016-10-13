
/*
var mockController = {
    render: function(){
        return "<div></div>"
    }
    onEnter: function(){
        //this对象为当前组件，即{path, controller: controller}对象
    }
    onLeave: function(){

    }
}
 */
(function (window) {
    function getRoute(routerObj, path, defaultPath) {
        var key = (path.hash || '#/').slice(1).split('?')[0];
        if (routerObj.hasOwnProperty(key)) {
            return routerObj[key];
        }

        if (path !== defaultPath && !!defaultPath) {
            return getRoute(routerObj, defaultPath);
        }
    }

    function getFullPath(path) {
        if (URL.prototype.isPrototypeOf(path)) return path;
        var link = document.createElement('a');
        link.setAttribute('href', path);
        return new URL(link.href);
    }

    function noop() {
    }

    var Router = function Router(container) {
        this._container = typeof container === 'string' ? document.querySelector(container) : container;
        this._routes = {};
    };


    Router.prototype.use = function use(path, controller) {
        if (typeof (controller.render) !== 'function') {
            throw new Error('未实现render');
        }
        var map = this._routes || {};
        map[path] = {
            path: path,
            controller: controller
        }
        return this;
    }

    Router.prototype.default = function (defaultPath) {
        this._defaultPath = defaultPath;
        return this;
    }

    Router.prototype.go = function (nextPath, prev, replace) {
        var current = getRoute(this._routes, prev || window.location),
            next = getRoute(this._routes, getFullPath(nextPath), this._defaultPath);

        current && (current.controller.onLeave || noop).call(current);
        var html = next.controller.render();
        if (replace) {
            history.replaceState(document.title, document.title, location.pathname + '#' + next.path);
        } else {
            history.pushState(document.title, document.title, location.pathname + '#' + next.path);
        }

        this._container.innerHTML = html;
        (next.controller.onEnter || noop).call(next);
    }

    Router.prototype.eventHandler = function (e) {
        this.go(new URL(e.newURL), new URL(e.oldURL), true);
    }

    Router.prototype.run = function () {
        window.addEventListener('hashchange', this.eventHandler.bind(this), false);
        this.go(window.location);
    }

    Router.prototype.destroy = function () {
        window.removeEventListener('hashchange', this.eventHandler);
    }

    window.Router = Router;
})(window);





