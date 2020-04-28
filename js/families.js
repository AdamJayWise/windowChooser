// json structure of the product families
var families = {

    // zyla 
    'Zyla' : {
        'ZYLA-5.5-XXX(-X)' : 
        {
            'displayName' : 'ZYLA-5.5-XXX(-X)',
            'mechanicalSpecification' : 'WN45FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['Zyla55'],
        },

        'ZYLA-4.2P-XXX(-X)' : 
        {
            'displayName' : 'ZYLA-4.2P-XXX(-X)',
            'mechanicalSpecification' : 'WN45FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['Zyla42'],
        },
    },

    // Neo
    'Neo' : {
        'NEO-5.5-XXX(-X)' : 
        {
            'displayName' : 'NEO-5.5-XXX(-X)',
            'mechanicalSpecification' : 'WN45FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W', '(BB-VV-NR)U', '(BB-VV-NR)W'],
            'sensorQE' : qe['Zyla55'],
        },
    },

    // Balor zone
    'Balor' : {
        'BLR-F401-(F or W)' : 
        {
            'displayName' : 'BLR-F401-(F or W)',
            'mechanicalSpecification' : 'WN118FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W'],
            'sensorQE' : qe['Balor'],
        },
    },

    // iKon-XL product family
    'iKon-XL' : {
        'XL-EA02-XX (iKon XL 230 BB)' : 
        {
            'displayName' : 'XL-EA02-XX (iKon XL 230 BB)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BBikonXL-100C'],
        },


        'XL-EA02-CS (iKon XL 230 BB)' : 
        {
            'displayName' : 'XL-EA02-CS (iKon XL 230 BB)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BBikonXL-100C'],
        },


        'XL-EA02-D0 (iKon XL 230 BB)' : 
        {
            'displayName' : 'XL-EA02-D0 (iKon XL 230 BB)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BBikonXL-100C'],
        },


        'XL-EA02-DS (iKon XL 230 BB)' : 
        {
            'displayName' : 'XL-EA02-DS (iKon XL 230 BB)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BBikonXL-100C'],
        },


        'XL-EA01-XX (iKon XL 230 BV)' : 
        {
            'displayName' : 'XL-EA01-XX (iKon XL 230 BV)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BV'],
        },


        'XL-EA01-CS (iKon XL 230 BV)' : 
        {
            'displayName' : 'XL-EA01-CS (iKon XL 230 BV)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BV'],
        },


        'XL-EA01-D0 (iKon XL 230 BV)' : 
        {
            'displayName' : 'XL-EA01-D0 (iKon XL 230 BV)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BV'],
        },


        'XL-EA01-DS (iKon XL 230 BV)' : 
        {
            'displayName' : 'XL-EA01-DS (iKon XL 230 BV)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BV'],
        },


        'XL-EA04-C0 (iKon XL 231 BB)' : 
        {
            'displayName' : 'XL-EA04-C0 (iKon XL 231 BB)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BBikonXL-100C'],
        },


        'XL-EA04-CS (iKon XL 231 BB)' : 
        {
            'displayName' : 'XL-EA04-CS (iKon XL 231 BB)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BBikonXL-100C'],
        },


        'XL-EA04-D0 (iKon XL 231 BB)' : 
        {
            'displayName' : 'XL-EA04-D0 (iKon XL 231 BB)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BBikonXL-100C'],
        },


        'XL-EA04-DS (iKon XL 231 BB)' : 
        {
            'displayName' : 'XL-EA04-DS (iKon XL 231 BB)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BBikonXL-100C'],
        },


        'XL-EA05-XX (iKon XL 231 BEX2)' : 
        {
            'displayName' : 'XL-EA05-XX (iKon XL 231 BEX2)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BEX2-100C'],
        },


        'XL-EA05-CS (iKon XL 231 BEX2)' : 
        {
            'displayName' : 'XL-EA05-CS (iKon XL 231 BEX2)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BEX2-100C'],
        },


        'XL-EA05-D0 (iKon XL 231 BEX2)' : 
        {
            'displayName' : 'XL-EA05-D0 (iKon XL 231 BEX2)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BEX2-100C'],
        },


        'XL-EA05-DS (iKon XL 231 BEX2)' : 
        {
            'displayName' : 'XL-EA05-DS (iKon XL 231 BEX2)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BEX2-100C'],
        },


        'XL-EA07-C0 (iKon XL 231 BEX2-DD)' : 
        {
            'displayName' : 'XL-EA07-C0 (iKon XL 231 BEX2-DD)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BEX2-DD'],
        },


        'XL-EA07-CS (iKon XL 231 BEX2-DD)' : 
        {
            'displayName' : 'XL-EA07-CS (iKon XL 231 BEX2-DD)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BEX2-DD'],
        },


        'XL-EA07-D0 (iKon XL 231 BEX2-DD)' : 
        {
            'displayName' : 'XL-EA07-D0 (iKon XL 231 BEX2-DD)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BEX2-DD'],
        },


        'XL-EA07-DS (iKon XL 231 BEX2-DD)' : 
        {
            'displayName' : 'XL-EA07-DS (iKon XL 231 BEX2-DD)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BEX2-DD'],
        },


        'XL-EA06-C0 (iKon XL 231 BR-DD)' : 
        {
            'displayName' : 'XL-EA06-C0 (iKon XL 231 BR-DD)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BR-DD'],
        },


        'XL-EA06-CS (iKon XL 231 BR-DD)' : 
        {
            'displayName' : 'XL-EA06-CS (iKon XL 231 BR-DD)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BR-DD'],
        },


        'XL-EA06-D0 (iKon XL 231 BR-DD)' : 
        {
            'displayName' : 'XL-EA06-D0 (iKon XL 231 BR-DD)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BR-DD'],
        },


        'XL-EA06-DS (iKon XL 231 BR-DD)' : 
        {
            'displayName' : 'XL-EA06-DS (iKon XL 231 BR-DD)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BR-DD'],
        },


        'XL-EA03-C0 (iKon XL 231 BV)' : 
        {
            'displayName' : 'XL-EA03-C0 (iKon XL 231 BV)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BV'],
        },


        'XL-EA03-CS (iKon XL 231 BV)' : 
        {
            'displayName' : 'XL-EA03-CS (iKon XL 231 BV)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BV'],
        },


        'XL-EA03-D0 (iKon XL 231 BV)' : 
        {
            'displayName' : 'XL-EA03-D0 (iKon XL 231 BV)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BV'],
        },


        'XL-EA03-DS (iKon XL 231 BV)' : 
        {
            'displayName' : 'XL-EA03-DS (iKon XL 231 BV)',
            'mechanicalSpecification' : 'WN--FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['BV'],
        },

    },

    'iKon L' : {
        // models 
        'DW936N-#BV' : 
        {
            'displayName' : 'iKon L DW936N-#BV',
            'mechanicalSpecification' : 'WN60FS',
            'defaultWindow' : '(BB-VS-NR)U' ,
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VV-NR)U',],
            'sensorQE' : qe['BV'],
        },

    },

    'Marana' : {
        // Sona models 
        'Marana 4BV-11' : 
        {
            'displayName' : 'Marana 4.2BV-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U' ,
            'availableWindows' : [ '(BB-VS-NR)U','(BB-VV-NR)U', '(VS-NR-ENH)W'],
            'sensorQE' : qe['Marana TVISB'],
        },

        'Marana-4BU11' : 
        {
            'displayName' : 'Marana 4.2BU-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VV-NR)U',
            'availableWindows' : ['(BB-VV-NR)U'],
            'sensorQE' : qe['Marana UV'],
        },

        'Marana-4VB6' : 
        {
            'displayName' : 'Marana 4.2BV-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U'],
            'sensorQE' : qe['Sona6'],
        },

    },

    'Sona' : {
        // Sona models 
        'Sona-4BV11' : 
        {
            'displayName' : 'Sona 4.2B-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W'],
            'sensorQE' : qe['Marana TVISB'],
        },

        'Sona-2BV11' : 
        {
            'displayName' : 'Sona 2.0B-11',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W'],
            'sensorQE' : qe['Marana TVISB'],
        },

        'Sona-4BV6' : 
        {
            'displayName' : 'Sona 4.2B-6',
            'mechanicalSpecification' : 'WN50FS',
            'defaultWindow' : '(BB-VS-NR)U',
            'availableWindows' : ['(BB-VS-NR)U', '(BB-VS-NR)W'],
            'sensorQE' : qe['Sona6'],
        }

    }
}