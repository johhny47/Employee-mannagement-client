import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import useHr from '../hook/useHr'
import { FaSpinner } from 'react-icons/fa'

const HrRoute = ({ children }) => {
  const [isHr, isHrLoading ] = useHr()

  if (isHrLoading) return <FaSpinner></FaSpinner>
  if (isHr) return children
  return <Navigate to='/dashboard' replace='true' />
}

HrRoute.propTypes = {
  children: PropTypes.element,
}

export default HrRoute
