Template.livechatDepartments.helpers({
	"departments": () => {
		return LivechatDepartment.find();
	},
	"numAgents"() {
		if (Array.isArray(this.agents)) {
			return this.agents.length;
		}
	}
});

Template.livechatDepartments.events({
	"click button[name=newDepartment]": (event, instance) => {
		event.preventDefault();
		FlowRouter.go('livechat-department');
	},

	'click .remove-department' (e, instance) {
		e.preventDefault();
		e.stopPropagation();

		swal({
			title: t('Are_you_sure'),
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: t('Yes'),
			cancelButtonText: t('Cancel'),
			closeOnConfirm: false,
			html: false
		}, () => {
			Meteor.call('livechat:removeDepartment', this._id, function(error, result) {
				if (error) {
					return toastr.error(t(error.reason || error.error));
				}
				swal({
					title: t('Removed'),
					text: t('Department_removed'),
					type: 'success',
					timer: 1000,
					showConfirmButton: false,
				});
			});
		});
	},

	'click .department-info' (e, instance) {
		e.preventDefault();
		FlowRouter.go('livechat-department', { _id: this._id });
	}
});

Template.livechatDepartments.onCreated(function() {
	this.subscribe('livechat:departments');
});
