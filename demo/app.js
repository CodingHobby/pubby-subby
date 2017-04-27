import PubSub from '../src/pubsub'

const pubSub = new PubSub()

pubSub.register('add', add)
pubSub.register('sub', sub)

let count = 0

const el = document.createElement('p')

const addBtn = document.createElement('button')
addBtn.innerHTML = "add 1"

const subBtn = document.createElement('button')
subBtn.innerHTML = 'subtract 1'

document.body.appendChild(el)

document.body.appendChild(addBtn)
document.body.appendChild(subBtn)

addBtn.addEventListener('click', e => pubSub.dispatch('add'))
subBtn.addEventListener('click', e => pubSub.dispatch('sub'))

function add() {
	count++
	el.innerHTML = count
}

function sub() {
	count--
	el.innerHTML = count
}