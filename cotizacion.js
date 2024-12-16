let a ,b,c,d,e,f,g,h,i,j,k,l, curr;

/*
navigator.storage.estimate().then(estimate => {
  console.log('Quota:', estimate.quota);
  console.log('Usage:', estimate.usage);
});*/

document.addEventListener('DOMContentLoaded', () => {
    const Bomba = document.getElementById('bomba');
    const idP = document.getElementById('idProyecto');
    const nomP = document.getElementById('nomP');
    const descP = document.getElementById('descP');
    const nomV = document.getElementById('nomV');
    const nomVf = document.getElementById('nomvf');
    const tel = document.getElementById('tel');
    const mail =document.getElementById('mail');
    const hpGraph =document.getElementById('hpGraph');
    const ltsGrAgv =document.getElementById('ltsGrAgv');
    const altMaxG =document.getElementById('altMaxG');
    const cotType =document.getElementById('cotType');
    const descEnerg =document.getElementById('descEner')

              
    if(Bomba && idP && nomP && descP && nomV && tel && mail && nomVf ){
    const myObject = getObjectFromLocalStorage    ('cotData');
    if (myObject) {
   // console.log(myObject.pyct.struct.precio);  
    const pumpModel= myObject.Modelo;
    const pumpHP= myObject.hp;
    const proyT= myObject.pyct.cotType;
    const lts= myObject.pyct.lts;
    const ltsAvg = myObject.pyct.ltsAvg 
    const proPozo= myObject.pyct.proPozo;
    const loc= myObject.pyct.loc;
    const mot= myObject.pyct.motor;
    const volt= myObject.pyct.motor.volt;
    const pumpCal= myObject.calibre;
    const cdt=myObject.pyct.cdtP;
    const cantPan=myObject.pyct.solar.cantPan;
    const tipPan=myObject.pyct.solar.tipPan;
    const potPan=myObject.pyct.solar.pot;
    const precioPan=myObject.pyct.solar.precio;
    const variador=myObject.pyct.solar.variador;
    const potVariador=volt*variador.amp/1000;
    const gabinete=myObject.pyct.solar.gabinete;
    const strType=myObject.pyct.struct.type;
    const strMat=myObject.pyct.struct.material;
    const strPrice=myObject.pyct.struct.precio;
    const tubo=myObject.eqBomba[0].tubo;
    const kit=myObject.eqBomba[1].kit;
    const chk=myObject.eqBomba[2].check;
    const precioEq=myObject.eqBomba[3].precioeq;
    const graData=myObject.pyct.ltsmes;
    const currT= myObject.pyct.curr;

    const desc= myObject.pyct.desc;
  
    cotType.innerHTML  =  `Propuesta de ${proyT===1 ? 'Bombeo': proyT==2 ? 'Paneles Solares Para Bomba': proyT==3 ? 'Bombeo Solar':''}`;
    idP.innerHTML      =  ` ${myObject.pyct.id} `;
    nomP.innerHTML     =  ` ${myObject.pyct.nombre} `;
    nomV.innerHTML     =  `${myObject.pyct.rep.nombre}`;

    mail.innerHTML     =  `${myObject.pyct.rep.mail}`;
    tel.innerHTML      =  `${myObject.pyct.rep.tel}`;
    if(myObject.pyct.rep.nombre!= "Weslaco Energías Renovables"){nomVf.innerHTML    =  `${myObject.pyct.rep.nombre}`;}
    altMaxG.innerHTML  =  `${myObject.altMax}mts`;
    hpGraph.innerHTML  =  `Rendimiento diario en promedio bomba de: ${pumpHP} Hp`;
    ltsGrAgv.innerHTML =  `${ltsAvg}`;
    Bomba.innerHTML    =  `Bomba de ${pumpHP}HP ${currT=== 1 ? `marca Altamira trifasico a ${volt}v`: currT=== 2 ? 'marca Kolosal de corriente directa':''} modelo ${pumpModel}, ${currT===1 ? `${mot.Modelo}  serie ${mot.serie}`:''}.<br> EquipamientoBomba: Cableado sumergible Calibre ${pumpCal}, ${tubo}, ${kit} y ${chk} `;
    if(proyT ==1){
      //poner solo la desc de bombeo
      descP.innerHTML= ` Instalación de bomba para un pozo de ${proPozo} metros de profundidad, con un volumen de agua de ${lts} LT/S, descarga de ${desc}", Con una carga dinamica de ${cdt} metros, en la localidad de ${loc}.`;
    }  
    if(proyT ==2){
      //poner solo la desc de solar
      descP.innerHTML= `Instalación de ${cantPan.cantidadPaneles} paneles solares, en la localidad de ${loc}.`;

    }  
    if(proyT ==3){
      descP.innerHTML    = ` Instalación de bombeo solar para un pozo de ${proPozo} metros de profundidad, con un volumen de agua de ${lts} LT/S,  descarga de ${desc}", Con una carga dinamica de ${cdt} metros, en la localidad de ${loc}.`;
      descEnerg.innerHTML= `${cantPan.cantidadPaneles} Modulos Fotovoltaicos policristalinos tipo ${tipPan} de ${potPan}w, con 12 años de garantía y 25 años de vida útil. 
      Gabinete armado para bomba de ${pumpHP} HP, ${gabinete.desc} con variador de frecuencia solar de ${variador.descripcion}v, potencia de ${potVariador}kW con supresores de picos. 
    ${strType === 1 ? 'Fabricación de estructura de acero elevada y reforzada de 2.5 mts de altura, pintada con esmalte anticorrosivo' : strType === 2 ? 'Fabricación de estructura de aluminio a nivel de piso reforzada a nivel de piso' : ''} para ${cantPan.cantidadPaneles} módulos. 
    Estructura de aluminio anodizado para aplicación solar, fijada con tornillería de acero inoxidable 304 para ${cantPan.cantidadPaneles} módulos fotovoltaicos. 
    Material eléctrico para la conexión de DC y AC, incluye conectores, ducteria galvanizada, coples, conectores, condulet, terminales bimetálicas, cableado para DC, cableado para AC, poliducto naranja subterráneo, protección de tierras fisca, varilla tipo rehilete para asegurar una resistencia menor a los 25 Ohms como lo indica la NOM-001-SEDE-2012.`;
    }  
    
    window.addEventListener('load', () => {
    const myChart = echarts.init(document.getElementById('myChart'));
    const valores = Object.values(graData);
    const valorMaximo = Math.max(...valores);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#4c9d2f'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Lts por día Promedio', 'Radiación/Mes']
      },
      xAxis: [
        {
          type: 'category',
          data: Object.keys(graData),
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Lts por día Promedio',
          min: 0,
          max: valorMaximo,
          interval: Math.ceil(valorMaximo / 10),
          axisLabel: {
            formatter: '{value} lts/día'
          }
        },
        {
          type: 'value',
          name: 'Radiación/Mes',
          min: 0,
          max: 10,
          interval: 1,
          axisLabel: {
            formatter: '{value} kWh/m2/día'
          }
        }
      ],
      series: [
            {
          name: 'Lts por día Promedio',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' lts/día';
            }
          },
          data: Object.values(graData),
          itemStyle: {
            color: '#4c9d2f' 
          }
        },
        {
          name: 'Radiación/Mes',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' kWh/m2/día';
            }
          },
          data: [5.53, 6.13, 7.15, 6.81, 6.45, 6.08, 5.64, 5.69, 5.64, 6.21, 6.02, 5.42]
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function() { myChart.resize();});
  });
  
  }
    else{
    console.log("error retrieving myObject")
    }
    }
    else {
        console.error('Elements not found.',error);
    }

});


  function getObjectFromLocalStorage(key) {
    try {
      const storedObject = localStorage.getItem(key);
      if (storedObject) {
        console.log('Object retrieved from local storage successfully:', storedObject);
        return JSON.parse(storedObject);
      } else {
        console.warn('Object not found in local storage.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving object from local storage:', error);
      return null;
    }
  }


