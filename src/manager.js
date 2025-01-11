var $this = window;
var Fields = {};
$this.Fields = Fields;
$this.getBuilderId = () => {
    var builder = document.querySelector('builder');
    return builder ? builder.getAttribute("id") : null;
}
$this.registerField = (id, instance) => {
    return Fields[id] = instance;
};
$this.unregisterField = (id) => {
    return delete Fields[id];
};
$this.getField = (id) => {
    return Fields[id];
};
$this.getBuilderFields = (key, inputs) => {
    $this.Fields[key] = {};
    $this[key] = {};
    if(inputs.length > 0)
        inputs.forEach(id => {
            var props = getProps(Fields[id]);
            $this[key][id] = props;
            Fields[key][id] = Fields[id];
            delete Fields[id];
        });
    return Fields[key];
}
$this.reduceProps = (props, state) => {
    if (!isEmptyOrNull(props) && !isEmptyOrNull(state)) {
        return Object.keys(props).reduce((acc, key) => {
            acc[key] = state[key];
            return acc;
        }, {});
    }
    return {}; 
}
$this.reduceFunctions = (obj) => {
    var functions = {};
    if(!isEmptyOrNull(obj))
        Object.entries(obj).reduce((acc, [name, fn]) => {
            if (typeof fn === "function")
                acc[name] = fn;
            return functions = acc;
        }, {});
    return functions;
}
$this.getProps = (obj) => {
    var functions = {};
    if(!isEmptyOrNull(obj))
        Object.entries(obj).reduce((acc, [name, fn]) => {
            if (typeof fn != "function")
                acc[name] = fn;
            return functions = acc;
        }, {});
    return functions;
}
var Throw = {
    messages: [],
    Error: function(message) {
        if(isEmptyOrNull(message)) throw "Put the message error";
        this.messages.push(message);

        var alertDiv = document.createElement('div');
        var style = 'background-color: rgba(206, 17, 38, 0.1);color: rgb(252, 207, 207);padding: 16px 16px 24px;border-radius: 8px;margin-bottom:10px;'
        var html = '<div style="' + style + '">'
        html += '<h4>Error</h4>'
        html += message
        html += '</div>'

        alertDiv.innerHTML = html;
        document.getElementById('toaster-error-message').appendChild(alertDiv);
        document.getElementById('toaster-error').style.display = 'block';
    },

    Clear: function() {
        this.messages = [];
        document.getElementById('toaster-error-message').innerHTML = '';
        document.getElementById('toaster-error').style.display = 'none';
    }
};
$this.Throw = Throw;