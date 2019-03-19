import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
//login
import LoginContainer from './view/containers/login/LoginContainer';
import WelcomeContainer from './view/containers/login/WelcomeContainer';
import AccountAuthenticateContainer from './view/containers/login/AccountAuthenticateContainer';
import ChangePasswordContainer from './view/containers/login/ChangePasswordContainer';

//production-plan
import ProductionPlanContainer from './view/containers/production-plan/ProductionPlanContainer';

//remind-work
import RemindWorkContainer from './view/containers/remind-work/RemindWorkContainer';

//notification
import NotificationContainer from './view/containers/notification/NotificationContainer';
import PerformWorkContainer from './view/containers/notification/PerformWorkContainer';

//profile
import ProfileContainer from './view/containers/profile/ProfileContainer';

//chart
import ChartContainer from './view/containers/chart/ChartContainer';

import Menu from './view/containers/Menu';
import CameraWork from './view/containers/camera/CameraWork';

const AppNavigator = createStackNavigator(
  {
    Welcome: {screen: WelcomeContainer},
    Login: {screen: LoginContainer},
    AccountAuthenticate: {screen: AccountAuthenticateContainer},
    Menu: {screen: Menu},
    ProductionPlan: {screen: ProductionPlanContainer},
    RemindWork: {screen: RemindWorkContainer},
    Notification: {screen: NotificationContainer},
    PerformWork: {screen: PerformWorkContainer},
    Profile: {screen: ProfileContainer},
    ChangePassword: {screen: ChangePasswordContainer},
    Camera: {screen: CameraWork},
    Chart: {screen: ChartContainer}
  },
  {
    initialRouteName: 'Welcome'    
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {  
  render() {
    return <AppContainer />;
  }
}