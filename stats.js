var promise = d3.csv("Basketball.csv");

promise.then(function(data)

{
    setup(data)
}),

    function(Error)
{
    return ("fail", Error)
}
//so changes can be made easily
var screen = {width:825, height:800}
var margins = {top:20, right:125, bottom:50, left:85}

// setup svg to build graph
var setup = function(data)
{
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .append("g")
    .attr("id", "graph")
    .attr("transform", "translate("+margins.left+", "+margins.top+")");

    
var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;
    
var xScale = d3.scaleLinear()
            .domain([2009, 2018])
            .range([0, width])

var yScale = d3.scaleLinear()
            .domain([-15, 15])
            .range([height,0])
//sets up axis

var xAxis = d3.axisBottom(xScale)
var yAxis = d3.axisLeft(yScale)
var cScale = d3.scaleOrdinal(['#0047AB','#C6C6C6','#FF0000','#808080','#000000']) // matches colors on legend

var svg = d3.select("svg")
    .append("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .attr("id", "graph")
    .attr("transform", "translate("+margins.left+", "+margins.top+")");
    
svg.append("text")
    .attr("transform", "translate("+ (margins.left + 290)+", "+(margins.top+ height + 50)+")")
    .style("text-anchor", "middle")
    .text("Year")
    
d3.select("svg")
    .append("g")
    .attr("class", "axis");
    
d3.select(".axis")
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate("+margins.left+", "+(margins.top+height)+")")
    .call(xAxis)
    
svg.append("svg")
     .attr("width", screen.width)
    .attr("height", screen.height)
    .attr("id", "graph")
    

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", (margins.left-50))
    .attr("x", 0- (height/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Kentucky Minus Louisville Stats")
    
d3.select("svg")
    .append("g")
    .attr("class", "axis");
    
d3.select(".axis")
    .append("g")
    .attr("id", "yAxis")
    .attr("transform", "translate("+margins.left+", "+ margins.top +")")
    .call(yAxis)
    
//finish axis and append text and put them in respect of margins
    
drawLine(data, xScale, yScale, cScale, "WINS")
drawLine(data, xScale, yScale, cScale, "Draft")
drawLine(data, xScale, yScale, cScale, "PPG")
drawLine(data, xScale, yScale, cScale, "MCD")
drawLine(data, xScale, yScale, cScale, "RIV")

   
    //select each category from csv file make button with on click (repeat over and over for each button)
d3.select(".WINS")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "WINS")
    drawplots(data, xScale, yScale, cScale, "WINS")
   
})
    
//
d3.select(".Draft")
    .text("Players drafted per Year")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "Draft")
    drawplots(data, xScale, yScale, cScale, "Draft")
})

d3.select(".PPG")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "PPG")
    drawplots(data, xScale, yScale, cScale, "PPG")
})

d3.select(".MCD")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "MCD")
    drawplots(data, xScale, yScale, cScale, "MCD")
   
})

d3.select(".RIV")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "RIV")
    drawplots(data, xScale, yScale, cScale, "RIV")
})
    drawLegend(columns, cScale)
   
d3.select("#graph")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    
    //add circles to each given point
    
}
//make legend and try to add cscale
var columns = 
    ["WINS","Draft","PPG","MCD","RIV"]
var drawLegend = function(columns, cScale)
{
    d3.select("svg")
        .append("g")
        .attr("id", "legend")
        .attr("transform", "translate("+(screen.width-margins.right + 30)+", "+(margins.top)+")");       
var gs = d3.select("#legend")
.selectAll("g")
.data(columns)
.enter()
.append("g")
.attr("transform", function(columns,i)
{
    return "translate(0, "+(i*14)+")";
})
    
gs.append("rect").attr("width", 35).attr("height", 10).attr("fill", function(columns)
{
    return cScale(columns);

})
    
    
gs.append("text")
    .text(function(d){return d})
    .attr("x", 40)
    .attr("y", 10)
    
    
}
//cant get to work not sure issue for all things below
//num or dimension is screwing up I think or wrong peramter somwhere 

var drawLine= function(data, xScale, yScale, cScale, dimension)
{
var arrays = d3.select("#graph")
    .append("g")
    .attr("fill", "none")
    .attr("stroke", cScale(dimension))
    .attr("stroke-width", 4)
    
var lineGenerator= d3.line()
        .x(function(num) { return xScale(num.Year);})
        .y(function(num) { return yScale(num['dimension']);})
        

arrays.append("path") 
    .datum(data)
    .attr("d", lineGenerator)
}

var drawplots = function(data, xScale, yScale, cScale, dimension)
{
    d3.select("#graph")
    .selectAll("circle")
    .data(data)
    .transition()
    .duration(50)
    .attr("fill", function(trash)
    {
        return cScale(dimension)
    })
    .attr("cx", function(num)
          {
        return xScale(num.Year)
    })
    .attr("cy", function(num)
         {
    
        return yScale(num['dimension'])
    })
    .attr("r", 4)
   
    
}