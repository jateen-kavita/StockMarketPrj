let arr = [[1,2],[3,4],[5,6],7,8,9];
let result = [];

for (let i = 0; i < arr.length; i++) {
    result.push(...(arr[i])); 
}

console.log(result);


