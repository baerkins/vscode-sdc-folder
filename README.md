# New SDC Folder

Adds a "Create New SDC Folder" option to the Explorer context menu. Clicking this option will allow you to enter a name for the folder. The folder will be generated, with matching `.twig`, and `.component.yml` file names. You can also opt to add css, js, sass, scss, or pcss files, and add them to a subdirectory if desired. Additionally, a default `.stories.js` file can optionally be added.

## Usage

From the sidebar, right click on the location you wish to add an SDC folder. Click "Create New SDC Folder", and enter the name of the component in the input field. Press enter, and the directory will be created.

You can also access "Create New SDC Folder" from the Command Palette (⇧⌘P). SDC folders created in this way will be created at the root of the workspace. 

Notes: 
- The extension checks for exiting folders with the same name and will replace an existing folder. 
- Spaces are not allowed in the folder name.

## Configuration

Configure file creation in settings:

### Asset Subdirectory

To add asset files (css/js/pcss/sass/scss) to a subdirectory within the SDC folder, enter it in the "Asset Subdirectory" option. Leave this option blank for assets to be added to the top level of the SDC folder. Value should not begin with a slash, but can be a slashed string if desired (such as 'assets/raw').

Example output with a component named "example" and the "Asset Subdirectory" option set to 'assets' (with "Add css file" and "Add js file" checked):
```
├── example.twig
├── example.component.yml
└── assets
  ├── example.css
  └── example.js
```

Example output with a component named "example" and the "Asset Subdirectory" option set to empty (with "Add css file" and "Add js file" checked):
```
├── example.twig
├── example.component.yml
├── example.css
└── example.js
```

### File Options

| Option | Type | Description |
| ------ | ---- | ----------- |
| Add css File | Boolean | Check option to add css file with component name |
| Add js File | Boolean | Check option to add js file with component name |
| Add pcss File | Boolean | Check option to add pcss file with component name |
| Add sass File | Boolean | Check option to add sass file with component name |
| Add scss File | Boolean | Check option to add scss file with component name |

### Add Attributes To Component YML

Check the "Add Attributes To Component YML" option to include 'attributes' in the component.yml 'properties' by default.

### Storybook Options

| Option | Type | Description |
| ------ | ---- | ----------- |
| Add Stories JS | boolean | Check option to add a `.stories.js` file with component name |
| Add Stories TS | boolean | Check option to add a `.stories.ts` file with component name |
| Import CSS | boolean | Check option to automatically import the component css file into a stories file |
| Import JS | boolean | Check option to automatically import the component js file into a stories file |
| Organize components | boolean | Check to automatically include parent folder names in the title of the stories file |
| Additional Parent Category Directory Names | string | Comma seperated list of parent folders that create category groups in the Storybook sidebar. Will autogenerate a title in stories file based on folder organization for folders created within these directory. SDC components will always be categorized under the 'Components' Sdc Components Category Title. |
| Import Engine | string | import name for storybook engine imported to stories.ts files |
| SDCc Components Category Title | string | Name of the SDC category in Storybook sidebar. *Default: `SDC Components`* |