export function getDefaultStoryContent(componentName: string, componentFileName: string, componentTitle: string, componentSingleName: string) {

  return `import ${componentName} from './${componentFileName}.twig';
  
  export default {
    title: '${componentTitle}',
    component: ${componentName}
  };
  
  const Template = (args) => ${componentName}(args);
  
  export const ${componentSingleName} = Template.bind({});
  
  ${componentSingleName}.args = {
  
  };`;
  
}
  
  