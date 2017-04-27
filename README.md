# Pubby Subby

Pubby subby is an implementation of the JavaScript `pub/sub` model.

But what is Pub/Sub?

Pub/Sub (short for `publish / subscribe`) is a model which is really useful for modular JavaScript, which implies the division of the code into smaller units, or modules, which makes everything more manageable.

It consists in the creation of a global object which keeps track of a list of "events" (or topics, as pubby-subby calls them) and "handlers" (or actions, as pubby-subby calls them), and lets other parts of the app "subscribe" and "unsubscribe" from them. This particoular implementation has a really simple API, whith few, sufficient and easy-to-use features.

# Getting started

First of all, you'll want to create an instance of the `pubby-subby` class:

```javascript
import PubSub from 'pubby-subby'

let pubsub = new PubSub()
```

At this point, we can start listening for events:

```javascript
function doStuff() {
	console.log('I did stuff')
}

pubsub.register('doStuff', doStuff)
```

And trigger them, too:

```javascript
pubsub.dispatch('doStoff') // => 'I did stuff!'
```

We can register multiple actions at a time:

```javascript
function doMoreStuff() {
	console.log('I did more stuff!')
}

pubsub.register('doStuff', doMoreStuff)

pubsub.dispatch('doStuff') // => 'I did stuff!', 'I did more stuff'
```

When we no longer want to call an action when an event is dispatched:

```javascript
pubsub.unregister('doStuff', doMoreStuff)
```

And we can also delete an entire topic:

```javascript
pubsub.deleteTopic('doStuff')
```