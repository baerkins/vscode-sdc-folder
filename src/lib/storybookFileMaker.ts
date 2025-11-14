import { log } from "./logger";
import { toPascalCase, toTitleCase } from "./stringFormatting";
import { getDirAfter } from "./getDirAfter";
import { writeFile } from "node:fs";
import { resolve } from "node:path";
import { getDefaultStoryContent, getDefaultStoryContentTS } from "./defaultStoryBookContent";

export function storybookFileMaker(filename: string, filepath: string, settings: any) {
  
  const componentImportSuffix = settings.storybook?.ComponentImportSuffix || 'Template';
  const componentPascalCase   = toPascalCase(filename);
  const componentImportName   = `${componentPascalCase}${componentImportSuffix}`;
  const componentTitle        = buildComponentTitle(filename, filepath, settings);
  
  const importCss = settings.storybook.importCSS || false;
  const importJs = settings.storybook.importJS || false;
  

  if ( settings.storybook.addStoriesJS ) {
    const jsContent = getDefaultStoryContent(
      componentImportName,
      filename,
      componentTitle,
      componentPascalCase,
      importCss,
      importJs
    );

    writeFile(resolve(filepath, `${filename}.stories.js`), jsContent, {encoding:"utf8"}, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  if ( settings.storybook.addStoriesTS ) {
    const storybookEngine = settings.storybook.storybookEngine || '@storybook/html-vite';

    const tsContent = getDefaultStoryContentTS(
      componentImportName,
      filename,
      componentTitle,
      componentPascalCase,
      importCss,
      importJs,
      storybookEngine
    );

    writeFile(resolve(filepath, `${filename}.stories.ts`), tsContent, {encoding:"utf8"}, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}


function buildComponentTitle(filename: string, path: string, settings: any) {
  
  // Base Title
  const titleArray = [];
  let baseDirectories = [];
  let isSDCComponent = false;

  if ( settings?.storybook.OrganizeComponents && settings?.storybook.AdditionalParentCategoryDirectoryNames && settings?.storybook.AdditionalParentCategoryDirectoryNames !== '' ) {
    baseDirectories = settings.storybook.AdditionalParentCategoryDirectoryNames.split(',').map((dir: string) => dir.trim());
  }

  // Look for the SDC Components path
  if ( path.includes('/themes/custom') ) {
    const themeName = getDirAfter(path, '/themes/custom');
    baseDirectories.push(`${themeName}/components`);
    if ( path.includes(`${themeName}/components`)) {
      isSDCComponent = true;
      titleArray.push(settings.storybook.SdcComponentsCategoryTitle || 'SDC Components');
    }
  } else if ( path.includes('/modules/custom') ) {
    const moduleName = getDirAfter(path, '/modules/custom');
    baseDirectories.push(`${moduleName}/components`);
    if ( path.includes(`${moduleName}/components`)) {
      isSDCComponent = true;
      titleArray.push(settings.storybook.SdcComponentsCategoryTitle || 'SDC Components');
    }
  }

  
  if ( settings?.storybook.OrganizeComponents ) {

    // Check if any of the base directories exist in the path
    const foundBaseDir = baseDirectories.find((dir: string) => path.includes(dir));
    if ( foundBaseDir !== undefined ) {

      if ( !isSDCComponent ) {
        titleArray.push(toTitleCase(foundBaseDir.split('/')[0]));
      }

      let trimmedPath = getDirAfter(path, foundBaseDir);
      if ( trimmedPath ) {
        trimmedPath = removeLastInstance(trimmedPath, filename);
        const pathParts = trimmedPath.split(/[/\\]/).filter(part => part && part !== '');
        log('Found base directory for Storybook Title: ' + foundBaseDir + ' with path ' + path + ' with relative path: ' + trimmedPath + ' resulting in parts: ' + JSON.stringify(pathParts));
        for ( const part of pathParts ) {
          titleArray.push(toTitleCase(part));
        }
      }
    }
  }




  // log('Building Storybook Title for: ' + filename + ' at path: ' + path);
  // log(settings);

  // if ( settings.storybook.OrganizeComponents ) {
  //   const pathParts = path.split(/[/\\]/).filter(part => part && part !== '');

  //   if ( pathParts.includes('components') ) {
  //     titleArray.push(settings.storybook.SdcComponentsCategoryTitle || 'SDC Components');
  //   }
    
  //   // Determine the base directory for titles
  //   // let baseDirIndex = 0;
  //   // if ( settings.storybook.useParentDirectoryForStorybookTitles && settings.storybook.useParentDirectoryName ) {
  //   //   const baseDir = settings.storybook.useParentDirectoryName;
  //   //   const foundIndex = pathParts.indexOf(baseDir);
  //   //   if ( foundIndex !== -1 ) {
  //   //     baseDirIndex = foundIndex + 1;
  //   //   }
  //   // }

  //   // // Add relevant path parts to title array
  //   // for ( let i = baseDirIndex; i < pathParts.length; i++ ) {
  //   //   titleArray.push(toTitleCase(pathParts[i]));
  //   // }
  // }


  // Add component title
  titleArray.push(toTitleCase(filename));

  return titleArray.join('/');



}


function removeLastInstance(input: string, directory: string): string {
  const lastIndex = input.lastIndexOf(directory);
  if (lastIndex === -1) return input;

  return (
    input.slice(0, lastIndex) +
    input.slice(lastIndex + directory.length)
  );
}