# react-scrolling-carousel
A scrolling carousel component for React

Carousel
=======================

Renders standard horizontal scrolling image carousel. Images have a max height, anything under will be displayed at actual height.

###### Basic Implementation
```JSX
import React from 'react';
import Carousel from 'react-scrolling-carousel';

export default React.createClass({

    render() {
        return (
            <Carousel images={['http://image-path', 'https://second-image-path']}/>
        );
    }
});
```

#### Carousel Configuration
* **images:** `PropTypes.array` An array of image paths.
* **maxHeight** `PropTypes.string` Max height of images. Defaults to 450px.
* **altText** `PropTypes.string` A custom alt tag that will be applied to each image. Will appened each tag with ' - 1' or the number of the img index. So if altText is 'image' will generate 'image - 0', etc. Defaults to Screenshot

#### Helper Classes
* `.carousel-container-outer` The class for the outter wrapper div. Can use this to implement media queries, and other customizations, etc.
* `carousel-container-inner` The class for the inner wrapper div.
* `.carousel-image-container` The div that wraps each image.
* `.carousel-image` Each image