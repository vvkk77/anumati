import React from 'react';

import downloadArrow from '../images/download-arrow.png';
import '../Table.css';
import { formatDate } from '../utils';
import { Badge, Table, Button } from 'react-bootstrap';

class TableBoot extends React.Component {
    render() {
        const Orders = this.props.rows.map((item, index) => {
            let statusClass = 'status';

            if (item.orderStatus) {
                statusClass += ` ${item.orderStatus.toLowerCase()}`;
            }

            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                        <Badge variant={item.orderType == 'person' ? 'primary' : 'dark'}>
                            {item.orderType.toUpperCase()}
                        </Badge>
                    </td>
                    <td className='center'>{item.requestCount}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td className={statusClass}>{item.orderStatus}</td>
                    <td>
                        {item.zipFileURL ? (
                            <Button variant='link' href={item.zipFileURL} download>
                                <img
                                    height='16'
                                    style={{ marginRight: '8px' }}
                                    src={downloadArrow}
                                    alt='Download'
                                />
                                Download QRs
                            </Button>
                        ) : null}
                    </td>
                </tr>
            );
        });

        return (
            <div className='request-table-container'>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Type</td>
                            <td className='center' width='150'>No of Passes</td>
                            <td>Raised on</td>
                            <td>Status</td>
                            <td width='300'>Download</td>
                        </tr>
                    </thead>
                    <tbody>{Orders}</tbody>
                </Table>
            </div>
        );
    }
}

export default TableBoot;
