"use strict";
class Person {
    constructor(person) {
        return person;
    }
}
class Employee extends Person {
    constructor(props) {
        super(props);
        // public token:
        this.id = Employee.name;
        this.getToken = () => {
            return "token";
        };
        // console.log("value:", this.getToken())
    }
    _myPrivateFunction() {
    }
}
const emp = new Employee({ name: "danny" });
const nameofFactory = () => (name) => name;
const nameof = nameofFactory();
// console.log(nameof("firstname"));
const Greetings = {
    "HelloWorld": () => { console.log("Hello World!"); },
    "OtherMessage": () => { console.log("OtherMessage"); },
    sass: () => { return 10; }
};
const logicaloperators = ["!", "or", "and"];
const array = [
    { field: "age", operator: ">", value: "10" },
    "and",
    { field: "age", operator: "<", value: "20" },
    "or",
    [
        { field: "gender", operator: "=", value: "male" },
        "and",
        { field: "lastname", operator: "=", value: "" },
        "or",
        [
            { field: "gender", operator: "=", value: "male" },
            "and",
            { field: "lastname", operator: "=", value: "" },
        ]
    ]
];
const isLogicalOperator = (x) => logicaloperators.includes(x);
const isObjectArray = (value) => Object.prototype.toString.call(value) === "[object Array]";
const newArray = [];
array.forEach(value => {
    newArray.push(processFilterExpression(value));
});
console.log("output", newArray);
console.log("output2", newArray[4]);
function processFilterExpression(expression) {
    if (typeof expression === "object") {
        if (!isObjectArray(expression)) {
            const val = expression;
            return [val.field, val.operator, val.value];
        }
        else {
            const dt = expression;
            const newArray = [];
            dt.forEach(val => {
                newArray.push(processFilterExpression(val));
            });
            return newArray;
        }
    }
    else if (isLogicalOperator(expression)) {
        return expression;
    }
}
/* output = [
    ["age", ">", "10"],
    "and",
    ["age", "<", "20"],
    "or",
    [
        ["gender", "=", "male"]
    ]
] */
