const fetchModel = async (url, options = {}) => {
    try {
        const response = await fetch(`http://localhost:8080${url}`, {
            credentials: 'include',
            ...options,
        });
        if (!response.ok) throw new Error("Request failed");
        return await response.json();
    } catch (err) {
        console.log(err);
        return null;
    }
};

export default fetchModel;