 
# react-native-selfadapt-modal

## Getting started

`$ npm install react-native-selfadapt-modal --save`

## Usage

Demo

![ZedILq.gif](https://s2.ax1x.com/2019/06/26/ZedILq.gif)

```javascript
import SelfadaptModal from 'react-native-selfadapt-modal';

const TestData = [
    {id:10086,name:'Option 1(This is a long, long, long option.)'},
    {id:10087,name:'Option 2'},
    {id:10088,name:'Option 3'},
    {id:10089,name:'Option 4'},
];

render = () => {
    return (
        <SelfadaptModal 
            menuList={TestData} 
            containerStyle={styles.demeOneBtn}
            content={this.state.demoOneValue}
            onPress={(res)=>this.doSelect(res,'demoOneValue')}>
            <Text style={{fontSize:Size(14),color:'#fff'}}>{`click here`}</Text>
        </SelfadaptModal>
    );
}

const styles = StyleSheet.create({
    demeOneBtn: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#58A0FF',
    },
});
```

更多示例见 `DEMO` 

## API

### 关于弹框

属性名称 | 类型 | 是否必须 | 说明 | 默认值 | 备注 |
:--- |:--- |:--- |:--- |:--- |:--- |
menuList |array |是 |下拉框选项列表数据源 |[] |无 |
label |string |否 |用于显示的选项的label |name |用于menuList的元素</br>是对象的情况 |
content |string |否 |默认选项 |无 |无 |
paddingWidth |number |否 |按钮的padding高度 |0 | 当使用LocationModal</br>的按钮还有外层包裹</br>时可能需要使用 |
privateMenuItem |func |否 |自定义选项组件 |无 |包含三个参数</br>item,index,isSelect |
modalStyle |object |否 |modal样式 |无 |无 |
flatListStyle |object |否 |FlatList样式 |无 |无 |
activeMenuStyle |object |否 |选中单项选项容器样式 |无 |无 |
unActiveMenuStyle |object |否 |未选中单项选项容器样式 |无 |无 |
activeMenuTextStyle |object |否 |选中单项选项文本样式 |无 |无 |
unActiveMenuTextStyle |object |否 |未选中单项选项文本样式 |无 |无 |
openStatus |func |否 |获取Modal展开状态的回调函数 |无 |无 |
listHeader |func |否 |固定的列表头部,非固定头部可传入ListHeaderComponent实现 |无 |无 |


### 关于按钮

属性名称 | 类型 | 是否必须 | 说明 | 默认值 | 备注 |
:--- |:--- |:--- |:--- |:--- |:--- |
children |element |是 |子元素 |无 |无 |
onPress |func |否 |下拉选项点击事件 |无 |无 |
containerStyle |object |否 |按钮样式 |无 |无 |


### 更新日志

#### 1.1.0 

1.调整PropTypes类型，消除警告</br>
2.修复列表元素靠右对齐时的显示异常</br>
3.调整列表数据为空时，组件的处理方式<br>

#### 1.1.3

1.添加Modal展开状态的获取,通过openStatus回调函数实现
2.添加固定的列表头部(listHeader),使用场景:例如列表搜索框

### 下一步的计划

适配列表分页

