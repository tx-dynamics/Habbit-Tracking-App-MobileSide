import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, TextInput } from "react-native";
import { Colors } from '../Constants/Colors';
import { wp } from "../Helpers/Responsiveness";
import { iconPath } from "../Constants/icon";


export default class InputField extends Component {
    render() {


        const backgroundColor = this.props.backgroundColor
            ? this.props.backgroundColor
            : "transparent";

        const placeholderTextColor = this.props.placeholderTextColor
            ? this.props.placeholderTextColor
            : "#656565";
        const color = this.props.color
            ? this.props.color
            : "#000";

        const width = this.props.width
            ? this.props.width
            : wp(100);
        const flex = this.props.flex
            ? this.props.flex
            : 1;
        const borderWidth = this.props.borderWidth
            ? this.props.borderWidth
            : 1.5;
        const borderRadius = this.props.borderRadius
            ? this.props.borderRadius
            : 10;
        const marginTop = this.props.marginTop
            ? this.props.marginTop
            : 12;
        const height = this.props.height
            ? this.props.height
            : 45;
        const paddingLeft = this.props.paddingLeft
            ? this.props.paddingLeft
            : 10;
        const paddingVertical = this.props.paddingVertical
            ? this.props.paddingVertical
            : 0;
        // : screen_size_height * .185;


        const style = [
            { height: height, flex: flex, borderRadius: borderRadius, marginTop: 0 },
            {
                backgroundColor: backgroundColor, paddingLeft: paddingLeft, paddingVertical: paddingVertical,
                color: color
            },
            // { borderBottomLeftRadius: borderBottomLeftRadius },
            this.props.style || {}
        ];
        const allProps = Object.assign({}, this.props, { style: style });
        return (
            <View style={[styles.textInputStyle, this.props.shadow ? styles.boxWithShadow : null, { marginTop: marginTop, borderRadius: this.props.borderRadius ? this.props.borderRadius : 10, }]}>
                {this.props.borderText &&
                    <Text style={styles.labelContainer}>{this.props.borderText}</Text>
                }
                <TextInput
                    {...allProps}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    // editable={false}
                    // caretHidden={true}
                    // keyboardType="email-address"
                    placeholderTextColor={this.props.placeholderTextColor}
                // onChangeText={text => onChangeText(text)}
                />
                {this.props.secureText &&
                    <TouchableOpacity style={{ paddingRight: wp(1.8) }} onPress={this.props.onPress}>
                        <Image source={iconPath.EYEICON} style={{ width: wp(5), height: wp(5) }} resizeMode={"contain"}></Image>
                    </TouchableOpacity>
                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    textInputStyle: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.Yellow
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5
    },
    labelContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: wp(-3),
        left: 25,
        padding: 5,
        zIndex: 50,
        paddingVertical: 0,
        paddingHorizontal: wp(2),
        color:Colors.LightGray
    },
});
