var $this = window;
var FieldObj = {};
$this.Fields = {};
$this.getBuilderId = () => {
    var builder = document.querySelector('builder');
    return builder ? builder.getAttribute("id") : null;
}
$this.registerField = (id, instance) => {
    return FieldObj[id] = instance;
};
$this.unregisterField = (id) => {
    return delete FieldObj[id];
};
$this.getField = (id) => {
    return FieldObj[id];
};
$this.getBuilderFields = (key, inputs) => {
    $this.Fields[key] = {};
    if(inputs.length > 0)
        inputs.forEach(id => {
            $this.Fields[key][id] = FieldObj[id];
        });
    return $this.Fields[key];
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
