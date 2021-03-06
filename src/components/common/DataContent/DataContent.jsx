import React from 'react';
import { Modal } from 'antd';
import './DataContent.scss';
import { Divider } from 'antd/es';
import Lodash from 'lodash';
import getSensitiveWord from '../../../services/request/data/getSensitiveWord';
import getEventKeyWordByFid from '../../../services/request/data/getEventKeyWordByFid';
import criteria from '../MultiFilter/criteria';
import getSensitiveWordsByFid from '../../../services/request/data/getSensitiveWordsByFid';

class DataContent extends React.Component {
  constructor() {
    super();
    this.state = {
      contentSlice: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.record !== this.props.record) this.getSensitiveWordAndEventKeyWord();
  }

  getSensitiveWordAndEventKeyWord = async () => {
    const { content } = this.props.record || {};
    const result1 = await getSensitiveWordsByFid(this.props.fid);
    const result2 = await getEventKeyWordByFid(this.props.fid);
    let contentSlice = [{
      sensitive: false,
      isKeyword: false,
      slice: content,
    }];
    const sensitiveWord = Array.isArray(result1) ? result1.map((item) => item.sw) : [];
    sensitiveWord.forEach((word) => {
      const newContentSlice = [];
      contentSlice.forEach((item) => {
        if (item.sensitive === true) newContentSlice.push(item);
        else if (item.slice.includes(word) === false) newContentSlice.push(item);
        else {
          item.slice.split(word).forEach((slice, index, array) => {
            newContentSlice.push({
              sensitive: false,
              isKeyword: false,
              slice,
            });
            if (index !== array.length - 1) {
              newContentSlice.push({
                sensitive: true,
                isKeyword: false,
                slice: word,
              });
            }
          });
        }
      });
      contentSlice = newContentSlice;
    });
    const keyWord = Array.isArray(result2) ? result2.map((item) => item.kw) : [];
    keyWord.forEach((word) => {
      const newContentSlice = [];
      contentSlice.forEach((item) => {
        if (item.isKeyword === true) newContentSlice.push(item);
        else if (item.slice.includes(word) === false) newContentSlice.push(item);
        else {
          item.slice.split(word).forEach((slice, index, array) => {
            newContentSlice.push({
              sensitive: item.sensitive,
              isKeyword: false,
              slice,
            });
            if (index !== array.length - 1) {
              newContentSlice.push({
                sensitive: item.sensitive,
                isKeyword: true,
                slice: word,
              });
            }
          });
        }
      });
      contentSlice = newContentSlice;
    });

    this.setState({ contentSlice });
    /* let prevEnd = 0;
    result.forEach(item => {
      if (item.st !== prevEnd) {
        contentSlice.push({
          sensitive: false,
          slice: content.slice(prevEnd, item.st),
        });
      }
      prevEnd = item.ed;
      contentSlice.push({
        sensitive: true,
        slice: content.slice(item.st, item.ed),
      });
    });
    contentSlice.push({
      sensitive: false,
      slice: content.slice(prevEnd),
    });
    this.setState({ contentSlice }); */
  };

  renderSource = (text) => {
    const options = Lodash.find(criteria, { name: 'source' })?.options || [];
    return Lodash.find(options, { value: text })?.label || '';
  };

  renderSensi = (text) => {
    if (!text) return '';
    if (text.indexOf('????????????') !== -1) return '??????';
    return '?????????';
  };

  render() {
    const { record, visible, handleModalCancel } = this.props;
    const { title, content, url, addr, resource, sensi, publishedDay, webpageUrl, sensitiveType } = record || {};
    const { contentSlice } = this.state;
    return (
      <Modal
        title={
          resource === '????????????' ? '' : title
        }
        visible={visible}
        onCancel={handleModalCancel}
        wrapClassName="mts-data-list"
        className="mts-content-modal"
      >
        <div className="attr">
          <span className="title">????????? </span>
          <span className="value">{webpageUrl}</span>
        </div>
        <div className="attr">
          <span className="title">????????? </span>
          <span className="value">{resource} {addr}</span>
        </div>
        <div className="attr">
          <span className="title">???????????? </span>
          <span className="value">{this.renderSensi(sensitiveType)}</span>
        </div>
        <div className="attr">
          <span className="title">??????????????? </span>
          <span className="value">{publishedDay}</span>
        </div>
        <Divider />
        <div className="content">
          {
            // eslint-disable-next-line no-nested-ternary
          contentSlice.map((item) => (item.sensitive ?
            <span className="sensitive">{item.slice.replace(/\\n/g, '')}</span> : item.isKeyword ? <span className="iskeyword">{item.slice.replace(/\\n/g, '')}</span> :
            <span>{item.slice.replace(/\\n/g, '')}</span>))
        }
        </div>
      </Modal>
    );
  }
}

export default DataContent;
