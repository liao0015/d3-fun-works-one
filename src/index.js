import * as d3 from 'd3';
import {line_data, cbc_points, cbc_data, dropdown_data} from './data'; 
import {testDataJoining} from './selection';
import {drawCircles, generateMenu} from './zoom1';
import {drawScatteredPlot, drawSmoothPath, drawJaggedPath} from './curvepath';
import {d3zoomdrag} from './zoom2';
import {d3zoomdrag2} from './zoom3';
import {generateSideMenu1} from './components/sideMenu1';

/**
 * zoom3.js
 */
d3zoomdrag2('circles');
generateSideMenu1(d3.select('#zoom3'));

let inputs = d3.select('#side-menu-1').selectAll('input');
console.log(inputs);

//check the first element as default
let first = inputs.filter(function(d, i){return i === 1;}).attr('checked', 'checked');
console.log(first);

//select the currently checked element
let checked = inputs.filter("input:checked");
let checked_note = d3.select('#side-menu-1').append('p');
checked_note.text(checked.data() + ' is selected');

d3.select('#radio-container').on('change', function(){
    console.log(d3.event);
    //update checked element and note
    checked = inputs.filter("input:checked");
    checked_note.text(checked.data() + ' is selected');

    //re-draw the svg 
    console.log(checked.data()[0]);
    d3zoomdrag2(checked.data()[0]);
});


/**
 * zoom2.js
 */
d3zoomdrag();

/**
 * zoom1.js
 */
generateMenu(1, dropdown_data[0]);
drawCircles(1);

 //get default scaler value, global accessible value
 let scale_value = d3.select('#scaler').attr('value');

 //click event listener on each item
 d3.selectAll('.dropdown-item').on('click', function(d){
    //console.log(d);
    //update slider
    d3.select('#zoom1').select('#zoom1-menu').select('#scaler').attr('value', scale_value);
    d3.select('#zoom1').select('#zoom1-menu').select('label').text(`Current scale: ${scale_value}`);
    //set and update dropdown button text value 
    d3.select('.dropbtn').text(d);
    //update circles
    drawCircles(scale_value);
 },false);

if(document.querySelector('#scaler')){
    document.querySelector('#scaler').addEventListener('change', function(evt){
        //console.log(evt.target.value);
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




