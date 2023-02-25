export const isObject = (obj) => {
    const isObject = typeof obj === 'object';
    const isNull = obj === null;
    const isList = obj instanceof Array;
    const isDate = obj instanceof Date;

    return isObject && !isNull && !isList && !isDate;
};

export const convert = (input, strategy) => {
    if (input instanceof Array) {
        return input.map((item) => convert(item, strategy));
    } else if (isObject(input)) {
        let converted = {};
        Object.keys(input).forEach(
            (key) => {
                const value = input[key];
                const newKey = strategy(key);
                converted[newKey] = convert(value, strategy);
            }
        );
        return converted;
    } else {
        return input;
    };
};