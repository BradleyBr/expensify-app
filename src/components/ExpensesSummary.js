import React from 'react'
import { selectExpensesTotal } from '../selectors/expenses-total'
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

export class ExpensesSummary extends React.Component{
   expenseCount() {
    return this.props.expenses.length
   }
    
    render() {
        return (
            <div>
                {this.expenseCount() === 0 ? <p>Viewing 0 expenses</p> :
                (this.expenseCount() === 1 ? <p>Viewing 1 expense totalling {numeral(selectExpensesTotal(this.props.expenses)/100).format('$0,0.00')}</p>
                :<p>Viewing {this.expenseCount()} expenses totalling {numeral(selectExpensesTotal(this.props.expenses)/100).format('$0,0.00')}</p>) }
            </div>
        
        )
    }
}

const mapStateToProps = (state) => ({
    expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpensesSummary)

