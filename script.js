/*
    3 modelos de autos con precios distintos
    Cada año del auto debe ser un 3% mas barato
    El tipo Basico debe valer un 25% mientras que el completo 50% más
*/ 
const max = new Date().getFullYear(),
      min = max -20;

const selectYear = document.querySelector("#year");
for(let i=max;i>min;i--){
    let option = document.createElement("option");
    option.value=i;
    option.innerHTML=i;
    selectYear.appendChild(option);
}
//Listeners
const btnSend = document.querySelector("#btnSend").addEventListener("click", calculate);
//Functions
function calculate(e){
    e.preventDefault();
    //brand
    const brand = document.querySelector("#brand");
    const selectedBrand=brand.options[brand.selectedIndex].textContent;
    //year
    const year = document.querySelector("#year");
    const selectedYear = year.options[year.selectedIndex].value;
    //radio button 
    const type = document.querySelector("input[name='customRadio']:checked").value;
    //Instanciando Seguro
    const seguro = new Seguro(selectedBrand,selectedYear,type);
    //Instanciando Interfaz
    const interfaz = new Interfaz(selectedBrand,selectedYear,type);
    //Borrando resumen si ya existe
    const resumen = document.querySelector("#dataContainer");
    const mensaje = document.querySelector(".mensaje");
    const gif = document.querySelector("#gif");
    if(resumen != null){
        resumen.remove();
    }
    if(mensaje != null ){
        mensaje.remove();
    }
    if(gif != null){
        gif.remove();
    }
    //validando
    if(selectedBrand == "-Seleccionar-" || selectedYear === "" || type === ""){
        interfaz.mostrarError();
    }else{
        seguro.costeTotal();
        interfaz.mostrarCorrecto();
    }
}
//Classes
class Seguro{
    constructor(brand,year,type){
        this.brand = brand;
        this.year = year;
        this.type = type;
    } 
    marca(){
        let coste
        if(this.brand == "Americano"){
            coste = 2000;
        }else if (this.brand == "Asiatico"){
            coste = 1000;
        }else{
            coste = 3000;
        }
        return coste;
    }
    año(){
        let restoAños = max - this.year;
        let impuesto = restoAños * 3;
        return impuesto;    
    }
    tipo(){
        let valorTipo;
        if(this.type=="basico"){
            valorTipo=25;
        }else{
            valorTipo=50;
        }
        return valorTipo;
    }
    costeTotal(){
        let marca = this.marca(),
        año = `0.${this.año()}`;
        if(año.length == 3){
            año = `0.0${this.año()}`
        }
        let tipo = `0.${this.tipo()}`,
        añoFloat = Number(año),
        tipoFloat = Number(tipo),
        coste = marca + marca*(añoFloat+tipoFloat);
        return coste; 
        
    }
}
class Interfaz extends Seguro{
    constructor(brand,year,type){
        super(brand,year,type);
    }
    mostrarError(){
        const div = document.createElement("div");
        const box = document.querySelector("#box");
        div.classList.add("alert","alert-danger","mensaje");
        div.innerText = "Faltan datos";
        box.insertBefore(div, document.querySelector("#label"));
        setTimeout(function(){
            document.querySelector(".mensaje").remove();      
        },2000);
    }
    mostrarCorrecto(){
        const div = document.createElement("div");
        const box = document.querySelector("#box");
        div.classList.add("alert","alert-success","mensaje");
        div.innerText = "Calculando...";
        box.insertBefore(div, document.querySelector("#label"));
        this.mostrarDatos();
        
    }
    mostrarDatos(){
       //set the  data summary
        let coste = this.costeTotal();
        const div = document.createElement("div");
        div.id= "dataContainer";
        const info = `
            <ul class="m-3">
                <li>Marca: ${this.brand}</li>
                <li>Año: ${this.year}</li>
                <li>Tipo de seguro: ${this.type}</li>
                <li><b>Coste:</b> $${coste}</li>
            </ul>
        `;
        //set the loading gif
        const img = document.createElement("img");
        const gifBox = document.querySelector("#gifBox");
        img.classList.add("w-25","h-25");
        img.src="img/loading.gif";
        img.id="gif"
        gifBox.appendChild(img);
        //then show up
        setTimeout(function(){
            document.querySelector(".mensaje").remove();
            img.remove();   
            div.innerHTML=info;
            gifBox.appendChild(div);
        },2000);
    }
}