var timer;
var observer;
var paused= false;
try {	
	const checkElement = async selector => {
		while (document.querySelector(selector) === null) {
			await new Promise(resolve => requestAnimationFrame(resolve))
		}
		return document.querySelector(selector);
	};

		window.addEventListener('load', function (e) {
		console.log("ready!");		
		if (document.readyState == 'complete') {			
			 observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					if (mutation.type == "attributes") {						
						if (mutation.target.getAttribute('data-purpose') == "pause-button") {
							var sec = localStorage.getItem("UdemyTimer");
							 timer = setInterval(function () {								
								if(paused == false && document.getElementsByClassName("progress-bar--play-progress--qERtx")[0].style.width !== "100%" &&
								 document.getElementsByClassName("udi-circle-loader").length == 0 && document.getElementsByClassName("error-display--modal--2WrSk").length == 0)
								{ localStorage.setItem("UdemyTimer", ++sec);}
								 chrome.runtime.sendMessage({type: "setCount",Val:localStorage.getItem("UdemyTimer") },function(count) {
									if (!window.chrome.runtime.lastError) {
										// do you work, that's it. No more unchecked error
									  
									console.log("start1......"); }
								  });
							}, 1000);						
						} else {							
							clearInterval(timer);
						}
					}
				});
			});

			checkElement('[data-purpose="video-controls"] button').then((selector) => {
				var element = document.querySelectorAll('[data-purpose="video-controls"] button')[0];

				if (element != undefined) {
					observer.observe(element, {
						attributes: true,
						attributeFilter: ['data-purpose'] //configure it to listen to attribute changes
					});
				}
			});

		}
	});
	chrome.runtime.onMessage.addListener(
		function(message, sender, sendResponse) {
			switch(message.type) {
				case "getCount":
					sendResponse(localStorage.getItem("UdemyTimer"));
					break;
					case "resetCount":
					clearInterval(timer);
					localStorage.setItem("UdemyTimer", 0);
					checkElement('[data-purpose="video-controls"] button').then((selector) => {
						var element = document.querySelectorAll('[data-purpose="video-controls"] button')[0];
		
						if (element != undefined &&element.getAttribute('data-purpose') == "pause-button") {
							var sec = localStorage.getItem("UdemyTimer");
							 timer = setInterval(function () {								
								if(paused == false && document.getElementsByClassName("progress-bar--play-progress--qERtx")[0].style.width !== "100%" &&
								 document.getElementsByClassName("udi-circle-loader").length == 0 && document.getElementsByClassName("error-display--modal--2WrSk").length == 0)
								{ localStorage.setItem("UdemyTimer", ++sec);}
								 chrome.runtime.sendMessage({type: "setCount",Val:localStorage.getItem("UdemyTimer") },function(count) {
									if (!window.chrome.runtime.lastError) {
										// do you work, that's it. No more unchecked error
									  
									console.log("start1......"); }
								  });
							}, 1000);			
						}
					});								
					sendResponse(localStorage.getItem("UdemyTimer"));
					break;
					case "pause":
					paused=message.check;
					localStorage.setItem("Paused", message.check)	
					sendResponse(localStorage.getItem("UdemyTimer"));				
					break;
					case "getPause":
					if(localStorage.getItem("Paused") == "true")	
					sendResponse(true);		
					else
					sendResponse(false);					
					break;
				default:
					console.error("Unrecognised message: ", message);
			}
		}
	);
}
catch
{

}
