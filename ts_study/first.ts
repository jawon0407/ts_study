//=============== 타입스크립트의 기본 타입 선언 ===============

const a = "Hello World";
const b : number = 123;
const c : boolean = true;
const d : null = null;
const e : undefined = undefined;

const f : {} = "string";

function add(a: number, b: number): number {
    return a + b;
}

const result1 = add(1 , 2);

/*
function add(a: number(매개변수의 타입 지정), b: number(매개변수의 타입 지정)): number(리턴값에 대한 타입을 지정) {
     return a + b;
}

function add(a: number, b: number) :number //함수 타입 지정 
function add(a,b){
    return a + b;
}
*/ 

const minus : (a : number , b : number) => number = (a, b) => a + b;
/*
    type 방식

    type Minus = (a : number(매개변수의 타입 지정) , b : number(매개변수의 타입 지정)) => number(리턴값에 대한 타입을 지정);
    const minus : Minus = (a, b) => a + b;

    interface 방식

    interface Minus {
        (a : number(매개변수의 타입 지정) , b : number(매개변수의 타입 지정)) : number(리턴값에 대한 타입을 지정);
    }
    const minus : Minus = (a, b) => a + b;
*/

const arr : number[] = [1, 2, 3]; // 숫자만을 담는 배열
const arr2 : Array<number> = [1, 2, 3]; // Generic 방식
const arr3 : string[] = ["a", "b", "c"]; // 문자열만을 담는 배열
const arr4 : [string, number] = ["a", 1]; // 튜플 : 배열의 인덱스에 타입을 지정 길이가 고정되어 있음
const obj : {a : string, b : number} = { a : "Hello World", b : 123 }; // 객체의 타입 지정


//================= 함수의 오버로딩 =================

function ex1( a : number , b : number ) : number;
function ex1( a : string , b : string ) : string;
function ex1( a : number | string , b : number | string ) : number | string | never{
        return a as never + b as never;
}

ex1(1, 2);
