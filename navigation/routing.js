import { createAppContainer, createSwitchNavigator } from "react-navigation";

// import screens
import Welcome from "../screens/Welcome";
import LoginController from "../screens/Login";
import ProjectController from "../screens/Project";

const Screens = createSwitchNavigator({
  Welcome,
  LoginController,
  ProjectController
});

export default createAppContainer(Screens);