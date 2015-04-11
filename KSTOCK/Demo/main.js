var Engine = famous.core.Engine;
//surfaces
var Surface = famous.core.Surface;
var InputSurface = famous.surfaces.InputSurface;
var ContainerSurface = famous.surfaces.ContainerSurface;
var ImageSurface = famous.surfaces.ImageSurface;
var FormContainerSurface = famous.surfaces.FormContainerSurface;
var SubmitInputSurface = famous.surfaces.SubmitInputSurface;
//modifiers
var Modifier = famous.core.Modifier;
var StateModifier = famous.modifiers.StateModifier;
//transforms
var Transform = famous.core.Transform;
var Transitionable = famous.transitions.Transitionable;
var TransitionableTransform = famous.transitions.TransitionableTransform;
var Easing = famous.transitions.Easing;
//views
var View = famous.core.View;
var Scrollview = famous.views.Scrollview;
var HeaderFooter = famous.views.HeaderFooterLayout;
var SequentialLayout = famous.views.SequentialLayout;
var Flipper = famous.views.Flipper;
var SpringTransition = famous.transitions.SpringTransition;
var Timer = famous.utilities.Timer;
var context = Engine.createContext();


// WebSocket Connection
var ws = new WebSocket('ws://localhost:8020/websocket');
console.log("--ws connected--")

ws.onopen = function() {
    ws.send('Connected');
};

//Home page
var bodyContainer = new ContainerSurface({ //container for hanging board and the bodyimage
    classes: ['board'],
    size: [screen.width, screen.height],

    properties: {}
});
var bodyModifier = new StateModifier({

});
var bodyImage = new ImageSurface({
    size: [undefined, undefined],
    properties: {}
});
var bodyImgModifier = new StateModifier({
    opacity: 0.8
});
bodyImage.setContent("img/rest4.jpg");
bodyContainer.add(bodyImgModifier).add(bodyImage);

var container = new ContainerSurface({ //container for the hanging wooden board
    classes: ['board'],
    size: [500, 600],
    properties: {

    }
})
var chain = new ImageSurface({
    size: [40, 200],
    properties: {

    }
});
chain.setContent("img/vine.png");
var chain_mod = new Modifier({
    transform: Transform.translate(120, 0, 50)
})
container.add(chain_mod).add(chain);

var chain2 = new ImageSurface({
    size: [40, 200],

});
chain2.setContent("img/vine.png");
var chain2_mod = new Modifier({
    transform: Transform.translate(550, 0, 50)
})
container.add(chain2_mod).add(chain2);
var surface = new ImageSurface({ //wooden board
    size: [500, 300],
    properties: {

    }
});
surface.setContent("img/wood_background_design_decorating_2005.jpg");
var surf_mod = new Modifier({
    transform: Transform.translate(100, 180, 50)
})

container.add(surf_mod).add(surface);

var logo = new ImageSurface({ //KStock logo
    size: [300, 250],
});
logo.setContent("img/kstockfinal.png");
var logo_mod = new Modifier({
    transform: Transform.translate(230, 190, 150)
})
container.add(logo_mod).add(logo);

var go = new ImageSurface({ //go button
    size: [100, 100],
    properties: {
        cursor: 'pointer'
    }
});
go.setContent("img/goo.png");
var go_mod = new Modifier({
    transform: Transform.translate(500, 380, 50)
})

container.add(go_mod).add(go);

var modifier = new StateModifier({ // container for the wooden board 

    transform: Transform.translate((screen.width / 4), -300, 100),

});
modifier.setTransform(Transform.translate((screen.width / 4), 0, 100), {
    curve: Easing.outQuad,
    duration: 6000
})

bodyContainer.add(modifier).add(container);
context.add(bodyContainer);

go.on('click', function() {
    // bodyModifier.setOpacity(0,{duration: 2000});
    $('.board').hide();
    dashboard(ws); // call the dashboard
});

tableOrder = {}, MainTable = {}, tableArr = [];

function dashboard(ws) {
    var bodyImage = new ImageSurface({
        size: [undefined, undefined],

    });
    var bodyImgModifier = new StateModifier({
        opacity: 0.8
    });
    bodyImage.setContent("img/rest4.jpg");
    context.add(bodyImgModifier).add(bodyImage);
    var dashPanel = new ContainerSurface({ //container for formContainer and bodyImage
        classes: ['d_panel'],
        size: [screen.height / 3, screen.height],

        properties: {
            backgroundColor: '#000000'
        }

    });
    var dashMod = new Modifier({
        transform: Transform.translate(0, 0, 100),
    });
    context.add(dashMod).add(dashPanel);

    var mgr_Detail = new Surface({
        size: [screen.height / 3, 100],
        content: "Manager's Dashboard",
        properties: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderColor: '#333333',
            overflow: 'hidden',
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Arial',
            fontSize: '20px',
            backgroundColor: '#0f0f0f',
        }
    });
    var mgr_Mod = new Modifier({
        transform: Transform.translate(0, 0, 200),
    });

    dashPanel.add(mgr_Mod).add(mgr_Detail);

    var items_List = new Surface({
        content: "&nbspItems List",
        size: [screen.height / 3, 120],
        properties: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderColor: '#333333',
            overflow: 'hidden',
            backgroundColor: '#0f0f0f',
            color: 'white',
            fontFamily: '"Satisfy", cursive',
            fontSize: '20px',
        }
    });
    var items_Mod = new Modifier({
        transform: Transform.translate(0, 105, 200),
    });

    dashPanel.add(items_Mod).add(items_List);

    var Cust_Orders = new Surface({
        content: "Customer's Order",
        size: [screen.height / 3, 120],
        properties: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderColor: '#333333',
            overflow: 'hidden',
            backgroundColor: '#0f0f0f',
            color: 'white',
            fontFamily: '"Satisfy", cursive',
            fontSize: '20px',
        }
    });
    var cust_Mod = new Modifier({
        transform: Transform.translate(0, 230, 200),
    });

    dashPanel.add(cust_Mod).add(Cust_Orders);

    var analysis = new Surface({
        content: 'Analysis',
        size: [screen.height / 3, 120],
        properties: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderColor: '#333333',
            overflow: 'hidden',
            backgroundColor: '#0f0f0f',
            color: 'white',
            fontFamily: '"Satisfy", cursive',
            fontSize: '20px',

        }
    });
    var analys_Mod = new Modifier({
        transform: Transform.translate(0, 355, 200),
    });

    dashPanel.add(analys_Mod).add(analysis);

    var admin_panel = new Surface({
        content: 'Admin Panel',
        size: [screen.height / 3, 120],
        properties: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderColor: '#333333',
            overflow: 'hidden',
            backgroundColor: '#0f0f0f',
            color: 'white',
            fontFamily: '"Satisfy", cursive',
            fontSize: '20px',
        }
    });
    var admin_Mod = new Modifier({
        transform: Transform.translate(0, 480, 200),
    });

    dashPanel.add(admin_Mod).add(admin_panel);

    items_List.on('click', function() {

        var pop_surface = new ContainerSurface({
            classes: ['pop'],
            size: [(screen.width - (screen.height / 3) - 100), screen.height - 250],
            properties: {
                backgroundColor: "rgba(0,0,0,0)"
            }
        });
        var pop_Mod = new Modifier({
            transform: Transform.translate((screen.height / 3) + 50, 50, 200)
        });
        context.add(pop_Mod).add(pop_surface);

        var title = new Surface({
            size: [300, 100],
            content: "Inventory Store",
            properties: {
                fontFamily: '"Satisfy", cursive',
                fontSize: '40px',
                textAlign: 'center'
            }
        });
        var title_mod = new Modifier({
            transform: Transform.translate(400, 0, 0)
        });

        pop_surface.add(title_mod).add(title);

        var importButton = new Surface({
            size: [100, 120],
            content: 'Import CSV',
            properties: {
                backgroundColor: '#333333',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '5px',
                textAlign: 'center',
                lineHeight: '200%',
            }

        });
        var imp_Mod = new Modifier({
            transform: Transform.translate(875, 150, 0)
        });

        pop_surface.add(imp_Mod).add(importButton);

        itemSurf = [], items_Mod = [];
        contentArr = ["Item", "Quantity", "Avg Consumption Rate"];
        for (var i = 0; i < 3; i++) {
            itemSurf[i] = [], items_Mod[i] = [];
            for (var j = 0; j < 5; j++) {

                itemSurf[i][j] = new InputSurface({
                    size: [250, 50],
                    placeholder: contentArr[i],
                    value: '',
                    type: "text",
                    properties: {
                        fontFamily: '"Satisfy", cursive',
                        borderRadius: '5px'
                    }
                });
                items_Mod[i][j] = new Modifier({
                    transform: Transform.translate(50 + (250 * i + (i * 20)), 120 + (j * 50 + (j * 20)), 0)

                })
                pop_surface.add(items_Mod[i][j]).add(itemSurf[i][j]);


            }
        }
        var subButton = new Surface({
            size: [100, 120],
            content: 'Submit',
            properties: {
                backgroundColor: '#333333',
                cursor: 'pointer',
                color: 'white',
                borderRadius: '5px',
                textAlign: 'center',
                lineHeight: '200%',
            }

        });
        var sub_Mod = new Modifier({
            transform: Transform.translate(875, 300, 0)
        });
        pop_surface.add(sub_Mod).add(subButton);
        var itemData, invResult;
        importButton.on('click', function() {
            $.ajax({
                url: 'http://localhost:8020/getInv/',
                success: function(result) {
                    invResult = result;
                    itemData = result.MainList;
                    for (var i in itemData) {
                        itemSurf[0][i].setValue(itemData[i]['Item']);
                        itemSurf[1][i].setValue(itemData[i]['Quantity']);
                        itemSurf[2][i].setValue(itemData[i]['CRate']);
                    }
                }
            });
        });
        subButton.on('click', function() {
            $('.pop').remove();
            console.log(invResult);
            ws.send(JSON.stringify(invResult));
        })
    });

    Cust_Orders.on('click', function() {
        var custPop_surf = new ContainerSurface({
            classes: ['OrderPop'],
            size: [(screen.width - (screen.height / 3) - 100), screen.height - 250],
            properties: {
                backgroundColor: "rgba(0,0,0,0)"
            }
        });
        var custPop_Mod = new Modifier({
            transform: Transform.translate((screen.height / 3) + 50, 50, 200)
        });
        context.add(custPop_Mod).add(custPop_surf);

        var tableText = new Surface({
            size: [100, 50],
            content: "Table No:",
            properties: {
                fontFamily: '"Satisfy", cursive',
                fontSize: '30px',
                textAlign: 'center'
            }
        });
        var table_mod = new Modifier({
            transform: Transform.translate(150, 20, 0)
        });

        custPop_surf.add(table_mod).add(tableText);

        var tableNo = new InputSurface({
            size: [70, 50],
            placeholder: "",
            value: '',
            type: "text",
            properties: {
                fontFamily: '"Satisfy", cursive',
                borderRadius: '5px'
            }
        });
        var tableNo_mod = new Modifier({
            transform: Transform.translate(300, 20, 0)
        });
        custPop_surf.add(tableNo_mod).add(tableNo);
        orderSurf = [], order_Mod = [];
        orderArr = ["Item", "Qty"];
        for (var i = 0; i < 2; i++) {
            orderSurf[i] = [], order_Mod[i] = [];
            for (var j = 0; j < 5; j++) {

                orderSurf[i][j] = new InputSurface({
                    size: [250, 50],
                    placeholder: orderArr[i],
                    value: '',
                    type: "text",
                    properties: {
                        fontFamily: '"Satisfy", cursive',
                        borderRadius: '5px'
                    }
                });
                order_Mod[i][j] = new Modifier({
                    transform: Transform.translate(150 + (250 * i + (i * 20)), 120 + (j * 50 + (j * 20)), 0)

                })
                custPop_surf.add(order_Mod[i][j]).add(orderSurf[i][j]);

            }
        }

        var od_subButton = new Surface({
            size: [100, 120],
            content: 'Submit',
            properties: {
                backgroundColor: '#333333',
                cursor: 'pointer',
                color: 'white',
                textAlign: 'center',
                lineHeight: '200%',
                borderRadius: '5px'
            }

        });
        var odSub_Mod = new Modifier({
            transform: Transform.translate(875, 150, 0)
        });
        custPop_surf.add(odSub_Mod).add(od_subButton);
        inputName = [];
        custOrd = {

        }

        od_subButton.on('click', function() {
            $('.OrderPop').remove();
            var cust = {};
            for (var j = 0; j < 5; j++) {
                cust[orderSurf[0][j].getValue()] = orderSurf[1][j].getValue();
            }
            tableOrder["TableNo" + tableNo.getValue()] = cust;
            tableArr.push(tableOrder);
            MainTable["Table"] = tableArr;
            console.log(MainTable);
            ws.send(JSON.stringify(MainTable));

        });
    }); // end of CustOrder function

    analysis.on('click', function() {
        var LineChartSurf = new ContainerSurface({
            size: [400, 300],
            classes: ['LineHighSurface'],
            properties: {
                borderBottomLeftRadius: '0.5em',
                borderBottomRightRadius: '0.5em',
            }
        });
        var LineChartSurfMod = new StateModifier({
            opacity: 0.85,
            transform: Transform.translate((screen.width / 2) - 650, (screen.height / 2), 40)
        });
        context.add(LineChartSurfMod).add(LineChartSurf);
        drawInventoryChart(args);
    });

    function drawInventoryChart(args) {
        $('.LineHighSurface').highcharts({
            chart: {
                backgroundColor: "rgba(0,0,0,0)",
                type: 'line'
            },
            title: {
                text: 'Weekly Inventory Statistics',
                x: -20 //center
            },
            subtitle: {
                text: 'Estimation Tracker',
                x: -20
            },
            xAxis: {
                categories: args.days
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quantity'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {

                shared: true,
                followTouchMove: true, //this is for touch devices
                // useHTML: true,
                // headerFormat: '<table><tr ><td class="fL" style="color: {series.color}">{series.name}: {point.y}</td></tr>',              
                // pointFormat: '',
                // footerFormat: '</table>',
                crosshairs: [true],
                valueDecimals: 2
            },
            // tooltip: {
            //     shared: true,
            //     useHTML: true,
            //     headerFormat: '<table><tr ><td class="fL" style="color: {series.color}">{series.name}: {point.y}</td></tr>',
            //     pointFormat: '',
            //     footerFormat: '</table>',
            //     crosshairs: [true],
            //     valueDecimals: 2,
            //     followTouchMove: true,
            // },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: args.series
        });

    }
    admin_panel.on('click', function() {
                  $.ajax({
                url: 'http://localhost:8020/Inv/',
                success: function(result) {
                  abc = eval(result);
                   console.log(JSON.parse(abc));
                   console.log('hiii');
                }
            });
        var titl_Curr = new Surface({
            size: [200, 20],
            content: "Current Inventory Stats",
            properties: {
                fontFamily: '"Satisfy", cursive',
                fontSize: '20px',
                textAlign: 'center',
                fontWeight: 'bold'

            }
        });
        var titl_mod = new Modifier({
            transform: Transform.translate((screen.height / 3) + 50, 30, 0)
        });
        context.add(titl_mod).add(titl_Curr);
        var currentInv = new ContainerSurface({
            classes: ['crntInvPop'],
            size: [400, screen.height - 550],
            properties: {
                backgroundColor: "rgba(0,0,0,0)"
            }
        });
        var crntPop_Mod = new Modifier({
            transform: Transform.translate((screen.height / 3) + 50, 50, 200)
        });
        context.add(crntPop_Mod).add(currentInv);

        headerCont = ['Items', 'Int Qty', 'Curr Qty', 'Utilized Qty'];
        headerList = [], headerMod = [];

        for (var i = 0; i < 4; i++) {

            headerList[i] = (new Surface({
                size: ['80', '30'],
                content: headerCont[i],
                properties: {
                    backgroundColor: 'white'
                }
            }));
            headerMod[i] = new Modifier({
                transform: Transform.translate(50 + (i * 80), 10, 0)
            });
            currentInv.add(headerMod[i]).add(headerList[i]);

        }
        invSurf = [], inv_Mod = [];

        for (var i = 0; i < 4; i++) {
            invSurf[i] = [], inv_Mod[i] = [];
            for (var j = 0; j < 5; j++) {
                invSurf[i][j] = new Surface({
                    size: [80, 30],
                    content: i,
                    properties: {
                        fontFamily: '"Satisfy", cursive',
                        backgroundColor: 'white'
                    }
                });
                inv_Mod[i][j] = new Modifier({
                    transform: Transform.translate(50 + (80 * i), 45 + (j * 30), 0)

                })
                currentInv.add(inv_Mod[i][j]).add(invSurf[i][j]);



            }
        }
        var titl_ord = new Surface({
            size: [200, 20],
            content: "Customer Orders",
            properties: {
                fontFamily: '"Satisfy", cursive',
                fontSize: '20px',
                textAlign: 'center',
                fontWeight: 'bold'
            }
        });
        var titlOr_mod = new Modifier({
            transform: Transform.translate((screen.height / 3) + 50, 375, 0)
        });
        context.add(titlOr_mod).add(titl_ord);
        var orders = new ContainerSurface({
            classes: ['crntInvPop'],
            size: [400, screen.height - 550],
            properties: {
                backgroundColor: "rgba(0,0,0,0)"
            }
        });
        var ordersTab_Mod = new Modifier({
            transform: Transform.translate((screen.height / 3) + 50, 400, 200)
        });
        context.add(ordersTab_Mod).add(orders);

        var ordArr = ['Table No', 'Item', 'Qty', ];
        var Ord_hdrList = [],
            orderHMod = [];

        for (var i = 0; i < 3; i++) {

            Ord_hdrList[i] = (new Surface({
                size: ['80', '30'],
                content: ordArr[i],
                properties: {
                    backgroundColor: 'white'
                }
            }));
            orderHMod[i] = new Modifier({
                transform: Transform.translate(70 + (i * 80), 10, 0)
            });
            orders.add(orderHMod[i]).add(Ord_hdrList[i]);

        }
        var ordSurf = [],
            ord_Mod = [];

        for (var i = 0; i < 3; i++) {
            ordSurf[i] = [], ord_Mod[i] = [];
            for (var j = 0; j < 5; j++) {
                ordSurf[i][j] = new Surface({
                    size: [80, 30],
                    content: i,
                    properties: {
                        fontFamily: '"Satisfy", cursive',
                        backgroundColor: 'white'
                    }
                });
                ord_Mod[i][j] = new Modifier({
                    transform: Transform.translate(70 + (80 * i), 45 + (j * 30), 0)

                })
                orders.add(ord_Mod[i][j]).add(ordSurf[i][j]);



            }
        }




    });



}