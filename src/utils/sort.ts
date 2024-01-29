import * as vscode from "vscode";

const REGEX_IMPORT = /^import\s.*;$/gm;

export const RainSort = {
    command: "rain-tool.sort",
    fn: () => {
        try {
            let editor = vscode.window.activeTextEditor as vscode.TextEditor; //获取当前激活的编辑框的实例
            let newText = "";
            if (editor) {
                // 获取当前选中的文本
                const text = editor.document.getText(editor.selection);
                const lines = text.split("\n").filter((e) => e);

                // 对代码进行筛选
                let impLines: Array<string> = [];
                let noImpLine: Array<string> = [];
                lines.forEach((str) => {
                    if (str.match(REGEX_IMPORT)) impLines.push(str);
                    else noImpLine.push(str);
                });
                impLines.sort((a, b) => a.length - b.length);
                noImpLine.sort((a, b) => a.length - b.length);

                // 生成新的字符串内容
                newText += impLines.length ? impLines.join("\n") : "";
                newText += noImpLine.length
                    ? "\n\n" + noImpLine.join("\n") + "\n\n"
                    : "";

                // 排序后的代码进行写入
                editor?.edit((editBuilder) => {
                    // 向文件中插入代码
                    // editBuilder.insert(new vscode.Position(0, 0), newText);
                    // 替换文件中的代码
                    editBuilder.replace(editor.selection, newText);
                });
                vscode.window.showInformationMessage("[RAIN] ✅ sort success!");
            }
        } catch (error) {
            vscode.window.showInformationMessage(`[RAIN] ❌ ${error}`);
        }
    },
};
