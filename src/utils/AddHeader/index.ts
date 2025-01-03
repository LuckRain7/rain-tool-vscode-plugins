import * as vscode from 'vscode';
import CONST from './const';

const baseHeaders = [
    'Love and Peace',
    'Description:',
    'Note:' //
];

const RainAddHeader = {
    command: 'rain-tool.addHeader',
    fn: () => {
        try {
            // 获取文件类型
            let languageId = vscode.window.activeTextEditor?.document.languageId;
            console.log(`🌧🌧🌧 [languageId]`, languageId);

            // 特殊的文件 通过文件后缀判断
            if (languageId === 'plaintext') {
                const fileName = vscode.window.activeTextEditor?.document.fileName;
                languageId = fileName?.split('.').pop();
            }

            // 给出错误提示
            if (!languageId || !(languageId in CONST)) {
                throw new Error('[RAIN] ❌ Unsupported language');
            }

            const config = CONST[languageId as keyof typeof CONST];

            const header = [
                config.firstLine, //
                ...baseHeaders.map(item => config.prefix + item),
                config.lastLine
            ].join('\n');

            // 获取当前编辑器
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                throw new Error('[RAIN] ❌ No active text editor');
            }

            const edit = new vscode.WorkspaceEdit();
            const firstLine = editor.document.lineAt(0);
            edit.insert(editor.document.uri, firstLine.range.start, header + '\n');

            vscode.workspace.applyEdit(edit).then(success => {
                if (success) {
                    // 帮用户保存文件
                    vscode.window.activeTextEditor?.document.save();
                } else {
                    vscode.window.showInformationMessage('[RAIN] ❌ add header failed!');
                }
            });
        } catch (error) {
            vscode.window.showInformationMessage(`[RAIN] ❌ ${error}`);
        }
    }
};

export default RainAddHeader;
