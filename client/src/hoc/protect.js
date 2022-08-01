import React from "react"

const protect = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default protect