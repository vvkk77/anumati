import React from 'react';
import axios from 'axios';
import '../ListRequest.css';
import TableBoot from './TableBoot';

class ListRequest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            organization: this.props.organization,
            accountId : this.props.accountId,
            authToken: this.props.authToken,
            organizationName: '',
            orderList: [],
            file: null,
            type: null
        }
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
        });

        await this.setState({
            organizationName: data.organizationName
        });
    }

	async createRequest() {
        // create request to save file
        let formData = new FormData();
        if(!this.state.type){
            return;
        }
        formData.append('type', this.state.type);
        formData.append('accountId', this.state.accountId)
        formData.append('authToken', this.state.authToken);
        formData.append('file', this.state.file[0]);
        const url = `http://localhost:3000` + '/createOrder';

        try{
            const response = await axios.post(url, formData);

            console.log(response);
        } catch (error){
            console.log(error);
        }
    }

    async onFileChangeHandler(event) {
        await this.setState({file: event.target.files});
    };

    render() {
        return(
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "100px",
                    marginBottom: "100px"
                }}>
                    <button className="button">
                        <img src="../individual.jpg" />
                    </button>
                    <button className="button">
                        <img src="../vehicle.jpg" />
                    </button>
                    <form onSubmit={this.createRequest} style={{
                        // flexGrow: "2"
                    }}>
                        <label>Upload Your File </label>
                        <input type='file' className="form-control" accept=".csv" onChange={this.onFileChangeHandler} />
                        <button type='submit'>Send</button>
                    </form>
                </div>
                <TableBoot rows={this.state.orderList} />
            </div>
        );
    }
}
export default ListRequest;