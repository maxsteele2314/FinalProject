var screen = {width: 1300, height: 800};
var margins = {top: 40, right: 60, bottom: 60, left: 51};

var Promise = d3.csv("BasketballScores.csv")
    Promise.then(
        function(data)
    {
         d3.select("#click")
        .on("click", function(d){
    
    
    setup2(data)
})
        svg2(data)
        setup(data)
        console.log("success", data);
    },
        function(err)
    {
        console.log("fail", err)  
    })


var setup = function(array)
{
    var svg = d3.select("#graph1")
        .attr("width", screen.width)
        .attr("height", screen.height)
        .append("g")
        .attr("id", "graph")
        .attr("transform","translate("+margins.left+
                            ","+margins.top+")");
              
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
                    .domain([2/5/1913,12/29/2018])
                    .range([0,width])
    
    var yScale = d3.scaleLinear()
                    .domain([0,110])
                    .range([height,0])
    
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("#graph1")
        .append("g")
        .classed("axis",true);
    
    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+margins.left+","+(margins.top+height) +")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform","translate(50,"+margins.top+")")
        .call(yAxis)
        .call(yAxis)
    
    Kentucky(array,xScale,yScale,cScale) 
    Louisville(array,xScale,yScale,cScale) 

}

var Kentucky = function(array,xScale,yScale,cScale)
{
    d3.select("#graph1")
    .append("path")
    .datum(array)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 4)
    .attr("d", d3.line()
    .x(function(d)
   {
    var date = parseInt(d.Date)
        return xScale(date)
   })
    .y(function(d)
    {
    var kScore = parseInt(d.Kentucky)
        return yScale(kScore)
    }))
    .on("mouseover", function(d) {
        
    d3.select("#tooltip")
    .style("left", (d3.event.pageX + 20) + "px")
    .style("top", (d3.event.pageY - 25) + "px")
    .select("#value")
    .text("Kentucky Points Scored")
    
    d3.select("#tooltip")
    .classed("hidden", false)
    })
    
    .on("mouseout", function() {
        
        
    d3.select("#tooltip")
    .classed("hidden", true);
        
    })      
}
    
var Louisville = function(array,xScale,yScale,cScale)
{
    d3.select("#graph1")
    .append("path")
    .datum(array)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 4)
    .attr("d", d3.line()
    
    .x(function(d)
   {
    var date = parseInt(d.Date)
        return xScale(date)
   })
    .y(function(d)
    {
    var lScore = parseInt(d.Louisville)
        return yScale(lScore)
    }))
    .on("mouseover", function(d) {
        
    d3.select("#tooltip")
    .style("left", (d3.event.pageX + 20) + "px")
    .style("top", (d3.event.pageY - 25) + "px")
    .select("#value")
    .text("Louisville Points Scored");
    
    d3.select("#tooltip")
    .classed("hidden", false)
    })
    
    .on("mouseout", function() {
        
        
    d3.select("#tooltip")
    .classed("hidden", true);
        
    }) 

}
