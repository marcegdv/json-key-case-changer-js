import { convert, isValue, isList, isObject } from "../src/jsonKeyCaseChanger";
import { camelCase, snakeCase, pascalCase } from "change-case";

describe('jsonKeyCase functions test:', () => {

    describe('isValue tests:', () => {

        test('isValue with a boolean return true', () => {
            expect(isValue(false)).toBeTruthy();
        });
        test('isValue with a number return true', () => {
            expect(isValue(123)).toBeTruthy();
        });
        test('isValue with a string return true', () => {
            expect(isValue('abc')).toBeTruthy();
        });
        test('isValue with an ampty object return false', () => {
            const obj = {};
            expect(isValue(obj)).toBeFalsy();
        });
        test('isValue with an object return false', () => {
            const obj = { id: 1 };
            expect(isValue(obj)).toBeFalsy();
        });
        test('isValue with an empty array return false', () => {
            const obj = [];
            expect(isValue(obj)).toBeFalsy();
        });
        test('isValue with an array return false', () => {
            const obj = [1, 2, 3];
            expect(isValue(obj)).toBeFalsy();
        });
        test('isValue with an array return true', () => {
            const obj = new Date;
            expect(isValue(obj)).toBeTruthy();
        });
        test('isValue with null return true', () => {
            const obj = null;
            expect(isValue(obj)).toBeTruthy();
        });
        test('isValue with undefined return false', () => {
            const obj = undefined;
            expect(isValue(obj)).toBeFalsy();
        });

    });

    describe('isList tests:', () => {

        test('isList with a boolean return false', () => {
            expect(isList(false)).toBeFalsy();
        });
        test('isList with a number return false', () => {
            expect(isList(123)).toBeFalsy();
        });
        test('isList with a string return false', () => {
            expect(isList('abc')).toBeFalsy();
        });
        test('isList with an empty object return false', () => {
            const obj = {};
            expect(isList(obj)).toBeFalsy();
        });
        test('isList with an object return false', () => {
            const obj = { id: 1 };
            expect(isList(obj)).toBeFalsy();
        });
        test('isList with an empty array return true', () => {
            const obj = [];
            expect(isList(obj)).toBeTruthy();
        });
        test('isList with an array return true', () => {
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

        test('isObject with a boolean return false', () => {
            expect(isObject(false)).toBeFalsy();
        });
        test('isObject with a number return false', () => {
            expect(isObject(123)).toBeFalsy();
        });
        test('isObject with a string return false', () => {
            expect(isObject('abc')).toBeFalsy();
        });
        test('isObject with empty object, return true', () => {
            const obj = {};
            expect(isObject(obj)).toBeTruthy();
        });
        test('isObject with an object return true', () => {
            const obj = { id: 1 };
            expect(isObject(obj)).toBeTruthy();
        });
        test('isObject with empty array, return false', () => {
            const obj = [];
            expect(isObject(obj)).toBeFalsy();
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

        test('with an value and any strategy, return the value', () => {
            const date = new Date;
            expect(convert(false, camelCase)).toEqual(false);
            expect(convert(123, snakeCase)).toEqual(123);
            expect(convert('abc', pascalCase)).toEqual('abc');
            expect(convert(date, camelCase)).toEqual(date);
            expect(convert(null, snakeCase)).toEqual(null);
        });
        test('with a list of values and any startegy, return list of values', () => {
            const date = new Date;
            expect(convert([false, true], camelCase)).toEqual([false, true]);
            expect(convert([1, 2, 3], snakeCase)).toEqual([1, 2, 3]);
            expect(convert(['abc', '123'], pascalCase)).toEqual(['abc', '123']);
            expect(convert([date, date], camelCase)).toEqual([date, date]);
            expect(convert([null, null], camelCase)).toEqual([null, null]);
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
                    fullAddress: 'Fake street 123', city: 'LA', number: null,
                    extraInfo: null,
                    timeStamp: new Date,
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
                    full_address: 'Fake street 123', city: 'LA', number: null,
                    extra_info: null,
                    time_stamp: new Date,
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