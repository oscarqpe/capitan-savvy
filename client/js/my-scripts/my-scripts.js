loading = new function () {
    this.show = function () {
        $("#loading-container").css("display", "inline-block");
    };
    this.hide = function () {
        $("#loading-container").css("display", "none");
    }
};
btnAction = new function() {
    this.disable = function (id) {
        $("#" + id).addClass("disabled");
        document.getElementById(id).setAttribute("disabled", "disabled");
    }
    this.enable = function (id) {
        $("#" + id).removeClass("disabled");
        $("#" + id).removeAttr("disabled");
    }
};