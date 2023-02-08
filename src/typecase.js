export const isScalar = (value) => {
    const isBoolean = typeof value === 'boolean';
    const isNumber = typeof value === 'number';
    const isString = typeof value === 'string';

    return isBoolean || isNumber || isString;
};

export const isObject = (obj) => {
    const isObject = typeof obj === 'object';
    const isNull = obj === null;
    const isList = obj instanceof Array;
    const isDate = obj instanceof Date;

    return isObject && !isNull && !isList && !isDate;
};

export const isList = (obj) => obj instanceof Array;

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
                } else if (isScalar(value)) {
                    converted[newKey] = value;
                };
            }
        );
    } else {
        return input;
    };
    return converted;
};

export const jstr = (obj) => JSON.stringify(obj, undefined, 4);