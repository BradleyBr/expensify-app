import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, startAddExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = 'thisismytestuid'
const defaultAuthState = {auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

test('should set up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should set up edit expense action object', () => {
    const action = editExpense('123abc', { key1: 'value' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            key1: 'value'
        }
    })
})

test('should edit expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[0].id

    store.dispatch(startEditExpense(id, {description: 'candy'})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates: {
                description: 'candy'
            }
        })
        database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
            const newExpense = snapshot.val()
            expect(newExpense).toEqual({
                description: 'candy',
                ...newExpense
            })
            done()
        })
    })
})

test('should set up add expense action object with provided values', () => {
    
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
        
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        })

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
        
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults)
        done()
    })
})

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done()
    })
})

test('should remove expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
 
    store.dispatch(startRemoveExpense(expenses[0])).then(() => {
        database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toBe(null)
        })
        done()
    })
})
