# Image Viewer  
> This plugin is intended to show a picture from an URL into a image Viewer with zoom features.

## How to Install

Cordova:
```bash
cordova plugin add com-poolgazal-imageviewer
```

Ionic 4:
```bash
$ ionic cordova plugin add com-poolgazal-imageviewer
$ npm install --save @ionic-native/image-viewer/ngx
```

### Android
> Out of the box

### iOS
> Out of the box


### API

#### Show an image

```
ImageViewer.show('http://any_site.com/any_image.png', 'Some Title');
```

Optionally you can pass third parameter option as object.

Options:
* share: Option is used to hide and show the share option.
* closeBtn: Option for close button visibility when share false [ONLY FOR iOS]
* copyToReference: If you need to copy image to reference before show then set it true [ONLY FOR iOS]

##### Usage

```
var options = {
    share: true, // default is false
    closeButton: false, // default is true
    copyToReference: true // default is false
};

ImageViewer.show('http://any_site.com/any_image.png', 'Some Title', options);
```