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

            // 获取当前文件内容
            const content = vscode.window.activeTextEditor?.document.getText();
            // 将文件内容和文件头拼接
            const newContent = header + '\n\n' + content;
            // 将新内容写入文件
            vscode.window.activeTextEditor?.edit(editBuilder => {
                editBuilder.replace(new vscode.Range(0, 0, 0, 0), newContent);
            });
            // 帮用户保存文件
            vscode.window.activeTextEditor?.document.save();

            vscode.window.showInformationMessage('[RAIN] ✅ add header success!');
        } catch (error) {
            vscode.window.showInformationMessage(`[RAIN] ❌ ${error}`);
        }
    }
};

export default RainAddHeader;
