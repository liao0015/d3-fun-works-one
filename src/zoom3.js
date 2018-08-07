import * as d3 from 'd3';

d3.select('#zoom3').append('h2').text('D3 zoom and drag');
let svg = d3.select("#zoom3").append('svg:svg')
    .attr("width", 400)
    .attr("height", 400);

let radius = 20;
let circle_data = d3.range(50).map(function() {
    return{
        x : Math.round(Math.random() * (400 - radius*2 ) + radius),
        y : Math.round(Math.random() * (400 - radius*2 ) + radius)
    }; 
});

export function d3zoomdrag2(zoomer){
    
    svg.selectAll('*').remove();

    var rect = svg.append("g")
    .attr("class", "rect")
    .append("rect")
    .attr("width", 400)
    .attr("height", 400)
    .style("fill", "#757575");

    //funky yellow circles   
    let circles = svg.append("g").attr("class", "circles")
    .selectAll("circle")
        .data(circle_data).enter()
        .append("circle")
        .attr("cx", function(d) {return(d.x)})
        .attr("cy", function(d) {return(d.y)})
        .attr("r", radius)
        .attr("fill", "#FFC107");


    if(zoomer === 'rectangle'){
        // alert('rectangle');
        svg.call(d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on("zoom", rectzoomed));
        
        function rectzoomed() {
            rect.attr("transform", d3.event.transform);
        }
    }else if(zoomer === 'circles'){
        // alert('circle');
        //zoom and drag on g
        svg.call(d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on("zoom", zoomed));

        function zoomed() {
            circles.attr("transform", d3.event.transform);
        }
    }else{
        // alert('default');
        svg.call(d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on("zoom", zoomed));

        function zoomed() {
            circles.attr("transform", d3.event.transform);
        }
    }
   
    /**
     * Another way of doing this whole thing, but much less effective...
     */
    //let zoomHandler = d3.zoom().on("zoom", zoom_actions);

    //works well on zoom but not so well on drag
    //zoomHandler(rect);

    //this will only apply to individual circles
    //zoomHandler(circles);
}

//in general this is not a good way...
function zoom_actions(){
    let transform = d3.zoomTransform(this);
    this.setAttribute("transform", transform);
}