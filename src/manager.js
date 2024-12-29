var $this = window;
$this.Fields = {};
$this.Field = {};
$this.getBuilderId = () => {
    var builder = document.querySelector('builder');
    return builder ? builder.getAttribute("id") : null;
}
$this.registerField = (id, instance) => {
    $this.Field[id] = instance;
};
$this.unregisterField = (id) => {
    delete $this.Field[id];
};
$this.getField = (id) => {
    return $this.Field[id];
};
$this.getBuilderFields = (key, fields) => {
    if(fields.length > 0)
        $this.Fields[key] = {};
        fields.forEach(fieldId => {
            $this.Fields[key][fieldId] = $this.Field[fieldId];
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
