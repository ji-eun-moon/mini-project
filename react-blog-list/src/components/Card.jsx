import React from 'react'

import PropTypes from 'prop-types'

function Card({title, onClick, children}) {
  return (
    <div className="card mb-3 cursor-pointer" onClick={onClick}>
        <div className="card-body">
            <div className='d-flex justify-content-between'>
                <div>{title}</div>
                {/* children이 있을 경우에만 출력 */}
                {children && <div>{children}</div>}
            </div>
        </div>
    </div>
  )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    onClick: PropTypes.func
}

Card.defaultProps = {
    children: null,
    onClick: () => {}
}

export default Card