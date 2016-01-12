Template.playground.helpers({
	musicMachine: function() {
		var musicMachine;
		if (!Session.get("musicMachine")) {
			musicMachine = MusicMachine.findOne();
			if (musicMachine) {
				Session.set("musicMachine", musicMachine._id);
			}
		} else {
			musicMachine = MusicMachine.findOne({
				_id: Session.get("musicMachine")
			});
		}
		if (musicMachine) {
			if (musicMachine.start) {
				playAll();
			} else {
				stopAll();
			}
			if (musicMachine.drums) {
				console.log("drums on");
				playDrums();

			} else {
				console.log("drums off");
				stopDrums();
			}
			if (musicMachine.bassline) {
				playBass();

			} else {

				stopBass();

			}
			if (musicMachine.arp) {
				playArp();

			} else {
				stopArp();
			}

			return musicMachine;
		}
		return;
	},


	sliderVal1:  function() {
		var musicMachine = MusicMachine.findOne({
			_id: Session.get("musicMachine")
		});
		if (musicMachine) {
			Template.instance().$("#slider1").data("uiSlider").value(musicMachine.slide);
			setSpeed(musicMachine.slide / 50);
			return musicMachine.slide;
		}
	},

});


Template.playground.events({

	"click .btn-play": function(e, template) {
		var val = MusicMachine.findOne({
			_id: Session.get("musicMachine")
		});
		if (val) {
			console.log(val);
			MusicMachine.update({
				_id: val._id
			}, {
				$set: {
					start: !val.start
				}
			});
		}
	},

	"click .btn-drum": function(e, template) {
		var val = MusicMachine.findOne({
			_id: Session.get("musicMachine")
		});
		if (val) {
			console.log(val);
			MusicMachine.update({
				_id: val._id
			}, {
				$set: {
					drums: !val.drums
				}
			});
		}
	},

	"click .btn-bass": function(e, template) {
		var val = MusicMachine.findOne({
			_id: Session.get("musicMachine")
		});
		if (val) {
			console.log(val);
			MusicMachine.update({
				_id: val._id
			}, {
				$set: {
					bassline: !val.bassline
				}
			});
		}
	},

	"click .btn-arp": function(e, template) {
		var val = MusicMachine.findOne({
			_id: Session.get("musicMachine")
		});
		if (val) {
			console.log(val);
			MusicMachine.update({
				_id: val._id
			}, {
				$set: {
					arp: !val.arp
				}
			});
		}
	},

});

Template.playground.onRendered(function() {
	$("h2").hide();
	var handler = _.throttle(function(event, ui) {
		var val = MusicMachine.findOne({
			_id: Session.get("musicMachine")
		});
		if (val) {
			MusicMachine.update({
				_id: val._id
			}, {
				$set: {
					slide: ui.value
				}
			});
		}
	}, 50, {
		leading: false
	});

	if (!this.$("#slider1").data("uiSlider")) {
		$("#slider1").slider({
			slide: handler,
			min: 0,
			max: 100
		});
	}
});