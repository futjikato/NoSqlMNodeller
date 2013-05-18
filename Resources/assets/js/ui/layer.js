define(["libs/mustache.js/mustache.js", "text!tpl/layer.html"], function(Mustache, baseTmpl) {
    function Layer(win) {
        var self = this;

        self._events = ["open", "close"];
        self._eventHandler = {};

        self._events.forEach(function(eventName) {
            self._eventHandler[eventName] = function() {};
        });

        self.container = win;
        self.baseTmpl = Mustache.compile(baseTmpl);

        self._elem;
    }
    Layer.prototype.close = function() {
        if(this._elem) {
            this._elem.parentNode.removeChild(this._elem);
        }
    };
    Layer.prototype.open = function(name, lang) {
        var self = this;
        // load layer content html and label data
        require(["text!tpl/layer/" + name + ".html", "text!l10n/layer." + name + "." + lang + ".json"], function(contentTmpl, dataStr) {

            // check for existence
            if(!contentTmpl || !dataStr) {
                console.log("[Layer] Unable to open %s ( lang: %s ) because template or language file is missing.", name, lang);
                return;
            }

            // parse label data
            var data = JSON.parse(dataStr);

            // check if l10n was valid json
            if(!data) {
                console.log("[Layer] Corrupted languagefile `layer.%s.%s.json`", name, lang);
                return;
            }

            // render content
            var content = Mustache.render(contentTmpl, data);

            // render into layer base and appen d to window
            self.container.append(self.baseTmpl({
                headline: "Dummy Headline",
                content: content
            }));

            // find layer object and save it for further use
            self._elem = document.getElementsByClassName('layer')[0];

            // bind close
            self._elem.addEventListener('click', function(e) {
                var trigger = e.target,
                    classStr = trigger.getAttribute('class');

                while(!classStr || classStr.indexOf("js-layer-close") == -1) {
                    trigger = trigger.parentNode;

                    if(trigger == self._elem || trigger == document) {
                        return;
                    }

                    classStr = trigger.getAttribute('class');
                }

                self.close();
            }, false);
        });
    };

    return Layer;
});