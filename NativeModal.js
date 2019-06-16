'use strict';
import React,{Component} from 'react';
import {
	Modal,
	TouchableWithoutFeedback,
	View,
	StyleSheet
} from 'react-native';

export default class NativeModal extends Component{
	render(){
		return(
			<Modal
				animationType = {this.props.animationType?this.props.animationType:'fade'}
				visible = {this.props.visible&&this.props.visible}
				onRequestClose = {()=>{this.props.onClose&&this.props.onClose()}}
				transparent = {true}>
				<View style = {[styles.container,this.props.style]}>
					<TouchableWithoutFeedback onPress = {()=>{this.props.onClose&&this.props.onClose()}}>
						<View style = {[styles.overlay,{backgroundColor:'#000',opacity:0.5}]}/>
					</TouchableWithoutFeedback>
					{this.props.children}
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	overlay:{
		position:'absolute',
		top:0,
		left:0,
		bottom:0,
		right:0
	},
	container:{
		flex:1,
		backgroundColor:'rgba(0,0,0,0)'
	}
})