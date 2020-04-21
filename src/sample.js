import React from "react";
import {Table, Tbody, Td, Th, Thead, Tr} from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './ChartStyle.css'

 function Tabs(props)
{

    return(
        <div  id="tab">

            <Table border="1" id="tab2">
                <Thead>
                    <Tr>
                        <Th>Total Cases</Th>
                        <Th>Recovered</Th>
                        <Th>Deaths</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>{props.total}</Td>
                        <Td>{props.recover}</Td>
                        <Td>{props.death}</Td>
                    </Tr>

                </Tbody>
            </Table>
        </div>
    )
}

export default Tabs;
