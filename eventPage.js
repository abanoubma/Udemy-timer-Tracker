
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  
  if (request.todo == "showPageAction")
    {
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);

        });
    }
});


var newCounter=1;var newCounter1=1;
chrome.tabs.onCreated.addListener(function (tab) {

 
	  tabID=tab.id;
      chrome.tabs.update(tab.id, {url:chrome.runtime.getURL("popup.html")});
	  
	 if( localStorage.getItem('openedCounter'))
		 newCounter=parseInt(localStorage.getItem('openedCounter'))+1
	 
	 localStorage.setItem("openedCounter", newCounter)
  chrome.storage.sync.get('openedCounter1', function(counter){
		
		if(counter.openedCounter){
			 newCounter1 +=parseInt( counter.openedCounter1);
		 }
		
		 chrome.storage.sync.set({'openedCounter1':newCounter1});
		
	})
   
});

