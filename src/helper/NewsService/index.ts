import { baseUrl } from "../../utility/constant";
import * as rssParser from 'react-native-rss-parser';

export const getNews = async (link: string) => {
    return new Promise((resolve, reject) => {
        // get complete url for get the news data
        let url = baseUrl + link;
        fetch(url)
            .then((response) => response.text())
            .then(responseData => rssParser.parse(responseData))
            .then(rss => {
                resolve(rss)
            })
            .catch(error => {
                reject(error);
            });
    });
}



