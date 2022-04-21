import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { getDateMinusDays } from "../util/day";
import { ExpensesContext } from "../store/expenses-context";

const RecentExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
      fallBackText={"No expneses registered for the last 7 Days"}
    />
  );
};

export default RecentExpensesScreen;

const styles = StyleSheet.create({});
