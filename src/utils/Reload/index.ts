import * as vscode from 'vscode';

const RainReload = {
    command: 'rain-tool.reload',
    fn: () => {
        try {
            vscode.commands.executeCommand('workbench.action.reloadWindow', {});
        } catch (error) {
            console.error(error);
        }
    }
};

export default RainReload;
