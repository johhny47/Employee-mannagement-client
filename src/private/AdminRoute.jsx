import PropTypes from 'prop-types'

import { FaSpinner } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import useAdmin from '../hook/useAdmin'

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading ] = useAdmin()

  if (isAdminLoading) return <FaSpinner></FaSpinner>
  if (isAdmin) return children
  return <Navigate to='/dashboard' replace='true' />
}

AdminRoute.propTypes = {
  children: PropTypes.element,
}

export default AdminRoute
