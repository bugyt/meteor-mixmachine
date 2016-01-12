Meteor.startup(function() {
	var musicMachine = MusicMachine.findOne();
	if (!musicMachine) {
		MusicMachine.insert({
							slide: 50
						});
	}
});