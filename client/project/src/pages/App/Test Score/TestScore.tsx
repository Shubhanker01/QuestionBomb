import { useLocation } from "react-router-dom"

function TestScore() {
    const location = useLocation()
    const result = location.state?.score
    return (
        <>
            <div>Your TestScore</div>
            <div>{result}</div>
        </>

    )
}

export default TestScore