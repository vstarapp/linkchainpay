/**
 *
 * **/
module.exports = [
  "$window",
  $window => {
    return {
      resize: function(obj) {
        var scale = 1;
        var height = "auto";
        var clientHeight = document.documentElement.clientHeight;
        var clientWidth = document.documentElement.clientWidth;
        if (clientWidth < 1000) {
          scale = clientWidth * 0.98 / 1000;
          height =
            document.getElementById(obj + "Table").clientHeight * scale + "px";
        } else {
          scale = 1;
          height = "auto";
        }
        document.getElementById(obj + "Table").style.transform =
          "scale(" + scale + ")";
        document.getElementById(obj).style.height = height;
      }
    };
  }
];
