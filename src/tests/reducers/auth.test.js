import authReducer from '../../reducers/auth'

test('should set login', () => {
    const action = {
        type: 'LOGIN',
        uid: '123abc'
    }
    const state = authReducer(undefined, action)
    expect(state).toEqual({uid: '123abc'})
})

test('should set logout', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: 'anything'}, action)
    expect(state).toEqual({})
})