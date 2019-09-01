import { createAppContainer, createSwitchNavigator } from "react-navigation";

// import screens
import Welcome from "../screens/Welcome";
import LoginController from "../screens/Login";

const Screens = createSwitchNavigator({
  Welcome,
  LoginController
});

export default createAppContainer(Screens);