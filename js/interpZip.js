// ok, I need a function that will take two lits of json x,y points and return their product, interpolating one onto the other
// first a function to interpolate given 

function Interp(paramObj){

    var self = this;

   // copy values from parameter object to self
   Object.keys(paramObj).forEach(function(k){self[k]=paramObj[k]})

   var response = {}
   self.QE.forEach(function(d){response[d.x]=d.y});
   self.QE = response;

    // function getQE() to return an interpolated QE based on known points
   this.getVal = function(lambda){
        // put your goggles on this is about to get GROSS
        var wavelengths = Object.keys(self.QE).map(parseFloat)
        wavelengths.sort(function(a,b){return a-b})  // sort the wavelength keys in case they're out of order
        var indexAbove = wavelengths.findIndex( function(x){return x>lambda});
        var wavelengthBounds = [wavelengths[indexAbove-1], wavelengths[indexAbove]];
        var QEBounds = [self.QE[wavelengthBounds[0]], self.QE[wavelengthBounds[1]]];
        
        // calculate the slope for linear interpolation
        var M = (QEBounds[1]-QEBounds[0])/(wavelengthBounds[1]-wavelengthBounds[0])

        // return a linearly interpolated value for the QE at a specific wavelength lambda
        return M*(lambda - wavelengthBounds[1]) + QEBounds[1]
   }

}

function interpZip(a,b){
    // multiply, with interpolation, two lists of json objects with x,y points
    //var ai = new Interp({'QE' : a});
    var bi = new Interp({'QE' : b});

    var product = [];
    for (var i = 0; i < a.length; i++){
        var newVal = {};
        newVal['x'] = a[i].x;
        newVal['y'] = (a[i].y * bi.getVal(a[i].x)/100)|0;
        product.push(newVal);
    };
    return product;
}