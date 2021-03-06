// JavaScript Document
var myInterpreter = null;

function initApi(interpreter, scope) {
 
  var wrapper = function (url, json) {
    url = url ? url.toString() : '';
    json = json ? json.toString() : '';
    return interpreter.createPrimitive(ajax_delete(url, json));
  };
   interpreter.setProperty(scope, 'ajax_delete',
    interpreter.createNativeFunction(wrapper));   
 
  var wrapper = function (url, xdata) {
    url = url ? url.toString() : '';
    var json = []
    for (i in xdata.properties)
    {
        json.push(xdata.properties[i].data)
    }
    return interpreter.createPrimitive(ajax_post(url, json));
  };
    interpreter.setProperty(scope, 'ajax_post',
    interpreter.createNativeFunction(wrapper));   
 
   var wrapper = function (url) {
    url = url ? url.toString() : '';
    return interpreter.createPrimitive(ajax_get(url));
  };
   interpreter.setProperty(scope, 'ajax_get',
    interpreter.createNativeFunction(wrapper));   
    
  var wrapper = function (name, x, y, color) {
     var xdata = []
    for (i in y.properties)
    {
        xdata.push(x.properties[i].data)
    }
    var ydata = []
    for (i in y.properties)
    {
        ydata.push(y.properties[i].data)
    }
    return interpreter.createPrimitive(plotxy(name.data, xdata, ydata, color.data));
  };
  interpreter.setProperty(scope, 'plotxy',
    interpreter.createNativeFunction(wrapper));   
    
    var wrapper = function (name, y, color) {
    var ydata = []
    for (i in y.properties)
    {
        ydata.push(y.properties[i].data)
    }
    return interpreter.createPrimitive(plot(name.data, ydata, color.data));
  };
  interpreter.setProperty(scope, 'plot',
    interpreter.createNativeFunction(wrapper));

  var wrapper = function () {
    return interpreter.createPrimitive(plotclean());
  };
  interpreter.setProperty(scope, 'plotclean',
    interpreter.createNativeFunction(wrapper));

  var wrapper = function (text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(console_print(text));
  };
  interpreter.setProperty(scope, 'console_print',
    interpreter.createNativeFunction(wrapper));
    
    var wrapper = function (text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(error_print(text));
  };
  interpreter.setProperty(scope, 'error_print',
    interpreter.createNativeFunction(wrapper));  
    
  // Add an API function for the alert() block.
  var wrapper = function (text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(scope, 'alert',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the prompt() block.
  var wrapper = function (text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(scope, 'prompt',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for highlighting blocks.
  var wrapper = function (id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock',
    interpreter.createNativeFunction(wrapper));
}

var highlightPause = false;

function highlightBlock(id) {
  workspace.highlightBlock(id);
  highlightPause = true;
}

function parseCode() {
  // Generate JavaScript code and parse it.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  myInterpreter = new Interpreter(code, initApi);
  highlightPause = false;
  workspace.traceOn(true);
  workspace.highlightBlock(null);
}