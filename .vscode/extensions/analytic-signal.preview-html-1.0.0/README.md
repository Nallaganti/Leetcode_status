# HTML Preview in VSCode

Simple preview for HTML (`.html`) or Scalable Vector Graphics (`.svg`) files in VSCode. The main use case for data science is to preview interactive statistical graphics created using Plotly in Python notebooks and exported to (`.html`) or (`.svg`) files.

The Plotly HTML graphics files are not static images, but preserve interactive features and allow users to make their own explorations of the data. The extension allows you to preview the graphics files directly inside VSCode, which means you don't loose focus by leaving the environment to open the graphics in a browser, and allows you to organise your graphics along with your notebooks inside the VSCode editor.

![HTML Preview](https://www.analyticsignal.com/images/vscode-html-preview.png)

*HTML Preview of interactive map of global seismicity, volcanism, and plate boundaries created using Plotly.*

## Usage

### **Click**
To preview a file:

- Click on a (`.html`) or (`.svg`) file 

A preview of the file contents should now be shown in an editor.

### **Open to the Side** 

To preview a file in a new editor (if other editors are already open):

- Right-click on a file with (`.html`) or (`.svg`) extension and choose *Open to the Side*

A preview of the file contents should now be shown in a new editor.

### **Open With...**
To choose how to view a HTML file:

- Right-click on a file with (`.html`) extension and choose *Open With...*
- A list of available options appears in the Command Palette, choose one of the options:

    > *Text Editor* is the built-in VSCode editor for text files. Choose this option to view and edit the raw HTML code.

    > *HTML Preview* is the viewer provided by this extension. Choose this option to preview the HTML. 

## Using an external browser

To open a (`.html`) or (`.svg`) file in an external browser, locate the file of interest in the Explorer, *right-click* and choose *Reveal in Finder* (macOS). From there, double-click to open the file in a browser. However, using the preview extension provides a cleaner user experience.