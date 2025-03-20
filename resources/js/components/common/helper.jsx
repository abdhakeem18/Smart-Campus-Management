export const errorHandle = (error) => {
    return Object.entries(error.data).map(([key, value]) => (
        <div key={key}>
            <strong>{key}:</strong>
            <ul>
                
                {Array.isArray(value) ? value.map((errorMsg, index) => (
                    <li key={index}>{errorMsg}</li>
                )) : <li key={key}>{value}</li>}
            </ul>
        </div>
    ));
};