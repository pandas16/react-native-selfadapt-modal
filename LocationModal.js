/**
 * 可设定打开位置的Modal
 * 
 * 使用方法: onShow
 * @param data [Array] 列表数据源
 * @param position [Object] 定位的对象,y:元素的y轴位置,height:元素的高度
 * @param callback [Function] 列表项的点击回调
 */
import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    FlatList,
    Platform,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

import {screenWidth,screenHeight,Size} from './constr';
import Modal from './NativeModal';
import PropTypes from 'prop-types';

const AndroidStatusBar = Platform.OS == 'android'? StatusBar.currentHeight: 0;
const DefaultModalWidth = screenWidth-(Platform.OS=='ios'?10:20);

export default class LocationModal extends React.PureComponent {
    static propTypes = {
        menuList: PropTypes.array.isRequired, //选项列表
        label: PropTypes.string, //用于显示的选项的label
        content: PropTypes.string, //默认选项
        paddingWidth: PropTypes.number, //按钮的padding高度
        privateMenuItem: PropTypes.func, //自定义选项组件
        modalStyle: PropTypes.object, //modal样式
        activeMenuStyle: PropTypes.object, //选中单项选项容器样式
        unActiveMenuStyle: PropTypes.object, //未选中单项选项容器样式
        activeMenuTextStyle: PropTypes.object, //选中单项选项文本样式
        unActiveMenuTextStyle: PropTypes.object, //未选中单项选项文本样式
        ...View.propTypes
    }

    static defaultProps = {
        paddingWidth: 0,
        label: 'name',
        content: '',
        activeMenuStyle: {}, 
        unActiveMenuStyle: {}, 
        activeMenuTextStyle: {}, 
        unActiveMenuTextStyle: {}, 
    }

    constructor(props) {
        super(props);
        this.state = {
            menuList: props.menuList || [],
            visible: false,
            position: {},
        };
        this.callback = () => {};
    }

    onShow(data={},position={},callback) {
        this.callback = callback;
        this.setState({
            menuList: data,
            position: position,
            visible: true,
        });
    }

    /** 获取默认的弹出位置,通过样式的形式返回 */
    getPositionStyle = () => {
        let { position={} } = this.state;
        let positionStyle = {};
        if (parseInt(position.top) > parseInt(screenHeight / 2)) {
            positionStyle = {bottom: screenHeight-(position.top+AndroidStatusBar-this.props.paddingWidth)};
        } else {
            positionStyle = {top: position.top+position.height+this.props.paddingWidth};
        }
        if (position&&position.left&&position.left>10) {
            positionStyle.left = position.left;
            positionStyle.maxWidth = screenWidth-position.left-(Platform.OS=='ios'?5:10); //iOS自带右边距
        }
        return positionStyle;
    }

    onClose() {
        this.setState({visible:false});
    }

    onMenuItemClick = (item,index) => {
        this.callback && this.callback(item,index);
        this.onClose();
    }

    renderMenuItem = ({item,index}) => {
        let {label,content,privateMenuItem,activeMenuStyle,unActiveMenuStyle,activeMenuTextStyle,unActiveMenuTextStyle} = this.props;
        let isSelect = (item&&item[label] || item) == content;
        return (
            <TouchableOpacity onPress={()=>this.onMenuItemClick(item,index)} activeOpacity={0.7} 
                style={[{paddingVertical:10},isSelect?activeMenuStyle:unActiveMenuStyle]}>
                {privateMenuItem?privateMenuItem(item,index,isSelect):
                    <Text style={[{fontSize:Size(14),color:isSelect?'#58A0FF':'#000'},isSelect?activeMenuTextStyle:unActiveMenuTextStyle]}>
                        {`${item&&item[label] || item}`}
                    </Text>
                }
            </TouchableOpacity>
        );
    }

    renderSeparator = () => {
        return <View style={{height:1,backgroundColor:'#f7f7f7'}}/>
    }

    render() {
        let { modalStyle={},ItemSeparatorComponent } = this.props;
        if (this.state.menuList&&this.state.menuList.length>0) {
            return (
                <Modal visible={this.state.visible} onClose={()=>this.onClose()}>
                    <View style={[styles.modalBox,this.getPositionStyle(),modalStyle]}>
                        <FlatList
                            data={this.state.menuList}
                            extraData={this.state}
                            keyExtractor={(item,index)=>{return 'menusIndex'+index}}
                            renderItem={this.renderMenuItem}
                            ItemSeparatorComponent={ItemSeparatorComponent?ItemSeparatorComponent:this.renderSeparator}
                            showsVerticalScrollIndicator={false}/>
                    </View>
                </Modal>
            )   
        }else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    modalBox: {
        maxWidth: DefaultModalWidth,
        maxHeight: screenHeight*0.4,
        position: 'absolute',
        left: 10,
        paddingHorizontal: 10,
        borderRadius: 3,
        backgroundColor: '#fff',
    },
});