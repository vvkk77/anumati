import React from 'react';
import axios from 'axios';
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
            type: ''
        }
        // this.sampleFunction = this.sampleFunction.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    }

    async componentDidMount() {
    }

	async createRequest() {
        // create request to save file
        let formData = new FormData();
        if(!this.state.type){
            return;
        }
        formData.append('type', this.state.type);
        formData.append('authToken', this.state.authToken);
        formData.append('file', this.state.file[0]);
        const url = `http://localhost:3000` + '/createApplication';

        // try{
        //     const response = await axios.post(url, formData);
        //     console.log(response);
        // } catch (error){
        //     console.log(error);
        // }
    }

    async onFileChangeHandler(event) {
        await this.setState({file: event.target.files});
    };

    render() {
        return(
            <div>
                <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"></link>
                <script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
                <div className="container">
            <div className="row">
                <div className="col-md-6">
                        <div className="form-group files color">
                        <form onSubmit={this.createRequest}>
                        <label>Upload Your File </label>
                            <input type='file' className="form-control" accept=".csv" onChange={this.onFileChangeHandler} />
                            <button type='submit'>Send</button>
                        </form>
                        </div>
                </div>
            </div>
        </div>
            </div>
        );
    }
}
export default ListRequest;