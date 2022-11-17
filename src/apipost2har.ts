class apipost2har {
  version: string;
  project: any;
  apis: any[];
  env: any[];
  constructor() {
    this.version = '1.0';
    this.project = {};
    this.apis = [];
    this.env = [];
  }
  createMode(type: string) {
    const MODE: any = {
      none: 'none',
      'form-data': 'multipart/form-data',
      urlencoded: 'application/x-www-form-urlencoded',
      json: 'application/json',
      xml: 'application/xml',
      javascript: 'application/javascript',
      plain: 'text/plain',
      html: 'text/html',
    }
    if (MODE[type]) {
      return MODE[type];
    } else {
      return 'multipart/form-data';
    }
  }
  ConvertResult(status: string, message: string, data: any = '') {
    return {
      status,
      message,
      data
    }
  }
  validate(json: any) {
    // if (!json.hasOwnProperty('projectInfo')) {
    //   return this.ConvertResult('error', 'Must contain a ApipostJson field');
    // }

    return this.ConvertResult('success', '');
  }
  handleData(json: any) {
    let harRequest: any = {
      method: json?.method || 'GET',
      url: '',
      cookies: [],
      headers: [],
      queryString: [],
      postData: {},
      comment:json?.description || ''
    }
    if (json.hasOwnProperty('request')) {
      const { request } = json || {};
      harRequest.url = request?.url || '';
      if (request.hasOwnProperty('header') && request.header.hasOwnProperty('parameter') && request.header.parameter instanceof Array) {
        for (const header of request.header.parameter) {
          if (header.key && (!header.hasOwnProperty('is_checked') || header.is_checked == 1)) {
            harRequest.headers.push({
              name: header?.key || '',
              value: header?.value || '',
              comment: header?.description || '',
            })
          }
        }
      }
      if (request.hasOwnProperty('query') && request.query.hasOwnProperty('parameter') && request.query.parameter instanceof Array) {
        for (const query of request.query.parameter) {
          if (query.key && (!query.hasOwnProperty('is_checked') || query.is_checked == 1)) {
            harRequest.queryString.push({
              name: query?.key || '',
              value: query?.value || '',
              comment: query?.description || '',
            })
          }
        }
      }
      if (request.hasOwnProperty('body') && request.body.hasOwnProperty('mode') && request.body.mode != 'none') {
        const { body } = request;
        harRequest.headers.push({
          name: 'content-type',
          value: this.createMode(body.mode),
          comment: '',
        })
        harRequest.postData = {
          mimeType: this.createMode(body.mode),
          params: [],
          text: "",
          comment: ""
        }
        if (body.mode == 'form-data' || body.mode == 'urlencoded') {
          if (body.hasOwnProperty('parameter') && body.parameter instanceof Array) {
            for (const parm of body.parameter) {
              if (parm.key && (!parm.hasOwnProperty('is_checked') || parm.is_checked == 1)) {
                let harParm: any = {
                  name: parm?.key || '',
                  value: parm?.value || '',
                  comment: parm?.description || ""
                }
                if (parm.hasOwnProperty('type') && parm.type == 'File') {
                  harParm['fileName'] = parm?.value || '';
                  harParm['contentType'] = parm?.content_type || '';
                }
                harRequest.postData.params.push(harParm);
              }
            }
          }
        }else{
          harRequest.postData.text=body?.raw || '';
        }
      }
    }
    return harRequest;
  }
  convert(json: object) {
    try {
      var validationResult = this.validate(json);
    if (validationResult.status === 'error') {
      return validationResult;
    }
    validationResult.data = this.handleData(json);
    console.log('api', JSON.stringify(validationResult));
    return validationResult;
    } catch (error) {
      return this.ConvertResult('error',String(error))
    }
  }
}

export default apipost2har;
