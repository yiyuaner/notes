I am working on a translator from typescript to LLVM (the input is some bytecode format compiled from ts). The generated LLVM IR is for static analysis, not real execution. Thus, we can allow function stubs without real implementation in the generated LLVM IR. The type of static analysis that we intend to perform on the LLVM IR is pointer analysis, which boils down to the following basic statements:

(1) Field write: x.f = y
(2) Field load:  x = y.f
(3) Allocate memory object: x = NewObject()
(4) function call: x = foo(a1, ..., an)

Since these four basic statements could be mapped to LLVM IR, in the following discussion, when I directly write pseudo code using these four kinds of statements, they should be thought of as LLVM IR code. 

Problem:

I need to design a plan on how to translate the prototype-based class inheritance feature in typescript into the above four basic statements. The following is a concrete example and the translation that I intend to perform:

typescript code:

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`hello, I am ${this.name}`);
  }

  static sayhi() {
    console.log("hi")
  }
}

class Male extends Person {
  constructor(name, age) {
    super(name, age);
    this.sex = "M";
  }
}

p = new Person ("Alice", 20);
m = new Male("Peter", 23)

Example translation into LLVM:
==========================================================================
p = new Person ("Alice", 20)  ===> (compiles to)

%cls = NewObject()
%cls.sayhi = sayhi // static method

%proto = NewObject()
%proto.constructor = Person // function object
$proto.sayHello = sayHello 
%cls.prototype = %proto

%p = NewObject() // instance
%p.__proto__ = %cls.prototype
call %p.__proto__.constructor(%p, "Alice", 20)

==========================================================================
m = new Male("Peter", 23)  ===> 

%cls2 = NewObject()
%cls2.__proto__ == %cls // Male should inherit the static method sayhi from Person

%proto2 = NewObject()
%proto2.constructor = Male
%proto2.__proto__ = %cls.prototype
%cls2.prototype = %proto2

%p2 = NewObject() // instance
%p2.__proto__ = %cls2.prototype
call %p2.__proto__.constructor(%p2, "Peter", 23)

==========================================================================
The super() call inside the constructor of Male should compile to:

  constructor(name, age) {
    super(name, age);
    ...
  }

===>

  constructor(%this_pointer, name, age) {
    call %this_pointer.__proto__.__proto__.constructor(%this_pointer, name, age)
    ...

  }


Please check my understanding above and suggest if this scheme is correct? 

With this scheme, property write like "this.name = name;" from the ts code could be directly mapped to statement (1).
However, property accesses in type script like "x = this.field" or "this.sayHello()" need to walk up the prototype chain to actually find the property. How can I translate this process into LLVM? 

