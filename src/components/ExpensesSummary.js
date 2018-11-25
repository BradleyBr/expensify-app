import React from 'react'
import { selectExpensesTotal } from '../selectors/expenses-total'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

export class ExpensesSummary extends React.Component{
   expenseCount() {
    return this.props.expenses.length
   }
    
    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    {this.expenseCount() === 0 ? <h1 className="page-header__title">Viewing <span>0</span> expenses</h1> :
                    (this.expenseCount() === 1 ? <h1 className="page-header__title">Viewing <span>1</span>
                     expense totalling <span>{numeral(selectExpensesTotal(this.props.expenses)/100).format('$0,0.00')}</span></h1>
                    :<h1 className="page-header__title">Viewing <span>{this.expenseCount()}</span> expenses totalling 
                    <span>{numeral(selectExpensesTotal(this.props.expenses)/100).format('$0,0.00')}</span></h1>)}
                    <div className="page-header__actions">
                        <Link className="button" to="/create">Add Expense</Link>
                    </div>
                </div>
            </div>
        
        )
    }
}

const mapStateToProps = (state) => ({
    expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpensesSummary)

