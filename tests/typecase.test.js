import { convert, isScalar, isList, isObject, jstr } from "../src/typecase";
import { camelCase, snakeCase, pascalCase } from "change-case";

describe('jsonKeyCase functions test:', () => {

    describe('jstr tests:', () => {

        test('with a scalar, return a string', () => {
            expect(jstr(false)).toEqual('false');
            expect(jstr(123)).toEqual('123');
            expect(jstr('abc')).toEqual("\"abc\"");
        });

        test('with a list, return a string', () => {
            expect(jstr([1, 2, 3])).toEqual("[\n    1,\n    2,\n    3\n]");
        });

        test('with a object, return a string', () => {
            expect(jstr({ id: 1 })).toEqual("{\n    \"id\": 1\n}");
        });

    });

    describe('isScalar tests:', () => {

        test('isScalar with a boolean return true', () => {
            expect(isScalar(false)).toBeTruthy();
        });
        test('isScalar with a number return true', () => {
            expect(isScalar(123)).toBeTruthy();
        });
        test('isScalar with a string return true', () => {
            expect(isScalar('abc')).toBeTruthy();
        });
        test('isScalar with an object return false', () => {
            const obj = { id: 1 };
            expect(isScalar(obj)).toBeFalsy();
        });
        test('isScalar with an array return false', () => {
            const obj = [1, 2, 3];
            expect(isScalar(obj)).toBeFalsy();
        });
        test('isScalar with an array return false', () => {
            const obj = new Date;
            expect(isScalar(obj)).toBeFalsy();
        });
        test('isScalar with null return false', () => {
            const obj = null;
            expect(isScalar(obj)).toBeFalsy();
        });
        test('isScalar with undefined return false', () => {
            const obj = undefined;
            expect(isScalar(obj)).toBeFalsy();
        });

    });

    describe('isList tests:', () => {

        test('isList with a boolean return true', () => {
            expect(isList(false)).toBeFalsy();
        });
        test('isList with a number return true', () => {
            expect(isList(123)).toBeFalsy();
        });
        test('isList with a string return true', () => {
            expect(isList('abc')).toBeFalsy();
        });
        test('isList with an object return false', () => {
            const obj = { id: 1 };
            expect(isList(obj)).toBeFalsy();
        });
        test('isList with an array return false', () => {
            const obj = [1, 2, 3];
            expect(isList(obj)).toBeTruthy();
        });
        test('isList with an array return false', () => {
            const obj = new Date;
            expect(isList(obj)).toBeFalsy();
        });
        test('isList with null return false', () => {
            const obj = null;
            expect(isList(obj)).toBeFalsy();
        });
        test('isList with undefined return false', () => {
            const obj = undefined;
            expect(isList(obj)).toBeFalsy();
        });

    });

    describe('isObject tests:', () => {

        test('isObject with a boolean return true', () => {
            expect(isObject(false)).toBeFalsy();
        });
        test('isObject with a number return true', () => {
            expect(isObject(123)).toBeFalsy();
        });
        test('isObject with a string return true', () => {
            expect(isObject('abc')).toBeFalsy();
        });
        test('isObject with empty object, return true', () => {
            expect(isObject({})).toBeTruthy();
        });
        test('isObject with an object return false', () => {
            const obj = { id: 1 };
            expect(isObject(obj)).toBeTruthy();
        });
        test('isObject with an array return false', () => {
            const obj = [1, 2, 3];
            expect(isObject(obj)).toBeFalsy();
        });
        test('isObject with an array return false', () => {
            const obj = new Date;
            expect(isObject(obj)).toBeFalsy();
        });
        test('isObject with null return false', () => {
            const obj = null;
            expect(isObject(obj)).toBeFalsy();
        });
        test('isObject with undefined return false', () => {
            const obj = undefined;
            expect(isObject(obj)).toBeFalsy();
        });

    });

    describe('convert tests:', () => {

        test('with an scalar and any strategy, return the scalar', () => {
            expect(convert(false, camelCase)).toEqual(false);
            expect(convert(123, snakeCase)).toEqual(123);
            expect(convert('abc', pascalCase)).toEqual('abc');
        });
        test('with a list of scalars and any startegy, return list of scalars', () => {
            expect(convert([false, true], camelCase)).toEqual([false, true]);
            expect(convert([1, 2, 3], snakeCase)).toEqual([1, 2, 3]);
            expect(convert(['abc', '123'], pascalCase)).toEqual(['abc', '123']);
        });
        test('with an empty list/object and any strategy, return the empty list', () => {
            expect(convert([], camelCase)).toEqual([]);
            expect(convert([], snakeCase)).toEqual([]);
            expect(convert({}, camelCase)).toEqual({});
            expect(convert({}, snakeCase)).toEqual({});
        });
        test('with a simple object in camelCase and snake_case strategy, return same object in snake_case', () => {
            const origin = {
                id: 3,
                firstName: 'John',
                lastName: 'Doe',
                userAliasesList: [
                    'jd', 'Johny'
                ],
                location: {
                    fullAddress: 'Fake street 123',
                    city: 'LA',
                },
            };
            const expected = {
                id: 3,
                first_name: 'John',
                last_name: 'Doe',
                user_aliases_list: [
                    'jd', 'Johny'
                ],
                location: {
                    full_address: 'Fake street 123',
                    city: 'LA',
                },
            };
            expect(convert(origin, snakeCase)).toStrictEqual(expected);
        });
        test('with a simple list in snake_case and camelCase strategy, return same list in camelCase', () => {
            const origin = [
                {
                    id: 123,
                    user_name: 'simpleuser',
                    user_password: 'unhackable_password',
                },
                {
                    id: 234,
                    user_name: 'otherUser',
                    user_password: '12tres',
                },
            ];
            const expected = [
                {
                    id: 123,
                    userName: 'simpleuser',
                    userPassword: 'unhackable_password',
                },
                {
                    id: 234,
                    userName: 'otherUser',
                    userPassword: '12tres',
                },
            ];
            expect(convert(origin, camelCase)).toStrictEqual(expected);
        });

    });

});