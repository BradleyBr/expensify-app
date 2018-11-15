import filtersReducer from '../../reducers/filters'
import moment from 'moment'

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })
    expect(state).toEqual({
        text: '',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        sortBy: 'amount'
    })
})

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    }
    const action = { type: 'SORT_BY_DATE' }
    const state = filtersReducer(currentState, action)
    expect(state).toEqual({
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'date'   
    })
})

test('should set text filter', () => {
    const text = 'hello'
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text })
    expect(state).toEqual({
        text,
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        sortBy: 'date'
    })
})

test('should set startDate filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: moment(0)  })
    expect(state.startDate).toEqual(moment(0))
})

test('should set endDate filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: moment().startOf('month').add(2, 'days') })
    expect(state.endDate).toEqual(moment().startOf('month').add(2,'days'))
})
