/**
 * Love and Peace
 * Description: 写一个vscode插件，可以通过右击文件夹 压缩文件夹中的图片文件
 * Note:
 */

import * as fs from 'fs';
import sharp from 'sharp';
import * as path from 'path';
import * as vscode from 'vscode';

export default class CompressFolderImgs {
    // 支持的图片格式
    private readonly supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];

    constructor(private context: vscode.ExtensionContext) {}

    /**
     * 压缩文件夹中的图片
     * @param folderPath 文件夹路径
     */
    public async compressFolder(folderPath: string): Promise<void> {
        try {
            // 获取文件夹中的所有文件
            const files = await this.getImageFiles(folderPath);

            if (files.length === 0) {
                vscode.window.showInformationMessage('[RAINTOOL] ❌ 没有找到可压缩的图片文件');
                return;
            }

            // 显示进度条
            vscode.window.withProgress(
                {
                    location: vscode.ProgressLocation.Notification,
                    title: '正在压缩图片...',
                    cancellable: true
                },
                async progress => {
                    const total = files.length;
                    let current = 0;

                    for (const file of files) {
                        try {
                            await this.compressImage(file);
                            current++;
                            progress.report({
                                message: `(${current}/${total}) ${path.basename(file)}`,
                                increment: 100 / total
                            });
                        } catch (error) {
                            console.error(`压缩失败: ${file}`, error);
                        }
                    }
                }
            );

            vscode.window.showInformationMessage('[RAINTOOL] ✅ 图片压缩完成！');
        } catch (error: any) {
            vscode.window.showErrorMessage(`[RAINTOOL] ❌ 压缩失败: ${error.message}`);
        }
    }

    /**
     * 获取文件夹中的所有图片文件
     */
    private async getImageFiles(folderPath: string): Promise<string[]> {
        const result: string[] = [];

        const files = await fs.promises.readdir(folderPath);
        for (const file of files) {
            const fullPath = path.join(folderPath, file);
            const stat = await fs.promises.stat(fullPath);

            if (stat.isDirectory()) {
                // 递归处理子文件夹
                const subFiles = await this.getImageFiles(fullPath);
                result.push(...subFiles);
            } else if (this.isImageFile(file)) {
                result.push(fullPath);
            }
        }

        return result;
    }

    /**
     * 判断文件是否为支持的图片格式
     */
    private isImageFile(filename: string): boolean {
        const ext = path.extname(filename).toLowerCase();
        return this.supportedFormats.includes(ext);
    }

    /**
     * 压缩单个图片文件
     */
    private async compressImage(filePath: string): Promise<void> {
        const ext = path.extname(filePath).toLowerCase();
        const image = sharp(filePath);

        // 根据不同格式设置压缩选项
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                await image.jpeg({quality: 80, mozjpeg: true}).toFile(filePath + '.tmp');
                break;
            case '.png':
                await image.png({quality: 80, compressionLevel: 9}).toFile(filePath + '.tmp');
                break;
            case '.webp':
                await image.webp({quality: 80}).toFile(filePath + '.tmp');
                break;
        }

        // 替换原文件
        await fs.promises.unlink(filePath);
        await fs.promises.rename(filePath + '.tmp', filePath);
    }
}
