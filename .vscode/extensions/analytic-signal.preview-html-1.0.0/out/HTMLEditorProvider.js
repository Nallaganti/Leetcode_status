"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLEditorProvider = void 0;
const vscode = require("vscode");
class HTMLEditorProvider {
    constructor(context) {
        this.context = context;
        this.emptyPngDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42gEFAPr/AP///wAI/AL+Sr4t6gAAAABJRU5ErkJggg==';
        this.webviewEditor = {};
        this.document = {};
        this.resource = {};
        this.extensionRoot = context.extensionUri;
    }
    static register(context) {
        //
        // get configuration settings:
        //
        let retainContextWhenHidden = vscode.workspace.getConfiguration("preview-html").get("retainContextWhenHidden");
        let options = {
            WebviewPanelOptions: {
                retainContextWhenHidden: retainContextWhenHidden
            },
            supportsMultipleEditorsPerDocument: true
        };
        const provider = new HTMLEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(HTMLEditorProvider.viewType, provider, options);
        return providerRegistration;
    }
    //
    // called on custom editor opened:
    //
    resolveCustomTextEditor(document, webviewEditor, _token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.webviewEditor = webviewEditor;
            this.document = document;
            this.resource = document.uri;
            //
            // get settings configuration:
            //
            let enableScripts = vscode.workspace.getConfiguration("preview-html").get("enableScripts");
            if (enableScripts) {
                //
                // setup initial content for the webview:
                //
                webviewEditor.webview.options = {
                    enableScripts: enableScripts,
                };
            }
            this.render();
            //	
            // hook up event handlers so that we can synchronize the webview with the text document:
            //
            // 1. wiring to update webview on document change:
            //
            // const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            // 	if (e.document.uri.toString() === document.uri.toString()) {
            // 		webviewEditor.webview.html = this.getWebviewContentFromDocument(webviewEditor.webview, document);
            // 	}
            // });
            let updateOnSaveDocument = vscode.workspace.getConfiguration("preview-html").get("updateOnSaveDocument");
            if (updateOnSaveDocument) {
                //
                // 1. wiring to update webview on document save:
                //
                const saveDocumentSubscription = vscode.workspace.onDidSaveTextDocument(e => {
                    if (e.uri.toString() === document.uri.toString()) {
                        this.render();
                    }
                });
                // 
                // 2. wiring to dispose of the listener when editor is closed:
                //
                webviewEditor.onDidDispose(() => {
                    saveDocumentSubscription.dispose();
                });
            }
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            this.webviewEditor.webview.html = yield this.getWebviewContents();
        });
    }
    getWebviewContents() {
        return __awaiter(this, void 0, void 0, function* () {
            function style() {
                let result = "border:none;width:100%;height:100%";
                let fitPreviewInWindow = vscode.workspace.getConfiguration("preview-html").get("fitPreviewInWindow");
                let fitPreviewHeight = vscode.workspace.getConfiguration("preview-html").get("fitPreviewHeight");
                if (fitPreviewInWindow === false) {
                    result = "border:none;width:100%;height:" + fitPreviewHeight + "px";
                }
                return result;
            }
            const version = Date.now().toString();
            const settings = {
                src: yield this.getResourcePath(this.webviewEditor, this.resource, version),
                style: style()
            };
            const cspSource = this.webviewEditor.webview.cspSource;
            const nonce = Date.now().toString();
            return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<!-- Disable pinch zooming -->
			<meta name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
			<title>HTML Preview</title>
			<link rel="stylesheet" href="${escapeAttribute(this.extensionResource('/media/main.css'))}" type="text/css" media="screen" nonce="${nonce}">
			<!--<meta http-equiv="Content-Security-Policy" content="default-src 'none'; connect-src 'self' ${cspSource}; img-src data: ${cspSource}; frame-src 'unsafe-inline' 'unsafe-eval'; script-src 'unsafe-inline' 'unsafe-eval'; script-src-elem 'unsafe-inline' 'unsafe-eval' ${cspSource}; style-src 'unsafe-inline' ${cspSource};">-->
			<meta id="preview-html-settings" data-settings="${escapeAttribute(JSON.stringify(settings))}">
		</head>
		<body class="container image scale-to-fit loading">
			<div class="loading-indicator"></div>
			<div class="image-load-error">
				<p>An error occurred while loading the file.</p>
				<a href="#" class="open-file-link">Open file using VS Code's standard text/binary editor?</a>
			</div>
			<script src="${escapeAttribute(this.extensionResource('/media/main.js'))}"></script>
		</body>
		</html>`;
        });
    }
    getResourcePath(webviewEditor, resource, version) {
        return __awaiter(this, void 0, void 0, function* () {
            if (resource.scheme === 'git') {
                const stat = yield vscode.workspace.fs.stat(resource);
                if (stat.size === 0) {
                    return this.emptyPngDataUri;
                }
            }
            // Avoid adding cache busting if there is already a query string
            if (resource.query) {
                return webviewEditor.webview.asWebviewUri(resource).toString();
            }
            return webviewEditor.webview.asWebviewUri(resource).with({ query: `version=${version}` }).toString();
        });
    }
    extensionResource(path) {
        return this.webviewEditor.webview.asWebviewUri(this.extensionRoot.with({
            path: this.extensionRoot.path + path
        }));
    }
}
exports.HTMLEditorProvider = HTMLEditorProvider;
HTMLEditorProvider.viewType = 'analyticsignal.preview-html';
function escapeAttribute(value) {
    return value.toString().replace(/"/g, '&quot;');
}
function btoa(arg0) {
    return Buffer.from(arg0, 'base64');
}
//# sourceMappingURL=HTMLEditorProvider.js.map