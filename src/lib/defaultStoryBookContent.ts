export function getDefaultStoryContent(
  componentImportName: string, 
  componentFileName: string, 
  componentTitle: string, 
  componentExportName: string,
  importCss: boolean = false,
  importJs: boolean = false
) {

  return `import ${componentImportName} from './${componentFileName}.twig';${
    importCss ? `
import './${componentFileName}.css';` : ''}${importJs ? `
import './${componentFileName}.js';` : ''}
    
  export default {
    title: '${componentTitle}',
    component: ${componentImportName}
  };
  
  export const ${componentExportName} = {
    args: {
      // Add your args here
    }
  };`;    
}




export function getDefaultStoryContentTS(
  componentImportName: string, 
  componentFileName: string, 
  componentTitle: string, 
  componentExportName: string,
  importCss: boolean = false,
  importJs: boolean = false,
  storybookEngine: string
) {

  return `import type { Meta, StoryObj } from '${storybookEngine}';
import ${componentImportName} from './${componentFileName}.twig';${importCss ? `
import './${componentFileName}.css';` : ''}${importJs ? `
import './${componentFileName}.js';` : ''}

const meta: Meta = {
  title: '${componentTitle}',
  component: ${componentImportName},
}

export default meta;
type Story = StoryObj;
  
export const ${componentExportName}: Story = {
  args: {
    // Add your args here
  }
};`;    
}
  
  