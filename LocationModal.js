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
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import Modal from './NativeModal';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// const basePx = 375;
const Size = (font) => {
    return font * screenWidth / 375;
}

const AndroidStatusBar = Platform.OS == 'android'? StatusBar.currentHeight: 0;

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
            itemHeight: 0,
            yNumber: 0,
        };
        this.callback = () => {};
    }

    onShow(data={},position={y:0,height:0},callback) {
        this.callback = callback;
        this.setState({
            menuList: data,
            yNumber: position&&position.y,
            itemHeight: position&&position.height,
            visible: true,
        });
    }

    /** 获取默认的弹出位置,通过样式的形式返回 */
    getPositionStyle = () => {
        let positionStyle = {};
        if (parseInt(this.state.yNumber) > parseInt(screenHeight / 2)) {
            positionStyle = {bottom: screenHeight - (this.state.yNumber + AndroidStatusBar - this.props.paddingWidth) };
        } else {
            positionStyle = {top: this.state.yNumber + this.state.itemHeight + this.props.paddingWidth };
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
        maxWidth: screenWidth-(Platform.OS == 'ios'?10:20),
        maxHeight: screenHeight*0.4,
        position: 'absolute',
        right: 10,
        paddingHorizontal: 10,
        borderRadius: 3,
        backgroundColor: '#fff',
    },
});