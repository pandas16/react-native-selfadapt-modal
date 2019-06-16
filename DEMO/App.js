/**
 * 
 */
import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    Dimensions,
} from 'react-native';

import SelfadaptModal from 'react-native-selfadapt-modal';

const screenWidth = Dimensions.get('window').width;
const basePx = 375;
const Size = (font) => {
    return font * screenWidth / basePx;
}

const TestData = [
    {id:10086,name:'第一条'},{id:10087,name:'第二条'},{id:10088,name:'第三条'},{id:10089,name:'第四条'},
];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            errInfo: null,
        };
    }

    renderSeparator = () => {
        return <View style={{height:10,backgroundColor:'red'}}/>
    }

    renderPrivateMenuItem = (item,index,isSelect) => {
        return (
            <View style={styles.horizontalBox}>
                <Text style={{fontSize:Size(14),color:'#000'}}>{`12212`}</Text>
                <Icon name={'return'} color={'#000'} size={Size(18)}/>
                <Text style={{fontSize:Size(14),color:'#000'}}>{`${item}`}</Text>
                <Text style={{fontSize:Size(14),color:'#333'}}>{`qqqqq`}</Text>
            </View>
        )
    }

    renderNavbar = () => {
        return (
            <View style={styles.navbar}>
                <Text style={{fontSize:Size(14),color:'#000'}}>{`测试`}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex:1}}>
                <SelfadaptModal 
                    menuList={TestData} 
                    paddingWidth={10} 
                    containerStyle={styles.containerStyle}
                    ItemSeparatorComponent={()=>this.renderSeparator()}
                    activeMenuStyle={{backgroundColor:'orange'}}
                    activeMenuTextStyle={{color:'gray',fontSize:Size(36)}}
                    content={'第二条'}
                    privateMenuItem={this.renderPrivateMenuItem}
                    >
                    <Text style={{fontSize:Size(14),color:'#000'}}>{`你是个啥？`}</Text>
                </SelfadaptModal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        height: 40,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#58A0FF'
    },
    horizontalBox: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    containerStyle: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'orange',
    }
});