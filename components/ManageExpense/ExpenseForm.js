import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useReducer } from "react";
import Input from "./Input";
import Button from "../../components/UI/Button";

const formInitState = {
  amount: "",
  date: "",
  description: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_AMOUNT":
      return (state = {
        amount: action.payload,
        date: state.date,
        description: state.description,
      });
    case "CHANGE_DATE":
      return {
        amount: Number(state.amount),
        date: action.payload,
        description: state.description,
      };
    case "CHANGE_DESCRIPTION":
      return {
        amount: state.amount,
        date: state.date,
        description: action.payload,
      };
    default:
      return formInitState;
  }
};

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel }) => {
  const [form, dispatch] = useReducer(formReducer, formInitState);

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    dispatch({
      type: inputIdentifier,
      payload: enteredValue,
    });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.titleText}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.inputRow}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "CHANGE_AMOUNT"),
          }}
        />
        <Input
          label="Date"
          style={styles.inputRow}
          textInputConfig={{
            maxLength: 10,
            placeholder: "YYYY-MM-DD",
            onChangeText: (value) => {
              inputChangeHandler("CHANGE_DATE", value);
            },
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          placeholder: "Text here...",
          onChangeText: (value) => {
            inputChangeHandler("CHANGE_DESCRIPTION", value);
          },
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={onSubmit.bind(this, form)}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputRow: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
