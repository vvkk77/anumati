import React from 'react';
import axios from 'axios';
import TableBoot from './TableBoot';
import BaseCard from './BaseCard';
import individualOrderImage from '../images/individual-order.png';
import vehicleOrderImage from '../images/vehicle-order.png';

class ListRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            organization: this.props.organization,
            accountId: this.props.accountId,
            authToken: this.props.authToken,
            organizationName: '',
            orderList: [],
            file: null,
            type: null,
        };
        // this.sampleFunction = this.sampleFunction.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    }

    async componentDidMount() {
        //get all applications

        const response = await fetch('https://api.npms.io/v2/search?q=react');
        const data = await response.json();

        await this.setState({
            orderList: [
                {
                    id: '',
                    accountId: '',
                    orderStatus: '',
                    orderType: '',
                    requestCount: '100',

                    district: 'Bengaluru',
                    type: 'VEHICLE',
                    status: 'Approved',
                    createdAt: '25/03/2020 | 07:01 am',
                    pdfUrl:
                        'https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200308-sitrep-48-covid-19.pdf',
                },
                {
                    requestCount: '300',
                    district: 'Bengaluru',
                    type: 'PERSON',
                    status: 'Pending',
                    createdAt: '30/04/2020 | 10:01 pm',
                    pdfUrl: null,
                },
            ],
        });

        await this.setState({
            organizationName: data.organizationName,
        });
    }

    async createRequest() {
        // create request to save file
        let formData = new FormData();
        if (!this.state.type) {
            return;
        }
        formData.append('type', this.state.type);
        formData.append('accountId', this.state.accountId);
        formData.append('authToken', this.state.authToken);
        formData.append('file', this.state.file[0]);
        const url = `http://localhost:3000` + '/createOrder';

        try {
            const response = await axios.post(url, formData);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    async onFileChangeHandler(event) {
        await this.setState({ file: event.target.files });
    }

    render() {
        return (
            <div className='padding-46'>
                <div class='action-container'>
                    <BaseCard isActive>
                        <img height='60' src={individualOrderImage} />
                    </BaseCard>
                    <BaseCard>
                        <img height='60' src={vehicleOrderImage} />
                    </BaseCard>
                    <div class='separator'></div>
                    <BaseCard>Download Sample file</BaseCard>

                    <div class='upload-container'>
                        <label for='file-upload'>Upload file</label>
                        <input
                            hidden
                            id='file-upload'
                            type='file'
                            accept='.csv'
                            onChange={this.onFileChangeHandler}
                        />
                    </div>

                    <BaseCard onClick={this.createRequest} class='send-request-btn'>
                        Send Request
                    </BaseCard>
                </div>
                <TableBoot rows={this.state.orderList} />
            </div>
        );
    }
}
export default ListRequest;
