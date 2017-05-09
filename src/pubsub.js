export default class PubSub {
	/**
	 * Creates an instance of the PubSub class and initializes it with either the topics specified in the constructor or no topics
	 */
	constructor(topics={}) {
		this.topics = {}
	}

	/**
	 * register a topic for the pubSub instance
	 * 
	 * @param {String} topicName - the name of the event (or topic) to add
	 * @param {String} action - the handler (or action) for the added topic
	 * 
	 * @return {PubSub} - this
	 */
	add(topicName, action) {
		this.topics[topicName] = this.topics[topicName] || []
		this.topics[topicName].push(action)
		return this
	}


	/**
	 * register multiple topics or multiple actions
	 * 
	 * @param {String[] | String} topics - the list of topics / single topic to register 
	 * @param {function[] | function} actions - the list of actions / single action to register
	 */
	register(topics, actions) {
		if(topics instanceof Array && !actions instanceof Array) {
			topics.forEach(topic => this.add(topic, actions))
		} else if(!(topics instanceof Array) && (actions instanceof Array)) {
			actions.forEach(action => this.add(topics, action))
		} else if(!(topics instanceof Array) && !(actions instanceof Array)) {
			this.add(topics, actions)
		}	else {
		 	throw new Error("Either the topics or the actions can be expressed as an array, not both.")
		}

		return this
	}

	/**
	 * unregister a topic from the isntance
	 * 
	 * @param {String} topicName - the name of the topic to unregister
	 * @param {function} action - the function of the listener to remove
	 * 
	 * @return {PubSub} - this
	 */
	unregister(topicName, action) {
		let found = false
		if (this.topics[topicName]) {
			this.topics[topicName].forEach((res, i) => {
				if (res == action) {
					this.topics[topicName].splice(i, 1)
					found = true
					return this
				}
			})
			if(!found) {
				const msg = '"unregister" was called, but action\n' + action + '\nis not an action for the topic'
				throw new Error(msg)
			}
		} else {
			const msg = `"unregister" was called on topic "${topicName}", but "${topicName}" is not a registered topic`
			throw new Error(msg)
		}
	}


	/**
	 * dispatch an event
	 * 
	 * @param {String} topicName - the name of the event to dispatch
	 */
	dispatch(topicName, payload={}) {
		if (this.topics[topicName]) {
			let actions = this.topics[topicName]
			actions.forEach(action => action(payload))
		} else {
			const msg = `"dispatch" was called on "${topicName}", but "${topicName}" is not a registered topic`
		}
		return this
	}


	/**
	 * remove all actions for a topic
	 * 
	 * @param {String} topicName - the name of the topic to remoev
	 */
	deleteTopic(topicName) {
		if (this.topics[topicName]) {
			delete this.topics[topicName]
		} else {
			const msg = `"deleteTopic" was called on topic ${topicName}, but ${topicName} is not a registered topic`
			throw new Error(msg)
		}
	}
}