import React from "react";
import {Table, Tbody, Td, Th, Thead, Tr} from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './ChartStyle.css'

 function Tabs(props)
{
    let total = props.total;
    let recover = props.recover
    let death = props.death
    if (total==="...loading"){
        total = <i className="fa fa-cog fa-spin" />;
        recover = <i className="fa fa-cog fa-spin" />;
        death = <i className="fa fa-cog fa-spin" />;;
    }

    return(
        <div  id="tab">
            <Table border="1" id="tab2" className="table  thead-dark">
                <Thead className="thead-dark">
                    <Tr>
                        <Th scope="col">Total Cases</Th>
                        <Th scope="col">Recovered</Th>
                        <Th scope="col">Deaths</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td scope="row" id="bold">{total}</Td>
                        <Td scope="row" id="bold2">{recover}</Td>
                        <Td scope="row" id="bold3">{death}</Td>
                    </Tr>

                </Tbody>
            </Table>
        </div>
    )
}

export default Tabs;
