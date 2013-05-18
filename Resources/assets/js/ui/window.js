define(function () {
    function BasicWindow() {
        var self = this;

        self._events = ["quit", "openWin", "openLayer"];
        self._eventHandler = {};

        self._events.forEach(function(eventName) {
            self._eventHandler[eventName] = function() {};
        });

        // listen for all clicks on window
        this._elem = document.getElementsByClassName('window')[0];
        this._elem.addEventListener('click', function(e) {
            var trigger = e.target,
                classStr = trigger.getAttribute('class');

            // travers thought parent nodes until a matching element is found
            while(!classStr || classStr.indexOf("js-window-action") == -1) {
                trigger = trigger.parentNode;

                // if parent node is document
                if(trigger == document) {
                    return;
                }

                classStr = trigger.getAttribute('class');
            }

            var eventName = trigger.getAttribute('data-trigger');

            if(eventName && typeof self._eventHandler[eventName]  == 'function') {
                self._eventHandler[eventName](trigger);
            }
        }, false);
    }
    BasicWindow.prototype.on = function(event, fn) {
        this._eventHandler[event] = fn;
        return this;
    };
    BasicWindow.prototype.render = function(lang) {
        var self = this;
        require(["libs/mustache.js/mustache.js", "text!l10n/" + lang + ".json"], function(Mustache, jsonStr) {

            if(!jsonStr) {
                console.log("[BasicWindow] Render failed because of invalid language.");
                return;
            }

            var viewData = JSON.parse(jsonStr);

            if(!viewData) {
                console.log("[BasicWindow] Render failed because of corrupted language file.");
                return;
            }

            self._elem.innerHTML = Mustache.render(self._elem.innerHTML, viewData);
        });
    };
    BasicWindow.prototype.append = function(html) {
        this._elem.insertAdjacentHTML("AfterEnd", html);
        return this;
    };
    BasicWindow.prototype.getDomnElement = function() {
        return this._elem;
    };

    return new BasicWindow();
});