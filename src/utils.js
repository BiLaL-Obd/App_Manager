var $this = window;
$this.isEmpty = (str) => {
    if(str == "" || str == undefined)
        return true;
    return false;
}
$this.isEmptyOrNull = (str) =>  {
    if(str == "" || str == undefined || str == null)
        return true;
    return false;
}
$this.isFunction = (attr) => {
    return typeof attr == "function";
}
$this.isObject = (attr) => {
    return typeof attr == "object";
}
$this.isString = (attr) => {
    return typeof attr == "string"
}
$this.isNumber = (attr) => {
    return typeof attr == "number"
}
$this.GUID = () => {
   function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
   }
   var retVal = '';
   for(var i = 0; i<8; i++)
    retVal += s4();
   return retVal;
}
$this.cGUID = (length) => {
   function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
   }
   if(typeof length == "undefined")
        length = 2;
    var retVal = s4();
    for(var i = length - 1; i>0; i--)
        retVal += s4();
    return retVal;
}
$this.getInitialName = (str) => {
    var parts = str.split(/[\s.]+/);
    return (parts.length > 1
        ? parts[0][0] + parts[parts.length - 1][0]
        : parts[0][0]).toUppercase();
}
$this.formatNumber = (number, round = 2) => {
    if(isEmpty(number)) return "";
    number = +number;
    var x = (number + "").split('.');
    var x1 = x[0];
    var x2 = x.length > 1? "." + x[1]: '';
    var rgx = /(\d+)(\d{3})/;
    while(rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '', '$2');
    }
    return (x1 + x2).replace(".00", "");
}
$this.roundToDecimalPlaces = (value, decimalPlaces) => {
    if(isEmptyOrNull(decimalPlaces))
        return value;
    if(typeof value == "string")
        value = parseFloat(value);
    if(isNaN(value))
        return "Invalid Number";
    return value.toFixed(decimalPlaces);
}
$this.formatUnits = (value, unit) => {
    if(isEmptyOrNull(unit))
        return value;
    if(typeof value == 'string')
        value = parseFloat(value);
    var units = {K: 1e3, M: 1e6, B: 1e9};
    if(isNaN(value) && !units[unit])
        return "Invalid Number";
    if(value < 1000)
        return value;
    var calculatePrecision = (formattedValue) => {
        var decimalPlaces = (value.toString().split('.')[1] || '').length;
        var precision = Math.min(decimalPlaces, 8);
        return precision == 0
            ? Math.floor(formattedValue)
            : formattedValue.toFixed(precision)
    }
    if(unit.toLowecase() == "auto")
    {
        if(value >= units.B) return calculatePrecision(value / units.B) + 'B+';
        else if(value >= units.M) return calculatePrecision(value / units.M) + 'M+';
        else if(value >= units.K) return calculatePrecision(value / units.K) + 'K+';
        else return value.toString();
    }
    return calculatePrecision(value / units[unit]) + unit + "+";
}
$this.capitalizeStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
$this.tryEval = (scr) => {
    try { return eval(scr); } catch(e) {};
}
$this.readVal = (type, defaultValue, isRequired) => {
    if(!isFunction(type) && !isObject(type)) throw "type of readVal must be a String or type of object like [String, Number]";
    var prop = { type: type };
    if (typeof defaultValue !== "undefined")
        prop.default = defaultValue;
    
    if (typeof isRequired !== "undefined") 
        prop.required = isRequired;
    return prop;
}
$this.readBool = (type, defaultValue = false) => {
    if(!isFunction(type) || (isString(type) && isNumber(type)) ) throw "type of readBool must be a Boolean";
    return {type: Boolean, default: defaultValue};

}