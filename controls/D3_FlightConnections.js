
// Siehe : https://a.kabachnik.info/how-to-include-external-javascript-libraries-in-sap-ui5.html
// jQuery.sap.registerModulePath('thirdparty/d3v4', 'libs/d3.v4.min');

// RadarChart ist d3.v3 -> wie SAPUI5-version
//jQuery.sap.require("sap/ui/thirdparty/d3");
jQuery.sap.registerModulePath('thirdparty/d3v4', 'libs/d3.v4.min');
jQuery.sap.registerModulePath('thirdparty/topojsonv1', 'libs/topojson.v1.min');

sap.ui.define([
'sap/ui/core/Control',
'sap/ui/core/HTML',
'sap/ui/core/ResizeHandler'
,
'thirdparty/d3v4'
,
'thirdparty/topojsonv1'
], function(Control, HTML, ResizeHandler)
{
    'use strict';
    return Control.extend('wohland.de.controls.D3_RadarChart',
    {
        metadata: {
            aggregations: {
                _html: {
                        type : 'sap.ui.core.HTML',
                        multiple: false,
                        visibility: 'hidden'
                } 

            }
        },
        init: function() {
            this._sContainerId = this.getId() + '--container';
            const width = this.$().width();
            const height = this.width * 1;                                     

            this._sWidth  = width + 'px';
            this._sHeight = height + 'px';                       
//            const width  = $(window).width();                                
//            const height = width * 1;          

//            var sSvg = `<svg id="${this._sContainerId}" width="`;
//            var sSvg = '<svg id=\"${this._sContainerId}\" width=\"' + width + 'px\" height=\"' + height + 'px\" viewbox=\"100 0' + ' ' + width + ' '  + height + '\"' + '></svg>\"';
//            console.log('width : '  + width);
//            console.log('height : ' + height);                        
//            console.log('sSvg : ' + sSvg);



            this.setAggregation
            (   '_html', new HTML
                (
                    {
//                      viewbox="100 0 1000 730"     
//                      für Chrome mit benamten width und height arbeiten   
//                        content: sSvg 
//                      orig
//                        content: `<svg id="${this._sContainerId}" width="1000px" height="730px" viewbox="100 0 1000 730" ></svg>"`

                        content: `<svg id="${this._sContainerId}"  ></svg>"`                        
//                        content: '<svg id="${this._sContainerId}" width="${this._sWidth}" height="${this._sHeight}" viewbox="100 0 1000 730" ></svg>"'
                    }
                )
            )
        },

        renderer: {
            apiVersion: 2,
            render: function(oRm, oControl)
            {
                oRm.openStart('div', oControl);
//                oRm.class('someViz');
                oRm.openEnd();
//                oRm.openStart('p').openEnd();
//                oRm.text('Custom Controls are great .');
//                oRm.close('p');
                oRm.renderControl(oControl.getAggregation('_html'));
                oRm.close('div');
            }
        },

        _onResize: function()
        {
          const width_norm = 1920;          
          var width      = $(window).width();  
          if (width > 1000)
          {
            width = 1000;
          }

//          const height     = (width * 2) / 3;                              
          const height     = width;                                        

          const offsetx    = parseInt("" + ( - 250 +  (((width / width_norm) * 100) * 10 )) , 10);
          const offsety    = 0;                    

          const viewx      = 720;            
          const viewy      = 720;                                


          console.log('_onResize width:', width);
          console.log('_onResize height:', height);   

          this._renderViz(
                            width,
                            height,
                            offsetx,
                            offsety,
                            viewx,
                            viewy
                         );
        },

        onBeforeRendering: function() {
           ResizeHandler.deregister(this._sResizeHandlerId) 
        },

        exit: function() {
            ResizeHandler.deregister(this._sResizeHandlerId) 
         },

        onAfterRendering: function() 
        {
            this._sResizeHandlerId = ResizeHandler.register(this, this._onResize.bind(this));
                 
            const width_norm = 1920;
            const height_norm = 666;            
            var width      = $(window).width();  
            if (width > 1000)
            {
              width = 1000;
            }
//          const height     = (width * 2) / 3;                              
            const height     = width;                                        

//            const offsetx  = ((1 - (width_norm / width)) * 100) / 2;
//          const offsetx  = -150;                    
//            const offsetx  = -150 -  (((width / width_norm) * 100) *4 );                              
            const offsetx  = parseInt("" + ( -250 +  (((width / width_norm) * 100) * 10 )) , 10);
//            const offsetx  = 0;                    
            const offsety  = 0;        

            const viewx    = 720;            
//            const viewx    = width;
            const viewy    = 720;                                
//            const viewy    = height;                    
              //          const height = 1;
            console.log('onAfterRendering width : ', width);
            console.log('onAfterRendering height : ', height);            
            this._renderViz(
              width,
              height,
              offsetx,
              offsety,
              viewx,
              viewy
           );

        },

        _renderViz: function(
                              width, 
                              height,
                              offsetx,
                              offsety,
                              viewx,
                              viewy                              
                              
                              ) 
        {
    
          var svg = null;
          svg = d3.select( '#' + this._sContainerId);           

//  --------------------
//  Musterdaten
//          var originGeo = [16.8286, 52.4200];
//          var originName = 'POZ';

//  Frankfurt
          var originGeoFRA    = [8.5622, 50.0379];
          var originNameFRA   = 'FRA';
          var strokeFRA       = 'steelblue';
          var destinationsFRA = [
//                                {'coord': [-8.56795, 38.4839361], 'name': 'LIS'},            // neu Lissabon
                                {'coord': [-3.56795, 40.4839361], 'name': 'MAD'},
//                                {'coord': [12.56795, 41.4839361], 'name': 'FCO'},            // neu Rom                               
                                {'coord': [14.483279, 35.854114], 'name': 'MLA'},            //     Malta 
                                {'coord': [23.9484, 37.9356467],  'name': 'ATH'},            //     Athen
//                                {'coord': [24.9484, 42.4839361],  'name': 'SOF'},            // neu  Sofia                             
//                                {'coord': [24.9484, 46.4839361],  'name': 'OTP'},            // neu  Bukarest
                                {'coord': [18.9484, 47.4839361],  'name': 'BUD'},            // neu  Budapest
                                {'coord': [16.9484, 48.2],        'name': 'VIE'},            // neu  Wien
                                {'coord': [14.9484, 50.2],        'name': 'PRG'},            // neu  Prag    
//                                {'coord': [20.9679, 52.1672],     'name': 'WAW'},            // Warschau
//                                {'coord': [33.9679, 56.1672],     'name': 'SVO'},            // neu  Moskau

                                {'coord': [11.9484, 52.1672],     'name': 'SXF'},            // neu  Berlin Schönefeld                                
//                                {'coord': [11.8, 52.25],          'name': 'TXL'},            // neu  Berlin Texel   
                                {'coord': [26.9154, 60.7890],     'name': 'HEL'},            // neu  Helsinki 
//                                {'coord': [16.9154, 58.7890],     'name': 'ARN'},            // neu  Stockholm
                                {'coord': [11.9154, 55.7890],     'name': 'CPH'},            // neu  Kopenhagen                                
//                                {'coord': [10.2569, 59.1824],     'name': 'TRF'},            // neu  Oslo
                                
//                                {'coord': [7.5622, 47.1],         'name': 'BRN'},            // neu  Bern                                                                         
//                                {'coord': [5.2, 52.45],           'name': 'AMS'},            // neu  Amsterdam
                                {'coord': [4.7, 50.8],            'name': 'BRU'},            // neu  Brüssel
                                {'coord': [0.3717, 51.8763],      'name': 'LHR'},            // neu  London Heathrow                              
                                {'coord': [2.3717, 48.1],         'name': 'CDG'}             // neu  Paris                                     
                              ];

//  Madrid
        var originGeoMAD    = [-3.56795, 40.4839361];
        var originNameMAD   = 'MAD';
        var strokeMAD       = 'white';
        var destinationsMAD = [
//          {'coord': [-8.56795, 38.4839361], 'name': 'LIS'},            // neu Lissabon
          {'coord': [-3.56795, 40.4839361], 'name': 'MAD'},
          {'coord': [12.56795, 41.4839361], 'name': 'FCO'},            // neu Rom                               
//          {'coord': [14.483279, 35.854114], 'name': 'MLA'},            //     Malta 
          {'coord': [23.9484, 37.9356467],  'name': 'ATH'},            //     Athen
          {'coord': [24.9484, 42.4839361],  'name': 'SOF'},            // neu  Sofia                             
//          {'coord': [24.9484, 46.4839361],  'name': 'OTP'},            // neu  Bukarest
//          {'coord': [18.9484, 47.4839361],  'name': 'BUD'},            // neu  Budapest
//          {'coord': [16.9484, 48.2],        'name': 'VIE'},            // neu  Wien
          {'coord': [14.9484, 50.2],        'name': 'PRG'},            // neu  Prag    
          {'coord': [20.9679, 52.1672],     'name': 'WAW'},            // Warschau
//          {'coord': [33.9679, 56.1672],     'name': 'SVO'},            // neu  Moskau

          {'coord': [11.9484, 52.1672],     'name': 'SXF'},            // neu  Berlin Schönefeld                                
//          {'coord': [11.8, 52.25],          'name': 'TXL'},            // neu  Berlin Texel   
//          {'coord': [26.9154, 60.7890],     'name': 'HEL'},            // neu  Helsinki 
//          {'coord': [16.9154, 58.7890],     'name': 'ARN'},            // neu  Stockholm
          {'coord': [11.9154, 55.7890],     'name': 'CPH'},            // neu  Kopenhagen                                
          {'coord': [10.2569, 59.1824],     'name': 'TRF'},            // neu  Oslo
          
//          {'coord': [7.5622, 47.1],         'name': 'BRN'},            // neu  Bern                                                                         
          {'coord': [5.2, 52.45],           'name': 'AMS'},            // neu  Amsterdam
//          {'coord': [4.7, 50.8],            'name': 'BRU'},            // neu  Brüssel
          {'coord': [0.3717, 51.8763],      'name': 'LHR'},            // neu  London Heathrow                              
          {'coord': [2.3717, 48.1],         'name': 'CDG'}             // neu  Paris                                     
        ];


// Moskau
var originGeoSVO    = [33.9679, 56.1672];
var originNameSVO   = 'SVO';
var strokeSVO       = '#FF3333';
var destinationsSVO = [
            {'coord': [-8.56795, 38.4839361], 'name': 'LIS'},            // neu Lissabon
  //          {'coord': [-3.56795, 40.4839361], 'name': 'MAD'},
            {'coord': [12.56795, 41.4839361], 'name': 'FCO'},            // neu Rom                               
  //          {'coord': [14.483279, 35.854114], 'name': 'MLA'},            //     Malta 
            {'coord': [23.9484, 37.9356467],  'name': 'ATH'},            //     Athen
            {'coord': [24.9484, 42.4839361],  'name': 'SOF'},            // neu  Sofia                             
  //          {'coord': [24.9484, 46.4839361],  'name': 'OTP'},            // neu  Bukarest
  //          {'coord': [18.9484, 47.4839361],  'name': 'BUD'},            // neu  Budapest
  //          {'coord': [16.9484, 48.2],        'name': 'VIE'},            // neu  Wien
  //          {'coord': [14.9484, 50.2],        'name': 'PRG'},            // neu  Prag    
            {'coord': [20.9679, 52.1672],     'name': 'WAW'},            // Warschau
  //          {'coord': [33.9679, 56.1672],     'name': 'SVO'},            // neu  Moskau
  
            {'coord': [11.9484, 52.1672],     'name': 'SXF'},            // neu  Berlin Schönefeld                                
  //          {'coord': [11.8, 52.25],          'name': 'TXL'},            // neu  Berlin Texel   
            {'coord': [26.9154, 60.7890],     'name': 'HEL'},            // neu  Helsinki 
            {'coord': [16.9154, 58.7890],     'name': 'ARN'},            // neu  Stockholm
  //          {'coord': [11.9154, 55.7890],     'name': 'CPH'},            // neu  Kopenhagen                                
  //          {'coord': [10.2569, 59.1824],     'name': 'TRF'},            // neu  Oslo
            
  //          {'coord': [7.5622, 47.1],         'name': 'BRN'},            // neu  Bern                                                                         
  //          {'coord': [5.2, 52.45],           'name': 'AMS'},            // neu  Amsterdam
            {'coord': [4.7, 50.8],            'name': 'BRU'},            // neu  Brüssel
            {'coord': [0.3717, 51.8763],      'name': 'LHR'},            // neu  London Heathrow                              
            {'coord': [2.3717, 48.1],         'name': 'CDG'}             // neu  Paris                                     
          ];



//          var svg;
//          var projection;
          var speed  = 2800;         //km/sec
          var center = [4, 68.6];
          var scale  = 700;
//          var tooltip = d3.select('#map')          
          var tooltip = d3.select('#__chart0')  
//         var tooltip = svg
         .append('div')	
         .attr('class', 'tooltipDestination')				
         .style('opacity', 0);

          var projection = d3.geoMercator().scale(scale).translate([width / 2, 0]).center(center);                    
         drawMap(
//                  originNameFRA, 
//                  originGeoFRA, 
                  projection, 
                  destinationsFRA, 
                  speed, 
                  svg, 
                  height, 
                  width,
                  offsetx,
                  offsety,
                  viewx,
                  viewy                              
                 );



         drawConnections(svg, destinationsFRA, originGeoFRA, strokeFRA, projection, speed);
         drawConnections(svg, destinationsMAD, originGeoMAD, strokeMAD, projection, speed);
         drawConnections(svg, destinationsSVO, originGeoSVO, strokeSVO, projection, speed);


          function getArc(d, s) 
          {
            var dx = d.destination.x - d.origin.x;
            var dy = d.destination.y - d.origin.y;
            var dr = Math.sqrt(dx * dx + dy * dy);
// Durchbiegung kleiner machen
                dr = dr * 10;
            var spath = s == false ? ' 0 0,0 ' : ' 0 0,1 ';
            return 'M' + d.origin.x + ',' + d.origin.y + 'A' + dr + ',' + dr + spath + d.destination.x + ',' + d.destination.y;
          }

          function calculateDistance(lat1, lon1, lat2, lon2) 
          {
            var p = 0.017453292519943295;
            var c = Math.cos;
            var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;
            return 12742 * Math.asin(Math.sqrt(a));
          }

          function calculateDuration(distance, speed) 
          {
            return (distance / speed) * 1000;
          }

          function drawConnection(
                                    svg, 
                                    destinations, 
                                    originGeo,
                                    stroke,
                                    projection,
                                    speed,
                                    index
                                 ) 
          {
            var destination     = destinations[index];
            var originPos       = projection(originGeo);
            var destinationPos  = projection(destination.coord);
            var connection      = [ originPos, destinationPos ];
            var destinationName = destination.name;
            var originGeo       = originGeo;
            var destinationGeo  = destination.coord;

            var wartezeitConnectionDraw = 100;
//            var svg = this.svg;
            var distance = calculateDistance(originGeo[1], originGeo[0], destinationGeo[1], destinationGeo[0]);
            var duration = calculateDuration(distance, speed);

//          Die connection Start            
            var arc = svg
              .append('path')
              .datum(connection)
              .attr('class', 'arc' + index)
              .attr('d', function(coordinates) {
                  var d = {
                      origin: { x: coordinates[0][0], y: coordinates[0][1]},
                      destination: { x: coordinates[1][0], y: coordinates[1][1]}
                  };
                  var s = false;
                  if (d.destination.x > d.origin.x) {
                      s = true;
                  }
                  return getArc(d, s);
              }) 
              .style('stroke', stroke)
              .style('stroke-width', 2)
              .style('fill', 'none')
              .transition()
              .duration(duration)
              .attrTween('stroke-dasharray', function() {
                  var len = this.getTotalLength();
                  return function(t) {
                    return (d3.interpolate('0,' + len, len + ',0'))(t)
                  };
              })

              .on('end', function(d) {
                  var c = connection[1];
                  svg.append('circle')
                    .attr('cx', c[0])
                    .attr('cy', c[1])
                    .attr('r', 0)
                    .attr('class', 'destCircleInner')
                    .style('fill', 'steelblue')
                    .style('fill-opacity', '1')
                    .transition()
                    .duration(300)
                    .attr('r', '3px');
                  svg.append('circle')
                    .attr('cx', c[0])
                    .attr('cy', c[1])
                    .attr('r', 0)
                    .attr('class', 'destCircleOuter')
                    .style('fill', 'black')
                    .style('fill-opacity', '0.05')
                    .transition()
                    .duration(300)
                    .attr('r', '10px');
                  svg.append('circle')
                    .datum(c)
                    .attr('cx', c[0])
                    .attr('cy', c[1])
                    .attr('r', 0)
                    .style('class', 'destCircleMouse')
                    .style('fill', 'steelblue')
                    .style('fill-opacity', '1')
                    .on('mouseover', function (d) 
                      {
                       tooltip.html('<span style="color:white">' + destinationName + '</span>')
                        .attr('class', 'tooltipDestination')
//                        .style('left', d[0] + 12 + 'px')
                        .style('left', d[0] - 80 + 'px')                        
                        .style('top', d[1] - 20 + 'px')
                        .transition()
                        .duration(700)
                        .style('opacity', 1)
                      }) 
                    .on('mouseout', function (d) {
                      tooltip.transition()
                      .duration(700)
                      .style('opacity', 0)
                    })
                    .on('click', function (d) 
                    {
                     tooltip.html('<span style="color:white">' + 'Click' + '</span>')
                      .attr('class', 'tooltipDestination')
//                        .style('left', d[0] + 12 + 'px')
                      .style('left', d[0] - 180 + 'px')                        
                      .style('top', d[1] - 20 + 'px')
                      .transition()
                      .duration(700)
                      .style('opacity', 1)
                    })                     
                    .transition()
                    .duration(300)
                    .attr('r', '3px')
                    .on('end', function(d) 
                    {
                      d3.select(this)
                        .transition()
                        .duration(2000)
                        .attr('r', 20)
                        .style('fill-opacity', '0')
                      ;


//                    Nachbehandlung
                      d3.select('.arc' + index)
                        .transition()
                        .duration(wartezeitConnectionDraw)
//                      Connection nicht löschen       					
//                      .style('stroke-opacity', '0')
                        .style('stroke-width', '1')
                        .on('end', function (d) 
                        {
                          if (index === destinations.length - 1) 
                          {
//                          Ziele nicht löschen					  
//                          svg.selectAll('.destCircleInner').remove();
//                          svg.selectAll('.destCircleOuter').remove();
//                          svg.selectAll('.destCircleMouse').remove();
//                          for (i = 0; i < destinations.length; i++) { 
//                            svg.selectAll('.arc' + i).remove();
//                          }
                          }
                          var nextIndex = index + 1;
                          if (nextIndex < destinations.length) 
                          {
                            drawConnection(svg, destinations, originGeo, stroke, projection, speed, nextIndex);
                          } else {
//                          Nur ein Durchlauf					  
//                            drawConnection(svg, destinations, originGeo, stroke, projection, speed, 0);
console.log("nextIndex : " , nextIndex);
                              return;
                          }
                        });
                      return;
                    });

            console.log("connection Ende : ");                    
//          Die connection Ende
            return;          
          });
        }
    
          function drawConnections(svg, destinations, originGeo, stroke, projection, speed) 
          {
            drawConnection(svg, destinations, originGeo, stroke, projection, speed, 0);
          }
    

          function drawMap(
//                            originName, 
//                            originGeo, 
                            projection,                            
                            destinations, 
                            speed,
                            svg,
                            height,
                            width,
                            offsetx,
                            offsety,
                            viewx,
                            viewy                            
                            ) 
          {
            var countries,
                path,
                height_px          = height + "px",
                width_px           = width + "px",
                countryFill        = "#123456",
                backgroundColorMap = "#FFFFFF"                
                ;

//          console.log('height_px:', height_px);
//          console.log('width_px:' , width_px);
//          für Chrome mit benamten width und height arbeiten        
//          var sViewBox = ''+ offsetx  + 'px ' + offsety + 'px ' + viewx + 'px ' + viewy+ 'px';^
//          console.log('sViewBox : ', sViewBox);
            var sViewBoxFF = ''+ offsetx  + ' ' + offsety + ' ' + viewx + ' ' + viewy+ '';
            console.log('sViewBoxFF : ', sViewBoxFF);

            svg
              .style('background', backgroundColorMap)
//  Keine Unterstützung in Chrome              
              .attr("preserveAspectRatio", "xMinYMin meet")
//            working in FF              
//              .attr("viewBox", "100 0 1000 730")
                .attr("viewBox", sViewBoxFF)              
//             Fehler in Firefox              
//              .attr("viewBox", sViewBox)              
//              .attr("viewBox", "100px 0px 1000px 730px")     


              .attr("height", height_px)
              .attr("width", width_px);                        

//            Keine Unterstützung in Chrome
//            .attr("height", height)
//            .attr("width", width);          
            path       = d3.geoPath().projection(projection);

            countries  = svg.append("g");
            d3.json('assets/models/europa/europe.json', function(data) 
            {
              countries.selectAll('.country')
                       .data(topojson.feature(data, data.objects.europe).features)
                        .enter()
                      .append('path')
                      .attr('fill', countryFill)                      
                      .attr('stroke', 'white')     
                      .style('stroke-width', '.5')                                       
//                      .attr('class', 'country')
                      .attr('d', path)  
              return;
            });
/*
            var source = svg.selectAll('circleOrigin');
            source
              .data([originGeo]).enter()
              .append('circle')
              .attr('cx', function (d) { return projection(d)[0]; })
//              .attr('cx', function (d) { 4.0; })              
              .attr('cy', function (d) { return projection(d)[1]; })
//              .attr('cy', function (d) { 40.0 })              
              .attr('r', '3px')
              .style('opacity', 1)
              .attr('fill', 'green')
              .attr('class', 'circleOrigin')
            source
              .data([originGeo]).enter()
              .append('circle')
              .attr('cx', function (d) { return projection(d)[0]; })
//              .attr('cx', function (d) { 200; })              
              .attr('cy', function (d) { return projection(d)[1]; })
//              .attr('cy', function (d) { 400 })              
              .attr('r', '10px')
              .style('opacity', 0.05)
              .attr('fill', 'black')
              .attr('class', 'circleOrigin')
              .on('mouseover', function (d) 
              {
                tooltip.html('<span style="color:white">' + originName + '</span>')
                        .attr('class', 'tooltipOrigin')
//                        .style('left', projection(d)[0] + 12 + 'px')
                        .style('left', projection(d)[0] - 80 + 'px')                        
                        .style('top', projection(d)[1] - 20 + 'px')
                        .transition()
                        .duration(700)
                        .style('opacity', 1)
              })
              .on('mouseout', function (d) 
              {
                tooltip.transition()
                        .duration(700)
                        .style('opacity', 0)
              });
*/
//              drawConnections(svg, destinations, originGeo, projection, speed);
          };

 

//            var chart = this._radarchart();
//            var cfg = chart.config(); // retrieve default config
//            svg.attr("height", height).attr("width", width)
//            svg.attr('width', cfg.w).attr('height', cfg.h + cfg.h / 4);
//            svg.append('g').classed('single', 1).datum(randomDataset()).call(chart);       
            
  // many radars            
//            chart.config({w: cfg.w / 4, h: cfg.h / 4, axisText: false, levels: 0, circles: false});
//            cfg = chart.config();
//            render();            



        }
//      Ende RenderViz

      });
        }
)