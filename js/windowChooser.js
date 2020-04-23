console.log("windowChooser - (C) Adam Wise 2020")

var debug = 1;

/**
 * to do
 * 
 * legend generator?
 * switch control to top
 * add window selector
 * 
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

// defines the main object, a View, which is a spec sheet type thing showing controls and a graph for QE and window trans
 function View(paramObj){
    var self = this;

    // state of the object
    self.div = d3.select('body').append('div'); // this is the div that the view goes into
    self.family = ''; // this is the current product family, e.g. Sona of the view
    self.product = ''; // this is the specific product of the view
    self.productObj = {}; // this is the json object with the rest of the prouct config up in there
    self.canvasWidth = 500; // chart canvas width in pixels
    self.canvasHeight = 300; // chart canvas height in pixels
    self.canvasMargin = 50; // svg margin in pixels
    self.xTicks = [];
    self.yTicks = [50,60,70,80,90,100];
    self.yAxisMin = 50;
    self.yAxisMax = 100;
    self.xAxisMin = 100;
    self.xAxisMax = 1100;

    // auto generate x ticks
    for (var i = 0; i<12; i++){
        self.xTicks.push(i*100);
    }

    // add scales
    // generate scales and axes including formatting for the window axis
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

    // add the same for the QE axis

    self.qe = {};
    self.qe.yAxisMin = 0;
    self.qe.yAxisMax = 100;
    self.qe.yTicks = [0,10,20,30,40,50,60,70,80,90,100];

    self.qe.xScale = d3.scaleLinear()
                    .domain([self.xAxisMin, self.xAxisMax])
                    .range([self.canvasMargin, self.canvasWidth-self.canvasMargin])
                    .clamp(true)

    self.qe.yScale = d3.scaleLinear()
                    .domain([self.qe.yAxisMin, self.yAxisMax])
                    .range([self.canvasHeight-self.canvasMargin, self.canvasMargin/5])
                    .clamp(true)

    self.qe.dataLine = d3.line()
                    .x(d=>self.qe.xScale(d.x))
                    .y(d=>self.qe.yScale(d.y))

    self.qe.xAxis = d3.axisBottom()
                    .scale(self.qe.xScale)
                    .tickValues( self.xTicks )
                    .tickFormat(d=>d);

    self.qe.yAxis = d3.axisLeft()
                    .scale(self.qe.yScale)
                    .tickValues( self.qe.yTicks )
                    .tickFormat(d=>d);

    // add controls div 
    self.controlDiv = self.div
        .append('div')
        .attr('class','controlDiv');

    //add SVG Div
    self.svgDiv = self.div
        .append('div')
        .attr('class','svgDiv')
        
    // add extra QE display svg
    self.svgQE = self.svgDiv
    .append('div')
    .attr('class','chartDiv')
    .text('Sensor Quantum Efficiency')
    .append('svg')
    .attr('width', self.canvasWidth)
    .attr('height', self.canvasHeight)

    
    // add window transmission SVG 
    self.svg = self.svgDiv
    .append('div')
    .attr('class','chartDiv')
    .text('Window Transmission')
    .append('svg')
    .attr('width', self.canvasWidth)
    .attr('height', self.canvasHeight)


    // add clip path for window transmission
    self.svg.append('clipPath')
        .attr('id','clipBox')
        .append('rect')
        .attr('width', self.xScale(self.xAxisMax) - self.xScale(self.xAxisMin) )
        .attr('height', self.yScale(self.yAxisMin + 0.5) - self.yScale(self.yAxisMax) )
        .attr('x', self.canvasMargin)
        .attr('y', self.canvasMargin/5)

    // add axes for window
    self.svg
        .append('g')
        .classed('axis',true)
        .attr('id','yAxis')
        .attr('transform',`translate(${self.xScale(self.xTicks[0])+0},-0.5)`)
        .call(self.yAxis)
        .style('font-size',13)
                
    self.svg
        .append('g')
        .classed('axis',true)
        .attr('id','xAxis')
        .attr('transform',`translate(0,${self.yScale(self.yTicks[0])})`)
        .call(self.xAxis)
        .style('font-size',13)

    // add axes for qe
    self.svgQE
        .append('g')
        .classed('axis',true)
        .attr('id','yAxis')
        .attr('transform',`translate(${self.qe.xScale(self.qe.yTicks[0])+0},-0.5)`)
        .call(self.qe.yAxis)
        .style('font-size',13)
                
    self.svgQE
        .append('g')
        .classed('axis',true)
        .attr('id','xAxis')
        .attr('transform',`translate(0,${self.qe.yScale(0)})`)
        .call(self.qe.xAxis)
        .style('font-size',13)

    // add division lines
    // add vertical lines
    var vertLineOffSet = 0.5;

svgConfigs = [{'svg':self.svg, 'scope':self}, {'svg':self.svgQE, 'scope':self.qe}];
for (var n in svgConfigs){
    svgConfig = svgConfigs[n];
    for (var i in self.xTicks){
        svgConfig['svg'].append('line')
            .attr('x1', svgConfig['scope'].xScale(self.xTicks[i]) + vertLineOffSet)
            .attr('y1', svgConfig['scope'].yScale(svgConfig['scope'].yAxisMin))
            .attr('x2', svgConfig['scope'].xScale(self.xTicks[i]) + vertLineOffSet)
            .attr('y2', self.canvasMargin/5)
            .attr('stroke','gray')
    }

    // add horizontal lines
    for (var i in svgConfig['scope'].yTicks){
        svgConfig['svg'].append('line')
            .attr('y1', svgConfig['scope'].yScale(svgConfig['scope'].yTicks[i]))
            .attr('x1', svgConfig['scope'].xScale(self.xAxisMax))
            .attr('y2', svgConfig['scope'].yScale(svgConfig['scope'].yTicks[i]))
            .attr('x2', self.canvasMargin)
            .attr('stroke','gray')
    }
}

    // add axes labels for window
    var xLabelG = self.svg.append('g');
    xLabelG.attr('transform', `translate(${self.xScale( (self.xAxisMin + self.xAxisMax) / 2)}, ${self.yScale(self.yAxisMin) + 35})`)
    xLabelG.append('text').text('Wavelength, nm').attr('text-anchor','middle').attr('class','axisLabel')

    var yLabelG = self.svg.append('g');
    yLabelG.attr('transform', `translate(15, ${self.yScale( (self.yAxisMax + self.yAxisMin) / 2)}), rotate(-90)`)
    yLabelG.append('text').text('Transmission, %').attr('text-anchor','middle').attr('class','axisLabel')

    // add exes labels for sensor QE
    self.qe.xLabelG = self.svgQE.append('g');
    self.qe.xLabelG.attr('transform', `translate(${self.qe.xScale( (self.xAxisMin + self.xAxisMax) / 2)}, ${self.qe.yScale(self.qe.yAxisMin) + 35})`)
    self.qe.xLabelG.append('text').text('Wavelength, nm').attr('text-anchor','middle').attr('class','axisLabel')

    self.qe.yLabelG = self.svgQE.append('g');
    self.qe.yLabelG.attr('transform', `translate(15, ${self.qe.yScale( (self.yAxisMax + self.qe.yAxisMin) / 2)}), rotate(-90)`)
    self.qe.yLabelG.append('text').text('Quantum Efficiency, %').attr('text-anchor','middle').attr('class','axisLabel')

    // add graph bounding box for window
    self.svg.append('rect')
        .attr('fill','none')
        .attr('stroke', 'black')
        .attr('width', self.xScale(self.xAxisMax) - self.xScale(self.xAxisMin))
        .attr('height', self.yScale(self.yAxisMin) - self.yScale(self.yAxisMax))
        .attr('x', self.canvasMargin + 0.5)
        .attr('y', self.canvasMargin/5)

    // add graph bounding box
    self.svgQE.append('rect')
        .attr('fill','none')
        .attr('stroke', 'black')
        .attr('width', self.qe.xScale(self.xAxisMax) - self.qe.xScale(self.xAxisMin))
        .attr('height', self.qe.yScale(self.qe.yAxisMin) - self.qe.yScale(self.qe.yAxisMax))
        .attr('x', self.canvasMargin + 0.5)
        .attr('y', self.canvasMargin/5)


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

    // populate family options
    var familyOptions = self.familySelect
        .selectAll('option')
        .data( Object.keys(families)).enter()
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

        // draw traces method
        self.drawTraces = function(mode = null){

            // mode argument, default draws the first, default window,
            // 'all' draws all the available windows
            // i'll have to change this when I'm drawing one specific one at a time?
            var endIndex = 0;
            if (mode == 'default'){
                endIndex = 1;
            }
            if (mode == 'all'){
                endIndex = -1;
            }
            // remove old traces from graph

            d3.selectAll('.legend').remove();
            self.legendG = self.svg.append('g').attr('class','legend')
            self.legendG.attr('transform', `translate(${self.canvasWidth/2.5}, ${3*self.canvasHeight/5})`)
            self.legendG.append('rect')
                .attr('fill','white')
                .attr('x',0)
                .attr('y',0)
                .attr('width', 200)
                .attr('height', 50)

            self.svg.selectAll('path').remove();
            // update traces on graph
            for (var i in self.productObj.availableWindows.slice(0, endIndex)){
                var window = self.productObj.availableWindows[i];
                var tag = optLUT[window + ' ' + self.product];
                if (debug){
                    console.log('Plotting: ', window, self.product, tag)
                }
                var dataObj = trans[tag]; // data to plot
                
                // add traces to graph
                self.svg.append('path') 
                    .attr('fill','none')
                    .attr('stroke', colorDict[self.productObj.availableWindows[i]])
                    .attr('stroke-width', 3)
                    .attr('d', self.dataLine(dataObj))
                    .attr("clip-path", "url(#clipBox)")
                    //.attr('stroke-dasharray', this.dashArray)
                
                // add legend text entry to graph
                var textEntry = self.legendG.append('text');
                textEntry.text(windowDict[window]).attr('alignment-baseline','hanging')
                textEntry.attr('x', 20)
                // add path entry to text
                self.legendG.append('line')
                    .attr('x1',0)
                    .attr('x2',15)
                    .attr('y1',10)
                    .attr('y2',10)
                    .attr('stroke', colorDict[window])
                    .attr('stroke-width', 3)
                // update legend bounding box to fit text
                var legendBBox = d3.select('.legend').select('rect').node().getBBox();
                var textBBox = textEntry.node().getBBox();
                d3.select('.legend').select('rect').attr('width', Math.max(textBBox.width + 20, legendBBox.width))
                d3.select('.legend').select('rect').attr('height', textBBox.height);

                // add legend entry
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

