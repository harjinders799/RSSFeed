import React from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import WebView from 'react-native-webview';
import { colors, constant } from '../../utility';
import { INavProps } from '../../utility/interfaces';

const WebViewScreen = (props: INavProps) => {
    // fetch url link from props
    const { newsLink } = props?.route?.params;

    // render main screen
    return (
        <SafeAreaView
            style={styles.container}>
            {newsLink
                ?
                <WebView
                    source={{ uri: newsLink }}
                    style={styles.webview}
                />
                :
                <ActivityIndicator color={colors.black} size={30} />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webview: {
        marginTop: constant.IS_ANDROID ? 0 : 20
    }
});

export default WebViewScreen;
