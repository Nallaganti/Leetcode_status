"use strict";

//
// script run within the webview itself:
//
(function () {
	//
	// render the document in the webview:
	//
	function updateWebviewContent(webviewUri) {
		// const msg = document.createElement('body')
		// msg.innerText = webviewUri;
		// document.body = msg;

		const contentContainer = document.getElementById('preview-html');
		if (contentContainer) {
			//src = contentContainer.getAttribute("src");
			return;
		} 
		throw new Error('Could not find preview content.')
	}

    window.addEventListener('load', function () {
        //
        // handle messages sent from the extension to the webview:
        //
	    window.addEventListener('message', event => {
		    const message = event.data;
		    switch (message.type) {
			    case 'update':
				    const webviewUri = message.text;
				    updateWebviewContent(webviewUri);
				    return;
		    }
        });
	},{ once:true });
	
	window.onerror = function () {
		const msg = document.createElement('body');
		msg.innerText = 'An error occurred reading the HTML file. Please try again.';
		document.body = msg;
	}
}());