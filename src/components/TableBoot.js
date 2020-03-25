import React from 'react';
import Table from 'react-bootstrap/Table'

import '../Table.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class TableBoot extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          rows: [
            {
                "requestCount": "100",
                "district": "Bengaluru",
                "type": "VEHICLE",
                "status": "Approved",
                "createdAt": "25/03/2020 | 07:01 am",
                "pdfUrl": "https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200308-sitrep-48-covid-19.pdf"
            },
            {
                "requestCount": "300",
                "district": "Bengaluru",
                "type": "PERSON",
                "status": "Pending",
                "createdAt": "30/04/2020 | 10:01 pm",
                "pdfUrl": null
            }
          ]
        }
    }

    render() {

        const Orders = this.state.rows.map(
            (item, index) => {
                        return(
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item["type"]}</td>
                                <td>{item["requestCount"]}</td>
                                <td>{item["createdAt"]}</td>
                                <td>{item["district"]}</td>
                                <td>{item["status"]}</td>
                                <td>{item["pdfUrl"]}</td>
                            </tr>
                        )
                    }
        );

        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        <th>#</th>
                        <th>Type</th>
                        <th>No of Passes</th>
                        <th>Raised on</th>
                        <th>District</th>
                        <th>Status</th>
                        <th>Download</th>
                    </thead>
                    <tbody>
                        {Orders}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TableBoot;