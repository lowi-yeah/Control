function PreferencesManager() {
	var that = {
		preferences : {},
		
		init : function() {
            if(typeof localStorage.preferences == "undefined") {
				this.preferences = {
					autolock: false,
					oscReceivePort: 8080, 
				}
                localStorage.preferences = JSON.stringify(this.preferences);
            }else{
                this.preferences = jQuery.parseJSON(localStorage.preferences);
				console.log(this.preferences);
            }
			
			var autolockToggleLink = document.getElementById("autolockToggle");
			(!this.preferences.autolock) ? autolockToggleLink.innerHTML = "Turn Autolock <b>Off</b>" : autolockToggleLink.innerHTML = "Turn Autolock <b>On</b>";
            control.device.setAutolock(this.preferences.autolock);

			control.oscManager.setReceivePort(this.preferences.oscReceivePort);
			$('#portField').val(this.preferences.oscReceivePort); 
		},
    
		autolockToggle : function() {
			var autolockToggleLink = document.getElementById("autolockToggle");
			this.preferences.autolock = !this.preferences.autolock;
			(!this.preferences.autolock) ? autolockToggleLink.innerHTML = "Turn Autolock <b>Off</b>" : autolockToggleLink.innerHTML = "Turn Autolock <b>On</b>";
			
            control.device.setAutolock(this.preferences.autolock);
			localStorage.preferences = JSON.stringify(this.preferences);
		},
	
		changePort : function(newPort) {
			this.preferences.oscReceivePort = parseInt(newPort);
			control.oscManager.setReceivePort(this.preferences.oscReceivePort);
			localStorage.preferences = JSON.stringify(this.preferences);
		},
	}
	return that;
}