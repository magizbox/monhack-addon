var data = require('sdk/self').data
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var panel = require('sdk/panel').Panel({
    contentURL: data.url('panel.html'),
    contentScriptFile : [data.url('jquery.js'), data.url('panel.js')]
});

var button = buttons.ActionButton({
    id: "mozilla-link",
    label: "Visit monhack",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleClick
});

function handleClick(state) {
    showPanel();
}

function showPanel(){
    panel.show({
        "width": 650
    });
}
// Define keyboard shortcuts for showing and hiding a custom panel.
var { Hotkey } = require("sdk/hotkeys");

var showHotKey = Hotkey({
  combo: "alt-m",
  onPress: function() {
    showPanel();
  }
});

panel.on("show", function(){
    panel.port.emit("opened");
});

panel.port.on("entered_keyword", function(url){
    panel.hide();
    tabs.open(url);
});
