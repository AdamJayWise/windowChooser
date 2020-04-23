console.log("windowChooser - (C) Adam Wise 2020")

var debug = 1;

/**
 * to do
 * clippath on graphs
 * legend generator
 * create mechanical names
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
            'defaultWindow' : '(BB-VS-NR)U' ,
            'availableWindows' : [ '(BB-VS-NR)U','(BB-VV-NR)U', '(VS-NR-ENH)W']
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
        'Sona-4BV11' : 
        {
            'displayName' : 'Sona 4.2B-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W']
        },

        'Sona-2BV11' : 
        {
            'displayName' : 'Sona 2.0B-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W']
        },

        'Sona-4BV6' : 
        {
            'displayName' : 'Sona 4.2B-6',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W'] 
        }

    }
}

// add window + camera => transmission graph lookup table here  
optLUT = {
    // marana 4VB6
    '(BB-VS-NR)U Marana-4VB6' : 'OPT-14344',
    // marana 4BV-11
    '(BB-VS-NR)U Marana 4BV-11' : 'Marana11(BB-VS-NR)',
    '(BB-VV-NR)U Marana 4BV-11' : '(BB-VV-NR)',
    '(VS-NR-ENH)W Marana 4BV-11' : 'OPT-15718',
    //marana 4BU-11
    '(BB-VV-NR)U Marana-4BU11' : '(BB-VV-NR)',
    // Sona 4/2BV11
    '(BB-VS-NR)U Sona-4BV11' : 'Marana11(BB-VS-NR)',
    '(BB-VS-NR)W Sona-4BV11' : 'Marana11(BB-VS-NR)',
    '(BB-VS-NR)U Sona-2BV11' : 'Marana11(BB-VS-NR)',
    '(BB-VS-NR)W Sona-2BV11' : 'Marana11(BB-VS-NR)',
    // sona 4.2B6
    '(BB-VS-NR)U Sona-4BV6' : 'OPT-14344' ,
    
}

var windowDict = {
    '(BB-VS-NR)U' : 'Broadband VIS-NIR, Unwedged',
    '(BB-VS-NR)W' : 'Broadband VIS-NIR, Unwedged',
    '(BB-VV-NR)U' : 'Broadband VUV-NIR, Unwedged',
    '(VS-NR-ENH)W' : 'VIS-NIR Enhanced, Wedged'
}

var colorDict = {
    '(BB-VS-NR)U' : 'orange',
    '(BB-VS-NR)W' : 'red',
    '(BB-VV-NR)U' : 'green',
    '(VS-NR-ENH)W' : 'blue'
}


 function View(paramObj){
    var self = this;

    // state of the object
    self.div = d3.select('body').append('div'); // this is the div that the view goes into
    self.family = ''; // this is the current product family, e.g. Sona of the view
    self.product = ''; // this is the specific product of the view
    self.productObj = {}; // this is the json object with the rest of the prouct config up in there
    self.canvasWidth = 600; // chart canvas width in pixels
    self.canvasHeight = 300; // chart canvas height in pixels
    self.canvasMargin = 50; // svg margin in pixels
    self.xTicks = [];
    self.yTicks = [50,60,70,80,90,100];
    self.yAxisMin = 50;
    self.yAxisMax = 100;
    self.xAxisMin = 100
    self.xAxisMax = 1100;

    for (var i = 0; i<12; i++){
        self.xTicks.push(i*100);
    }

    self

    // add scales
    // generate scales and axes including formatting
    self.xScale = d3.scaleLinear()
                    .domain([self.xAxisMin, self.xAxisMax])
                    .range([self.canvasMargin, self.canvasWidth-self.canvasMargin])
                    .clamp(true)

    self.yScale = d3.scaleLinear()
                    .domain([self.yAxisMin, self.yAxisMax])
                    .range([self.canvasHeight-self.canvasMargin, self.canvasMargin/5])
                    .clamp(true)

    self.dataLine = d3.line()
                    .x(d=>self.xScale(d.x))
                    .y(d=>self.yScale(d.y))

    self.xAxis = d3.axisBottom()
                    .scale(self.xScale)
                    .tickValues( self.xTicks )
                    .tickFormat(d=>d);

    self.yAxis = d3.axisLeft()
                    .scale(self.yScale)
                    .tickValues( self.yTicks )
                    .tickFormat(d=>d);

    // add SVG 
    self.svg = self.div
    .append('div')
    .attr('id','chartDiv')
    .append('div')
    .append('svg')
    .attr('width', self.canvasWidth)
    .attr('height', self.canvasHeight)

    // add clip path
    self.svg.append('clipPath')
        .attr('id','clipBox')
        .append('rect')
        .attr('width', self.xScale(self.xAxisMax) - self.xScale(self.xAxisMin) )
        .attr('height', self.yScale(self.yAxisMin + 0.5) - self.yScale(self.yAxisMax) )
        .attr('x', self.canvasMargin)
        .attr('y', self.canvasMargin/5)

    // add axes
    self.svg
        .append('g')
        .classed('axis',true)
        .attr('id','yAxis')
        .attr('transform',`translate(${self.xScale(self.xTicks[0])-2},0)`)
        .call(self.yAxis)
        .style('font-size',13)
                
    self.svg
        .append('g')
        .classed('axis',true)
        .attr('id','xAxis')
        .attr('transform',`translate(0,${self.yScale(self.yTicks[0])-2})`)
        .call(self.xAxis)
        .style('font-size',13)

    // add division lines
    for (var i in self.xTicks){
        self.svg.append('line')
            .attr('x1', self.xScale(self.xTicks[i]))
            .attr('y1', self.yScale(self.yAxisMin))
            .attr('x2', self.xScale(self.xTicks[i]))
            .attr('y2', self.canvasMargin/5)
            .attr('stroke','gray')
    }

    for (var i in self.yTicks){
        self.svg.append('line')
            .attr('y1', self.yScale(self.yTicks[i]))
            .attr('x1', self.xScale(self.xAxisMax))
            .attr('y2', self.yScale(self.yTicks[i]))
            .attr('x2', self.canvasMargin)
            .attr('stroke','gray')
    }

    // add axes labels
    var xLabelG = self.svg.append('g');
    xLabelG.attr('transform', `translate(${self.xScale( (self.xAxisMin + self.xAxisMax) / 2)}, ${self.yScale(self.yAxisMin) + 35})`)
    xLabelG.append('text').text('Wavelength, nm').attr('text-anchor','middle').attr('class','axisLabel')

    var yLabelG = self.svg.append('g');
    yLabelG.attr('transform', `translate(15, ${self.yScale( (self.yAxisMax + self.yAxisMin) / 2)}), rotate(-90)`)
    yLabelG.append('text').text('Transmission, %').attr('text-anchor','middle').attr('class','axisLabel')

    // add graph bounding box
    self.svg.append('rect')
        .attr('fill','none')
        .attr('stroke', 'black')
        .attr('width', self.xScale(self.xAxisMax) - self.xScale(self.xAxisMin) + 5)
        .attr('height', self.yScale(self.yAxisMin) - self.yScale(self.yAxisMax))
        .attr('x', self.canvasMargin - 5)
        .attr('y', self.canvasMargin/5)

    // object properties
    self.controlDiv = self.div
        .append('div')
        .attr('class','controlDiv');

     // append GUI elements
    self.familyDiv = self.controlDiv.append('div').text('Family')
    
    self.familySelect = self.familyDiv.append('select')
        .attr('value', 'family')
        .attr('class', 'familySelect')
        .on('change', onChangeFamily)

    // append product div and pull down
    self.productDiv = self.controlDiv.append('Div').text('Product:')

    // append select for product
    self.productSelect = self.productDiv
    .append('select')
    .attr('value','Product')
    .on('change', onChangeProduct)

    // append an area to show default window
    self.defaultWindowDiv = self.controlDiv.append('div').text('Default Window: ')
    self.defaultWindowDisplay = self.defaultWindowDiv.append('span')

    // append a button to show advanced options
    self.advButton = self.controlDiv
    .append('div')
    .text('Show Additional Window Options')
    .attr('class','advButton')
    .on('click', showAdvancedWindows);

    // advanced window div
    self.advancedWindowDiv = self.controlDiv.append('div').classed('hidden', true);
    self.showAdvancedWindows = false;


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


    // product pulldown callback
    function onChangeProduct(){
        console.log(this)
        self.product = this.value;
        self.productObj = families[self.family][self.product];
        var defWind = self.productObj['defaultWindow'];
        var windDescr = windowDict[defWind];
        
        // update default window display
        self.defaultWindowDisplay.text( self.productObj['mechanicalSpecification'] + defWind +  " : " + windDescr);

        // hide the additional windows button if there is only one option
        if(self.productObj['availableWindows'].length < 2){
            self.advButton.style('display','none');
        }
        if(self.productObj['availableWindows'].length > 1){
            self.advButton.style('display','block')
        }

        // add a list of additional windows
        self.advancedWindowDiv.classed('hidden', true);
        self.advancedWindowDiv.selectAll('div').remove();
        self.advancedWindowDiv.selectAll('div')
            .data(self.productObj['availableWindows'].slice(1,-1))
            .enter()
            .append('div')
            .text( d =>  self.productObj['mechanicalSpecification'] +     d + ' - ' + windowDict[d])

        self.drawTraces(mode = 'default');

        }

        self.drawTraces = function(mode = null){

            // check if mode is specific
            var endIndex = 0;
            if (mode == 'default'){
                endIndex = 1;
            }
            if (mode == 'all'){
                endIndex = -1;
            }
                    // remove old traces from graph
            self.svg.selectAll('path').remove();
            // update traces on graph
            for (var i in self.productObj.availableWindows.slice(0, endIndex)){
                var window = self.productObj.availableWindows[i];
                var tag = optLUT[window + ' ' + self.product];
                console.log('Plotting: ', window, self.product, tag)
                var dataObj = trans[tag]
                
                // add traces to graph
                self.svg.append('path') 
                    .attr('fill','none')
                    .attr('stroke', colorDict[self.productObj.availableWindows[i]])
                    .attr('stroke-width', 3)
                    .attr('d', self.dataLine(dataObj))
                    .attr("clip-path", "url(#clipBox)")
                    //.attr('stroke-dasharray', this.dashArray)
            }
        }

    

    var productOptions = self.productSelect
        .selectAll('option')
        .data(Object.keys(families[self.family])).enter()
        .append('option')
        .text(function (d) { return d; });

    onChangeProduct.call(self.productSelect.node()); // fill in an initial value

    function showAdvancedWindows(){
        console.log(self.productObj['availableWindows']);
        self.advancedWindowDiv.classed('hidden', !self.advancedWindowDiv.classed('hidden'))
        // plot traces of all windows
        self.drawTraces(mode = 'all');

    }

 }

 var sonaView = new View();

 var MaranaView = new View();