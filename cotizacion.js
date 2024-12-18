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
    const grafiCont =document.getElementById('grafiCont')
    const panels= document.getElementById('panels')
    const gabi= document.getElementById('gabi')
    const pumpD= document.getElementById('pumpD')
    const pumpEq= document.getElementById('pumpEq')
    const matElec= document.getElementById('matElec')
    const strElev= document.getElementById('strElev')
    const strPan= document.getElementById('strPan')
    const manObr= document.getElementById('manObr')
    const desServ=document.getElementById('desServ')
    const coTotalHTM= document.getElementById('coTotal')
              
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
    const variador=myObject.pyct.solar.variador;
    const potVariador=volt*variador.amp/1000;
    const gabinete=myObject.pyct.solar.gabinete;
    const strType=myObject.pyct.struct.type;
    const strMat=myObject.pyct.struct.material;
    const tubo=myObject.eqBomba[0].tubo;
    const kit=myObject.eqBomba[1].kit;
    const chk=myObject.eqBomba[2].check;
    const graData=myObject.pyct.ltsmes;
    const currT= myObject.pyct.curr;
    const desc= myObject.pyct.desc;

    //precios
    const strEPrice=Math.round((myObject.pyct.struct.precioE ??0)*cantPan.cantidadPaneles);
    const SstrEPrice=strEPrice.toLocaleString('en-US');
    const strPPrice=Math.round(myObject.pyct.struct.precioP*cantPan.cantidadPaneles);
    const SstrPPrice=strPPrice.toLocaleString('en-US');
    const precioPan=Math.round(myObject.pyct.solar.precio*cantPan.cantidadPaneles);
    const SprecioPan=precioPan.toLocaleString('en-US');
    const preGabi=Math.round(gabinete.precio+variador.precio);
    const SpreGabi=preGabi.toLocaleString('en-US');   
    const precioEq=Math.round(myObject.eqBomba[3].precioeq); 
    const SprecioEq=precioEq.toLocaleString('en-US');
    const precioBom=Math.round(myObject.costo);
    const precMotor=Math.round(mot.costo); 
    const precioPump=Math.round(precioBom+(precMotor ?? 0));
    const SprecioPump=precioPump.toLocaleString('en-US'); 
    const servPrice= Math.round((myObject.pyct.grua??0)+(myObject.pyct.manObr*cantPan.cantidadPaneles));
    const SservPrice=servPrice.toLocaleString('en-US');  
    const preMatElec=Math.round(myObject.pyct.matElec*pumpHP); 
    const SpreMatElec=preMatElec.toLocaleString('en-US');
    let cotTot;
    /*full*/ if(proyT==3){cotTot = (precioPan ?? 0)+(preGabi ?? 0)+(precioPump ?? 0)+(precioEq ?? 0)+(preMatElec ?? 0)+(servPrice ?? 0)+(strPPrice ?? 0)+(strType == 1 ? (strEPrice ?? 0) : 0);}
    /*solar*/if(proyT==2){cotTot = (precioPan ?? 0)+(preGabi ?? 0)+(preMatElec ?? 0)+(servPrice ?? 0)+(strPPrice ?? 0)+(strType == 1 ? (strEPrice ?? 0) : 0);}
    /*bombe*/if(proyT==1){cotTot = (precioPump ?? 0)+(precioEq ?? 0)+(preMatElec ?? 0)+(servPrice ?? 0);}
    
        console.log((precioPan ?? 0));  
        console.log((preGabi ?? 0));
        console.log((precioPump ?? 0));
        console.log((precioEq ?? 0));
        console.log((preMatElec ?? 0));
        console.log((servPrice ?? 0));
        console.log((strPPrice ?? 0));
        console.log((strEPrice ?? 0));
        cotTot =cotTot.toLocaleString('en-US');
    //descripciones repetidas
    const gabiArma   = `Gabinete armado para bomba de ${pumpHP} HP, ${currT=== 1 ? ` ${gabinete.desc} con variador de frecuencia solar de ${variador.descripcion}v, potencia de ${potVariador}kW `: `${gabinete.desc} `}con supresores de picos.`;
    const modFotV    = `Modulos Fotovoltaicos policristalinos tipo ${tipPan} de ${potPan}w, con 12 años de garantía y 25 años de vida útil.`;
    const strDesc    = `Fabricación de estructura de ${strMat} ${strType === 1 ? ' elevada y reforzada de 2.5 mts de altura, pintada con esmalte anticorrosivo' : strType === 2 ? ' reforzada a nivel de piso' : ''} para ${cantPan.cantidadPaneles} módulos.`;
    const strPaDes   = `Fabricación de estructura ${strType==3 ? `coplanar`:``} de aluminio anodizado para aplicación solar, fijada con tornillería de acero inoxidable 304 para ${cantPan.cantidadPaneles} módulos fotovoltaicos.`;
    const pumpDesc   = `Bomba de ${pumpHP}HP ${currT=== 1 ? `marca Altamira trifasico a ${volt}v`: currT=== 2 ? 'marca Kolosal de corriente directa':''} modelo ${pumpModel} ${currT===1 ? `, ${mot.Modelo}, serie ${mot.serie}.`:'.'}`
    const eqBoDesc   = `EquipamientoBomba: Cableado sumergible calibre ${pumpCal}, ${tubo}, ${kit} y ${chk}.`; 
    const desMatElec = `Material eléctrico para la conexión de DC ${currT=== 1 ? ` y AC`:``}, incluye conectores, ducteria galvanizada, coples, conectores, condulet, terminales bimetálicas, cableado para DC,${currT=== 1 ? ` cableado para AC,`:``} poliducto naranja subterráneo, protección de tierras fisca, varilla tipo rehilete para asegurar una resistencia menor a los 25 Ohms como lo indica la NOM-001-SEDE-2012.`;
    const desManObr  = `Servicios para la instalación de un sistema ${proyT=== 3 ? `de bombeo solar incluye montaje de estructura, montaje de paneles,`:proyT=== 2 ? `paneles solares para alimentación de bomba, incluye montaje de estructura, montaje de paneles,`:`de bombeo, incluye`} conexiones eléctricas,${proyT==2 ? ``:`instalación de la bomba,`} entrega de materiales, todo lo necesario para su funcionamiento correcto y gastos operativos.`;
    //Inner HTML dinamico
    cotType.innerHTML  =  `Propuesta de ${proyT===1 ? 'Bombeo': proyT==2 ? 'Paneles Solares Para Bomba': proyT==3 ? 'Bombeo Solar':''}`;
    idP.innerHTML      =  ` ${myObject.pyct.id} `;
    nomP.innerHTML     =  ` ${myObject.pyct.nombre} `;
    nomV.innerHTML     =  `${myObject.pyct.rep.nombre}`;
    desServ.innerHTML  =  `${desManObr}`;
    mail.innerHTML     =  `${myObject.pyct.rep.mail}`;
    tel.innerHTML      =  `${myObject.pyct.rep.tel}`;
    if(myObject.pyct.rep.nombre!= "Weslaco Energías Renovables"){nomVf.innerHTML    =  `${myObject.pyct.rep.nombre}`;}
    altMaxG.innerHTML  =  `${myObject.altMax}mts`;
    hpGraph.innerHTML  =  `Rendimiento diario en promedio bomba de: ${pumpHP} Hp`;
    ltsGrAgv.innerHTML =  `${ltsAvg} Lts Por Dia Promedio`;
    Bomba.innerHTML    =  `${pumpDesc}<br>${eqBoDesc}`;
    //Tabla cotizacion
    panels.innerHTML   =  `<td class="col-1 cotiTab">${cantPan.cantidadPaneles}</td>
                           <td class="col-10 cotiTab">${modFotV}</td>
                           <td class="col-1 cotiTab">$${SprecioPan}</td>`;  
    gabi.innerHTML     =  `<td class="col-1 cotiTab">1</td>
                           <td class="col-10 cotiTab">${gabiArma}</td>
                           <td class="col-1 cotiTab">${SpreGabi}</td>`;
    pumpD.innerHTML    =  `<td class="col-1 cotiTab">1</td>
                           <td class="col-10 cotiTab">${pumpDesc}</td>
                           <td class="col-1 cotiTab">${SprecioPump}</td>`;  
    pumpEq.innerHTML   =  `<td class="col-1 cotiTab">1</td>
                           <td class="col-10 cotiTab">${eqBoDesc}</td>
                           <td class="col-1 cotiTab">${SprecioEq}</td> `;
    matElec.innerHTML  =  `<td class="col-1 cotiTab">1</td>
                           <td class="col-10 cotiTab">${desMatElec}</td>
                           <td class="col-1 cotiTab">${SpreMatElec}</td>`;                                                                
    if(!strType===3){strElev.innerHTML  =  `<td class="col-1 cotiTab">1</td>
                           <td class="col-10 cotiTab">${strDesc}</td>
                           <td class="col-1 cotiTab">${SstrEPrice}</td>`;}
    strPan.innerHTML   =   `<td class="col-1 cotiTab">1</td>
                            <td class="col-10 cotiTab">${strPaDes}</td>
                            <td class="col-1 cotiTab">${SstrPPrice}</td>`;
    manObr.innerHTML   =   `<td class="col-1 cotiTab">1</td>
                            <td class="col-10 cotiTab">${desManObr}</td>
                            <td class="col-1 cotiTab">${SservPrice}</td>`;
  coTotalHTM.innerText =  `${cotTot}`;                        
    if(proyT ==1){
      //poner solo  bombeo

      document.getElementById("energia").style.visibility = "hidden";
      document.getElementById("energia").style.order = "3"; 
      grafiCont.style.display='none';
      const bomOnly = document.querySelectorAll(".bom");
      bomOnly.forEach(elmt=>{
        elmt.style.display= 'none';
      });
      descP.innerHTML= ` Instalación de bomba para un pozo de ${proPozo} metros de profundidad, con un volumen de agua de ${lts} LT/S, descarga de ${desc}", Con una carga dinamica de ${cdt} metros, en la localidad de ${loc}.`;
    }  
    if(proyT ==2){
      //poner solo solar
      document.getElementById("hidraulica").style.visibility = "hidden";
      document.getElementById("hidraulica").style.order = "3"; 
      document.getElementById('myChart').style.display= 'none';
      document.getElementById('imgvntjs').classList.remove('col-10')
      document.getElementById('imgvntjs').classList.add('col-12')
      const solOnly = document.querySelectorAll(".sol");
      solOnly.forEach(elmt=>{
        elmt.style.display= 'none';
      });
      

      descP.innerHTML= `Instalación de ${cantPan.cantidadPaneles} paneles solares, en la localidad de ${loc}.`;
      descEnerg.innerHTML= `${cantPan.cantidadPaneles} ${modFotV} ${gabiArma} ${strType===3 ? ``:`${strDesc}`} ${strPaDes}${desMatElec}`;

    }  
    if(proyT ==3){
      descP.innerHTML    = ` Instalación de bombeo solar para un pozo de ${proPozo} metros de profundidad, con un volumen de agua de ${lts} LT/S,  descarga de ${desc}", Con una carga dinamica de ${cdt} metros, en la localidad de ${loc}.`;
      descEnerg.innerHTML= `${cantPan.cantidadPaneles} ${modFotV} ${gabiArma} ${strType===3 ? ``:`${strDesc}`} ${strPaDes} ${desMatElec}`;
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
        console.log('Object retrieved from local storage successfully');
        console.log(JSON.parse(storedObject));
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


