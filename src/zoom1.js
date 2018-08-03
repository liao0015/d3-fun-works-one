import * as d3 from 'd3';
import {dropdown_data} from './data';
import './zoom1.css';

const container = d3.select('#zoom1');
container.append('h2').text('Zoom 1');
const svg = container.append('svg:svg');
svg.attr('width', 400)
    .attr('height', 400);

export function drawCircles(scale_value){
    svg.selectAll('*').remove();
    //upate zoom handler
    let zoom_handler = d3.select('.dropbtn').text();
    //console.log(zoom_handler);
    if(zoom_handler === 'translate-scale'){
        generateCircles();
        customZoom(svg, scale_value);
    }else{
        generateCircles();
        scaleWithViewbox(svg, scale_value, zoom_handler);
    }
}

function generateCircles(){

    let radius = 10;
    let width = svg.attr('width');
    let height = svg.attr('height');

    let circle_data = d3.range(100).map(function(){
        return{
            x: Math.round(Math.random() * (width - radius*2) + radius),
            y: Math.round(Math.random() * (height - radius*2) + radius)
        };
    });

    let circles = svg.append('g')
        .attr('class', 'circles')
        .selectAll('circle')
            .data(circle_data)
            .enter()
            .append("circle")
            .attr('class', function(d){
                if(d.x > 200){
                    if(d.y > 200){
                        return 'bottom-right';
                    }else{
                        return 'top-right';
                    }
                }else{
                    if(d.y > 200){
                        return 'bottom-left';
                    }else{
                        return 'top-left';
                    }
                }
            })
            .attr('cx', function(d){return d.x;})
            .attr('cy', function(d){return d.y;})
            .attr('r', radius)
            .attr('fill', 'lightblue');

    svg.selectAll('.top-left').attr('fill', '#7B1FA2');
    svg.selectAll('.bottom-left').attr('fill', '#AFB42B');
    svg.selectAll('.top-right').attr('fill', '#00796B');
    svg.selectAll('.bottom-right').attr('fill', '#F57C00');
}

function customZoom(container, scale){
    //Doesn't work if svg uses percetages
    console.log(scale);
    let width = container.attr('width');
    let height = container.attr('height');
    const originalView = '0 0 ' + width + ' ' + height;
    // works well all by itself
    // have some strange behaviors when switching between viewbox to this one
    // i think it's because scale works differently in viewbox
    //I figured it OUT!!
    //because we need to reset viewbox!! :)
    container.attr('viewBox', originalView);
    container.select('g').attr('transform', `translate(${width/2}, ${height/2}) scale(${scale}) translate(-${width/2}, -${height/2})`);

    //This method does NOT work well when scale is less than 1
    // if(scale >= 1){
    //     container.select('g').attr('transform', `translate(${width/scale}, ${height/scale}) scale(${scale}) translate(-${width/scale}, -${height/scale})`);
    // }else{
    //     container.select('g').attr('transform', `translate(${width*scale}, ${height*scale}) scale(${scale}) translate(-${width*scale}, -${height*scale})`);
    // }
    
}

function scaleWithViewbox(container, scale, view){
    //can only target svg instead of g element
    let width = container.attr('width');
    let height = container.attr('height');
    const originalView = '0 0 ' + width + ' ' + height;

    let scaledView = originalView;

    if(view === 'viewbox-top-left'){
        //scale up from the top left corner
        scaledView = '0 0 ' + (width/scale) + ' ' + (height/scale);
    }else if(view === 'viewbox-bottom-right'){
        //scale up from the bottom right corner
        scaledView =  (width - (width*scale)) + ' ' + (height - (height*scale)) + ' ' + width*scale + ' ' + height*scale; 
    }else if(view === 'viewbox-center'){
        //scale up from the center
        scaledView =  (width - (width/scale))/2 + ' ' + (height - (height/scale))/2 + ' ' + (width/scale) + ' ' + (height/scale); 
    }else{
        //default
        scaledView = '0 0 ' + (width/scale) + ' ' + (height/scale);
    }
    
    //update viewbox attribute
    //console.log(scaledView);
    container.attr('viewBox', scaledView);
}

export function generateMenu(scale, dropdown_item_value){
    //menu
    let menu = d3.select('#zoom1').append('div').attr('id', 'zoom1-menu');
    menu.selectAll('*').remove();
    menu.style('width', '250px')
        .style('height', '300px')
        .style('border', '2px solid black')
        .style('float', 'right');
    
    addDropdownMenu(menu, dropdown_data);
    addSlider(menu);

    //set <input> default value
    menu.select('#scaler').attr('value', scale);
    menu.select('label').text(`Current scale: ${scale}`);
    //set and update dropdown button text value 
    d3.select('.dropbtn').text(dropdown_item_value);
}

function addDropdownMenu(container, items){
    let dropdown_container = container.append('div').attr('class', 'dropdown');
    let dropdown_btn = dropdown_container.append('button').attr('class', 'dropbtn').text('Options');
    let dropdown_content = dropdown_container.append('div').attr('class', 'dropdown-content');
    dropdown_content.selectAll('div').data(items)
        .enter().append('div')
        .attr('class', 'dropdown-item')
        .attr('data-item', function(d){return d;})//set data- attribute
        .text(function(d){return d; });
}

function addSlider(container){
    let scaler = container.append('div').attr('id', 'scaler-wrapper')
        .style('padding', '10px')
        .style('margin', '10px 0px');
    //add <label>
    scaler.append('label')
        .style('width', '100%')
        .attr('for', 'ranger')
        .text('Scale');
    //add scale <input>
    scaler.append('input')
        .style('width', '100%')
        .attr('id', 'scaler')
        .attr('name', 'ranger')
        .attr('type', 'range')
        .attr('step', '0.2')
        .attr('min', '0')
        .attr('max', '2');
}
