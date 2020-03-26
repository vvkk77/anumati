import React from 'react';
import uuidv4 from 'uuid/v4';
import TableBoot from './TableBoot';

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const AWS_ACCESS_KEY_ID = 'AKIA42DEGMQ2KQT3EOHX';
const AWS_SECRET_ACCESS_KEY = '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\n';

class ListRequest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            organization: this.props.organization,
            accountId : this.props.accountId,
            authToken: this.props.authToken,
            organizationName: '',
            orderList: [],
            file: null
        }

        this.uploadFile = this.uploadFile.bind(this);
        this.uploadFileToS3 = this.uploadFileToS3.bind(this);
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

    async uploadFileToS3(buffer, name, type) {

        // configure the keys for accessing AWS
        // configure keys later
        await AWS.config.update({
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        });

        // configure AWS to work with promises
        await AWS.config.setPromisesDependency(bluebird);

        // create S3 instance
        const s3 = new AWS.S3();

        const params = {
          ACL: 'public-read',
          Body: buffer,
          Bucket: process.env.S3_BUCKET,
          ContentType: type.mime,
          Key: `${name}.${type.ext}`
        };

        return s3.upload(params).promise();
    };

	async uploadFile() {

        const formData = new FormData();
        await formData.append('file', this.state.file[0]);
        const form = new multiparty.Form();

        await form.parse(formData, async (error, fields, files) => {
            if (error) throw new Error(error);

            try {
                const path = files.file[0].path;
                const buffer = await fs.readFileSync(path);
                const type = fileType(buffer);
                const timestamp = Date.now().toString();
                const fileName = `bucketFolder/${timestamp}-lg`;
                const data = await this.uploadFileToS3(buffer, fileName, type);
            // return response.status(200).send(data);
            } catch (error) {
            // return response.status(400).send(error);
            }
        });
    }
    
    async onFileChangeHandler(event){
        await this.setState({file: event.target.files});
    };

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group files color">
                            <form onSubmit={this.uploadFile}>
                            <label>Upload Your File </label>
                                <input type='file' className="form-control" accept=".csv" onChange={this.onFileChangeHandler} />
                                <button type='submit'>Send</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
                <TableBoot rows={this.state.orderList} />
            </div>
        );
    }
}
export default ListRequest;