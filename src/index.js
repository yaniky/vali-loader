import Test from "./assets/test.vali";
// import Test from "./assets/a";

const t = new Test();

const err = t.map({num: 123, label: "aaef131"});

console.log(t.get(true), err);