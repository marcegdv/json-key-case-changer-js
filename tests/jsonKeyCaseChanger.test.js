import { convert, isObject } from "../src/jsonKeyCaseChanger";
import { camelCase, snakeCase, pascalCase } from "change-case";

const newDate = new Date;

describe('jsonKeyCase functions test:', () => {

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
        test('isObject with a Date return false', () => {
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
            expect(convert(false, camelCase)).toEqual(false);
            expect(convert(123, snakeCase)).toEqual(123);
            expect(convert('abc', pascalCase)).toEqual('abc');
            expect(convert(newDate, camelCase)).toEqual(newDate);
            expect(convert(null, snakeCase)).toEqual(null);
        });
        test('with a list of values and any startegy, return list of values', () => {
            expect(convert([false, true], camelCase)).toEqual([false, true]);
            expect(convert([1, 2, 3], snakeCase)).toEqual([1, 2, 3]);
            expect(convert(['abc', '123'], pascalCase)).toEqual(['abc', '123']);
            expect(convert([newDate, newDate], camelCase)).toEqual([newDate, newDate]);
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
                    timeStamp: newDate,
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
                    time_stamp: newDate,
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