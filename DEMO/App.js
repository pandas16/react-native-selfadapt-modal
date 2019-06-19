/**
 * 测试
 */
import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    Image,
    StatusBar,
    ScrollView,
    Dimensions,
    SafeAreaView
} from 'react-native';

import SelfadaptModal from 'react-native-selfadapt-modal';

const manIcon = require('./source/man.png');
const womanIcon = require('./source/woman.png');
const screenWidth = Dimensions.get('window').width;
const basePx = 375;
const Size = function (font) {
    return font * screenWidth / basePx;
}
const TestData = [
    {id:10086,name:'选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1'},
    {id:10087,name:'选项2'},
    {id:10088,name:'选项3'},
    {id:10089,name:'选项4'},
];
const TestData2 = [
    {id:10010,name:'男'},
    {id:10011,name:'女'},
];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            errInfo: null,
            demoOneValue: '',
            demoTwoValue: '',
        };
    }

    doSelect = (value,label) => {
        this.setState({
            [label]: value&&value.name,
        });
    }

    renderSeparator = () => {
        return <View style={{height:10,backgroundColor:'red'}}/>
    }

    renderPrivateMenuItemOne = (item,index,isSelect) => {
        return (
            <View style={styles.horizontalBox}>
                <Image style={styles.demoThreeImg} source={item&&item.name=='男'?manIcon:womanIcon}/>
                <Text style={{fontSize:Size(16),color:'#000'}}>{`${item&&item.name}`}</Text>
            </View>
        )
    }

    renderStatusBar = () => {
        return (
            <SafeAreaView style={{backgroundColor:'#000'}}> 
                <View style={{flex:1,backgroundColor:'#fff'}}>
                    <StatusBar backgroundColor={'#58A0FF'} barStyle={'light-content'} hidden={false}/>
                </View>
            </SafeAreaView>
        )
    }

    renderNavbar = () => {
        return (
            <View style={styles.navbarContainer}>
                <Text style={{fontSize:Size(16),color:'#fff'}}>{`测试`}</Text>
            </View>
        );
    }

    render() {
        let demoTwoBg = this.state.demoTwoValue=='男'?'orange':'red';
        return (
            <View style={{flex:1}}>
                {this.renderStatusBar()}
                {this.renderNavbar()}
                <ScrollView style={styles.contentContainer}>
                    <View style={styles.demoOneBox}>
                        <Text style={{fontSize:Size(14),color:'#000',marginRight:10}}>{`普通样式:`}</Text>
                        <SelfadaptModal 
                            menuList={TestData} 
                            containerStyle={styles.demeOneBtn}
                            content={this.state.demoOneValue}
                            onPress={(res)=>this.doSelect(res,'demoOneValue')}>
                            <Text style={{fontSize:Size(14),color:'#fff'}}>{`点击选择`}</Text>
                        </SelfadaptModal>
                        <Text style={styles.demoOneResult} numberOfLines={2}>
                            {`${this.state.demoOneValue||''}`}
                        </Text>
                    </View>
                    <View style={styles.demoOneBox}>
                        <SelfadaptModal 
                            menuList={TestData2} 
                            containerStyle={styles.demeOneBtn}
                            content={this.state.demoTwoValue}
                            onPress={(res)=>this.doSelect(res,'demoTwoValue')}>
                            <View style={{height:10,width:10,borderRadius:5,backgroundColor:demoTwoBg}}/>
                        </SelfadaptModal>
                    </View>
                    <View style={[styles.demoOneBox,{justifyContent:'space-between'}]}>
                        <SelfadaptModal
                            containerStyle={{paddingVertical:10}}
                            menuList={TestData2}
                            content={this.state.demoTwoValue}
                            onPress={(res)=>this.doSelect(res,'demoTwoValue')}
                            privateMenuItem={this.renderPrivateMenuItemOne}>
                            <Text style={{fontSize:Size(14),color:'#000'}}>{`选择性别`}</Text>
                        </SelfadaptModal>
                        <Image style={styles.demoThreeImg} source={this.state.demoTwoValue=='男'?manIcon:womanIcon}/>
                    </View>
                    <View style={{height:250}}>
                        <Text style={{fontSize:Size(14),color:'#000',textAlign:'center'}}>{`↓↓↓向下滑动↓↓↓`}</Text>
                    </View>
                    <View style={styles.demoOneBox}>
                        <Text style={{fontSize:Size(14),color:'#000',marginRight:10}}>{`向上展开:`}</Text>
                        <SelfadaptModal 
                            menuList={TestData} 
                            containerStyle={styles.demeOneBtn}
                            activeMenuStyle={{paddingVertical:15}}
                            activeMenuTextStyle={{fontSize:Size(18),color:'green'}}
                            unActiveMenuTextStyle={{fontSize:Size(12),color:'grey'}}
                            content={this.state.demoOneValue}
                            onPress={(res)=>this.doSelect(res,'demoOneValue')}>
                            <Text style={{fontSize:Size(14),color:'#fff'}}>{`点击选择`}</Text>
                        </SelfadaptModal>
                        <Text style={styles.demoOneResult} numberOfLines={2}>
                            {`${this.state.demoOneValue||''}`}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbarContainer: {
        height: 40,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#58A0FF'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    horizontalBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    demoOneBox: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    demeOneBtn: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#58A0FF',
    },
    demoOneResult: {
        flex: 1,
        fontSize: Size(14),
        color: '#000',
        marginLeft: 10
    },
    demoThreeImg: {
        height: 25,
        width: 25,
    },
});