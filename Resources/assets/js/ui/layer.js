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
    }
    Layer.prototype.open = function(name, lang) {
        var self = this;
        require(["text!tpl/layer/" + name + ".html", "text!l10n/layer." + name + "." + lang + ".json"], function(contentTmpl, dataStr) {

            if(!contentTmpl || !dataStr) {
                console.log("[Layer] Unable to open %s ( lang: %s ) because template or language file is missing.", name, lang);
                return;
            }

            var data = JSON.parse(dataStr);

            if(!data) {
                console.log("[Layer] Corrupted languagefile `layer.%s.%s.json`", name, lang);
                return;
            }

            var content = Mustache.render(contentTmpl, data);

            self.container.append(self.baseTmpl({
                headline: "Dummy Headline",
                content: content
            }));
        });
    };

    return Layer;
});