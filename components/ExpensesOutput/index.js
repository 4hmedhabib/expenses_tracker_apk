import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GLOBAL_STYLES } from "../../constants/styles";

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText }) => {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      {/* SUMMARY */}
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {/* LIST OF EXPENSES */}
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GLOBAL_STYLES.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 18,
    marginTop: 50,
    textAlign: "center",
  },
});
