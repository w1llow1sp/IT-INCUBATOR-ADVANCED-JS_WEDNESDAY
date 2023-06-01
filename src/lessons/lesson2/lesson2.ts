console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9
function sum(a:number){
    return function (b:number) {
        return a+b
    }
}
sum(3)(6)

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3

function makeCounter() {
    let count = 0;

    return function() {
        return ++count;
    };
}

const counter = makeCounter();
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2

const counter2 = makeCounter();
console.log(counter2()); // Output: 1
console.log(counter()); // Output: 3

// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;
function makeRefactorCounter(startValue:number) {
    let count = startValue || 0;

    return {
        increase: function() {
            return ++count;
        },
        decrease: function() {
            return --count;
        },
        reset: function() {
            count = 0;
            return count;
        },
        set: function(value:number) {
            count = value;
            return count;
        }
    };
}

const RewriteCounter = makeRefactorCounter(5);
console.log(RewriteCounter.increase()); // Output: 6
console.log(RewriteCounter.increase()); // Output: 7
console.log(RewriteCounter.decrease()); // Output: 6
console.log(RewriteCounter.reset());    // Output: 0
console.log(RewriteCounter.set(10));    // Output: 10
console.log(RewriteCounter.increase()); // Output: 11

// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10
// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore

//ts-ignore
function superSum(num: number): number | ((x: number) => ReturnType<typeof innerSum>) {
    if (num <= 0) {
        return 0;
    } else if (num === 1) {
        return function(x: number): number {
            return x;
        };
    }

    let sum = 0;
    let count = 0;

    function innerSum(x: number): number | ((x: number) => ReturnType<typeof innerSum>) {
        sum += x;
        count++;

        if (count === num) {
            return sum;
        } else {
            return innerSum;
        }
    }

    return innerSum;
}



// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion


//1.Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
//Решение с помощью цикла:
function sumTo(n:number) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
//Решение через рекурсию:
function sumTo1(n:number) {
    if (n == 1) return 1;
    return n + sumTo(n - 1);
}
//Решение по формуле: sumTo(n) = n*(n+1)/2:
function sumTo2(n:number) {
    return n * (n + 1) / 2;
}
//2.Вычислить факториал
function factorial(n: number): number {
    return n ? n * factorial(n - 1) : 1;
}
//3.Числа Фибоначчи
function fib(n:number):number {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}
//4.Вывод односвязного списка
type ListNode = {
    value: number;
    next: ListNode | null;
};

let list: ListNode = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null,
            },
        },
    },
};

function printList(list: ListNode) {
    alert(list.value); // выводим текущий элемент

    if (list.next) {
        printList(list.next); // делаем то же самое для остальной части списка
    }
}

// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину.
function deepFlat<T>(arr: (T | T[])[]): T[] {
    let flattened: T[] = [];

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            flattened = flattened.concat(deepFlat(arr[i] as (T | T[])[])); // Рекурсивный вызов для вложенных массивов
        } else {
            flattened.push(arr[i] as T);
        }
    }

    return flattened;
}

// Пример использования:

// just a plug
export default () => {};