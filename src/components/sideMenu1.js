import * as d3 from 'd3';
import {CustomeRadioButton} from './RadioButton';

export function generateSideMenu1(container){
    let menu = container.append('div').attr('id', 'side-menu-1');
    menu.style('width', '250px')
        .style('height', '300px')
        .style('border', '2px solid black')
        .style('float', 'right');
    
    CustomeRadioButton(menu);
}   