import * as vscode from 'vscode';
import {RainSort} from './utils/sort';
import RainReload from './utils/Reload/index';
import RainAddHeader from './utils/AddHeader/index';
// import CompressFolderImgs from './utils/CompressFolderImgs/index';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "rain-tool" is now active!');

    // const tinyFolderImgs = new CompressFolderImgs(context);

    let helloWorld = vscode.commands.registerCommand('rain-tool.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from rain-tool!');
    });

    // let compressFolderImgs = vscode.commands.registerCommand('rain-tool.compressFolderImgs', folder => {
    //     if (folder && folder.fsPath) {
    //         tinyFolderImgs.compressFolder(folder.fsPath);
    //     }
    // });

    context.subscriptions.push(
        // Hello World
        helloWorld,
        // import 排序
        use(RainSort),
        // 添加文件头
        use(RainAddHeader),
        // 重新加载
        use(RainReload)
        // 压缩文件夹中的图片
        // compressFolderImgs
    );
}

// This method is called when your extension is deactivated
export function deactivate() {}

function use(item: any) {
    return vscode.commands.registerCommand(item.command, item.fn);
}
