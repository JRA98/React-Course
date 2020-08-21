export const revisarPresupuesto = (presupuesto, restante) => {
    let clase;

    if( (presupuesto / 4) > restante ){
        clase = 'alert alert-dange';
    }else if((presupuesto/2 > restante)){
        clase = 'akert alert-warning';
    }else{
        clase = 'akert alert-success';
    }

    return clase;
}