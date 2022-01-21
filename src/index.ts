class Person {
    constructor(person: { name: string, age: number }){
        return person;
    }
}

class Employee extends Person {
    // public token:
    public id: string = Employee.name;
    constructor(props?: any){
        super(props)
        
        // console.log("value:", this.getToken())
    }

    getToken = (): string => {
        return "token";
    }

    private _myPrivateFunction(): void {

    }
}


const emp = new Employee({name: "danny"});
interface IObj {
    firstname: string;
    lastname: string;
    code: string;
}

const nameofFactory = <T>() => (name: keyof T) => name;
const nameof = nameofFactory<IObj>();
// console.log(nameof("firstname"));


const Greetings: Record<string, () => void > = {
    "HelloWorld": () => { console.log("Hello World!") },
    "OtherMessage": () => { console.log("OtherMessage") },
    sass: () => { return 10 }
}

// console.log("class name", (new Employee().id));

interface IPerson {
    id: number;
    firstname: string;
    lastname: string;
    age: number;
    address: string;
    gender: "Male" | "Female";
}

type SearchOperators = "=" | ">=" | "<=" | ">" | "<";

type FilterProperties<T> = {
    field: keyof T;
    operator: SearchOperators;
    value: any;
}

const logicalOperators = ["!", "or", "and"] as const;
type LogicalOperators = (typeof logicalOperators)[number];

type CustomExpression = FilterProperties<IPerson> | LogicalOperators | CustomExpression[];

const rawExpressions: CustomExpression[] = [
    { field: "age", operator: ">", value: "10" },
    "and",
    { field: "age", operator: "<", value: "20" },
    "or",
    [
        { field: "gender", operator: "=", value: "male" },
        "!",
        { field: "lastname", operator: "=", value: "" },
        "or",
        [
            { field: "gender", operator: "=", value: "male" },
            "and",
            { field: "lastname", operator: "=", value: "" },
        ]
    ]
];

const isLogicalOperator = (x: any): x is LogicalOperators => logicalOperators.includes(x);
const isObjectArray = (value: unknown): boolean => Object.prototype.toString.call(value) === "[object Array]";

const processedExpressions: any[] = [];
rawExpressions.forEach(expression => {
    processedExpressions.push(processFilterExpression(expression));
});

console.log("output", processedExpressions)
console.log("output2", processedExpressions[4])

function processFilterExpression(expression: CustomExpression){
    if(typeof expression === "object")
    {
        if(!isObjectArray(expression))
        {
            const filterObject = expression as FilterProperties<IPerson>;
            return [filterObject.field, filterObject.operator, filterObject.value];
        } else {
            const rawExpressions = expression as CustomExpression[]
            const processedExpressions: any[] = []
            rawExpressions.forEach(expression => {
                processedExpressions.push(processFilterExpression(expression));
            });

            return processedExpressions;
        }
    } else if (isLogicalOperator(expression)) {
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

