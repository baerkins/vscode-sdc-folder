/** biome-ignore-all assist/source/organizeImports: oi vey */
import * as fs from 'node:fs';
import * as path from 'node:path';

import { toTitleCase } from './stringFormatting';
import { createFile } from './createFile';
import { attributeComponentYml, defaultComponentYml } from './defaultComponentYML';
import { storybookFileMaker } from './storybookFileMaker';
// import { log } from './logger';

// biome-ignore lint/suspicious/noExplicitAny: Type to come
export function componentFileMaker(targetPath: string, dirName: string, settings: any) {

  const componentPath = path.resolve(targetPath, dirName);

  // Create folder path
  if (!fs.existsSync(componentPath)){

    fs.mkdir(componentPath, { recursive: true }, (err) => {

      if (err) {
        throw err;
      }

      let assetsPath = componentPath;

      // If asset subdirectory option is set, create the directory and update the assetPath
      if ( settings?.assetSubdirectory && settings?.assetSubdirectory !== '' ) {
        fs.mkdirSync(path.resolve(componentPath, settings.assetSubdirectory), { recursive: true });
        assetsPath = path.resolve(componentPath, settings.assetSubdirectory);
      }

      // Create component naming schemes
      const componentFileName  = dirName;
      const componentTitleCase = toTitleCase(dirName);

      // Create twig file
      createFile(componentPath, componentFileName, 'twig');

      // Create css file
      if ( settings?.addCssFile && settings.addCssFile ) {
        createFile(assetsPath, componentFileName, 'css');
      }

      // Create js file
      if ( settings?.addJsFile ) {
        createFile(assetsPath, componentFileName, 'js');
      }

      // Create pcss file
      if ( settings?.addPcssFile ) {
        createFile(assetsPath, componentFileName, 'pcss');
      }

      // Create sass file
      if ( settings?.addSassFile ) {
        createFile(assetsPath, componentFileName, 'sass');
      }

      // Create scss file
      if ( settings?.addScssFile ) {
        createFile(assetsPath, componentFileName, 'scss');
      }

      // // Create stories file
      // if ( settings?.addStoriesJS ) {
      //   const storyContent = getDefaultStoryContent(`${componentName}${componentImportSuffix}`, componentFileName, componentTitle, componentSingleName);
      //   fs.writeFile(path.resolve(componentPath, `${componentFileName}.stories.js`), storyContent, {encoding:"utf8"}, (err) => {
      //     if (err) {
      //       throw err;
      //     }
      //   });
      // }

      // Create component.yml
      let ymlContent = '';
      if (settings?.addAttributesToComponentYml) {
        ymlContent = attributeComponentYml(componentTitleCase);
      } else {
        ymlContent = defaultComponentYml(componentTitleCase);
      }
        
      fs.writeFile(path.resolve(componentPath, `${componentFileName}.component.yml`), ymlContent, {encoding:"utf8"}, (err) => {
        if (err) {
          throw err;
        }
      });

      // log(`Component '${dirName}' created successfully at ${componentPath} with settings: ${JSON.stringify(settings)}`);


      if ( settings.storybook.addStoriesJS || settings.storybook.addStoriesTS ) {
        storybookFileMaker(dirName, componentPath, settings);
      }

    });
  }
  
}