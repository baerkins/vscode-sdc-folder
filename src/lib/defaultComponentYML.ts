export function defaultComponentYml(componentTitle: string, incAttributes: boolean = true): string {

  return `name: ${componentTitle}
description: 'Description of the component'
props:
  type: object
  properties:`;
  
}

export function attributeComponentYml(componentTitle: string, incAttributes: boolean = true): string {

  return `name: ${componentTitle}
description: 
props:
  type: object
  properties:
    attributes:
      type: Drupal\Core\Template\Attribute
      title: Attributes`;
  
}
  
  