Meteor.methods
	addLoginTokenFromURL: (userIdFromUrl) ->
		# user =  RocketChat.models.Users.findOneById(userIdFromUrl)
		
		# info = {
		# 	token: user.services.resume.loginTokens.slice(-1)[0].hashedToken,
		# 	userId: user._id
		# }

		stampedLoginToken = Accounts._generateStampedLoginToken()
		Accounts._insertLoginToken(userIdFromUrl, stampedLoginToken)

		info = {
			token: stampedLoginToken.token,
			userId: userIdFromUrl
		}

		return info