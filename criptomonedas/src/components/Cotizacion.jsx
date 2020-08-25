import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    color:#FFF;
`;

const Info = styled.p`
    font-size: 18px;

    span{
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30x;
`;

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).lenght === 0) return null;
    console.log(resultado)
    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Preico más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio mas bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Ultimas 24 horas: <span>{resultado.CHANGEPCT24HOURS}</span></Info>
            <Info>Ultima actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
}
 
export default Cotizacion;