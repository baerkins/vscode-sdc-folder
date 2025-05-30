import * as vscode from 'vscode';
import path from 'path';
import fs from 'fs';
import { getDefaultStoryContent } from './lib/defaultStoryBookContent.js';
import { ucFirst, fileNameSpacedToUppercase, fileNameToCamelCase } from './lib/utils.js';
import { attributeComponentYml, defaultComponentYml } from './lib/defaultComponentYML.js';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "newSDCFolder" is now active!');

	const disposable = vscode.commands.registerCommand('newSDCFolder.create', async () => { 
		const uri = vscode.workspace?.workspaceFolders?.[0].uri.fsPath;

		if ( !uri ) {
			return;
		}

    const isDir    = fs.lstatSync(uri).isDirectory();
    const settings = await vscode.workspace.getConfiguration('newSDCFolder');

		let targetPath;

		if ( !isDir ) {
      targetPath = path.dirname(uri);
    } else {
      targetPath = uri;
    }


		const inputBoxOptions = {
      ignoreFocusOut: true,
      placeHolder: 'Folder_Name',
      validateInput: function(name: string): string | undefined {
        if (!name) {
          return 'Name is required';
        }

        if (name.includes(' ')) {
          return 'Spaces are not allowed';
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
          const newPath = path.resolve(targetPath, dirName);

					console.log(settings?.assetSubdirectory);


          // // Create folder path
          if (!fs.existsSync(newPath)){

            fs.mkdir(newPath, { recursive: true }, (err) => {

              if (err) {
								throw err;
							}

							let assetsPath = newPath;

							if ( settings?.assetSubdirectory && settings?.assetSubdirectory !== '' ) {
								fs.mkdirSync(path.resolve(newPath, settings.assetSubdirectory), { recursive: true });
								assetsPath = path.resolve(newPath, settings.assetSubdirectory);
							}

              const componentRawName       = dirName.slice();
              const componentFileName      = componentRawName;
              const componentCamelCase     = fileNameToCamelCase(componentRawName);
              const componentName          = ucFirst(componentCamelCase, true);
              const componentImportSuffix  = settings.storybookComponentImportSuffix || 'Template';
              const componentSuffix        = settings.storybookComponentDefaultExportName || false;
              const componentSingleName    = componentSuffix && componentSuffix !== '' ? componentSuffix : componentName;
              const componentSpacedCamel   = componentRawName.replace(/-([a-z])/g, function (g) { return ' ' + g[1].toUpperCase(); });
              let   componentTitle         = ucFirst(componentSpacedCamel, true, true);

              if ( settings.useParentDirectoryForStorybookTitles && settings.useParentDirectoryName !== '' ) {
                const parentBase = settings.useParentDirectoryName;

                if (newPath.includes(parentBase)) {
                  const parentBaseTitle = newPath.slice(newPath.indexOf(parentBase) + parentBase.length);
                  const names           = parentBaseTitle.split('/').filter(n => n && n != '');
                  componentTitle        = names.map(n => fileNameSpacedToUppercase(n)).join('/');
                }
              }

              // Create twig file
              fs.writeFile(path.resolve(newPath, `${componentFileName}.twig`), '', function (err) {
                if (err) {
									throw err;
								}
              });

							console.log(settings?.addCssFile);

              // Create css file
              if ( settings?.addCssFile && settings.addCssFile ) {

								console.log('ADD CSS FILE', path.join(assetsPath, `${componentFileName}.css`));
                fs.writeFile(path.join(assetsPath, `${componentFileName}.css`), '', function (err) {
                  if (err) {
										throw err;
									}
                });
              }

							// Create js file
              if ( settings?.addJsFile ) {
                fs.writeFile(path.join(assetsPath, `${componentFileName}.js`), '', function (err) {
                  if (err) {
										throw err;
									}
                });
              }

							// Create pcss file
              if ( settings?.addPcssFile ) {
                fs.writeFile(path.join(assetsPath, `${componentFileName}.pcss`), '', function (err) {
                  if (err) {
										throw err;
									}
                });
              }

							// Create sass file
              if ( settings?.addSassFile ) {
                fs.writeFile(path.join(assetsPath, `${componentFileName}.sass`), '', function (err) {
                  if (err) {
										throw err;
									}
                });
              }

							// Create scss file
              if ( settings?.addScssFile ) {
                fs.writeFile(path.join(assetsPath, `${componentFileName}.scss`), '', function (err) {
                  if (err) {
										throw err;
									}
                });
              }

							// Create stories file
              if ( settings?.addStoriesJS ) {
								const storyContent = getDefaultStoryContent(`${componentName}${componentImportSuffix}`, componentFileName, componentTitle, componentSingleName);
								fs.writeFile(path.resolve(newPath, `${componentFileName}.stories.js`), storyContent, {encoding:"utf8"}, function (err) {
									if (err) {
										throw err;
									}
								});
							}

							// Create component.yml
							let ymlContent = '';
							if (settings?.addAttributesToComponentYml) {
								ymlContent = attributeComponentYml(componentTitle);
							} else {
								ymlContent = defaultComponentYml(componentTitle);
							}
								
							fs.writeFile(path.resolve(newPath, `${componentFileName}.component.yml`), ymlContent, {encoding:"utf8"}, function (err) {
								if (err) {
									throw err;
								}
							});

            });
          }

        }
      });




	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
