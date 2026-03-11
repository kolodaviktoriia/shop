import React from "react";
import ErrorHandler from "../pages/ErrorHandler/ErrorHandler.js";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("App error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorHandler />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;