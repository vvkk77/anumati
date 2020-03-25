import React from 'react';
import uuidv4 from 'uuid/v4'
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const AWS_ACCESS_KEY_ID = 'AKIA42DEGMQ2KQT3EOHX'
const AWS_SECRET_ACCESS_KEY = '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\n'

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
        // this.sampleFunction = this.sampleFunction.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.uploadFileToS3 = this.uploadFileToS3.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    }

    async componentDidMount() {
        //get all applications


        // const response = await fetch('https://api.npms.io/v2/search?q=react');
        // const data = await response.json();
        // await this.setState({ orderList: data.orders })
        // await this.setState({organizationName: data.organizationName})
    }

    async sampleFunction(event) {
    }

    async uploadFileToS3(buffer, name, type){
                // configure the keys for accessing AWS
                // configure keys later
        AWS.config.update({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
        });
  // configure AWS to work with promises
        AWS.config.setPromisesDependency(bluebird);
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
            formData.append('file', this.state.file[0]);
            const form = new multiparty.Form();
            form.parse(formData, async (error, fields, files) => {
              if (error) throw new Error(error);
              try {
                const path = files.file[0].path;
                const buffer = fs.readFileSync(path);
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
                <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"></link>
                <script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
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
            </div>
        );
    }
}
export default ListRequest;