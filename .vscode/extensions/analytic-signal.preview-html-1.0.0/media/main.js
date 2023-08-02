/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// @ts-check
"use strict";

(function () {

	function getSettings() {
		const element = document.getElementById('preview-html-settings');
		if (element) {
			const data = element.getAttribute('data-settings');
			if (data) {
				return JSON.parse(data);
			}
		}

		throw new Error(`Could not load settings`);
	}

	function getIFrameContents(url) {
		var req = new XMLHttpRequest();
		req.open('GET', url);
		req.onload = function (e) {
			if (req.status == 200) {
				iframe.contentDocument.open();
				iframe.contentDocument.write(req.response);
				iframe.contentDocument.close();
			}
		};
		req.send();
	}

	const settings = getSettings();

	// State
	let hasLoadedContents = false;

	// Elements
	const container = document.body;
	const iframe = document.createElement('iframe');
	iframe.setAttribute('style',settings.style);
	container.append(iframe);

	hasLoadedContents = true;
	container.classList.remove('loading');
	container.classList.add('ready');
	container.append(iframe);

	iframe.addEventListener('load', () => {
		if (hasLoadedContents) {
			return;
		}
		hasLoadedContents = true;
		document.body.classList.remove('loading');
		document.body.classList.add('ready');
		//document.body.append(iframe);
	});

	iframe.addEventListener('error', e => {
		if (hasLoadedContents) {
			return;
		}
		hasLoadedContents = true;
		document.body.classList.add('error');
		document.body.classList.remove('loading');
	});

	getIFrameContents(settings.src);

/*  	document.querySelector('.open-file-link').addEventListener('click', () => {
		vscode.postMessage({
			type: 'reopen-as-text',
		});
	}); */
}());
