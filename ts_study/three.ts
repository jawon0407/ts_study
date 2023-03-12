interface generic<T>{ // 타입스크립트에서는 콜백함수의 매개변수는 따로 적지 않아도 옵셔널이다
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
}
const foreachArr = [1,2,3].forEach((i) => console.log(i));
const mapArr = [1,2,3].map((i) => i * 2); 
// T : number  (i) => i*2 의 리턴값 : number = U 즉, mapArr 의 타입은 number[] 이다

const filterArr = [1,2,3,4,5,6].filter((i) => i > 3);
// T : number , S extends T : number 이기에 S : number 이다
const predicate = ((i) : i is string => typeof i === "string");
// i의 리턴값을 string
const filtered1 = [1,'2',3].filter(predicate);
const filtered2 = [1,'2',3].filter<string>((i) => typeof i === "string")
// T : string , S 를 string으로 설정 
//filter<string>{(value : string | number , index : number , array : string | number][]) => value is string , thisArg?: any): string[]}
// 커스텀 타입 가드 = 형식 조건자

//======================= type 만들기 =================

interface Arr<T> {
    forEach(callback : (item : T) => void) : void;
    map<U>(callback : (item : T) => U) : U[];
    filter<S extends T>(callback : (item : T) => item is S) : S[];
    // 1. const a = ( a :number , b :number ) : number => {}
    // 2. const a : (a : number , b : number ) => number => (a,b) => a+b;
    // 3. type A = (a : number , b : number ) => number;
    //    const a : A = (a,b) => a+b;
    // 1,2,3 모두 같은 타입이다  
    toString() : string;
}

const x : Arr<number | string> = [1,2,3]; 
x.forEach((item) => {
    console.log(item);
});
x.map((item) => {
    console.log(item);
    return 'item * 2';
});
x.filter((item) : item is number => item > 2);


const y : Arr<string> = ["jawon", "changhyun" , "jinson"];
y.forEach((item) => {
    const filtered = item.includes("j");
    return filtered;
});
y.filter((item) : item is string => item.includes("j"));
 
//======================== 공변성 과 반공변성 ====================

function aa(x : number | string) : number {
    return +x;
}

function bb(x:number) : number | string {
    return x;
}

let zz : typeof bb = aa;

//매개변수는 좁은 타입으로 받아들이고 리턴값은 넓은 타입일수록 대입가능