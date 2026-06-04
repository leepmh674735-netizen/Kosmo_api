export async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers
    };

    let body = options.body;
    if (body && typeof body === 'object') {
        body = JSON.stringify(body);
    }

    const response = await fetch(`http://localhost${endpoint}`, {
        ...options,
        headers,
        body
    });

    if (!response.ok) {
        let errMsg = '요청이 실패했습니다.';
        try {
            const errData = await response.json();
            errMsg = errData.message || errMsg;
        } catch (e) {}
        throw new Error(errMsg);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    }
    
    return await response.text();
}
