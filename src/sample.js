import React from "react";
import {Table, Tbody, Td, Th, Thead, Tr} from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './ChartStyle.css'

 function Tabs(props)
{

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
                        <Td scope="row">{props.total}</Td>
                        <Td scope="row">{props.recover}</Td>
                        <Td scope="row">{props.death}</Td>
                    </Tr>

                </Tbody>
            </Table>
        </div>
    )
}

export default Tabs;
