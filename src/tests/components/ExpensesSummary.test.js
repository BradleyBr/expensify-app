import { ExpensesSummary } from '../../components/ExpensesSummary'
import { shallow } from 'enzyme'
import React from 'react'
import expenses from '../fixtures/expenses'

let wrapper

test('should render correctly with 0 expenses', () => {
    wrapper = shallow(<ExpensesSummary expenses={[]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render correctly with 1 expense', () => {
    wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render correctly with 3 expenses', () => {
    wrapper = shallow(<ExpensesSummary expenses={expenses} />)
    expect(wrapper).toMatchSnapshot()
})