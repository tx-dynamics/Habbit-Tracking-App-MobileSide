import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from '../Constants/Colors'
import { wp } from "../Helpers/Responsiveness"
// import Fonticon from '../Constants/FontIcon';



export default class Button extends Component {
    render() {
        const backgroundColor = this.props.backgroundColor
            ? this.props.backgroundColor
            : Colors.Yellow;
        const marginTop = this.props.marginTop
            ? this.props.marginTop
            : wp(4);
        const borderWidth = this.props.borderWidth
            ? this.props.borderWidth
            : 0;
        const borderColor = this.props.borderColor
            ? this.props.borderColor
            : Colors.white;
        const width = this.props.width
            ? this.props.width
            : wp(30);
        const height = this.props.height
            ? this.props.height
            : 47;
        const alignItems = this.props.alignItems
            ? this.props.alignItems
            : "center";
        const justifyContent = this.props.justifyContent
            ? this.props.justifyContent
            : "center";
        const alignSelf = this.props.alignSelf
            ? this.props.alignSelf
            : "center";
        const flexDirection = this.props.flexDirection
            ? this.props.flexDirection
            : "row";
        const borderRadius = this.props.borderRadius
            ? this.props.borderRadius
            : 15;


        const style = [
            {
                backgroundColor: backgroundColor, marginTop: marginTop, borderWidth: borderWidth,
                borderColor: borderColor, width: width, height: height, alignItems: alignItems,
                 alignSelf: alignSelf, flexDirection: flexDirection, borderRadius: borderRadius
            },
            this.props.style || {}
        ];
        const allProps = Object.assign({}, this.props, { style: style });
        const { title, onPress, type, name, icon, textAlign } = this.props;
        return (
            <TouchableOpacity onPress={onPress}
                {...allProps} >
                {icon &&
                    <View style={{}}>
                        {/* <Fonticon type={type} name={name} size={wp(9)} style={{ marginLeft:wp(5)}} /> */}
                    </View>
                }
                <View style={{alignItems: textAlign? textAlign: "center", flex:1,}}>
                <Text style={{ color: Colors.White, marginLeft:icon? -30 : 0 , fontWeight:"bold"}}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({

});
