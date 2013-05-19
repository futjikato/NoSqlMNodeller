define(function() {
    function Element() {}
    Element.prototype.draw = function(ctx) {
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#CCCCCC";

        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    return Element;
});