import * as vscode from 'vscode';
import {RainSort} from './utils/sort';
import RainReload from './utils/Reload/index';
import RainAddHeader from './utils/AddHeader/index';
import RainAddCodeComment from './utils/AddCodeComment/index';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "rain-tool" is now active!');

    let helloWorld = vscode.commands.registerCommand('rain-tool.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from rain-tool!');
    });

    context.subscriptions.push(
        // Hello World
        helloWorld,
        // import 排序
        use(RainSort),
        // 添加文件头
        use(RainAddHeader),
        // 重新加载
        use(RainReload),
        // 添加JS注释模板
        use(RainAddCodeComment)
    );
}

// This method is called when your extension is deactivated
export function deactivate() {}

function use(item: any) {
    return vscode.commands.registerCommand(item.command, item.fn);
}
