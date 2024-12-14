console.log("同步任务1");

setTimeout(() => {
  console.log("宏任务1");
}, 0);

Promise.resolve().then(() => {
  console.log("微任务1");
}).then(() => {
  console.log("微任务2");
});

console.log("同步任务2");

setTimeout(() => {
  console.log("宏任务2");
}, 0);