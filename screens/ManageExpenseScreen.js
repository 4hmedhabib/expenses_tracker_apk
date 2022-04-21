import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GLOBAL_STYLES } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpenseScreen = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    console.log(editedExpenseId);
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (data) => {
    console.log({
      description: data.description,
      amount: data.amount,
      date: new Date(data.date),
    });
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: data.description,
        amount: data.amount,
        date: new Date(data.date),
      });
    } else {
      expensesCtx.addExpense({
        description: data.description,
        amount: data.amount,
        date: new Date(data.date),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {!isEditing && (
        <ExpenseForm
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          submitButtonLabel={isEditing ? "Update" : "Add"}
        />
      )}

      {isEditing && (
        <View>
          <ExpenseForm
            onSubmit={confirmHandler}
            onCancel={cancelHandler}
            submitButtonLabel={isEditing ? "Update" : "Add"}
          />
          <View style={styles.deleteContainer}>
            <IconButton
              icon={"trash"}
              color={GLOBAL_STYLES.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GLOBAL_STYLES.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GLOBAL_STYLES.colors.primary200,
    alignItems: "center",
  },
});
