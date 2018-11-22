import { shallow } from 'enzyme'
import React from 'react'
import {LoginPage} from '../../components/LoginPage'

test('Should render Login page', () => {
    const wrapper = shallow(<LoginPage startLogin={() => {}}/>)
    expect(wrapper).toMatchSnapshot()
})

test('Should call startLogin on button click', () => {
    let startLogin = jest.fn()
    const wrapper = shallow(<LoginPage startLogin={startLogin} />)
    wrapper.find('button').simulate('click')
    expect(startLogin).toHaveBeenCalled()
})