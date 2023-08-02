"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const html_format_1 = require("html-format");
class HTMLDocumentFormatter {
    provideDocumentFormattingEdits(document) {
        let tabSize = 4;
        let insertSpaces = true;
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            tabSize = editor.options.tabSize;
            insertSpaces = editor.options.insertSpaces;
        }
        const indent = insertSpaces ? ' '.repeat(tabSize) : '\t';
        const lang = document.languageId, uri = document.uri;
        const langConfig = vscode.workspace.getConfiguration(`[${lang}]`, uri);
        const config = vscode.workspace.getConfiguration('editor', uri);
        const width = langConfig['editor.wordWrapColumn'] ||
            config.get('wordWrapColumn', 80);
        const text = document.getText();
        const range = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
        return Promise.resolve([
            new vscode.TextEdit(range, html_format_1.default(text, indent, width))
        ]);
    }
}
function activate(context) {
    const formatter = new HTMLDocumentFormatter();
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('html', formatter));
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('handlebars', formatter));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map