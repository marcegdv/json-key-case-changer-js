export const toSnakeCase = (str) => {
    return str && str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('_');
};

export const toKebabCase = (str) =>
    str && str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');

export const toCamelCase = (str) =>
    str.toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

export const toPascalCase = (string) => {
    return `${string}`
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w*)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
};

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