React Native Tri State Toggle Switch Component for iOS and Android.

## Content

- [Installation](#installation)
- [Demo](#demo)
- [Getting started](#getting-started)
- [Customize](#Customize)
- [Contribution](#contribution)

## Installation

* 1.Run `npm i rn-tri-toggle-switch --save`
* 2.`import TriStateToggleSwitch from 'rn-tri-toggle-switch'`    

## Demo  
* [Example](https://github.com/summerfed/rn-tri-toggle-switch/blob/master/demo/rn-tri-toggle-switch-demo.js)

![Screenshots](https://github.com/summerfed/rn-tri-toggle-switch/blob/master/demo/rn-tri-toggle-switch-demo.gif?raw=true)


## Getting started  

To Get Started, Import `toggle-switch-react-native` to your js file.   

`import ToggleSwitch from 'toggle-switch-react-native'`  

Inside render or any other function returning component you can use tristate toggle switch like:

```javascript
<TriStateToggleSwitch 
    width={400} 
    height={80} 
    selectedNoneBgColor={'#999999'}
    selectedLeftBgColor={'#75CF41'}
    selectedRightBgColor={'#D72E30'}
    fontColor={'#fff'}
    fontSize={30}
    circleBgColor={'white'}
    choices={choice4}
    onChange={(value)=>alert(JSON.stringify(value))}
/>
```

## Customize 

Props              | Type     | Optional | Default     | Description
----------------- | -------- | -------- | ----------- | -----------
width  | number  | true | 120  |   You can specify width based on your requirements
height | number |true |  24 | You can specify height based on your requirements
selectedNoneBgColor  |  String | true | '#41B6E6' | Background Color if Circle Button is in the middle, or no option is selected
selectedLeftBgColor | String| true |  #3171BF | Background Color if Left option is selected
selectedRightBgColor | String | true | #3171BF  | Background Color if Right option is selected
circleBgColor | String | true | #fff  | Color of Circle Button
fontColor | String | true |  #fff |  Color of toggle label text
fontSize | number | true |  12 | Size of toggle label textcomponent 
choices | JSON | true |  [{choiceCode: 'Yes',choiceText: 'Yes'}, {choiceCode: 'No',choiceText: 'No'}] | Only the choiceCode and choiceText is mandatory, you can add any property to your JSON, it will return on function callback.
onChange | function callback | true |  No event callback | It will call the function callback on user selection change, it will return JSON option based on selected choice property
## Contribution

If you face any issue, bugs or see any area for impprovement feel free to create an issue, pull request and discuess it.

Thanks!
If you encountered an Issue, please add a screenshot of the bug or a code snippet.

---

**MIT Licensed**