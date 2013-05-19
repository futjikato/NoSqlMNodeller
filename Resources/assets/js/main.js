requirejs.config({
    baseUrl: '/assets/js',
    paths: {
        libs: '/libs',
        l10n: '/assets/l10n',
        tpl: '/assets/tpl'
    }
});

require(["ui/window", "visual/board", "libs/require.js/domReady.js"], function(win, Board, domReady) {
    // wait for dom ready
    domReady(function() {

        // render window
        win.render("de");

        // bind topnav events
        win.on('quit', function() {
            Ti.UI.currentWindow.close();
        }).on('openLayer', function(trigger) {
            var layerName = trigger.getAttribute("data-layer");

            if(!layerName) {
                console.log("[Main] Unable to open layer. No identifier found.");
            }

            require(["ui/layer"], function(Layer) {
                var newLayer = new Layer(win);
                newLayer.open(layerName, "de");
            });
        });

        // initialize drawing board
        var mainBoard = new Board(win);
    });
});