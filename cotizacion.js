let a, b, c, d, e, f, g, h, i, j, k, l, curr, nomPyct, idPyct, servFlg ;

/*
navigator.storage.estimate().then(estimate => {
  console.log('Quota:', estimate.quota);
  console.log('Usage:', estimate.usage);
});*/

document.addEventListener("DOMContentLoaded", () => {
  const Bomba = document.getElementById("bomba");
  const idP = document.getElementById("idProyecto");
  const nomP = document.getElementById("nomP");
  const descP = document.getElementById("descP");
  const descAdd = document.getElementById("descAdd");
  const nomV = document.getElementById("nomV");
  const nomVf = document.getElementById("nomvf");
  const tel = document.getElementById("tel");
  const mail = document.getElementById("mail");
  const hpGraph = document.getElementById("hpGraph");
  const ltsGrAgv = document.getElementById("ltsGrAgv");
  const altMaxG = document.getElementById("altMaxG");
  const cotType = document.getElementById("cotType");
  const descEnerg = document.getElementById("descEner");
  const grafiCont = document.getElementById("grafiCont");
  const panels = document.getElementById("panels");
  const gabi = document.getElementById("gabi");
  const pumpD = document.getElementById("pumpD");
  const pumpEq = document.getElementById("pumpEq");
  const matElec = document.getElementById("matElec");
  const strElev = document.getElementById("strElev");
  const strPan = document.getElementById("strPan");
  const manObr = document.getElementById("manObr");
  const desServ = document.getElementById("desServ");
  const coTotalHTM = document.getElementById("coTotal");
  const imgEner = document.getElementById("imgEner");
  const imgHidr = document.getElementById("imgHidr");
 
  if (Bomba && idP && nomP && descP && nomV && tel && mail && nomVf) {
    const myObject = getObjectFromLocalStorage("cotData");
    if (myObject) {
      // console.log(myObject.pyct.struct.precio);
      nomPyct=myObject.pyct.nombre;
      idPyct=myObject.pyct.id;
      servFlg=myObject.pyct.servFlg;
      const pumpModel = myObject.Modelo;
      const pumpHP = myObject.hp;
      const venddr = myObject.pyct.rep;
      const descAddT = myObject.pyct.descAdd?.text
      const descFlag = myObject.pyct.descAdd?.flag
      const proyT = myObject.pyct.cotType;
      const lts = myObject.pyct.lts;
      const ltsAvg = myObject.pyct.ltsAvg;
      const proPozo = myObject.pyct.proPozo;
      const loc = myObject.pyct.loc;
      const mot = myObject.pyct.motor;
      const volt = myObject.pyct.motor.volt ?? 0;
      const pumpCal = myObject.calibre;
      const cdt = myObject.pyct.cdtP;
      const cantPan = myObject.pyct.solar?.cantPan;
      const tipPan = myObject.pyct.solar?.tipPan;
      const potPan = myObject.pyct.solar?.pot;
      const variador = myObject.pyct.solar?.variador;
      const potVariador = (volt * (variador?.amp ?? 0)) / 1000;
      const gabinete = myObject.pyct.solar?.gabinete;
      const strType = myObject.pyct.struct?.type;
      const strMat = myObject.pyct.struct?.material;
      const eqBombaP = myObject?.eqBomba?.[3]?.precioeq ?? 0;
      const tubo = myObject?.eqBomba?.[0]?.tubo ?? "";
      const kit = myObject?.eqBomba?.[1]?.kit ?? "";
      const chk = myObject?.eqBomba?.[2]?.check ?? "";
      const graData = myObject.pyct.ltsmes;
      const currT = myObject.pyct.curr;
      const desc = myObject.pyct.desc;
      const diasObr = pumpHP * myObject.pyct.hpDia;
      const hosp = Math.round((myObject.pyct.hosp3per * (diasObr < 2 ? 2 : diasObr)) / 1.5);
      const comidas = myObject.pyct.com3per * (diasObr < 2 ? 2 : diasObr);
      const gasTras = myObject.pyct.preKm * myObject.pyct.km;
      const grua = myObject.pyct.grua ?? 0;
      const viat = Math.round(hosp + comidas + gasTras);
      const gasInd = myObject.pyct.gasInd / 100 + 1;
      const envEmb = myObject.pyct.envEmb;


      console.log("grua ", grua);
      console.log("viat ", viat);
      console.log("comidas ", comidas);
      console.log("hosp ", hosp);
      console.log("gasind ", gasInd);
      console.log("diasObr ", diasObr);
      console.log("gastras ", gasTras);
      //precios
      const stPrecioE= !myObject.pyct.struct.precioE?1:myObject.pyct.struct?.precioE
      const strEPrice = Math.round(
        stPrecioE * cantPan?.cantidadPaneles * gasInd
      );
      const SstrEPrice = strEPrice.toLocaleString("en-US");
      const strPPrice = Math.round(
        myObject.pyct.struct?.precioP * cantPan?.cantidadPaneles * gasInd
      );
      const SstrPPrice = strPPrice.toLocaleString("en-US");
      const precioPan = Math.round(
        myObject.pyct.solar?.precio * cantPan?.cantidadPaneles * gasInd
      );
      const SprecioPan = precioPan.toLocaleString("en-US");
      const preGabi = Math.round(
        (gabinete?.precio + (variador?.precio ?? 0)) * gasInd
      );
      const SpreGabi = preGabi.toLocaleString("en-US");
      const precioEq = Math.round(eqBombaP * gasInd);
      const SprecioEq = precioEq.toLocaleString("en-US");
      const precioBom = Math.round(myObject.costo * gasInd);
      const precMotor = Math.round((mot.costo ?? 0) * gasInd);
      const precioPump = Math.round(precioBom + precMotor);
      const SprecioPump = precioPump.toLocaleString("en-US");
      const servPrice = servFlg==0? Math.round(
        (myObject.pyct.manObr ?? 0) * (cantPan?.cantidadPaneles ?? 1) * (gasInd ?? 0) + (viat ?? 0) + (grua ?? 0)
      ): Math.round(envEmb);
      const SservPrice = servPrice.toLocaleString("en-US");
      const preMatElec = Math.round(myObject.pyct.matElec * pumpHP * gasInd);
      const SpreMatElec = preMatElec.toLocaleString("en-US");
      let cotTot;

      /*full*/ if (proyT == 3) {
        cotTot =
          (precioPan ?? 0) +
          (preGabi ?? 0) +
          (precioPump ?? 0) +
          (precioEq ?? 0) +
          (preMatElec ?? 0) +
          (servPrice ?? 0) +
          (strPPrice ?? 0) +
          (strType != 3 ? strEPrice ?? 0 : 0);
          console.log('strtype',strType);
          console.log('strEprice',strEPrice);
          console.log('strEprice',SstrPPrice);
          
      }
      /*solar*/ if (proyT == 2) {
        cotTot =
          (precioPan ?? 0) +
          (preGabi ?? 0) +
          (preMatElec ?? 0) +
          (servPrice ?? 0) +
          (strPPrice ?? 0) +
          (strType !== 3 ? strEPrice ?? 0 : 0);
      }
      /*bombe*/ if (proyT == 1) {
        cotTot =
          (precioPump ?? 0) +
          (precioEq ?? 0) +
          (preMatElec ??0)+
          ((servPrice ?? 0)/2); // Bombeo va a llevar la mitad
      }
      console.log(precioPan ?? 0);
      console.log(preGabi ?? 0);
      console.log(precioPump ?? 0);
      console.log(precioEq ?? 0);
      console.log(preMatElec ?? 0);
      console.log(servPrice ?? 0);
      console.log(strPPrice ?? 0);
      console.log(strEPrice ?? 0);
      cotTot = cotTot.toLocaleString("en-US");
      //descripciones repetidas
      const gabiArma = `Gabinete armado para bomba de ${pumpHP} HP, ${
        currT === 1
          ? ` ${gabinete?.desc} con variador de frecuencia solar de ${variador?.descripcion}v, potencia de ${potVariador}kW `
          : `${gabinete?.desc} `
      }con supresores de picos.`;
      const modFotV = `${
        cantPan?.cantidadPaneles == 1
          ? `Modulo fotovoltaico policristalino`
          : `Modulos fotovoltaicos policristalinos`
      } tipo ${tipPan} de ${potPan}w, con 12 años de garantía y 25 años de vida útil.`;
      const strDesc = `Fabricación de estructura de ${strMat} ${
        strType === 1
          ? " elevada y reforzada de 2.5 mts de altura, pintada con esmalte anticorrosivo"
          : strType === 2
          ? " reforzada a nivel de piso"
          : ""
      } para ${cantPan?.cantidadPaneles} módulos.`;
      const strPaDes = `Fabricación de estructura ${
        strType == 3 ? `coplanar` : ``
      } de aluminio anodizado para aplicación solar, fijada con tornillería de acero inoxidable 304 para ${
        cantPan?.cantidadPaneles
      } módulos fotovoltaicos.`;
      const pumpDesc = `Bomba de ${pumpHP}HP ${
        currT === 1
          ? `marca Altamira trifasico a ${volt}v`
          : currT === 2
          ? "marca Kolosal de corriente directa"
          : ""
      } modelo ${pumpModel} ${
        currT === 1
          ? `, ${mot?.Modelo?.toLowerCase()}${
              mot.serie == "N/A" ? `` : `, serie ${mot.serie}`
            }.`
          : "."
      }`;
      const eqBoDesc = `EquipamientoBomba: Cableado sumergible calibre ${pumpCal}, ${tubo}, ${kit} y ${chk}.`;
      const desMatElec = `Material eléctrico para la conexión de DC ${
        currT === 1 ? ` y AC` : ``
      }, incluye conectores, ducteria galvanizada, coples, conectores, condulet, terminales bimetálicas, cableado para DC,${
        currT === 1 ? ` cableado para AC,` : ``
      } poliducto naranja subterráneo, protección de tierras fisca, varilla tipo rehilete para asegurar una resistencia menor a los 25 Ohms como lo indica la NOM-001-SEDE-2012.`;
      const desManObr = `Servicios para la instalación por personal capacitado y certificado de un sistema ${
        proyT === 3
          ? `de bombeo solar incluye montaje de estructura, montaje de paneles,`
          : proyT === 2
          ? `paneles solares para alimentación de bomba, incluye montaje de estructura, montaje de paneles,`
          : `de bombeo, incluye`
      } conexiones eléctricas,${
        proyT == 2 ? `` : `instalación de la bomba,`
      } entrega de materiales, todo lo necesario para su funcionamiento correcto y gastos operativos.`;

      const desEnv = `Servicios de embalaje y envío de materiales a la dirección de instalación.`;
      //Inner HTML dinamico
      cotType.innerHTML = `${
        proyT === 1
          ? "Propuesta de Bombeo"
          : proyT == 2
          ? "Energía Solar Para Bomba"
          : proyT == 3
          ? "Propuesta de Bombeo Solar"
          : ""
      }`;
      idP.innerText = ` ${myObject.pyct.id} `;
      nomP.innerText = ` ${myObject.pyct.nombre} `;
      descAdd.innerText = ``;
      nomV.innerHTML = `${venddr?.nombre}`;
      if(servFlg==1){document.getElementById("servicios").style.visibility = "hidden";}
      desServ.innerHTML = `${desManObr}`;
      mail.innerText = `${venddr?.mail}`;
      tel.innerText = `${venddr?.tel}`;
      nomVf.innerText = `${
        venddr?.nombre != "Weslaco Energías Renovables" ? venddr?.nombre : ""
      }`;
      altMaxG.innerHTML = `${myObject.altMax}mts`;
      hpGraph.innerHTML = `Rendimiento diario en promedio bomba de: ${pumpHP} Hp`;
      ltsGrAgv.innerHTML = `${ltsAvg} Lts Por Dia Promedio`;
      Bomba.innerHTML = `${pumpDesc}<br>${eqBoDesc}`;
      imgEner.src = `${
        strType == 1
          ? `./images/energia.png`
          : strType == 2
          ? `./images/energiaP.png`
          : `./images/energiaC.png`
      }`;
      imgHidr.src = `${
        currT == 1
          ? `./images/hidraulica.png`
          : currT == 2
          ? `./images/hidrDirect.png`
          : ``
      }`;
      //Tabla cotizacion
      panels.innerHTML = `<td class="col-1 cotiTab">${cantPan?.cantidadPaneles}</td>
                           <td class="col-8 cotiTab">${modFotV}</td>
                           <td class="col-1 cotiTab">$${SprecioPan}</td>`;
      gabi.innerHTML = `<td class="col-1 cotiTab">1</td>
                           <td class="col-8 cotiTab">${gabiArma}</td>
                           <td class="col-1 cotiTab">$${SpreGabi}</td>`;
      pumpD.innerHTML = `<td class="col-1 cotiTab">1</td>
                           <td class="col-8 cotiTab">${pumpDesc}</td>
                           <td class="col-1 cotiTab">$${SprecioPump}</td>`;
      pumpEq.innerHTML = `<td class="col-1 cotiTab">1</td>
                           <td class="col-8 cotiTab">${eqBoDesc}</td>
                           <td class="col-1 cotiTab">$${SprecioEq}</td> `;
      matElec.innerHTML = `<td class="col-1 cotiTab">1</td>
                           <td class="col-8 cotiTab">${desMatElec}</td>
                           <td class="col-1 cotiTab">$${SpreMatElec}</td>`;
      if (strType != 3) {
        strElev.innerHTML = `<td class="col-1 cotiTab">1</td>
                           <td class="col-8 cotiTab">${strDesc}</td>
                           <td class="col-1 cotiTab">$${SstrEPrice}</td>`;
      }
      strPan.innerHTML = `<td class="col-1 cotiTab">1</td>
                            <td class="col-8 cotiTab">${strPaDes}</td>
                            <td class="col-1 cotiTab">$${SstrPPrice}</td>`;
      manObr.innerHTML = `<td class="col-1 cotiTab">1</td>
                            <td class="col-8 cotiTab">${servFlg==0?desManObr:desEnv}</td>
                            <td class="col-1 cotiTab">$${SservPrice}</td>`;
      coTotalHTM.innerText = `$${cotTot}`;
      
      if (proyT == 1) {
        //poner solo  bombeo

        document.getElementById("energia").style.visibility = "hidden";
        document.getElementById("energia").style.order = "3";
        grafiCont.style.display = "none";
        const bomOnly = document.querySelectorAll(".bom");
        bomOnly.forEach((elmt) => {
          elmt.style.display = "none";
        });
        descP.innerText = ` Instalación de bomba para un pozo de ${proPozo} metros de profundidad, con un volumen de agua de ${lts} LT/S, descarga de ${desc}", Con una carga dinamica de ${cdt} metros, en ${loc}. ${descFlag==1 ? descAddT : ''}`;
      }
      if (proyT == 2) {
        //poner solo solar
        document.getElementById("hidraulica").style.visibility = "hidden";
        document.getElementById("hidraulica").style.order = "3";
        document.getElementById("myChart").style.display = "none";
        document.getElementById("imgvntjs").classList.remove("col-10");
        document.getElementById("imgvntjs").classList.add("col-12");
        const solOnly = document.querySelectorAll(".sol");
        solOnly.forEach((elmt) => {
          elmt.style.display = "none";
        });

        descP.innerText = `Instalación de ${cantPan?.cantidadPaneles} paneles solares, para energizar una bomba de ${pumpHP}HP en ${loc}. ${descFlag==1 ? descAddT : ''}`;
        descEnerg.innerHTML = `${
          cantPan?.cantidadPaneles
        } ${modFotV} ${gabiArma}<br>${
          strType === 3 ? `` : `${strDesc}<br>`
        }${strPaDes}<br>${desMatElec}`;
      }
      if (proyT == 3) {
        descP.innerText = ` Instalación de bombeo solar para un pozo de ${proPozo} metros de profundidad, con un volumen de agua de ${lts} LT/S,  descarga de ${desc}", Con una carga dinamica de ${cdt} metros, en ${loc}. ${descFlag==1 ? descAddT : ''}`;
        descEnerg.innerHTML = `${
          cantPan?.cantidadPaneles
        } ${modFotV} ${gabiArma}<br>${
          strType === 3 ? `` : `${strDesc}<br>`
        }${strPaDes}<br>${desMatElec}`;
      }
        

      window.addEventListener("load", () => {
        const chartContainer = document.getElementById("myChart");
        chartContainer.style.width = "100%";
        chartContainer.style.height = "365px";
        chartContainer.style.margin = "0 auto";
        const myChart = echarts.init(chartContainer);
        const valores = Object.values(graData);
        const valorMaximo = Math.max(...valores);
        const option = {
          grid: {
            left: '100px',
            right: '100px'
            
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#4c9d2f",
              },
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ["Lts por día Promedio", "Radiación/Mes"],
          },
          xAxis: [
            {
              type: "category",
              data: Object.keys(graData),
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "Lts por día Promedio",
              min: 0,
              max: Math.round(valorMaximo),
              interval: Math.round(Math.ceil(valorMaximo / 10)),
              axisLabel: {
                formatter: "{value}lts/dia",
              },
            },
            {
              type: "value",
              name: "Radiación/Mes",
              min: 0,
              max: 10,
              interval: 1,
              axisLabel: {
                formatter: "{value} kWh/m2/dia",
              },
            },
          ],
          series: [
            {
              name: "Lts por día Promedio",
              type: "bar",
              tooltip: {
                valueFormatter: function (value) {
                  return value + " lts/día";
                },
              },
              data: Object.values(graData).map(Math.round),
              itemStyle: {
                color: "#4c9d2f",
              },
            },
            {
              name: "Radiación/Mes",
              type: "line",
              yAxisIndex: 1,
              tooltip: {
                valueFormatter: function (value) {
                  return value + " kWh/m2/día";
                },
              },
              data: [
                5.53, 6.13, 7.15, 6.81, 6.45, 6.08, 5.64, 5.69, 5.64, 6.21,
                6.02, 5.42,
              ],
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    } else {
      console.log("error retrieving myObject");
    }
  } else {
    console.error("Elements not found.", error);
  }
});

function getObjectFromLocalStorage(key) {
  try {
    const storedObject = localStorage.getItem(key);
    if (storedObject) {
      console.log("Object retrieved from local storage successfully");
      console.log(JSON.parse(storedObject));
      return JSON.parse(storedObject);
    } else {
      console.warn("Object not found in local storage.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving object from local storage:", error);
    return null;
  }
}

