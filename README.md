# New SDC Folder

Adds a "Create New SDC Folder" option to the Explorer context menu. Clicking this option will allow you to enter a name for the folder. The folder will be generated, with matching `.twig`, and `.component.yml` file names. You can also opt to add css, js, sass, scss, or pcss files, and add them to a subdirectory if desired. Additionally, a default `.stories.js` file can optionally be added.

## Configuration

Configure file creation in settings:

<!-- ![configuration options](https://raw.githubusercontent.com/baerkins/vscode-fractal-folder/master/img/options.png "Configuration") -->

**CSS File Extension:** The extension for css. Extension name only without a proceeded `.` *Default: `css`*

**Storybook Component Import Suffix:** Suffix added to component import name. *Default: `Template`*

**Storybook Component Default Export Name:** Default name for storybook export. Leave empty to use component name, or add a value for the default export name. *Default: ``*

**Use Parent Directory For Storybook Titles:** Check to allow component titles to reflect their directory structure within a 'parent' directory. Example: if `patterns` is set as `Use Parent Directory Name`, component titles will be altered to match folder structure within `patterns`, so creating a "WideCard" folder in `patterns/components/cards` will result in the storybook title `Components/Cards/Wide Card`.

**Use Parent Directory Name:** Name of 'parent' directory to check for in path.


## Usage

Right click a file or folder where you would like to create the storybook twig folder in the explorer.

Select "Create New Storybook Twig Folder", and enter the name in the input box.


## Options

- Customize css extension.
- Allow parent directory structure to create Storybook Title structure
- Customize stories.js export suffix