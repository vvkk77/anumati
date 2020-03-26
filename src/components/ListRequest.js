import React from 'react';
import axios from 'axios';
import '../ListRequest.css';

import TableBoot from './TableBoot';
import BaseCard from './BaseCard';
import api from '../api';

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
            fetchError: ''
        };
        // this.sampleFunction = this.sampleFunction.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.createStaticData = this.createStaticData.bind(this);
        this.onVehicle = this.onVehicle.bind(this);
        this.onPerson = this.onPerson.bind(this);
    }

    async componentDidMount() {
        //get all orders
        try{
            const response = await api.getAllOrders(this.state.accountId, this.state.authToken);
            console.log('response', {response});
            if(response.status === 200){
                this.setState({ orderList: response.data.orders });
            } else {
                await this.createStaticData();
            }
        } catch (error){
            this.setState({fetchError: error.toString()});
            await this.createStaticData();
        }
    }

    //placeholder data
    async createStaticData(){
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
    }

    async createRequest() {
        // create request to save file
        if (!this.state.type) {
            return;
        }
        try {
            const response = await api.createOrder(this.state.type, this.state.file, this.state.authToken);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    async onFileChangeHandler(event) {
        await this.setState({ file: event.target.files });
    }

    async onVehicle() {
        await this.setState({
            type: 'vehicle'
        });
    }

    async onPerson() {
        await this.setState({
            type: 'person'
        });
    }

    render() {
        return (
            <div className='padding-46'>
                <div class='action-container'>
                    <BaseCard isActive onClick={this.onPerson}>
                        <img height='60' src='../individual-order.png' />
                    </BaseCard>
                    <BaseCard  onClick={this.onVehicle}>
                        <img height='60' src='../vehicle-order.png' />
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
