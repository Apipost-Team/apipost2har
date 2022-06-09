import apipost2har from '../src/apipost2har'
let path = require('path')
let fs = require('fs')

describe('works', () => {
  let ApiPostJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/ApiPost.json'), 'utf-8'));
  let Apipost2har=new apipost2har();
  let result=Apipost2har.convert(ApiPostJson);
  it('apipost2har test', () => {
    expect(result.status).toBe('success');
  });
});

