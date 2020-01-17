/**
 * 包含了可定位Modal的按钮组件
 * 备注:LocationModal的容器组件,统一封装了定位函数和点击事件
 */
import React from 'react';
import { 
    TouchableOpacity,
    View,
    Keyboard,
    ViewPropTypes,
} from 'react-native';

import LocationModal from './LocationModal';
import PropTypes from 'prop-types';

class LocationIndex extends React.PureComponent {
    static propTypes = {
        menuList: PropTypes.array.isRequired, //选项列表
        children: PropTypes.node.isRequired, //子元素
        onPress: PropTypes.func, //点击事件
        containerStyle: ViewPropTypes.style, //按钮样式
        ...View.propTypes
    }

    static defaultProps = {
        containerStyle: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            errInfo: null,
        };
    }

    getPosition = (callback) => {
        this.listRow&&this.listRow.measureInWindow((left, top, width, height) => {
            callback&&callback({left, top, width, height});
        });
    }

    onDownDropClick = () => {
        Keyboard.dismiss();
        this.getPosition((position)=>{
            let downDropData = this.props.menuList || [];
            if (downDropData&&downDropData.length>0) {
                this.itemModal&&this.itemModal.onShow(downDropData,position,(onClickRes)=>{
                    this.props.onPress&&this.props.onPress(onClickRes);
                });
            }
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>this.onDownDropClick()} activeOpacity={0.7}
                collapsable={false} ref={(o)=>this.listRow=o} style={this.props.containerStyle}>
                {this.props.children}
                <LocationModal ref={(o)=>this.itemModal=o} {...this.props} />
            </TouchableOpacity>
        );
    }
}
module.exports = LocationIndex;