import * as d3 from 'd3';

//setup container
let container = d3.select('#app');
container.append('h2').text('Circle and Path');

let lineMenu = container.append('div');
lineMenu.attr('class', 'line-menu')
    .text('sticky note');

//input: data format [[x1,y1],[x2,y2]] or [{x:x1, y:y1}, {x:x2,y:y2}]
//output: [xOffset, yOffset]
export function calculateDataOffset(data){
    let xOffset, yOffset;
    if(data.length > 0){
        //array
        if(data[0].length != null && data[0].length > 0){
            //console.log('two dimensional array');
            yOffset = d3.max(data.map(function(value, i){
                return value[1];
            })) + 20;
            xOffset = 20;
        }else{
            //treat as object inside of an array
            yOffset = d3.max(data.map(function(value, i){
                return value.y;
            })) + 20;
            xOffset = 20;
        }
    }else{
        //do nothing
        console.log('data format not recognized');
    }

    return [xOffset, yOffset];
}

export function drawScatteredPlot(svgContainer, data){
    let offsets = calculateDataOffset(data);
    let circle = svgContainer.selectAll('circle').data(data);//update&data bind
    //console.log(circle);
    circle.exit().remove();//exit&remove
    circle.enter().append('circle')
        .attr('fill', function(d){return "hsl(" + Math.random() * 360 + ",50%,50%)";})
        .merge(circle)
        .attr('cx', function(d){return d.x + offsets[0]; })
        .attr('cy', function(d){return (offsets[1]-d.y); }) //substraction is to move (0,0) to the bottom of the chart
        .attr('r', 10);
}

//my simple version
// export function drawJaggedPath(svgContainer, data){
//     console.log(data);
//     const path = "M" + data.map((value, index)=>{
//         return (value.x + 10) + ',' + (120 - value.y);
//     }).join('L');
    
//     svgContainer.append('path')
//         .attr('fill', 'transparent')
//         .attr('stroke', 'black')
//         .attr('stroke-width', 2)
//         .attr('d', path);
// }


export function manuallyDrawSVGCurvePath(svgContainer){
    const line = 'M 10,70 L 60,80 L 110,60 L 160,20 L 210,5';
    const cbcurve = 'M 10,70 C 15,50 60,50 60,80 S 110,100 110,60';
    const qbcurve = 'M 10,70 Q 30,65 60,80 T 110,60 160,20 210,5'
    let testPath = cbcurve;
    svgContainer.append('path')
        .attr('fill', 'transparent')
        .attr('stroke', 'black')
        .attr('stroke-width', 3)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('d', testPath);
}


/**
 * draw jagged curve path
 */
//equivalent arrow function
//const lineCommad = point => `L ${point[0]} ${point[1]}`;
const lineCommad = function(point){
    return `L ${point[0]} ${point[1]}`;
}

/**
 * draw smooth curve path
 */

const line = function(pointA, pointB){
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];

    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}

const controlPoint = function(current, previous, next, reverse){
    const p = previous || current;
    const n = next || current;
    const smoothing = 0.2;

    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;

    return [x, y]; //returns the control point of current point
}


const bezierCommand = function(point, i, a){
    //start control point
    const [cpsX, cpsY] = controlPoint(a[i-1], a[i-2], point);
    //end control point
    const [cpeX, cpeY] = controlPoint(point, a[i-1], a[i+1], true);

    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
}


export function drawSmoothPath(container, data){
    let offsets = calculateDataOffset(data);

    //process data befire visualization
    let _data = data.map(function(value, index){
        return [(value[0] + offsets[0]),(offsets[1] - value[1])];
    })

    //generate path using processed data
    const d = _data.reduce(function(acc, point, i , a){
        //console.log(acc);
        //console.log(point);
        //console.log(i);
        //console.log(a);
        let _point = point.slice();
        // _point[0] = point[0] + 10;
        // _point[1] = 100 - point[1];
        if(i === 0){
            return `M ${_point[0]},${_point[1]}`;
        }else{
            return `${acc} ${bezierCommand(_point, i, a)}`;
        }
    }, '');

    //append path to svg
    container.append('path')
        .attr("fill", 'none')
        .attr("stroke", 'grey')
        .attr('d', d);
}

export function drawJaggedPath(container, data){
    let offsets = calculateDataOffset(data);

    //process data befire visualization
    let _data = data.map(function(value, index){
        return [(value[0] + offsets[0]),(offsets[1] - value[1])];
    })

    //generate path using processed data
    const d = _data.reduce(function(acc, point, i , a){
        //console.log(acc);
        //console.log(point);
        //console.log(i);
        //console.log(a);
        let _point = point.slice();
        // _point[0] = point[0] + 10;
        // _point[1] = 100 - point[1];
        if(i === 0){
            return `M ${_point[0]},${_point[1]}`;
        }else{
            return `${acc} ${lineCommad(_point, i, a)}`;
        }
    }, '');

    //append path to svg
    container.append('path')
        .attr("fill", 'none')
        .attr("stroke", 'grey')
        .attr('d', d);
}

