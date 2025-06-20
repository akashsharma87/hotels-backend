const jsonString ='{"name":"john", "age":30, "city":"New York"}';
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name); 

const objectToString = {
    name:"Alice",
    age:25
}
const json = JSON.stringify(objectToString);
console.log(json)
