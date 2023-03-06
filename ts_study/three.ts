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
const filtered1 = [1,'2',3].filter(predicate);
const filtered2 = [1,'2',3].filter<string>((i) => typeof i === "string")
// T : string , S 를 string으로 설정 
//filter<string>{(value : string | number , index : number , array : string | number][]) => value is string , thisArg?: any): string[]}
// 커스텀 타입 가드 = 형식 조간자

//======================= type 만들기 =================

interface Arr<T> {
    forEach(callback : (item : T) => void) : void;
    map<U>(callback : (item : T) => U) : U[];
}

const x : Arr<number> = [1,2,3];
x.forEach((item) => {
    console.log(item);
});
x.map((item) => {
    console.log(item);
    return item * item;
});

const y : Arr<string> = ["jawon", "changhyun" , "jinson"];
y.forEach((item) => {
    console.log(item);
    const filtered = item.includes("j");
    if(filtered){
        console.log("filtered : " + filtered);
    }
});