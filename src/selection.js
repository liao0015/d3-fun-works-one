import * as d3 from 'd3';

const data = [3,4,5];

const other = [6,7,8];

// a testing function to show 
export function testDataJoining(){
    var container = d3.select('#data-binding');
    container.append('h2').text('Data binding');
    container.append('div');
    container.append('div');
  
    
    var divs = container.selectAll('div');


    /**the functions go together 
     * without merge()
    */
    // var _divs = divs.data(data);

    // _divs.style('width', function(d){return d*100 + 'px';})
    //     .style('height', '15px')
    //     .style('background-color', 'orange')
    //     .style('margin', '10px')
    //     .text(function(d){return d;});
    
    // _divs.enter().append('div')
    //     .style('width', function(d){return d*100 + 'px';})
    //     .style('height', '5px')
    //     .style('background-color', 'teal')
    //     .style('margin', '10px')
    //     .text(function(d){return d;});

    /**the functions go together:
     * with merge()
     * this performs the same function as the above, but returns a new selection
    */
    var _divs = divs.data(data)
        .style('width', function(d){return d*100 + 'px';})
        .style('height', '15px')
        .style('background-color', 'orange')
        .style('margin', '10px')
        .text(function(d){return d;});//update, divs with data binding

    //merge() after style update
    var _divM = _divs.enter().append('div')
        .text(function(d){return d;}) //update style on enter() selection
        .style('width', function(d){return d*100 + 'px';})
        .style('height', '15px')
        .style('background-color', 'yellow')
        .style('margin', '10px')
        .merge(_divs);
    

    // you can perform merge befre updating the styles, which gives different effect
    var _divM = _divs.enter().append('div')
        .merge(_divs)
        .text(function(d){return d;}) //update style on enter() selection
        .style('width', function(d){return d*100 + 'px';})
        .style('height', '15px')
        .style('background-color', 'teal')
        .style('margin', '10px');

    //console.log(_divM);//_divM is the merged new selection

    //_divs.exit().remove();//remove divs without data
    _divs.exit() //show the removed div
        .style('width', '200px')
        .style('height', '15px')
        .style('background-color', 'lightblue')
        .style('margin', '10px')
        .text('No data');
    
    //console.log(divs);
    //console.log(_divs);
    //console.log(_divs.enter());
    //console.log(_divs.exit());
}



