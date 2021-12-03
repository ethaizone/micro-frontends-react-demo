

console.log('It should print one time only.')

let memory = 0


export default () => {
  memory++

  console.log(`${memory} - it should print multiple time`)
}
