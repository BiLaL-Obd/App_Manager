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
    return $this.Fields[key] = {};
}
