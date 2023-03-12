//===================== Utility type =====================

// Utility type : 기존 타입을 조합하여 새로운 타입을 만들어내는 타입 TS 에서 미리 만들어논 타입이다.

// partial :  모든 속성을 optional로 만들어준다

interface Profile{
    name : string;
    age : number;
    gender : "male" | "female";
}

type P<T> = {
    [key in keyof T] ?: T[key]; 
}

const personA : Profile = {
    name : "A",
    age : 22,
    gender : "male"
}

const personB : Partial<Profile> = {
    name : "B",
    age : 25
}

const personC : P<Profile> = {
    name : "C",
    age : 28,
}

// pick : 특정 속성만 선택해서 새로운 타입을 만들어준다 Pick<타입 , 뽑아낼 속성>

type i<T> = {
    [U in keyof T] : T[U];
}

const personD : Pick<Profile, "name" | "age"> = {
    name : "D",
    age : 30
}

// exclude : 특정 속성을 제외한 타입을 만들어준다 Exclude<타입 , 제외할 속성>

type Animal = "Dog" | "Cat" | "Human" // 객체가 아닌 타입
type An = Exclude<Animal , "Human">
const animal : An = "Dog";

type E<T, S> = Exclude<keyof T , S extends keyof T ? never : S>

// extract : 특정 속성만 추출해서 새로운 타입을 만들어준다 Extract<타입 , 추출할 속성>

type notHuman = Extract<Animal , 'Cat' | 'Dog'>;
const moew : notHuman = "Cat";

//omit : 특정 속성을 제외한 타입을 만들어준다 Omit<타입 , 제외할 속성>
type O<T, S extends keyof T> = Pick<T, Exclude<keyof T , S>>

const newPersonA : O<Profile , 'gender'> = {
    name : "A",
    age : 22,
}

// Required : 모든 속성을 필수로 만들어준다 Required<타입>

interface Profile2{
    name? : string;
    age? : number;
    gender? : "male" | "female"
}

type R<T> = {
    [key in keyof T] -? : T[key];
}
// - 연산자 : optional ? 속성을 제거해준다


// Readonly : 모든 속성을 readonly로 만들어준다 Readonly<타입>

interface Profile3{
    name ?: string;
    age ?: number;
    gender ?: "male" | "female"
}

type RO<T> = {
    +readonly [key in keyof T] : T[key];
}

type R2<T> = { // 연산자를 사용해 readonly , required 를 동시에 사용할 수 있다.
    +readonly [key in keyof T] -? : T[key];
}

// Record : 객체 타입을 만들어준다 Record<key 타입 , value 타입>

type Re<T extends keyof any ,S> = {[ key in T ] : S};  

// NonNullable : null , undefined를 제외한 타입을 만들어준다 NonNullable<타입>

type N<T> = T extends null | undefined ? never : T;

type N1 = "string" | null | undefined;

type N2 = N<N1>

const B : N2 = "string";

// class - 생성자(constructor) 와 인스턴스(instance)의 타입을 가져올 수 있다.

class Person {
    private name : string = "jawon";
    age : number;
    married : boolean;
    constructor(name : string, age : number , married : boolean){
        this.name = name;
        this.age = age;
        this.married = married;
    }
}

// abstract new (...args : any) => any : class타입
// infer = ts가 추론하는 타입
type ContructorP<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never; // 생성자의 타입을 가져온다. 
type InstanceP<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer I ? I : never; // 인스턴스의 타입을 가져온다. 

type P1 = ConstructorParameters<typeof Person>; // 생성자의 타입을 가져온다.
type P2 = InstanceType<typeof Person>; // 인스턴스의 타입을 가져온다.

// function - 매개변수(parameter)와 반환값(return)의 타입을 가져올 수 있다.

function add(a : number , b : number) : number {
    return a + b;
}


// infer P : 매개변수의 타입을 추론해준다. 추론 값이 있으면 P에 넣어준다.
type ParametersF<T extends (...args : any) => any> = T extends (...args : infer P) => any ? P : never; // 매개변수의 타입을 가져온다.
type ReturnF<T extends (...args : any) => any > = T extends (...args : any) => infer R ? R : never; // 반환값의 타입을 가져온다.


type F1 = Parameters<typeof add>; // 매개변수의 타입을 가져온다.
type F2 = ReturnType<typeof add>; // 반환값의 타입을 가져온다.


const F : F2 = 3;

// 