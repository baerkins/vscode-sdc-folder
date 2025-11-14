/** biome-ignore-all assist/source/organizeImports: oi vey */
import * as vscode from 'vscode';
import path from 'node:path';
import fs from 'node:fs';
import { componentFileMaker } from './lib/componentFileMaker.js';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('newSDCFolder.create', async (contextSelection: vscode.Uri, _allSelections: vscode.Uri[]) => { 
	const uri = contextSelection ? contextSelection.fsPath : vscode.workspace?.workspaceFolders?.[0].uri.fsPath;

  if ( !uri ) {
    return;
  }

  const isDir    = fs.lstatSync(uri).isDirectory();
  const settings = await vscode.workspace.getConfiguration('newSDCFolder');
  const targetPath = !isDir ? path.dirname(uri) : uri;

  const inputBoxOptions = {
    ignoreFocusOut: true,
    placeHolder: 'Folder_Name',
    validateInput: (name: string): string | undefined => {
      if (!name) {
        return 'Name is required';
      }

      if (name.includes(' ')) {
        return 'Spaces are not allowed';
      }

      if (name.includes('/')) {
        return '/ is not allowed';
      }

      if (name.includes('\\')) {
        return '\\ is not allowed';
      }

      if (fs.existsSync(path.resolve(targetPath, name))) {
        return 'Name exists';
      }

      // no errors
      return undefined;
    },
    prompt: `Input the SDC folder name`
  };


  // Open Input Box
  vscode.window.showInputBox(inputBoxOptions)
    .then((dirName) => {

      if (dirName !== null && dirName !== undefined ) {
        try {
          componentFileMaker(targetPath, dirName, settings);
        } catch (error) {
          vscode.window.showErrorMessage(`Error creating SDC folder: ${error}`);
        }
      }
    });
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
