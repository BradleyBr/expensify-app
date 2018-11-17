export const selectExpensesTotal = (expenses) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const expenseArray = expenses.map(expense => expense.amount)
    return expenseArray.reduce(reducer, 0)
}