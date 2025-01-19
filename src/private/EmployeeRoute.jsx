import PropTypes from 'prop-types'

import { FaSpinner } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'

import useEmployee from '../hook/useEmployee'

const EmployeeRoute = ({ children }) => {
  const [isEmployee, isEmployeeLoading ] = useEmployee()

  if (isEmployeeLoading) return <FaSpinner></FaSpinner>
  if (isEmployee) return children
  return <Navigate to='/dashboard' replace='true' />
}

EmployeeRoute.propTypes = {
  children: PropTypes.element,
}

export default EmployeeRoute
