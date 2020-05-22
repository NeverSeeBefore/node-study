setTimeout(() => {
  console.log(1)
})

process.nextTick(() => {
  console.log(2)

  process.nextTick(() => {
    console.log(6)
  })
})

console.log(3)

Promise.resolve().then(() =>{
  console.log(4);
  Promise.resolve().then(() => {
    console.log(5);
  })
})

// 3 - 2 - 6 - 4 - 5 - 1


// 1. 同步代码
// 2. process.nextTick()
// 3. Promise
// 1. timer
// 2. poll
// 3. checked