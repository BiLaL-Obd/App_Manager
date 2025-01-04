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
