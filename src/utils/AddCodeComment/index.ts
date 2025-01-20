import * as vscode from 'vscode';
import CONST from './const';

export default {
    command: 'rain-tool.addCodeComment',
    fn() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('没有打开的编辑器');
            return;
        }
        try {
            // 获取文件类型
            let languageId = editor.document.languageId;
            console.log(`🌧🌧🌧 [languageId]`, languageId);

            // 特殊的文件 通过文件后缀判断
            if (languageId === 'plaintext') {
                const fileName = editor.document.fileName;
                languageId = fileName?.split('.').pop() || '';
            }

            // 给出错误提示
            if (!languageId || !(languageId in CONST)) {
                throw new Error('[RAINTOOL] ❌ Unsupported language');
            }

            const template = generateTemplate(languageId);

            const activeLine = editor.selection.active.line;

            editor
                .edit(editBuilder => {
                    const position = new vscode.Position(activeLine, 0);
                    editBuilder.insert(position, template);
                })
                .then(() => {
                    // 插入注释后，将光标定位到 @description 后
                    const newPosition = new vscode.Position(activeLine + 1, 17);
                    editor.selection = new vscode.Selection(newPosition, newPosition);
                });
        } catch (error) {
            console.log(`🌧🌧🌧 [error]`, error);
            vscode.window.showErrorMessage('[RAINTOOL] ❌ 添加注释时发生错误');
        }
    }
};

function generateTemplate(languageId: string): string {
    const template = CONST[languageId as keyof typeof CONST];
    return template;
}
