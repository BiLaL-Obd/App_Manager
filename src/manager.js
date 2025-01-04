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
    if(inputs.length > 0)
        inputs.forEach(id => {
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
$this.reduceFunctions = (functionObj) => {
    var functions = {};
    if(!isEmptyOrNull(functionObj))
        Object.entries(functionObj).reduce((acc, [name, fn]) => {
            if (typeof fn === "function")
                acc[name] = fn;
            return functions = acc;
        }, {});
    return functions;
}
