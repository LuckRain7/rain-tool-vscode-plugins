/*
 * @Author: luckrain7 luckrain7@foxmail.com
 * @Date: 2024-01-23 11:20:29
 * @LastEditors: luckrain7 luckrain7@foxmail.com
 * @LastEditTime: 2024-01-29 17:37:58
 * @FilePath: /rain-tool/src/extension.ts
 * @Description:
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {RainSort} from './utils/sort';
import RainAddHeader from './utils/AddHeader/index';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "rain-tool" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('rain-tool.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from rain-tool!');
    });

    context.subscriptions.push(
        // Hello World
        disposable,
        // 排序
        use(RainSort),
        // 添加文件头
        use(RainAddHeader)
    );
}

// This method is called when your extension is deactivated
export function deactivate() {}

function use(item: any) {
    return vscode.commands.registerCommand(item.command, item.fn);
}
