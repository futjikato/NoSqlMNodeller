define(function() {
    function Board(win) {
        var self = this;

        self.running = false;
        self.container = win;
        self._elements = [];
        self.canvas = document.getElementsByTagName('canvas')[0];
        self.ctx = self.canvas.getContext("2d");

        self._clear = function() {
            var w = parseInt(document.getComputedStyle(self.canvas, 'width'), 10),
                h = parseInt(document.getComputedStyle(self.canvas, 'height'), 10);

            self.ctx.clearRect(0, 0, w, h);
        }

        self._draw = function() {

            if(!self.running) {
                return;
            }

            self._clear();
            self._elements.forEach(function(elem) {
                elem.draw(self.ctx);
            })
        }

        window.requestAnimationFrame(self._draw, self.canvas);
    }
    Board.prototype.addElement = function(options) {
        var self = this;
        require(["visual/elements/" + options.type], function(Element) {
            var newElem = new Element(self);
            self._elements.push(newElem);
        });
    };
    Board.prototype.start = function() {

    };

    return Board;
});