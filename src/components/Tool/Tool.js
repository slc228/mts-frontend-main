import React from 'react';
import { Layout, Menu, Input, Button } from 'antd';
import { connect } from 'react-redux';
import AutofitWrap from '../common/AutofitWrap/AutofitWrap';
import './Tool.scss';
import getContentEmotion from '../../services/request/data/getContentEmotion';

class Tool extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      result: '',
    };
  }

    handleTextChange = (e) => {
      this.setState({
        text: e.target.value,
      });
    };

    handleEmotionAnalysis = async () => {
      const { text } = this.state;
      const tagResult = await getContentEmotion([text], undefined);
      let emotion = tagResult.result[0];
      if (emotion === 'happy') emotion = '积极 🥰';
      else if (emotion === 'angry') emotion = '愤怒 😡';
      else if (emotion === 'sad') emotion = '悲伤 😭';
      else if (emotion === 'fear') emotion = '恐惧 😰';
      else if (emotion === 'surprise') emotion = '惊讶 😮';
      else if (emotion === 'neutral') emotion = '中立 😐';
      this.setState({
        result: emotion,
      });
    };

    render() {
      const { curProgramme } = this.props;
      const { text, result } = this.state;
      return (
        <AutofitWrap
          minHeight={600}
          padding={150}
          className="tool-wrap"
        >
          <div className="tool-content">
            <h4>情感分析</h4>
            <Input.TextArea
              rows={5}
              onChange={this.handleTextChange}
              value={text}
            />
            <div className="submit">
              <Button type="primary" onClick={this.handleEmotionAnalysis}>检测</Button>
              <span className="result">检测结果：{result}</span>
            </div>
          </div>
        </AutofitWrap>
      );
    }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Tool);
