import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Linking,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { getNews } from '../../helper/NewsService';
import { colors } from '../../utility';
import { INavProps } from '../../utility/interfaces';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

const NewsDetailScreen = (props: INavProps) => {

    const navigation = useNavigation();
    const [newsData, setNewsData] = useState<any>(null);
    const [refreshing, setRefreshing] = useState<boolean>(true);
    const { categoryUrl, type } = props?.route?.params?.item;
    useEffect(() => {
        if (refreshing) {
            _news_data();
        };
    }, [refreshing]);


    async function _news_data() {
        //get news feed 
        await getNews(categoryUrl).then((result: any) => {
            // sort by time the news feed 
            const sortedData = _.orderBy(result.items, function (o: any) {
                return moment(o.published)
            }, ['desc']);
            setNewsData(sortedData);
            setRefreshing(false);
        }, //if got any error
            error => {
                console.log("Error fetching news error {", error, "}");
                // get error then stop loader 
                setRefreshing(false);
                Alert.alert('Something went wrong please again try later');
            }
        )
    }
    const renderData = ({ item }: any) => (
        <ItemData
            key={item.title}
            title={item.title}
            description={item.description}
            published={item.published}
            onPress={() => {
                //for open the link in the browser
                // Linking.openURL(item.id);  
                //pass news url as news link for webview to open in the app 
                navigation.navigate('WebView', { newsLink: item.id })
            }}
        />
    );

    const ItemData = ({ title, description, published, onPress }: any) => (
        <TouchableOpacity onPress={onPress}
            style={styles.card}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: 'justify',
                }}
            >
                {title.trim()}
            </Text>
            <Text
                style={{
                    fontSize: 13,
                    alignSelf: 'flex-end',
                    paddingBottom: 20
                }}
            >
                {/* format the time */}
                {moment(published).format('dddd, MMMM Do YYYY, h:mm:ss a')}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: 'justify'
                }}
            >
                {description}
            </Text>
        </TouchableOpacity>
    );
    // pull to refresh time
    const wait = (timeout: number) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    //pull to refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    // render main screen
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>
                {type} News
            </Text>
            {/* load news fees after fetch the news feed otherwise show loader */}
            {newsData || !refreshing ?
                <FlatList
                    style={styles.flatlist}
                    data={newsData}
                    renderItem={renderData}
                    keyExtractor={(item) => item.title}
                    showsVerticalScrollIndicator={false}

                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
                :
                <ActivityIndicator color={colors.black} size={30} />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        marginBottom: 20
    },
    card: {
        backgroundColor: colors.white,
        margin: 10,
        padding: 10,
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.55,
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 2,
    },
    flatlist: {
        marginBottom: 50
    }
});

export default NewsDetailScreen;
