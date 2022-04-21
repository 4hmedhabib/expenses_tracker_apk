import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons//Ionicons";
// components
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import ManageExpenseScreen from "./screens/ManageExpenseScreen";
import { GLOBAL_STYLES } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GLOBAL_STYLES.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GLOBAL_STYLES.colors.primary500,
        },
        tabBarActiveTintColor: GLOBAL_STYLES.colors.accent500,
        headerRight: ({ size, tintColor, onPress }) => (
          <IconButton
            icon={"add"}
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen name="AllExpenses" component={AllExpensesScreen} />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <Fragment>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName=""
            screenOptions={{
              headerStyle: {
                backgroundColor: GLOBAL_STYLES.colors.primary500,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpenesesOverview"
              options={{
                headerShown: false,
              }}
              component={ExpensesOverview}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpenseScreen}
              options={{
                title: "Manage Expense",
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </Fragment>
  );
}
