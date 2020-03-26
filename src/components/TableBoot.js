import React from 'react';
import Table from 'react-bootstrap/Table'

import '../Table.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class TableBoot extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {

        const Orders = this.props.rows.map(
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