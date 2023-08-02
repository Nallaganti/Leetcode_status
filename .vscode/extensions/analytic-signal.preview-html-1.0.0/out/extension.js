"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const HTMLEditorProvider_1 = require("./HTMLEditorProvider");
function activate(context) {
    //
    // register custom editor provider:
    //
    context.subscriptions.push(HTMLEditorProvider_1.HTMLEditorProvider.register(context));
    //
    // register open custom editor command (not used):
    //
    context.subscriptions.push(vscode.commands.registerCommand("analyticsignal.preview-html-open", (uri) => {
        vscode.commands.executeCommand('vscode.open', uri, { preview: false });
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map