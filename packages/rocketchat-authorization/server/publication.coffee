Meteor.publish 'permissions', ->
	console.log '[publish] permissions thienhv'.green
	return RocketChat.models.Permissions.find {}
