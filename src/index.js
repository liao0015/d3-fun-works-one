import * as d3 from 'd3';
import {line_data, cbc_points, cbc_data, dropdown_data} from './data'; 
import {testDataJoining} from './selection';
import {drawCircles, generateMenu} from './zoom1';
import {drawScatteredPlot, drawSmoothPath, drawJaggedPath} from './curvepath';

/**
 * zoom1.js
 */
generateMenu(1, dropdown_data[0]);
drawCircles(1);

 //get default scaler value, global accessible value
 let scale_value = d3.select('#scaler').attr('value');

 //click event listener on each item
 d3.selectAll('.dropdown-item').on('click', function(d){
     console.log(d);
     //update menu -> redraw slider mostly
     generateMenu(scale_value, d);
     //update circles
     drawCircles(scale_value);
 },false);

if(document.querySelector('#scaler')){
    document.querySelector('#scaler').addEventListener('change', function(evt){
        console.log(evt.target.value);
        scale_value = evt.target.value;
        //update scale lable
        d3.select('#zoom1').select('label').text(`Current scale: ${scale_value}`);
        //update circles
        drawCircles(scale_value);
    },false);
}

/**
 * selection.js
 */
testDataJoining();


/**
 * curvepath.js
 */

//setup drawing board
let appCanvas = d3.select('#app').append('svg:svg');
appCanvas.attr('width', 300)
    .attr('height', 200)
    .style('background-color', '#fafafa');

//draw stuff
drawScatteredPlot(appCanvas, line_data);

drawSmoothPath(appCanvas, cbc_data);
drawJaggedPath(appCanvas,cbc_data);




