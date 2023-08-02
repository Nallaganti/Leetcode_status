# Links
* To automatically publish an extension to Open VSX, simply add it to [extensions.json](https://github.com/open-vsx/publish-extensions/blob/master/extensions.json) of the [open-vsx/publish-extensions](https://github.com/open-vsx/publish-extensions/)
* [Publish from scratch to opex vsx](https://github.com/eclipse/openvsx/blob/master/cli/README.md) 

# VSCODE
* [vscode publish](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)



## Instructions for custom on open-vsx
   1. Generate a key from open-vsx.org
   2. Create a namespace with the key, `ovsx create-namespace hediet --pat {key}`
   3. `ovsx publish -pat {key}` or `ovsx publish -p 53f878de-3359-45ef-91da-12ce1d312d1a`


## Publish on MS Marketplace
   1. [Marketplace login](https://marketplace.visualstudio.com/manage/publishers/hansuxdev)- drag and drop for use with personal account
   2. Updating
      1. use `vsce package` to package the new version..
   3. 


## Converting other extensions
