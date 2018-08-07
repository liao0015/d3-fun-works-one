import * as d3 from 'd3';
import './RadioButton.css';

const data = [
    'rectangle',
    'circles'
];

export function CustomeRadioButton(container){
    let radioContainer = container.append('div').attr('id', 'radio-container');
    let labelContainer = radioContainer.selectAll('label')
        .data(data)
        .enter().append('label')
            .attr('class','label-container')
            .text(function(d){return d;});
    labelContainer.append('input')
        .attr('type', 'radio')
        .attr('name', 'radio');

    labelContainer.append('span')
        .attr('class', 'checkmark');
    
}