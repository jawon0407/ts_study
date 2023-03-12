//=========union type =============

function add(a : number | string , b : number | string) : number | string {
    return a + b; // ts에서는 모든 경우를 생각하는데 이때 return 값의 타입을 string으로 지정된 경우 number + string의 경우에는 에러가 발생한다
}

const result = add(1, 2);
const result2 = add("1", "2");
const result3 = add(1, "2");

type A = { a : "jawon" } | { b : "dnjs" };
const A_ex : A = { a : "jawon" };
const A_ex2 : A = { b : "dnjs" };
const A_ex3 : A = { a : "jawon" , b : "dnjs" };

//=========intersection type =============

type B = { a : "jawon" } & { b : "dnjs" };
const B_ex : B = { a : "jawon" , b : "dnjs" };

//================== type guard =================

// 타입 가드는 특정 타입으로 타입을 좁혀나가는 과정을 말한다
// typeof , Array.isArray() , instanceof , in , custom function

function typeGuard(arg : number | number[]){
    if(Array.isArray(arg)){ // 배열인지 확인하는 방법
        return arg.map((item) => console.log(item));
    }else{ // 자동으로 타입이 number로 추론된다
        return arg + 1;
    }
}

typeGuard([1,2,3]); 
typeGuard(1);

class C {
    c = "c";
}

class D {
    d = "d";
}

function cOrD(param : C | D) {
    if(param instanceof C) { // 클래스인 경우 instanceof를 사용하여 어떤 클래스의 인스턴스인지 확인할 수 있다
        console.log(param.c);
    } else {
        console.log(param.d);
    }
}

cOrD(new C()); // 클래스의 타입을 넣어줄땐 생성자 함수로 인스턴스를 만들어서 넣어줘야한다
cOrD(new D()); // 클래스의 타입을 넣어줄땐 생성자 함수로 인스턴스를 만들어서 넣어줘야한다

type Ex = {type : "a" , ex1 : string};
type Ex2 = {type : "b" , ex2 : number};
type Ex3 = {type : "c" , ex3 : boolean};

function ex(param : Ex | Ex2 | Ex3) { // param의 타입이 Ex | Ex2 | Ex3 중 하나이기 때문에 param.type을 사용해서 각각의 타입을 구분할 수 있다
    if(param.type === "a") { 
        console.log(param);
    } else if(param.type === "b") {
        console.log(param);
    } else if(param.type === "c") {
        console.log(param);
    }

    if("ex1" in param) { // in을 사용하여 객체의 속성을 확인할 수 있다
        console.log(param);
    } else if("ex2" in param) {
        console.log(param);
    } else if("ex3" in param) {
        console.log(param);
    }

    switch(param.type) {
        case "a" :
            console.log(param);
            break;
        case "b" :
            console.log(param);
            break;
        case "c" :
            console.log(param);
            break;

    }
}

const Rpg = {type : "Rpg" , growUp(){}}; // 객체를 생성할 땐 type 속성을 추가해주는게 좋다( = 라벨을 붙여준다)
const Fps = {type : "Fps" , shoot(){}}; // 객체를 생성할 땐 type 속성을 추가해주는게 좋다( = 라벨을 붙여준다)
const Aos = {type : "Aos" , roleSelect(){}}; // 객체를 생성할 땐 type 속성을 추가해주는게 좋다( = 라벨을 붙여준다)

function gameSelect(param){
    if(param.type === "Rpg"){
        param.growUp();
    }else if(param.type === "Fps"){
        param.shoot();
    }else if(param.type === "Aos"){
        param.roleSelect();
    }

    if("growUp" in param){ // in을 사용하여 객체의 속성을 확인할 수 있다
        param.growUp();
    }else if("shoot" in param){
        param.shoot();
    }else if("roleSelect" in param){
        param.roleSelect();
    }
}

gameSelect(Rpg);
gameSelect(Fps);
gameSelect(Aos);

interface Cat {
    name : string
    meow : () => {};
}

interface Dog {
    name : string
    bow : () => {};
}

function catOrDog(param : Cat | Dog) : param is Dog{ // 매개변수의 타입 검사 커스텀 함수를 만들어서 사용할 수 있다
    // is 는 타입을 지정해주는 키워드
    if(param as Cat) {
        return false; 
    }
    return true;
}

function pet(kind : Cat | Dog) {
    if(catOrDog(kind)) { // 커스텀 함수를 사용하여 타입을 검사할 수 있다
        kind.bow();
    } 
    if("meow" in kind){
        kind.meow();
    }
}

//================== readOnly , index signature , mapped type ====================

//================== readOnly ====================

interface ReadOnly {
    readonly name : string;
    age : number;
}

const readOnly : ReadOnly = {
    name : "jawon",
    age : 25
}

readOnly.name = "dnjs"; // readonly로 지정된 속성은 값을 변경할 수 없다

//================== index signature ====================

interface IndexSignature {
    // 키의 타입을 number로 지정하고 값의 타입을 string으로 지정
    [key : number] : string;
}

const indexSignature : IndexSignature = {
    0 : "jawon",
    1 : "changhyun"
} 

//================== mapped type ====================

type gameType = "Rpg" | "Fps" | "Aos"; // union type is useable in type alias 

type MappedType = {
    [key in gameType] : gameType;
}

const mappedType : MappedType = {
    Rpg : "Rpg", // gameType의 값들을 키, 값으로 사용할 수 있다
    Fps : "Fps",
    Aos : "Aos"
}

//======================= class 선택적 property ===================

class example  {
    private a : string;
    protected b : number;
    c : boolean;
    constructor(a : string , b : number , c : boolean){
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getA(a , b , c){
        return console.log(a , b , c);
    }
    talk(){
        return this.a;
    };
}

class example2 extends example {
    getParams(){
        console.log(this.a , this.b , this.c)
    }
} 

new example("jawon" , 25 , true).a; // private 속성은 클래스 내부에서만 접근 가능
new example("jawon" , 25 , true).b; // protected 속성은 클래스 내부와 상속받은 클래스에서만 접근 가능
new example("jawon" , 25 , true).c; // public 속성은 클래스 내부, 상속받은 클래스, 인스턴스에서 접근 가능

/*
    private : 클래스 내부에서만 접근 가능
    protected : 클래스 내부와 상속받은 클래스에서만 접근 가능
    public : 클래스 내부, 상속받은 클래스, 인스턴스에서 접근 가능

                      private     protected     public
    클래스 내부            X           X             O   
    상속받은 클래스         X           O             O
    인스턴스 클래스         X           X             O
*/

// abstract class

abstract class AbstractClass {
    a: string;
    b: number;
    constructor(a: string, b: number) {
        this.a = a;
        this.b = b;
    }
    abstract getA(): void; // abstract method
    getB(): void{
        console.log(this.a , this.b);
    }
}

class AbstractClass2 extends AbstractClass {
    c = true;
    constructor(a: string, b: number , c ?: boolean) {
        super(a, b);
        if(typeof c === "boolean"){
            this.c = c;
        }else{
            this.c = true;
        }
    }
    getA() {
        console.log(this.a , this.b);
    }
}

//======================= generic ===============

function generic<T extends number>(a : T , b : T) : T { // extends 를 통해 T의 타입을 제한할 수 있다
    return a + b;
    // 위의 코드가 에러가 나는 이유 : 예로 들면 a,b 값을 1 or 2 로 넣으면 T 의 타입 자체는 1 or 2 가 되는데 1 + 2 는 3 이기 때문에 에러가 난다
}

generic(1,2);

function generic2<T extends {[key in string] : number}>(x : T) : T {
    return x;
}

generic2({a : 1});

// 제네릭 선언 위치 기억하기
function A<T>() {}
class B<T>() {}
interface C<T> {}
type D<T> = {};
const e = <T>() => {};

// 제네릭 기본값, extends
function add<T extends string>(x: T, y: T) { 
    return x + y 
}
add(1, 2);
add('1', '2')

// <T extends {...}> // 특정 객체
// <T extends any[]> // 모든 배열
// <T extends (...args: any) => any> // 모든 함수
// <T extends abstract new (...args: any) => any> // 생성자 타입
// <T extends keyof any> // string | number | symbol