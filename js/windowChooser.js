console.log("windowChooser - (C) Adam Wise 2020")

/**
 * What I'd like to do here is have a json configuration of cameras.
 * 
 * For the UI, there will be a graph displayed, with a UI component that allows choice of "family", "model", "options"
 * start with a graph and 
 * 
 * choice of a family will populate the product pulldown, choice of product will population the options 
 * by default show some sCMOS camera
 * 
 * 
 * ok what now - 
 */

// json structure of the product families
var families = {
    // sona product family

    'Marana' : {
        // Sona models 
        'Marana 4BV-11' : 
        {
            'displayName' : 'Marana 4.2BV-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VV-NR)U', '(VS-NR-ENH)W']
        },

        'Marana-4BU11' : 
        {
            'displayName' : 'Marana 4.2BU-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VV-NR)U',
            'availableWindows' : ['(BB-VV-NR)U']
        },

        'Marana-4VB6' : 
        {
            'displayName' : 'Marana 4.2BV-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U']
        },

    },

    'Sona' : {
        // Sona models 
        'Sona-2BV11' : 
        {
            'displayName' : 'Sona 4.2B-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W']
        },

        'Sona 4.2B-6' : 
        {
            'displayName' : 'Sona 4.2B-6',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W'] 
        }

    }
}

var windowDict = {
    '(BB-VS-NR)U' : 'Broadband VIS-NIR Unwedged',
    '(BB-VS-NR)W' : 'Broadband VIS-NIR Unwedged',
    '(BB-VV-NR)U' : 'Broadband VUV-NIR Unwedged',
    '(VS-NR-ENH)W' : 'VIS-NIR Enhanced Wedged'
}





 function View(paramObj){
    var self = this;

    // state of the object
    self.div = d3.select('body').append('div'); // this is the div that the view goes into
    self.family = ''; // this is the current product family, e.g. Sona of the view
    self.product = ''; // this is the specific product of the view
    self.productObj = {}; // this is the json object with the rest of the prouct config up in there

    // object properties
    self.controlDiv = self.div
        .append('div')
        .attr('class','controlDiv');

     // append family div and pull down
    self.familyDiv = self.controlDiv.append('div').text('Family')
    self.familySelect = self.familyDiv.append('select')
        .attr('value', 'family')
        .attr('class', 'familySelect')
        .on('change', onChangeFamily)

    var familyOptions = self.familySelect
        .selectAll('option')
        .data(Object.keys(families)).enter()
        .append('option')
        .text(function (d) { return d; });

    self.family = Object.keys(families)[0];

    function onChangeFamily(){
        self.family = this.value;
        
        self.productSelect.selectAll('option').remove();
        self.productSelect
            .selectAll('option')
            .data(Object.keys(families[self.family])).enter()
            .append('option')
            .text(function (d) { return d; });

        // update the window display text
        onChangeProduct.call(self.productSelect.node()); // fill in an initial value
    }

    // append product div and pull down
    self.productDiv = self.controlDiv.append('Div').text('Product:')

    // product pulldown callback
    function onChangeProduct(){
        console.log(this)
        self.product = this.value;
        self.productObj = families[self.family][self.product];
        var defWind = self.productObj['defaultWindow'];
        var windDescr = windowDict[defWind];
        self.defaultWindowDisplay.text(defWind +  " - " + windDescr);
        }

    self.productSelect = self.productDiv
        .append('select')
        .attr('value','Product')
        .on('change', onChangeProduct)

    var productOptions = self.productSelect
        .selectAll('option')
        .data(Object.keys(families[self.family])).enter()
        .append('option')
        .text(function (d) { return d; });

    // append an area to show default window
    self.defaultWindowDiv = self.controlDiv.append('div').text('Default Window: ')
    self.defaultWindowDisplay = self.defaultWindowDiv.append('span')
    onChangeProduct.call(self.productSelect.node()); // fill in an initial value

    // append a button to show advanced options
    self.controlDiv
        .append('div')
        .text('Show Advanced Window Options')
        .attr('class','advButton')
        .on('click', showAdvancedWindows);

    self.advancedWindowDiv = self.controlDiv.append('div');

    function showAdvancedWindows(){
        console.log(self.productObj['availableWindows'])
        self.advancedWindowDiv
            .selectAll('div')
            .data(self.productObj['availableWindows'])
            .enter()
            .append('div')
            .text(d=>d);
    }
    

 }

 var sonaView = new View();

 var MaranaView = new View();