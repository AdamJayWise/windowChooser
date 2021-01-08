console.log("windowChooser - (C) Adam Wise 2020")

// print debug info to console
var debug = 1;

// should interpolated window * QE plots be shown?
var plotInterp = 0;

/**
 * to do
 * add list of products to window display with color codes
 * 
 */



// add window + camera => transmission graph lookup table here  
optLUT = {

    // ixon
    '(BB-VS-NR)W DU-888U3-CS0-#BV' : 'OPT-00486',
    '(BB-VS-NR)U DU-888U3-CS0-#BV' : 'OPT-00486',
    '(NUV-ENH)U DU-888U3-CS0-#BV' : '(NUV-ENH)',
    '(VS-NR-ENH)W DU-888U3-CS0-#BV' : 'OPT-15718',
    '(BB-VV-NR)W DU-888U3-CS0-#BV' : '(BB-VV-NR)',
    '(BB-VV-NR)U DU-888U3-CS0-#BV' : '(BB-VV-NR)',
       
    '(BB-VS-NR)W DU-897U-CS0-#BV' : 'OPT-00486',
    '(BB-VS-NR)U DU-897U-CS0-#BV' : 'OPT-00486',
    '(NUV-ENH)U DU-897U-CS0-#BV' : '(NUV-ENH)',
    '(VS-NR-ENH)W DU-897U-CS0-#BV' : 'OPT-15718',
    '(BB-VV-NR)W DU-897U-CS0-#BV' : '(BB-VV-NR)',
    '(BB-VV-NR)U DU-897U-CS0-#BV' : '(BB-VV-NR)',


    // zyla
    '(BB-VS-NR)U ZYLA-5.5-XXX(-X)' : 'OPT-13561',
    '(BB-VS-NR)U ZYLA-4.2P-XXX(-X)' : 'OPT-13561',

    // neo
    '(BB-VS-NR)U NEO-5.5-XXX(-X)' : 'OPT-13561',
    '(BB-VS-NR)W NEO-5.5-XXX(-X)' : 'OPT-13561',
    '(BB-VV-NR)U NEO-5.5-XXX(-X)' : '(BB-VV-NR)',
    '(BB-VV-NR)W NEO-5.5-XXX(-X)' : '(BB-VV-NR)',

    // Balor
    '(BB-VS-NR)U BLR-F401-(F or W)' : 'OPT-14344',
    '(BB-VS-NR)W BLR-F401-(F or W)' : 'OPT-14344',

    // marana 4BV6
    '(BB-VS-NR)U Marana-4BV6' : 'OPT-14344',
    '(BB-VV-NR)U Marana-4BV6' : 'OPT-15270',
    '(VS-NR-ENH)W Marana-4BV6' : 'OPT-15718',
    
    // marana 4BV-11
    '(BB-VS-NR)U Marana 4BV-11' : 'OPT-13561',
    '(BB-VV-NR)U Marana 4BV-11' : 'OPT-15270',
    '(VS-NR-ENH)W Marana 4BV-11' : 'OPT-15718',
    
    //marana 4BU-11
    '(BB-VV-NR)U Marana-4BU11' : 'OPT-15270',
    
    // Sona 4/2BV11
    '(BB-VS-NR)U Sona-4BV11' : 'OPT-13561',
    '(BB-VS-NR)W Sona-4BV11' : 'OPT-13561',
    '(BB-VS-NR)U Sona-2BV11' : 'OPT-13561',
    '(BB-VS-NR)W Sona-2BV11' : 'OPT-13561',
    
    // sona 4.2B6
    '(BB-VS-NR)U Sona-4BV6' : 'OPT-14344' ,
    '(BB-VS-NR)W Sona-4BV6' : 'OPT-14344' ,
    '(BB-VV-NR)U Sona-4BV6' : '(BB-VV-NR)',

    //ikon - L
    '(BB-VV-NR)U DW936N-#BV' : '(BB-VV-NR)',
    '(BB-VS-NR)U DW936N-#BV' : 'OPT-00486',
    
    //ikon xl
    '(BB-VS-NR)U XL-EA02-XX (iKon XL 230 BB)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA02-CS (iKon XL 230 BB)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA02-D0 (iKon XL 230 BB)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA02-DS (iKon XL 230 BB)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA01-XX (iKon XL 230 BV)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA01-CS (iKon XL 230 BV)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA01-D0 (iKon XL 230 BV)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA01-DS (iKon XL 230 BV)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA04-C0 (iKon XL 231 BB)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA04-CS (iKon XL 231 BB)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA04-D0 (iKon XL 231 BB)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA04-DS (iKon XL 231 BB)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA05-XX (iKon XL 231 BEX2)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA05-CS (iKon XL 231 BEX2)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA05-D0 (iKon XL 231 BEX2)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA05-DS (iKon XL 231 BEX2)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA07-C0 (iKon XL 231 BEX2-DD)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA07-CS (iKon XL 231 BEX2-DD)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA07-D0 (iKon XL 231 BEX2-DD)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA07-DS (iKon XL 231 BEX2-DD)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA06-C0 (iKon XL 231 BR-DD)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA06-CS (iKon XL 231 BR-DD)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA06-D0 (iKon XL 231 BR-DD)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA06-DS (iKon XL 231 BR-DD)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA03-C0 (iKon XL 231 BV)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA03-CS (iKon XL 231 BV)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA03-D0 (iKon XL 231 BV)' : 'OPT-13561',
    '(BB-VS-NR)U XL-EA03-DS (iKon XL 231 BV)' : 'OPT-13561',

}

var windowDict = {
    '(BB-VS-NR)U' : 'Broadband VIS-NIR, Unwedged',
    '(BB-VS-NR)W' : 'Broadband VIS-NIR, Wedged',
    '(BB-VV-NR)U' : 'Broadband VUV-NIR, Unwedged',
    '(BB-VV-NR)W' : 'Broadband VUV-NIR, Wedged',
    '(VS-NR-ENH)W' : 'VIS-NIR Enhanced, Wedged',
    '(VS-NR-ENH)U' : 'VIS-NIR Enhanced, Unwedged',
    '(NUV-ENH)U' : 'Near UV Enhanced, Unwedged',
}

var colorDict = {
    '(BB-VS-NR)U' : 'orange',
    '(BB-VS-NR)W' : 'red',
    '(BB-VV-NR)U' : 'green',
    '(BB-VV-NR)W' : 'yellowgreen',
    '(VS-NR-ENH)W' : 'blue',
    '(NUV-ENH)U' : 'cyan',
}

var strokeDict = {
    'U' : 'none',
    'W' : '8 4',
}


// onClick callback for todo
d3.select('.toDO').on('click', function(){d3.select(this).remove()})

// defines the main object, a View, which is a spec sheet type thing showing controls and a graph for QE and window trans
 function View(paramObj){
    var self = this;

    // state of the object
    self.div = d3.select('#contentDiv'); // this is the div that the view goes into
    self.family = ''; // this is the current product family, e.g. Sona of the view
    self.product = ''; // this is the specific product of the view
    self.productObj = {}; // this is the json object with the rest of the prouct config up in there
    self.canvasWidth = 560; // chart canvas width in pixels
    self.canvasHeight = 420; // chart canvas height in pixels
    self.canvasMargin = 50; // svg margin in pixels
    self.canvassBumper = 35;
    self.xTicks = [];
    self.yTicks = [0, 10, 20, 30, 40, 50,60,70,80,90,100];
    self.yAxisMin = 0;
    self.yAxisMax = 100;
    self.xAxisMin = 100;
    self.xAxisMax = 1100;
    self.standardColor = '#9de070';
    self.optionColor = '#e8cc51';

    // auto generate x ticks
    for (var i = 0; i<12; i++){
        self.xTicks.push(i*100);
    }

    // add scales
    // generate scales and axes including formatting for the window axis
    self.xScale = d3.scaleLinear()
                    .domain([self.xAxisMin, self.xAxisMax])
                    .range([self.canvasMargin, self.canvasWidth-self.canvasMargin + self.canvassBumper])
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
                    .range([self.canvasMargin, self.canvasWidth-self.canvasMargin + self.canvassBumper])
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
    self.chartDivQE = self.svgDiv
    .append('div')
    .attr('class','chartDiv')

    self.chartDivQE
    .append('span')
    .attr('class','chartHeadLabel')
    .text('Sensor Quantum Efficiency')
    
    self.svgQE = self.chartDivQE.append('svg')
    .attr('width', self.canvasWidth)
    .attr('height', self.canvasHeight)

    // add button to bottom of window transmission svg div
    self.sensorCSVButton = self.chartDivQE
        .append('button')
        .text('Download to CSV')
        .on('click', function(){
            self.downloadData(`${self.product} Sensor QE`,self.productObj.sensorQE)
        });
    
    // add window transmission SVG 
    self.chartDivTrans = self.svgDiv
    .append('div')
    .attr('class','chartDiv')

    self.chartDivTrans
        .append('span')
        .attr('class', 'chartHeadLabel')
        .text('Window Transmission')
    
    self.svg = self.chartDivTrans
        .append('svg')
        .attr('width', self.canvasWidth)
        .attr('height', self.canvasHeight)

    // add button to bottom of window transmission svg div
    self.windowCSVButton = self.chartDivTrans
        .append('button')
        .text('Download to CSV')
        .on('click', function(){
            self.activeWindows.forEach(function(window){
                self.downloadData(`${self.product + ' ' + window} Window Transmission`, trans[optLUT[window + ' ' + self.product]])
            })
        })

    // add clip path for window transmission
    self.svg.append('clipPath')
        .attr('id','clipBox')
        .append('rect')
        .attr('width', self.xScale(self.xAxisMax) - self.xScale(self.xAxisMin) )
        .attr('height', self.yScale(self.yAxisMin + 0.2) - self.yScale(self.yAxisMax) )
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

    // add axes labels for sensor QE
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
    self.familyDiv = self.controlDiv.append('div').text('Family - ')
    
    self.familySelect = self.familyDiv.append('select')
        .attr('value', 'family')
        .attr('class', 'familySelect')
        .on('change', onChangeFamily)

    // append product div and pull down
    self.productDiv = self.controlDiv.append('div').text('Product - ')

    // append select for product
    self.productSelect = self.productDiv
        .append('select')
        .attr('value','Product')
        .on('change', onChangeProduct)

    // append div to show default window
    self.defaultWindowDisplay = self.controlDiv.append('div').text('Default Window - ');
    self.defaultWindowDisplay.append('span').attr('id','defaultWindowDisplay');

    // create div to hold window selector 
    self.windowDiv = self.controlDiv.append('div')
    self.windowKeyDiv = self.windowDiv.append('div').html('Available Windows')
        
    self.windowKeyDiv.append('span')
    .text(' (')
    
    self.windowKeyDiv.append('span')
        .classed('optionKey', true)
        .style('color', self.standardColor )
        .text(' Standard ')
    
        self.windowKeyDiv.append('span')
    .text(',')
    
    self.windowKeyDiv.append('span')
        .text(' Option ')
        .classed('optionKey', true)
        .style('color', self.optionColor)
    
    self.windowKeyDiv.append('span')
        .text(',')

    self.windowKeyDiv.append('span')
        .text(' Selected ')
        .classed('optionKey', true)
        .style('color', 'gray')
    
    self.windowKeyDiv.append('span')
        .text(')')

    // append mutli-select for window
    self.windowSelect = self.windowDiv
        .append('select')
        .attr('value','Product')
        .attr('multiple', 'true')
        .on('change', onChangeWindow)

    self.windowDiv
        .append('div')
        .text('(Hold shift or control to select multiple options)')
        .classed('subComment', true)
    
    // add a div to display orderable part codes
    self.codeList = self.controlDiv.append('div').text('Order Parts:')

    self.windowQeButtonDiv = d3.select("#interpCombinedQEButton")
                                .classed('interpButton', true);
    
    self.windowQeButton = self.windowQeButtonDiv
        .on('click', function(){
            plotInterp = !plotInterp;
            self.drawQE();
        });
    


    // advanced window div
    //self.advancedWindowDiv = self.controlDiv.append('div').classed('hidden', true);
    //self.showAdvancedWindows = false;

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

        // update the default window display
        d3.select('#defaultWindowDisplay').text(windowDict[defWind] + ' ' + defWind)

        // populate the window multi-select options
        self.windowSelect.selectAll('option').remove();
        var windowOptions = self.windowSelect
            .selectAll('option')
            .data(self.productObj['availableWindows']).enter()
            .append('option')
            .text(function (d) { return windowDict[d]; })
            .attr('value', function (d) { return d; })
            .style('background-color', function(d,i){
                if (i==0) return self.standardColor;
                if (i>0) return self.optionColor;
            });
        
        //check the first (default) option
        self.windowSelect.select('option').property('selected',true);
        
        onChangeWindow.call(self.windowSelect.node()); // fill in an initial value
        //self.drawTraces(mode = 'default');



        }

    // window pulldown callback
    function onChangeWindow(){
        console.log(this);
        self.activeWindows = [];
        selected = d3.select(this) // select the select
            .selectAll("option:checked")  // select the selected values
            .each(function() { 
                self.activeWindows.push(this.value);
                }); // for each of those, get its value
        console.log(self.activeWindows) 
        
        // draw the QE
        self.drawQE();
        
        self.drawTraces(self.activeWindows)
    }

        // draw traces method
        self.drawTraces = function(windowArray){
            // remove old traces from graph

            d3.selectAll('.legend').remove();
            self.legendG = self.svg.append('g').attr('class','legend')
            self.legendG.attr('transform', `translate(${self.canvasWidth/3.9 + 5}, ${3*self.canvasHeight/5})`)
            self.legendG.append('rect')
                .attr('fill','white')
                .attr('x',-5)
                .attr('y',-4)
                .attr('width', 200)
                .attr('height', windowArray.length * 12 + 8)
                .attr('stroke','black')

            self.svg.selectAll('path').remove();
            // update traces on graph
            for (var i in windowArray){
                var window = windowArray[i];
                var tag = optLUT[window + ' ' + self.product];
                if (debug){
                    console.log('Plotting: ', window, self.product, tag)
                }
                var dataObj = trans[tag]; // data to plot
                
                // add traces to graph
                self.svg.append('path') 
                    .attr('fill','none')
                    .attr('stroke', colorDict[windowArray[i]])
                    .attr('stroke-width', 3)
                    .attr('d', self.dataLine(dataObj))
                    .attr('stroke-dasharray', strokeDict[window.slice(-1)])
                    .attr("clip-path", "url(#clipBox)")
                    .on('mouseenter', function(){
                        console.log('mouseEnter')
                        console.log(d3.event.x, d3.event.y)
                    })
                    //.attr('stroke-dasharray', this.dashArray)

                // raise the white box
                
                
                // add legend text entry to graph
                var textEntry = self.legendG.append('text');
                textEntry.text(windowDict[window]).attr('alignment-baseline','hanging')
                var legendFontSize = 12;
                textEntry.attr('x', 20).attr('y', i*12).attr('font-size', legendFontSize)
                // add path entry to text
                self.legendG.append('line')
                    .attr('x1',0)
                    .attr('x2',15)
                    .attr('y1',legendFontSize/2 + i*legendFontSize)
                    .attr('y2',legendFontSize/2 + i*legendFontSize)
                    .attr('stroke', colorDict[window])
                    .attr('stroke-dasharray', strokeDict[window.slice(-1)])
                    .attr('stroke-width', 3)
                // update legend bounding box to fit text
                var legendBBox = d3.select('.legend').select('rect').node().getBBox();
                var textBBox = textEntry.node().getBBox();
                
                d3.select('.legend').select('rect').attr('width', Math.max(textBBox.width + 30, legendBBox.width));
                var legendBox = d3.select('.legend').select('rect');
                self.legendG.attr('transform', `translate(${self.xScale(self.xAxisMax) - legendBox.attr('width')}, ${3*self.canvasHeight/5})`)  
            }
                // remove previous windows
                self.codeList.selectAll('div').remove();
                // add window codes
                // need to re-jigger such that it won't print a window part if it's the default one
                // how to check the default window?

                function generateMiniBOM(part){
                    if (part != self.productObj.defaultWindow){
                        return '<ul> <li>' + self.product + ' </li>  <li>' + self.productObj.mechanicalSpecification + part + '</li> </ul>'
                    }
                    if (part = self.productObj.defaultWindow){
                        return '<ul> <li>' + self.product + ' </li> </ul>'
                    }
                }

                self.codeList
                    .selectAll('div')
                    .data(windowArray)
                    .enter()
                    .append('div')
                    .html(d=>generateMiniBOM(d))
                    .style('color', d=>colorDict[d])   
                    .style('font-weight',700)  

                    self.legendG.raise()
        }

        // draw QE method
        self.drawQE = function(){
            // remove old traces from graph

            self.svgQE.selectAll('.legend').remove();
            self.qe.legendG = self.svgQE.append('g').attr('class','legend')
            
            self.qe.legendG.attr('transform', `translate(${self.canvasWidth/2.7 + 5}, ${3*self.canvasHeight/5})`)
            
            /** 
            self.qe.legendG.append('rect')
                .attr('fill','white')
                .attr('x',-5)
                .attr('y',-4)
                .attr('width', 200)
                .attr('height', 1 * 20 + 8)
                .attr('stroke','black')
                */
            
            self.svgQE.selectAll('path').remove();
            // update traces on graph
                var dataObj = self.productObj.sensorQE; // data to plot
                // add traces to graph
                self.svgQE.append('path') 
                    .attr('fill','none')
                    .attr('stroke', '#666')
                    .attr('stroke-width', 3)
                    .attr('d', self.qe.dataLine(dataObj))
                    .attr("clip-path", "url(#clipBox)")

                if(plotInterp){
                    for (var w in self.activeWindows){
                        self.svgQE.append('path') 
                            .attr('fill','none')
                            .attr('stroke', colorDict[self.activeWindows[w]])
                            .attr('stroke-width', 3)
                            .attr('stroke-opacity', 0.4)
                            .attr('stroke-dasharray', strokeDict[self.activeWindows[w].slice(-1)])
                            .attr('d', self.qe.dataLine( interpZip(dataObj, trans[optLUT[self.activeWindows[w] + ' ' + self.product]]) ))
                            .attr("clip-path", "url(#clipBox)")
                    }
                }
                    //.attr('stroke-dasharray', this.dashArray)
                
                /** leaving this inactive for now
                // add legend text entry to graph
                var textEntry = self.legendG.append('text');
                textEntry.text(windowDict[window]).attr('alignment-baseline','hanging')
                textEntry.attr('x', 20).attr('y', i*20)
                // add path entry to text
                self.qe.legendG.append('line')
                    .attr('x1',0)
                    .attr('x2',15)
                    .attr('y1',10 + i*20)
                    .attr('y2',10 + i*20)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 3)
                // update legend bounding box to fit text
                var legendBBox = self.svgQE.select('.legend').select('rect').node().getBBox();
                var textBBox = textEntry.node().getBBox();
                d3.select('.legend').select('rect').attr('width', Math.max(textBBox.width + 30, legendBBox.width))
                */
                // add legend entry

    // a method to marshall data for a single line a plot into an exportable CSV string 
    this.parseData = function(name = 'y', data){
        var outputData = []
        var line = []
        var headings = ['Wavelength (nm)', name]
        outputData.push(headings.join(','))

        for (var l = 0; l < data.length; l++){
            line = [data[l].x, data[l].y];
            outputData.push(line.join(','))
        }
        return outputData.join('\n')    
    }

    //method to download data in the chart from the web page as csv
    self.downloadData = function (name, data) {
        var a = document.createElement('a');
        var mimeType = 'application/octet-stream';
        var data = self.parseData(name, data);
        var fileName = `${name}.csv`
        
        if (URL && 'download' in a) { 
            a.href = URL.createObjectURL(new Blob([data], {
              type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
         
        }
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

