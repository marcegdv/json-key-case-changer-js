export const isValue = (value) => {
    const isBoolean = typeof value === 'boolean';
    const isNumber = typeof value === 'number';
    const isString = typeof value === 'string';
    const isDate = value instanceof Date;
    const isNull = value === null;

    return isBoolean || isNumber || isString || isDate || isNull;
};

export const isObject = (obj) => {
    const isObject = typeof obj === 'object';
    const isNull = obj === null;
    const isList = obj instanceof Array;
    const isDate = obj instanceof Date;

    return isObject && !isNull && !isList && !isDate;
};

export const isList = (list) => list instanceof Array;

export const convert = (input, strategy) => {
    let converted = null;
    if (isList(input)) {
        converted = input.map((item) => convert(item, strategy));
    } else if (isObject(input)) {
        converted = {};
        Object.keys(input).forEach(
            (key) => {
                const value = input[key];
                const newKey = strategy(key);
                if (isList(value) || isObject(value)) {
                    converted[newKey] = convert(value, strategy);
                } else if (isValue(value)) {
                    converted[newKey] = value;
                };
            }
        );
    } else {
        return input;
    };
    return converted;
};