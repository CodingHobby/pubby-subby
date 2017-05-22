import PubSub from '../src/pubsub'

const pubSub = new PubSub()


let count = 0

const el = document.createElement('p')

pubSub.register('add', payload => {
	count += payload.value
	el.innerHTML = count
})

const addBtn = document.createElement('button')
addBtn.innerHTML = "add 1"

const subBtn = document.createElement('button')
subBtn.innerHTML = 'subtract 1'

document.body.appendChild(el)

document.body.appendChild(addBtn)
document.body.appendChild(subBtn)

addBtn.addEventListener('click', e => pubSub.dispatch('add', { value: 1 }))
subBtn.addEventListener('click', e => pubSub.dispatch('add', { value: -1 }))