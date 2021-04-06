import { NavigationScreenProp, NavigationState } from "react-navigation";

export interface INavProps {
    navigation: NavigationScreenProp<NavigationState>;
    route?: any
}